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
        images: {
          select: {
            image: {
              select: {
                id: true,
                prompt: true,
                model: true,
                stylePreset: true,
                title: true,
                createdAt: true,
                comments: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
                likes: true,
              },
            },
          },
        },
      },
    });

    return { collection };
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
