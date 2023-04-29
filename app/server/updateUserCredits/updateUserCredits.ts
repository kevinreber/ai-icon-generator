import { prisma } from "~/services/prisma.server";

/**
 *
 * @description
 * This function updates a user's number of credits.
 * If a user has 0 credits available, an error is thrown
 */
export const updateUserCredits = async (userId: string) => {
  const userData = await prisma.user.updateMany({
    where: {
      id: userId,
      credits: {
        gte: 1,
      },
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });

  if (userData.count <= 0) {
    throw new Error("Not enough credits");
  }
};
