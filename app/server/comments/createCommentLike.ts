import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a User's Like for a Comment
 */
export const createCommentLike = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const data = { userId, commentId };

  const response = await prisma.commentLike.create({ data });

  return response;
};
