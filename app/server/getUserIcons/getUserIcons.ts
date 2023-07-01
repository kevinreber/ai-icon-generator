import { prisma } from "~/services/prisma.server";
import { getS3BucketURL } from "~/utils";

export const getUserIcons = async (userId: string) => {
  const icons = await prisma.icon.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Append icons source URL since we cannot use `env` variables in our UI
  const formattedIcons = icons.map((icon) => ({
    ...icon,
    url: getS3BucketURL(icon.id),
  }));
  return formattedIcons;
};
