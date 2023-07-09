import { type ActionArgs } from "@remix-run/node";
import { toggleImageLikes } from "~/server";
import { getSession } from "~/services";

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const imageId = params?.imageId || "";
  const userId = googleSessionData.id;

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Like an Image");
  }

  switch (request.method.toUpperCase()) {
    case "POST": {
      const response = await toggleImageLikes({ imageId, userId });

      return response;
    }
    default: {
      return {};
    }
  }
}
