import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new image in our DB
 */
export const addNewImageToDB = async (prompt: string, userId: string) => {
  const image = await prisma.icon.create({
    data: {
      prompt,
      userId,
    },
  });

  // Return new image created
  return image;
};
