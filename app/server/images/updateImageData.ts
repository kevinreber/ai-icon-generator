import { prisma } from "~/services/prisma.server";

export const updateImageData = async (
  imageId: string,
  payload: { title: string },
) => {
  try {
    const message = `Success updating Image Data for imageID: ${imageId}`;
    const { title } = payload;

    const data = await prisma.icon.update({
      where: {
        id: imageId,
      },
      data: {
        title,
      },
    });

    return {
      success: true,
      data,
      message,
    };
  } catch (error) {
    const message = `Error updating Image Data for imageID: ${imageId}`;
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
