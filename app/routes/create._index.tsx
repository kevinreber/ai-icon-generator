import {
  type LoaderFunctionArgs,
  json,
  type ActionFunctionArgs,
  type SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { CreateImagePage } from "~/pages";
import { authenticator } from "~/services/auth.server";
import { updateUserCredits } from "~/server/updateUserCredits";
import { createNewImages } from "~/server/createNewImages";
import { getSession } from "~/services";
import { GeneralErrorBoundary } from "~/components";
import { Button, Result } from "antd";
import { z } from "zod";
import {
  LANGUAGE_MODEL_OPTIONS,
  STABLE_DIFFUSION_IMAGE_PRESETS,
} from "~/utils";
import { parse } from "@conform-to/zod";

const MAX_PROMPT_CHARACTERS = 3500;
const MIN_NUMBER_OF_IMAGES = 1;
const MAX_NUMBER_OF_IMAGES = 10;

const CreateImagesFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, { message: "Prompt can not be empty" })
    .max(MAX_PROMPT_CHARACTERS, {
      message: `Prompt must be ${MAX_PROMPT_CHARACTERS} characters or less`,
    }),
  stylePreset: z
    .string()
    .min(1)
    .optional()
    .refine(
      (value) => {
        if (!value) return;
        // Check if value is invalid
        return STABLE_DIFFUSION_IMAGE_PRESETS.some((preset) =>
          preset.value.includes(value),
        );
      },
      {
        // overrides the error message here
        message: "Invalid preset selected",
      },
    ),
  model: z
    .string()
    .min(1, { message: "Language model can not be empty" })
    .refine(
      (value) =>
        // Check if value is invalid
        LANGUAGE_MODEL_OPTIONS.some((model) => model.value.includes(value)),
      {
        // overrides the error message here
        message: "Invalid language model selected",
      },
    ),
  numberOfImages: z
    .number()
    .min(MIN_NUMBER_OF_IMAGES, {
      message: `Number of images to generate must be ${MIN_NUMBER_OF_IMAGES}-${MAX_NUMBER_OF_IMAGES}`,
    })
    .max(MAX_NUMBER_OF_IMAGES, {
      message: `Number of images to generate must be ${MIN_NUMBER_OF_IMAGES}-${MAX_NUMBER_OF_IMAGES}`,
    }),
  private: z.boolean().optional(),
});

export const meta: MetaFunction = () => {
  return [{ title: "Create AI Images" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({});
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  const formData = await request.formData();
  const payload = formData.get("body");
  const formattedPayload = await JSON.parse(payload as string);
  // const formattedFormData = objectToFormData(formattedPayload);
  // console.log(payload);

  // console.log(formattedPayload);
  // console.log(formattedFormData);

  // const submission = parse(formattedFormData, {
  //   schema: CreateImagesFormSchema,
  // });

  // const payload = formData.get("body");
  // const formattedPayload = await JSON.parse(payload as string);

  const validateFormData = CreateImagesFormSchema.safeParse({
    prompt: formattedPayload.prompt,
    numberOfImages: formattedPayload.numberOfImages,
    model: formattedPayload.model,
    stylePreset: formattedPayload.style,
    // TODO: Setup Private field – for now default setting private to false
    private: false,
  });
  console.log(validateFormData.success);

  if (!validateFormData.success) {
    return json(
      {
        images: [],
        message: "Error invalid form data",
        error: validateFormData.error.flatten(),
      },
      {
        status: 400,
      },
    );
  }

  // Verify user has enough credits
  try {
    console.log("updating credits....");

    await updateUserCredits(userId, validateFormData.data.numberOfImages);
  } catch (error: any) {
    console.error(error);
    return json({
      images: [],
      message: "Error updating user credits",
      error: error.message,
    });
  }

  const data = await createNewImages(validateFormData.data, userId);

  console.log("Data -----------------------");
  console.log(data);

  console.log("Data -----------------------");

  return json({ ...data, message: "Success" });
}

export default function Index() {
  return <CreateImagePage />;
}

export type CreateImagePageActionData = SerializeFrom<typeof action>;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" href="/">
                Back to Home
              </Button>
            }
          />
        ),
      }}
    />
  );
}
