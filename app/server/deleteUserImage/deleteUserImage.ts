import { deleteImage, deleteImageFromS3Bucket } from "~/server";

/**
 * @description
 * This function deletes an image from both our DB and AWS S3 Bucket
 */
export const deleteUserImage = async (imageId: string) => {
  try {
    const deleteImageResponse = await deleteImage(imageId);
    console.log("Delete from DB -------------");
    console.log(deleteImageResponse);
    const deleteImageFromS3BucketResponse = await deleteImageFromS3Bucket(
      imageId
    );

    console.log("Delete from S3 -------------");
    console.log(deleteImageFromS3BucketResponse);

    return {
      imageId,
      message: `Successfully removed Image ID: ${imageId}`,
      success: true,
      deleteImageResponse,
      deleteImageFromS3BucketResponse,
    };
  } catch (error) {
    console.error(error);
    return {
      imageId,
      message: `Error removing Image ID: ${imageId}`,
      success: false,
      error,
    };
  }
};
