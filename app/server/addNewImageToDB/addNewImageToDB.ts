import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new image in our DB
 */
export const addNewImageToDB = async ({
  prompt,
  userId,
  model,
  preset = "",
  isImagePrivate = false,
}: {
  prompt: string;
  userId: string;
  model: string;
  preset: string;
  isImagePrivate: boolean;
}) => {
  const image = await prisma.icon.create({
    data: {
      prompt,
      userId,
      model,
      stylePreset: preset,
      private: isImagePrivate,
    },
  });

  // Return new image created
  return image;
};
