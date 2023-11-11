import { setTimeout } from "timers/promises";
import { addBase64EncodedImageToAWS, addNewImageToDB } from "~/server";
import { getS3BucketThumbnailURL, getS3BucketURL } from "~/utils";
import { getEngineId, getMockDataResponse } from "./utils";
import { invariantResponse } from "~/utils/invariantResponse";

const IMAGE_HEIGHT = 1024;
const IMAGE_WIDTH = 1024;
const THREE_SECONDS_IN_MS = 1000 * 3;

const DEFAULT_NUMBER_OF_IMAGES_CREATED = 1;
const DEFAULT_AI_IMAGE_LANGUAGE_MODEL = "stable-diffusion-xl";
const DEFAULT_IMAGE_STYLE_PRESET = undefined;
const DEFAULT_IS_IMAGE_PRIVATE = false;

const DEFAULT_PAYLOAD = {
  prompt: "",
  numberOfImages: DEFAULT_NUMBER_OF_IMAGES_CREATED,
  model: DEFAULT_AI_IMAGE_LANGUAGE_MODEL,
  stylePreset: DEFAULT_IMAGE_STYLE_PRESET,
  private: DEFAULT_IS_IMAGE_PRIVATE,
};

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

/**
 * @description
 * This function makes a request to Stability AI's – Stable Diffusion API to fetch images generated using the prompt
 *
 * @reference
 * https://platform.stability.ai/docs/api-reference#tag/v1generation/operation/textToImage
 */
const createStableDiffusionImages = async (
  prompt: string,
  numberOfImages = DEFAULT_NUMBER_OF_IMAGES_CREATED,
  model = DEFAULT_AI_IMAGE_LANGUAGE_MODEL,
  stylePreset = DEFAULT_IMAGE_STYLE_PRESET,
) => {
  const promptMessage = prompt;
  const numberOfImagesToGenerate = Math.round(numberOfImages);
  const engineId = getEngineId(model);

  const body = {
    /**
     * `cfg_scale` is how strictly the diffusion process adheres to the prompt text.
     * The higher values keep your image closer to your prompt (Ex: 1-35)
     */
    cfg_scale: 7,
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    steps: 40,
    style_preset: stylePreset,
    samples: numberOfImagesToGenerate,
    text_prompts: [
      {
        text: promptMessage,
        weight: 1,
      },
    ],
  };

  const response = await fetch(
    `${process.env.STABLE_DIFFUSION_API_ENDPOINT}/v1/generation/${engineId}/text-to-image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.STABLE_DIFFUSION_API_KEY}`,
      },
      body: JSON.stringify(body),
    },
  );

  invariantResponse(response.ok, `Non-200 response: ${await response.text()}`);

  const responseJSON = (await response.json()) as GenerationResponse;

  return responseJSON;
};

/**
 * @description
 * This function does the following in the listed order:
 *   1. Gets images from Stable Diffusion's API
 *   2. Creates a new Image in our DB using the data returned from "Step 1"
 *   3. Stores the image Blob from "Step 1" into our AWS S3 bucket
 */
export const createImageFromStableDiffusionAPI = async (
  formData = DEFAULT_PAYLOAD,
  userId: string,
) => {
  const {
    prompt,
    numberOfImages,
    model,
    stylePreset,
    private: isImagePrivate,
  } = formData;

  try {
    if (process.env.USE_MOCK_DALLE === "tru") {
      console.log(
        "\x1b[33m ⚠️ Warning – Using Mock Data ************************* \x1b[0m",
      );
      const mockData = getMockDataResponse(numberOfImages);
      await setTimeout(THREE_SECONDS_IN_MS);

      return { images: mockData };
    }

    // Generate Images
    const images = await createStableDiffusionImages(
      prompt,
      numberOfImages,
      model,
      stylePreset,
    );

    const formattedImagesData = await Promise.all(
      images.artifacts.map(async (image) => {
        if (image.finishReason !== "ERROR") {
          // Store Image into DB
          const imageData = await addNewImageToDB({
            prompt,
            userId,
            model,
            preset: stylePreset,
            isImagePrivate,
          });
          console.log("Stored Image Data in DB: ", imageData.id);

          // Store Image blob in S3
          await addBase64EncodedImageToAWS(image.base64, imageData.id);
          console.log("Stored S3 Data for Image ID: ", imageData.id);

          const imageURL = getS3BucketURL(imageData.id);
          const thumbnailURL = getS3BucketThumbnailURL(imageData.id);

          const formattedImageData = {
            ...imageData,
            url: imageURL,
            thumbnailURL,
          };

          return formattedImageData;
        }
      }),
    );

    // 'https://ai-icon-generator.s3.us-east-2.amazonaws.com/clgueu0pg0001r2fbyg3do2ra'
    return { images: formattedImagesData };
  } catch (error) {
    console.error(error);

    return { images: [] };
  }
};
