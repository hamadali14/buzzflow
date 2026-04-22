import { GetTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribe } from "@/lib/aws";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobName = body.jobName as string | undefined;

    if (!jobName) {
      return Response.json({ error: "Missing jobName" }, { status: 400 });
    }

    const result = await transcribe.send(
      new GetTranscriptionJobCommand({
        TranscriptionJobName: jobName
      })
    );

    const job = result.TranscriptionJob;

    return Response.json({
      success: true,
      status: job?.TranscriptionJobStatus || null,
      transcriptFileUri: job?.Transcript?.TranscriptFileUri || null,
      failureReason: job?.FailureReason || null
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to get job status" }, { status: 500 });
  }
}
