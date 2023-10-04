import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function adds an Image to a Collection in our DB
 */
export const addImageToCollection = async ({
  collectionId,
  imageId,
}: {
  collectionId: string;
  imageId: string;
}) => {
  try {
    const message = `Successfully added Image to Collection`;

    const data = await prisma.collectionHasImage.create({
      data: {
        collectionId,
        imageId,
      },
    });

    return {
      success: true,
      data,
      message,
    };
  } catch (error) {
    const message = `Error adding Image to Collection`;
    console.error(message);
    console.error(error);
    return {
      success: false,
      data: {},
      message,
      error,
    };
  }
};
