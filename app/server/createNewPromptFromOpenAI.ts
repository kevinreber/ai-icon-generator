import { prisma } from "~/services/prisma.server";

/**
 * @description
 * This function creates a new Prompt for a User in our DB
 */
export const createNewPromptFromOpenAI = async ({
  userId,
  originalPrompt,
  newPrompt,
}: {
  userId: string;
  originalPrompt: string;
  newPrompt: string;
}) => {
  try {
    const response = await prisma.prompt.create({
      data: {
        userId,
        originalPrompt,
        newPrompt,
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating prompt to DB");
    console.log(error);
    console.error(error);
  }
};
