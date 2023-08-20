import { prisma } from "~/services/prisma.server";

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;

export const getUserCollections = async (
  userId: string,
  page = DEFAULT_CURRENT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const count = await prisma.collection.count({
    where: {
      userId,
    },
  });
  const collections = await prisma.collection.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
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
          id: true,
        },
      },
    },
  });

  return { collections, count };
};
