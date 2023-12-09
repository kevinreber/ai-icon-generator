import { prisma } from "~/services/prisma.server";
import { removeEmptyValuesFromObject } from "~/utils";

export const updateImageData = async (
  imageId: string,
  payload: { title?: string; private?: boolean },
) => {
  try {
    const message = `Success updating Image Data for imageID: ${imageId}`;
    const formattedPayload = removeEmptyValuesFromObject(payload);

    const data = await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        ...formattedPayload,
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
