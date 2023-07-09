import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a User's Like for an Image
 */
export const createImageLike = async ({
  imageId,
  userId,
}: {
  imageId: string;
  userId: string;
}) => {
  const data = { userId, imageId };

  const response = await prisma.imageLike.create({ data });

  return response;
};
