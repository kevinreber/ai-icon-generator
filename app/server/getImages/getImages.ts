import { prisma } from "~/services/prisma.server";
import { getS3BucketURL } from "~/utils";

export const getImages = async () => {
  const images = await prisma.icon.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      prompt: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          message: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
          parentId: true,
          likes: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  // Append Images source URL since we cannot use `env` variables in our UI
  const formattedImages = images.map((icon) => ({
    ...icon,
    url: getS3BucketURL(icon.id),
  }));
  return formattedImages;
};
