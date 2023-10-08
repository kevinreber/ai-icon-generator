import { deleteImageFromDB, deleteImageFromS3Bucket } from "~/server";

/**
 * @description
 * This function deletes an image from both our DB and AWS S3 Bucket
 */
export const deleteUserImage = async (imageId: string) => {
  try {
    const deleteImageResponse = await deleteImageFromDB(imageId);
    console.log("Delete from DB -------------");
    console.log(deleteImageResponse);
    const deleteImageFromS3BucketResponse =
      await deleteImageFromS3Bucket(imageId);

    console.log("Delete from S3 -------------");
    console.log(deleteImageFromS3BucketResponse);

    return {
      success: true,
      data: {
        imageId,
        message: `Successfully removed Image ID: ${imageId}`,
        deleteImageResponse,
        deleteImageFromS3BucketResponse,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        imageId,
        message: `Error removing Image ID: ${imageId}`,
        error,
      },
    };
  }
};
