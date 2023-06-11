import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
  },
  region: process.env.REGION_AWS!,
});

export const saveBase64EncodedImageToAWS = async (
  base64EncodedImage: string,
  iconId: string
) => {
  const response = await s3
    .putObject({
      Key: iconId,
      Bucket: process.env.S3_BUCKET_NAME_AWS!,
      Body: Buffer.from(base64EncodedImage, "base64"),
      ContentType: "image/png",
      ContentEncoding: "base64",
    })
    .promise();

  return response;
};
