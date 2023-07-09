import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function deletes a User's Like for a Comment
 */
export const deleteCommentLike = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const data = { userId, commentId };

  const response = await prisma.commentLike.delete({
    where: { userId_commentId: data },
  });

  return response;
};
