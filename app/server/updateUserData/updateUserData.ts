import { prisma } from "~/services/prisma.server";

export const updateUserData = async (
  userId: string,
  payload: { username: string }
) => {
  try {
    const message = `Success updating User Data for userID: ${userId}`;
    const { username } = payload;

    const updatedUserResponse = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    // Updated all images with `username`
    const updatedImagesResponse = await prisma.icon.updateMany({
      where: {
        userId,
      },
      data: {
        createdBy: username,
      },
    });

    return {
      success: true,
      data: { updatedUserResponse, updatedImagesResponse },
      message,
    };
  } catch (error) {
    const message = `Error updating User Data for userID: ${userId}`;
    console.error(message);
    console.error(error);
    return {
      success: false,
      data: {},
      message,
      error,
    };
  }
};
