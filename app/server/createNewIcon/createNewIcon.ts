import { prisma } from "~/services/prisma.server";

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
