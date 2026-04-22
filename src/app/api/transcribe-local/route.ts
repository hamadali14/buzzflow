import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

function isWebmFile(file: File) {
  return (
    file.type.toLowerCase().includes("webm") ||
    file.name.toLowerCase().endsWith(".webm")
  );
}

function safeBaseName(name: string) {
  return name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-");
}

async function convertWebmToWav(buffer: Buffer, originalName: string) {
  const tempDir = os.tmpdir();
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const inputPath = path.join(tempDir, `${stamp}-${safeBaseName(originalName)}.webm`);
  const outputPath = path.join(tempDir, `${stamp}-${safeBaseName(originalName)}.wav`);

  try {
    await fs.writeFile(inputPath, buffer);

    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      inputPath,
      "-ar",
      "16000",
      "-ac",
      "1",
      outputPath
    ]);

    return outputPath;
  } finally {
    await fs.unlink(inputPath).catch(() => {});
  }
}

export async function POST(req: Request) {
  let audioPath = "";

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (isWebmFile(file)) {
      audioPath = await convertWebmToWav(buffer, file.name);
    } else {
      const tempDir = os.tmpdir();
      const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const ext = path.extname(file.name) || ".wav";
      audioPath = path.join(tempDir, `${stamp}-${safeBaseName(file.name)}${ext}`);
      await fs.writeFile(audioPath, buffer);
    }

    const scriptPath = path.join(process.cwd(), "scripts", "transcribe_audio.py");

    const { stdout, stderr } = await execFileAsync("python3", [
      scriptPath,
      audioPath,
      "small"
    ]);

    if (stderr && stderr.trim()) {
      console.error("LOCAL_TRANSCRIBE_STDERR", stderr);
    }

    let parsed: {
      success?: boolean;
      text?: string;
      language?: string;
      sv_prob?: number;
      en_prob?: number;
      sv_text?: string;
      en_text?: string;
      sv_score?: number;
      en_score?: number;
      error?: string;
    } = {};

    try {
      parsed = JSON.parse(stdout);
    } catch {
      return Response.json(
        { success: false, error: `Invalid JSON from Python: ${stdout}` },
        { status: 500 }
      );
    }

    if (!parsed.success) {
      return Response.json(
        { success: false, error: parsed.error || "Local transcription failed" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      text: parsed.text || "",
      language: parsed.language || "sv",
      svProb: parsed.sv_prob ?? null,
      enProb: parsed.en_prob ?? null,
      svText: parsed.sv_text ?? "",
      enText: parsed.en_text ?? "",
      svScore: parsed.sv_score ?? null,
      enScore: parsed.en_score ?? null
    });
  } catch (error) {
    console.error("LOCAL_TRANSCRIBE_ERROR", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown local transcription error"
      },
      { status: 500 }
    );
  } finally {
    if (audioPath) {
      await fs.unlink(audioPath).catch(() => {});
    }
  }
}
