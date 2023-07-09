import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function delete a Comment from an Image in our DB
 */
export const deleteComment = async (commentId: string) => {
  try {
    const response = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return response;
  } catch (error) {
    console.warn("Error deleting comment from DB");
    console.error(error);
    return error;
  }
};
