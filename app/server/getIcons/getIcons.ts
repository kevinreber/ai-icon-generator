import { prisma } from "~/services/prisma.server";
import { getS3BucketURL } from "~/utils";

export const getIcons = async () => {
  const icons = await prisma.icon.findMany({
    take: 100,
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
