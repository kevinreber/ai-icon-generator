import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: "us-east-2",
});

const S3_BUCKET_NAME = "ai-icon-generator";

export const saveBase64EncodedImageToAWS = async (
  base64EncodedImage: string,
  iconId: string
) => {
  const response = await s3
    .putObject({
      Key: iconId,
      Bucket: S3_BUCKET_NAME,
      Body: Buffer.from(base64EncodedImage, "base64"),
      ContentType: "image/png",
      ContentEncoding: "base64",
    })
    .promise();

  return response;
};
