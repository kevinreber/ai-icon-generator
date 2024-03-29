import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function deletes an image from our DB
 */
export const deleteImageFromDB = async (imageId: string) => {
  try {
    const response = await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return response;
  } catch (error) {
    console.warn("Error removing image from DB");
    console.error(error);
    return error;
  }
};
