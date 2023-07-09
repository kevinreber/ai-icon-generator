import { prisma } from "~/services/prisma.server";
import { createImageLike, deleteImageLike } from "~/server";

/**
 * @description
 * This function toggles a User's Like for an Image
 */
export const toggleImageLikes = async ({
  imageId,
  userId,
}: {
  imageId: string;
  userId: string;
}) => {
  try {
    const data = { userId, imageId };

    // Check if User's Like for Image exists
    const like = await prisma.imageLike.findUnique({
      where: { userId_imageId: data },
    });

    if (like == null) {
      // Like Image - Create Like
      const data = await createImageLike({ userId, imageId });
      const message = "Successfully liked image";

      return {
        success: true,
        addLike: true,
        data,
        message,
      };
    } else {
      // Unlike Image - Delete Like
      const data = await deleteImageLike({ userId, imageId });
      const message = "Successfully unliked image";

      return {
        success: true,
        addLike: false,
        data,
        message,
      };
    }
  } catch (error) {
    const message = `Error adding Like to imageID: ${imageId}`;
    console.warn(message);
    console.error(error);

    return {
      success: false,
      data: {},
      message,
      error,
    };
  }
};
