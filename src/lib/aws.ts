import { S3Client } from "@aws-sdk/client-s3";
import { TranscribeClient } from "@aws-sdk/client-transcribe";

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET;

if (!region) {
  throw new Error("Missing AWS_REGION in .env.local");
}

if (!accessKeyId) {
  throw new Error("Missing AWS_ACCESS_KEY_ID in .env.local");
}

if (!secretAccessKey) {
  throw new Error("Missing AWS_SECRET_ACCESS_KEY in .env.local");
}

if (!bucketName) {
  throw new Error("Missing AWS_S3_BUCKET in .env.local");
}

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export const transcribe = new TranscribeClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export { bucketName };
