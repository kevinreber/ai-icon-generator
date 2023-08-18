import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new Collection for a User in our DB
 */
export const createNewCollection = async ({
  userId,
  title,
  description = "",
}: {
  userId: string;
  title: string;
  description?: string;
}) => {
  try {
    const response = await prisma.collection.create({
      data: {
        userId,
        title,
        description,
      },
    });

    // Return new collection created
    return response;
  } catch (error) {
    console.warn("Error creating collection to DB");
    console.error(error);
    return error;
  }
};
