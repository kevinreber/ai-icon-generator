import { prisma } from "~/services/prisma.server";

export const createNewIcon = async (prompt: string, userId: string) => {
  const icon = await prisma.icon.create({
    data: {
      prompt,
      userId,
    },
  });

  // Return new icon created
  return icon;
};
