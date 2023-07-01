import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new Icon in our DB
 */
export const createNewIcon = async (
  prompt: string,
  userId: string,
  username: string
) => {
  const icon = await prisma.icon.create({
    data: {
      prompt,
      userId,
      createdBy: username,
    },
  });

  // Return new icon created
  return icon;
};
