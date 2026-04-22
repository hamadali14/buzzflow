import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribe } from "@/lib/aws";

function getMediaFormat(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (ext === "mp3") return "mp3";
  if (ext === "mp4") return "mp4";
  if (ext === "wav") return "wav";
  if (ext === "flac") return "flac";
  if (ext === "m4a") return "mp4";

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const s3Uri = body.s3Uri as string | undefined;
    const fileName = body.fileName as string | undefined;
    const languageCode = (body.languageCode as string | undefined) || "en-US";

    if (!s3Uri || !fileName) {
      return Response.json(
        { success: false, error: "Missing s3Uri or fileName" },
        { status: 400 }
      );
    }

    const mediaFormat = getMediaFormat(fileName);

    if (!mediaFormat) {
      return Response.json(
        {
          success: false,
          error: "Unsupported format. Use mp3, mp4, wav, flac, or m4a."
        },
        { status: 400 }
      );
    }

    const jobName = `voice-to-quote-${Date.now()}`;

    await transcribe.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: jobName,
        LanguageCode: languageCode,
        MediaFormat: mediaFormat,
        Media: {
          MediaFileUri: s3Uri
        }
      })
    );

    return Response.json({
      success: true,
      jobName
    });
  } catch (error) {
    console.error("TRANSCRIBE_START_ERROR", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown transcribe error"
      },
      { status: 500 }
    );
  }
}
