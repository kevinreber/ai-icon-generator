import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function updates the data of a Collection in our DB
 */
export const updateCollection = async (
  collectionId: string,
  payload: { title: string; description: string },
) => {
  try {
    const message = `Success updating Collection Data for collectionId: ${collectionId}`;
    const { title, description } = payload;

    const data = await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        title,
        description,
      },
    });

    return {
      success: true,
      data,
      message,
    };
  } catch (error) {
    const message = `Error updating Collection Data for collectionId: ${collectionId}`;
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
