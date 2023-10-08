import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new image in our DB
 */
export const addNewImageToDB = async (
  prompt: string,
  userId: string,
  model: string,
  preset = "none",
) => {
  const image = await prisma.icon.create({
    data: {
      prompt,
      userId,
      model,
      stylePreset: preset,
    },
  });

  // Return new image created
  return image;
};
