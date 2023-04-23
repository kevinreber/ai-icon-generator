import { Configuration, OpenAIApi } from "openai";
import { setTimeout } from "timers/promises";
import { MOCK_BASE64_IMAGE } from "~/__mocks__/base64Image";

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const NUMBER_OF_IMAGES_CREATED = 1;
const IMAGE_SIZE = "1024x1024";
const THREE_SECONDS_IN_MS = 1000 * 3;
const BASE_64_FORMAT = "b64_json";
const DEFAULT_PAYLOAD = {
  prompt: "",
};

const generateIcon = async (prompt: string) => {
  if (process.env.USE_MOCK_DALLE === "true") {
    console.log(
      "\x1b[33m ⚠️ Warning – Using Mock Data ************************* \x1b[0m"
    );

    // `setTimeout` simulates making a "normal" API Request
    await setTimeout(THREE_SECONDS_IN_MS);
    return MOCK_BASE64_IMAGE;
  }

  const promptMessage = prompt;

  const response = await openai.createImage({
    prompt: promptMessage,
    n: NUMBER_OF_IMAGES_CREATED,
    size: IMAGE_SIZE,
    response_format: BASE_64_FORMAT,
  });

  const base64EncodedImage = response.data.data[0].b64_json;

  return base64EncodedImage;
};

export const geDallEGeneratedImage = async (formData = DEFAULT_PAYLOAD) => {
  const prompt = formData.prompt;

  try {
    const iconImage = await generateIcon(prompt);

    return { image: iconImage };
  } catch (error) {
    console.error(error);

    return { image: "" };
  }
};
