import { prisma } from "~/services/prisma.server";
import { createCommentLike, deleteCommentLike } from "~/server";

/**
 * @description
 * This function toggles a User's Like for a Comment
 */
export const toggleCommentLikes = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  try {
    const data = { userId, commentId };

    // Check if User's Like for Image exists
    const like = await prisma.commentLike.findUnique({
      where: { userId_commentId: data },
    });

    if (like == null) {
      // Like Comment - Create Like
      const data = await createCommentLike({ userId, commentId });
      const message = "Successfully liked comment";

      return {
        success: true,
        addLike: true,
        data,
        message,
      };
    } else {
      // Unlike Comment - Delete Like
      const data = await deleteCommentLike({ userId, commentId });
      const message = "Successfully unliked comment";

      return {
        success: true,
        addLike: false,
        data,
        message,
      };
    }
  } catch (error) {
    const message = `Error adding Like to commentID: ${commentId}`;
    console.warn(message);
    console.error(error);

    return {
      success: false,
      data: {},
      message,
      error,
    };
  }
};
