import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new image in our DB
 */
export const createNewImage = async (prompt: string, userId: string) => {
  const icon = await prisma.icon.create({
    data: {
      prompt,
      userId,
    },
  });

  // Return new image created
  return icon;
};
