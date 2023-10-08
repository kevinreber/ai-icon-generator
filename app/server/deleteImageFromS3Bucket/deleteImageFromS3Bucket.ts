import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
  },
  region: process.env.REGION_AWS!,
});

/**
 * @description
 * This function deletes an image from our AWS S3 Bucket
 *
 * @reference
 * - Setting up "@aws-sdk/client-s3": https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
 * - Adding multiple "Action" policies in IAM: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html
 */
export const deleteImageFromS3Bucket = async (imageId: string) => {
  const deleteObjectCommand = new DeleteObjectCommand({
    Key: imageId,
    Bucket: process.env.S3_BUCKET_NAME_AWS!,
  });

  try {
    const response = await s3Client.send(deleteObjectCommand);
    return response;
  } catch (error) {
    console.warn("Error removing image from AWS S3 Bucket");
    console.error(error);
    return error;
  }
};
