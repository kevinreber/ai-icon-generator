import { prisma } from "~/services/prisma.server";

export const getCollectionData = async (collectionId: string) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        images: true,
      },
    });

    return { collection };
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
