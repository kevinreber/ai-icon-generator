import { prisma } from "~/services/prisma.server";
import { getS3BucketThumbnailURL, getS3BucketURL } from "~/utils";

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;

type Image = {
  id: string;
  title: string;
  prompt: string;
  model: string;
  stylePreset: string;
  userId: string;
  createdAt: string;
};

export type ImageTagType = Image & { url: string; thumbnailURL: string };

export const getImages = async (
  searchTerm = "",
  page = DEFAULT_CURRENT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const like = `%${searchTerm ?? ""}%`;

  // NOTE: Postgres automatically converts camelCase to all lowercase. We need to add "" around the column names to prevent this from breaking our query.
  const images = (await prisma.$queryRaw`
  SELECT i.id, i.title, i.prompt, i.model, i."stylePreset", i."userId", i."createdAt" 
  FROM "Icon" i
  WHERE i.private = false AND (i.title LIKE ${like} OR i.prompt LIKE ${like} OR i."stylePreset" LIKE ${like})
  ORDER BY i."createdAt" DESC
  LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};
  `) as Image[];

  // Append Images source URL since we cannot use `env` variables in our UI
  const formattedImages = images.map((image) => ({
    ...image,
    url: getS3BucketURL(image.id),
    thumbnailURL: getS3BucketThumbnailURL(image.id),
  }));
  return formattedImages;
};
