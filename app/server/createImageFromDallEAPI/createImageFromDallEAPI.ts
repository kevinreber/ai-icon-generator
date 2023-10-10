import { Configuration, OpenAIApi } from "openai";
import { setTimeout } from "timers/promises";
import { addBase64EncodedImageToAWS, addNewImageToDB } from "~/server";
import { getS3BucketURL, getS3BucketThumbnailURL } from "~/utils";
import { getMockDataResponse } from "./utils";

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const DEFAULT_NUMBER_OF_IMAGES_CREATED = 1;
const IMAGE_SIZE = "1024x1024";
const DEFAULT_AI_IMAGE_LANGUAGE_MODEL = "dall-e";
const DEFAULT_IS_IMAGE_PRIVATE = false;

const THREE_SECONDS_IN_MS = 1000 * 3;
const BASE_64_FORMAT = "b64_json";
const DEFAULT_PAYLOAD = {
  prompt: "",
  numberOfImages: DEFAULT_NUMBER_OF_IMAGES_CREATED,
  model: DEFAULT_AI_IMAGE_LANGUAGE_MODEL,
  private: DEFAULT_IS_IMAGE_PRIVATE,
};

/**
 * @description
 * This function makes a request to Open AI's Dall-E API to fetch images generated using the prompt
 */
const createDallEImages = async (
  prompt: string,
  numberOfImages = DEFAULT_NUMBER_OF_IMAGES_CREATED,
) => {
  const promptMessage = prompt;
  const numberOfImagesToGenerate = Math.round(numberOfImages);

  const response = await openai.createImage({
    prompt: promptMessage,
    n: numberOfImagesToGenerate,
    size: IMAGE_SIZE,
    response_format: BASE_64_FORMAT,
  });

  const base64EncodedImages = response.data.data.map(
    (result) => result.b64_json,
  );

  return base64EncodedImages;
};

/**
 * @description
 * This function does the following in the listed order:
 *   1. Gets an image from OpenAI's Dall-E API
 *   2. Creates a new Image in our DB using the data returned from "Step 1"
 *   3. Stores the image Blob from "Step 1" into our AWS S3 bucket
 */
export const createImageFromDallEAPI = async (
  formData = DEFAULT_PAYLOAD,
  userId: string,
) => {
  const { prompt, numberOfImages, model, private: isImagePrivate } = formData;

  try {
    if (process.env.USE_MOCK_DALLE === "true") {
      console.log(
        "\x1b[33m ⚠️ Warning – Using Mock Data ************************* \x1b[0m",
      );
      const mockData = getMockDataResponse(numberOfImages);
      await setTimeout(THREE_SECONDS_IN_MS);

      return { images: mockData };
    }

    // Generate Images
    const imagesImages = await createDallEImages(prompt, numberOfImages);

    const formattedImagesData = await Promise.all(
      imagesImages.map(async (imageImage) => {
        // Store Image into DB
        const imageData = await addNewImageToDB({
          prompt,
          userId,
          model,
          preset: "",
          isImagePrivate,
        });
        console.log("Stored Image Data in DB: ", imageData.id);

        // Store Image blob in S3
        await addBase64EncodedImageToAWS(imageImage as string, imageData.id);
        console.log("Stored S3 Data for Image ID: ", imageData.id);

        const imageURL = getS3BucketURL(imageData.id);
        const thumbnailURL = getS3BucketThumbnailURL(imageData.id);
        const formattedImageData = {
          ...imageData,
          url: imageURL,
          thumbnailURL,
        };

        return formattedImageData;
      }),
    );

    // 'https://ai-icon-generator.s3.us-east-2.amazonaws.com/clgueu0pg0001r2fbyg3do2ra'
    return { images: formattedImagesData };
  } catch (error) {
    console.error(error);

    return { images: [] };
  }
};
