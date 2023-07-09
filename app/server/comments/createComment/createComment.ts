import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates adds a Comment to an Image in our DB
 */
export const createComment = async ({
  imageId,
  userId,
  comment,
}: {
  imageId: string;
  userId: string;
  comment: string;
}) => {
  try {
    const response = await prisma.comment.create({
      data: {
        imageId,
        userId,
        message: comment,
      },
    });

    // Return new comment created
    return response;
  } catch (error) {
    console.warn("Error creating comment to DB");
    console.error(error);
    return error;
  }
};
