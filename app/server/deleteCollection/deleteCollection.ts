import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function deletes a Users Collection in our DB
 */
export const deleteCollection = async (collectionId: string) => {
  try {
    const response = await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });

    return response;
  } catch (error) {
    console.warn("Error deleting collection from DB: ", collectionId);
    console.error(error);
    return error;
  }
};
