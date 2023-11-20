import { type ActionFunctionArgs } from "@remix-run/node";
import { toggleImageLikes } from "~/server";
import { getSession } from "~/services";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const imageId = params?.imageId || "";
  const userId = googleSessionData.id;

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Like an Image",
  );

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
