import { type LoaderArgs, type ActionArgs, json } from "@remix-run/node";
import { getImageBase64, updateImageData } from "~/server";
import { getSession } from "~/services";

export const loader = async ({ request, params }: LoaderArgs) => {
  const imageId = params?.imageId || "";
  const data = await getImageBase64(imageId);

  return json({ data });
};

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
  const imageId = params?.imageId || "";

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Edit an Image");
  }

  switch (request.method.toUpperCase()) {
    case "PATCH": {
      const formData = await request.formData();
      const payload = JSON.parse(formData.get("body") as string);
      const response = await updateImageData(imageId, payload);

      return response;
    }
    default: {
      return {};
    }
  }
}