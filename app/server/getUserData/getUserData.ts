import { prisma } from "~/services/prisma.server";
import { getS3BucketThumbnailURL, getS3BucketURL } from "~/utils";

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;

export const getUserData = async (
  userId: string,
  page = DEFAULT_CURRENT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const count = await prisma.icon.count({
    where: {
      userId,
    },
  });
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      createdAt: true,
      Icon: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          prompt: true,
          model: true,
          stylePreset: true,
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
      },
    },
  });

  // Append images source URL since we cannot use `env` variables in our UI
  const formattedImages = userData?.Icon.map((image) => ({
    ...image,
    url: getS3BucketURL(image.id),
    thumbnailURL: getS3BucketThumbnailURL(image.id),
  }));

  return { user: userData, images: formattedImages, count };
};
