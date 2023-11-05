import {
  createImageFromStableDiffusionAPI,
  // addBase64EncodedImageToAWS,
  // addNewImageToDB,
  createImageFromDallEAPI,
} from "~/server";

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

/**
 * @description
 * This function determines which AI Image language model the user wants to use
 */
export const createNewImages = async (
  formData = DEFAULT_PAYLOAD,
  userId: string,
) => {
  const AILanguageModelToUse = formData.model;

  if (!AILanguageModelToUse) {
    throw new Error("Must select a language model");
  }

  try {
    if (AILanguageModelToUse === "dall-e") {
      const data = await createImageFromDallEAPI(formData, userId);

      return data;
    }

    if (AILanguageModelToUse.includes("stable-diffusion")) {
      const data = await createImageFromStableDiffusionAPI(formData, userId);

      return data;
    }
    return { images: [] };
  } catch (error) {
    console.error(error);

    return { images: [] };
  }
};
