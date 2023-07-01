import { Configuration, OpenAIApi } from "openai";
import { setTimeout } from "timers/promises";
// import { MOCK_BASE64_IMAGE } from "~/__mocks__/base64Image";
import { saveBase64EncodedImageToAWS, createNewIcon } from "~/server";
import { getS3BucketURL } from "~/utils";

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MOCK_IMAGE_ID = "cliid9qad0001r2q9pscacuj0";

const NUMBER_OF_IMAGES_CREATED = 1;
const IMAGE_SIZE = "1024x1024";
const THREE_SECONDS_IN_MS = 1000 * 3;
const BASE_64_FORMAT = "b64_json";
const DEFAULT_PAYLOAD = {
  prompt: "",
};

/**
 * @description
 * This function makes a request with a prompt to Open AI's Dall-E API to fetch
 * an image generated using the prompt
 */
const generateIcon = async (prompt: string) => {
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

/**
 * @description
 * This function does the following in the listed order:
 *   1. Gets an icon from OpenAI's Dall-E API
 *   2. Creates a new Icon in our DB using the data returned from "Step 1"
 *   3. Stores the image Blob from "Step 1" into our AWS S3 bucket
 */
export const getDallEGeneratedImage = async (
  formData = DEFAULT_PAYLOAD,
  userId: string,
  username: string
) => {
  const prompt = formData.prompt;

  try {
    if (process.env.USE_MOCK_DALLE === "true") {
      console.log(
        "\x1b[33m ⚠️ Warning – Using Mock Data ************************* \x1b[0m"
      );

      const imageURL = getS3BucketURL(MOCK_IMAGE_ID);
      await setTimeout(THREE_SECONDS_IN_MS);

      return { image: imageURL };
    }

    // Generate Icon
    const iconImage = await generateIcon(prompt);
    // Store Icon into DB
    const iconData = await createNewIcon(prompt, userId, username);
    // Store Image in S3
    const s3Data = await saveBase64EncodedImageToAWS(
      iconImage as string,
      iconData.id
    );

    console.log("s3 Response -------------------");
    console.log(s3Data);

    console.log("s3 Response -------------------");

    // 'https://ai-icon-generator.s3.us-east-2.amazonaws.com/clgueu0pg0001r2fbyg3do2ra'
    const imageURL = getS3BucketURL(iconData.id);
    return { image: imageURL };
  } catch (error) {
    console.error(error);

    return { image: "" };
  }
};
