"use client";

import { useRef, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, UploadCloud } from "lucide-react";

type LocalTranscribeResponse = {
  success?: boolean;
  text?: string;
  language?: string | null;
  svProb?: number | null;
  enProb?: number | null;
  svText?: string;
  enText?: string;
  svScore?: number | null;
  enScore?: number | null;
  error?: string;
};

async function readJsonSafe(res: Response) {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,
      error: text.slice(0, 300)
    };
  }
}

export default function NewOfferPage() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [clientName, setClientName] = useState("Nordic Build AB");
  const [offerTitle, setOfferTitle] = useState("Renovation package");
  const [loading, setLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [svProb, setSvProb] = useState<number | null>(null);
  const [enProb, setEnProb] = useState<number | null>(null);
  const [svScore, setSvScore] = useState<number | null>(null);
  const [enScore, setEnScore] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const recordedFile = new File(
          [audioBlob],
          `recording-${Date.now()}.webm`,
          { type: "audio/webm" }
        );
        setFile(recordedFile);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setJobStatus("Recording...");
      setTranscriptText("");
      setDetectedLanguage("");
      setSvProb(null);
      setEnProb(null);
      setSvScore(null);
      setEnScore(null);
    } catch {
      setJobStatus("Microphone access denied or unavailable");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setJobStatus("Recording stopped. Ready for local transcription.");
    }
  }

  async function handleUploadAndTranscribe() {
    if (!file) {
      setJobStatus("Choose or record an audio file first");
      return;
    }

    try {
      setLoading(true);
      setJobStatus("Transcribing locally...");
      setTranscriptText("");
      setDetectedLanguage("");
      setSvProb(null);
      setEnProb(null);
      setSvScore(null);
      setEnScore(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/transcribe-local", {
        method: "POST",
        body: formData
      });

      const data = (await readJsonSafe(res)) as LocalTranscribeResponse;

      if (!res.ok || !data.success) {
        setLoading(false);
        setJobStatus(`Local transcription failed: ${data.error || "Unknown error"}`);
        return;
      }

      setTranscriptText(data.text || "");
      setDetectedLanguage(data.language || "sv");
      setSvProb(data.svProb ?? null);
      setEnProb(data.enProb ?? null);
      setSvScore(data.svScore ?? null);
      setEnScore(data.enScore ?? null);
      setJobStatus("Completed");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setJobStatus(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <AppShell title="New Offer" subtitle="Capture audio">
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <GlassCard className="p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-dashed border-white/60 bg-white/40 p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/65 shadow-soft">
                  <UploadCloud className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Upload audio</h3>
                <p className="mt-2 text-sm text-slate-600">Drop MP3, WAV, FLAC, MP4, M4A, or browser recording.</p>
                <input
                  type="file"
                  accept=".mp3,.wav,.flac,.mp4,.m4a,.webm,audio/*,video/mp4"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-5 block w-full text-sm text-slate-700"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/60 bg-white/45 p-6">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/65 shadow-soft">
                  <Mic className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Record voice</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Svenska prioriteras först. Engelska används bara om den blir tydligt bättre.
                </p>

                <div className="mt-5 flex gap-3">
                  <Button type="button" variant="secondary" onClick={startRecording} disabled={isRecording}>
                    Start Recording
                  </Button>
                  <Button type="button" variant="ghost" onClick={stopRecording} disabled={!isRecording}>
                    Stop
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input
              label="Client name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label="Offer title"
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button type="button" onClick={handleUploadAndTranscribe} disabled={loading}>
              {loading ? "Working..." : "Transcribe Locally"}
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-sm text-slate-500">Status</p>
          <h3 className="text-lg font-semibold text-slate-900">Local transcription flow</h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              File: {file ? file.name : "No file selected"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Client: {clientName}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Offer: {offerTitle}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700 break-all">
              Status: {jobStatus || "Idle"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Vald språkmodell: {detectedLanguage || "Not detected"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Svenska vikt: {svProb !== null ? svProb.toFixed(3) : "-"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Engelska vikt: {enProb !== null ? enProb.toFixed(3) : "-"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Svenska poäng: {svScore !== null ? svScore : "-"}
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/40 p-3 text-sm text-slate-700">
              Engelska poäng: {enScore !== null ? enScore : "-"}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-4 p-5">
        <p className="text-sm text-slate-500">Transcript</p>
        <h3 className="text-lg font-semibold text-slate-900">Output text</h3>

        <div className="mt-5 rounded-2xl border border-white/50 bg-white/40 p-4 text-sm leading-7 text-slate-700 whitespace-pre-wrap min-h-[220px]">
          {transcriptText || "No transcript yet"}
        </div>
      </GlassCard>
    </AppShell>
  );
}
