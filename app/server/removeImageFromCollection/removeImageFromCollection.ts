import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function removes an Image from a Collection in our DB
 */
export const removeImageFromCollection = async ({
  collectionId,
  imageId,
}: {
  collectionId: string;
  imageId: string;
}) => {
  try {
    const message = `Successfully removed Image from Collection`;

    // If Collection already has Image, remove Image from Collection
    const data = await prisma.collectionHasImage.deleteMany({
      where: {
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
    const message = `Error removing Image from Collection`;
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
