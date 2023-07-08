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

const DEFAULT_NUMBER_OF_IMAGES_CREATED = 1;
const IMAGE_SIZE = "1024x1024";
const THREE_SECONDS_IN_MS = 1000 * 3;
const BASE_64_FORMAT = "b64_json";
const DEFAULT_PAYLOAD = {
  prompt: "",
  numberOfIcons: DEFAULT_NUMBER_OF_IMAGES_CREATED,
};

/**
 * @description
 * This function makes a request to Open AI's Dall-E API to fetch images generated using the prompt
 */
const generateIcons = async (
  prompt: string,
  numberOfIcons = DEFAULT_NUMBER_OF_IMAGES_CREATED
) => {
  const promptMessage = prompt;
  const numberOfIconsToGenerate = Math.round(numberOfIcons);

  const response = await openai.createImage({
    prompt: promptMessage,
    n: numberOfIconsToGenerate,
    size: IMAGE_SIZE,
    response_format: BASE_64_FORMAT,
  });

  const base64EncodedImages = response.data.data.map(
    (result) => result.b64_json
  );

  return base64EncodedImages;
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
  userId: string
) => {
  const { prompt, numberOfIcons } = formData;

  try {
    if (process.env.USE_MOCK_DALLE === "true") {
      console.log(
        "\x1b[33m ⚠️ Warning – Using Mock Data ************************* \x1b[0m"
      );
      const imageURL = getS3BucketURL(MOCK_IMAGE_ID);
      const mockDallEImage = {
        id: MOCK_IMAGE_ID,
        prompt: "using mock data",
        userId: "testUser123",
        createdAt: "2023-06-26 03:17:19",
        user: {
          userId: "123456789",
          username: "testUser123",
        },
        url: imageURL,
        comments: [],
      };
      const mockArrayOfDallEGeneratedImages = new Array(numberOfIcons).fill(
        mockDallEImage
      );
      await setTimeout(THREE_SECONDS_IN_MS);

      return { images: mockArrayOfDallEGeneratedImages };
    }

    // Generate Icons
    const iconImages = await generateIcons(prompt, numberOfIcons);
    // const formattedIconsData = [];

    const formattedIconsData = await Promise.all(
      iconImages.map(async (iconImage) => {
        // Store Icon into DB
        const iconData = await createNewIcon(prompt, userId);
        console.log("Stored Icon Data in DB: ", iconData.id);

        // Store Icon blob in S3
        await saveBase64EncodedImageToAWS(iconImage as string, iconData.id);
        console.log("Stored S3 Data for icon ID: ", iconData.id);

        const imageURL = getS3BucketURL(iconData.id);
        const formattedIconData = { ...iconData, url: imageURL };

        return formattedIconData;
      })
    );

    // 'https://ai-icon-generator.s3.us-east-2.amazonaws.com/clgueu0pg0001r2fbyg3do2ra'
    return { images: formattedIconsData };
  } catch (error) {
    console.error(error);

    return { images: [] };
  }
};
