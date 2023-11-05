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
  // const intent = formData.get("intent");

  const payload = formData.get("body");
  const formattedPayload = await JSON.parse(payload as string);

  // Verify user has enough credits
  try {
    await updateUserCredits(userId, formattedPayload.numberOfImages);
  } catch (error: any) {
    console.error(error);
    return json({ images: [], message: "Error", error: error.message });
  }

  const data = await createNewImages(formattedPayload, userId);

  console.log("Data -----------------------");
  console.log(data);

  console.log("Data -----------------------");

  return json({ ...data, message: "Success" });
}

export default function Index() {
  return <CreateImagePage />;
}

export type CreateImagePageActionData = SerializeFrom<typeof action>;
