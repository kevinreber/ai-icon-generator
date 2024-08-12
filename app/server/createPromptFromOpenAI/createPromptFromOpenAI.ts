import OpenAI from "openai";
import { invariantResponse } from "~/utils";

const openai = new OpenAI({
  apiKey: process.env.DALLE_API_KEY,
});

type FormDataPayload = {
  prompt: string;
};

const CHAT_GPT_MODEL = "gpt-3.5-turbo";

const PRE_TEXT_FOR_PROMPT =
  "Enhance the following prompt that will be used to generate an image using AI:";

/**
 *
 * @description
 * Make an API request to OpenAI's GPT-3.5 API to create a prompt
 * that is an "enhanecd" version of the users original prompt
 *
 * @example
 * Response
 *  {
 *    content : "Create a realistic image of a majestic German short haired pointer with sleek black and white fur, standing proudly against a cool blue backdrop. This intelligent and elegant canine embodies strength and grace, making for a captivating and visually striking image."
 *    role: "assistant"
 *  }
 */
export const createPromptFromOpenAI = async (prompt: string) => {
  try {
    invariantResponse(prompt, "Please provide a prompt");

    const promptMessage = `${PRE_TEXT_FOR_PROMPT} ${prompt}`;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: `${PRE_TEXT_FOR_PROMPT} ${promptMessage}` },
      ],
      model: CHAT_GPT_MODEL,
    });

    const data = response.choices[0].message || "";

    return { data };
  } catch (error) {
    console.log(error);
    console.error(error);

    return {
      data: {
        role: "",
        content: "",
      },
      error,
    };
  }
};
