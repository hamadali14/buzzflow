import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3 } from "@/lib/aws";
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

async function getFfmpegPath() {
  const mod = await import("ffmpeg-static");
  const ffmpegPath = mod.default || mod;

  if (!ffmpegPath || typeof ffmpegPath !== "string") {
    throw new Error("ffmpeg-static path could not be resolved");
  }

  return ffmpegPath;
}

async function convertWebmToWav(buffer: Buffer, originalName: string) {
  const ffmpegPath = await getFfmpegPath();

  const tempDir = os.tmpdir();
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const inputPath = path.join(tempDir, `${stamp}-${safeBaseName(originalName)}.webm`);
  const outputPath = path.join(tempDir, `${stamp}-${safeBaseName(originalName)}.wav`);

  try {
    await fs.writeFile(inputPath, buffer);

    await execFileAsync(ffmpegPath, [
      "-y",
      "-i",
      inputPath,
      "-ar",
      "16000",
      "-ac",
      "1",
      outputPath
    ]);

    const wavBuffer = await fs.readFile(outputPath);

    return {
      buffer: wavBuffer,
      fileName: `${safeBaseName(originalName)}.wav`,
      contentType: "audio/wav"
    };
  } finally {
    await fs.unlink(inputPath).catch(() => {});
    await fs.unlink(outputPath).catch(() => {});
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const originalBuffer = Buffer.from(bytes);

    let uploadBuffer = originalBuffer;
    let uploadName = file.name;
    let contentType = file.type || "application/octet-stream";

    if (isWebmFile(file)) {
      const converted = await convertWebmToWav(originalBuffer, file.name);
      uploadBuffer = converted.buffer;
      uploadName = converted.fileName;
      contentType = converted.contentType;
    }

    const fileName = `${Date.now()}-${uploadName}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: uploadBuffer,
        ContentType: contentType
      })
    );

    return Response.json({
      success: true,
      fileName,
      s3Uri: `s3://${bucketName}/${fileName}`
    });
  } catch (error) {
    console.error("UPLOAD_ERROR", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown upload error"
      },
      { status: 500 }
    );
  }
}
