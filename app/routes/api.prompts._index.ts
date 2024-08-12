import { type ActionFunctionArgs } from "@remix-run/node";
import { createNewPromptFromOpenAI } from "~/server/createNewPromptFromOpenAI";
import { createPromptFromOpenAI } from "~/server/createPromptFromOpenAI";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export type CreateEnhancedPromptAPIResponse = typeof action;

export async function action({ request }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to user prompt enhancer feature.",
  );

  const formData = await request.formData();
  const payload = JSON.parse(formData.get("body") as string);
  const { prompt = "" } = payload;

  const response = await createPromptFromOpenAI(prompt);
  const data = response.data;

  // Save original prompt and new prompt to DB so we can keep track of which users are using prompts feature and charge them accordingly
  await createNewPromptFromOpenAI({
    userId,
    originalPrompt: prompt,
    newPrompt: data.content || "Error creating prompt. Please try again.",
  });

  return response;
}
