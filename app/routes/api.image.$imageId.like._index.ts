import { type ActionFunctionArgs } from "@remix-run/node";
import { toggleImageLikes } from "~/server";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);

  console.log(userId);
  const imageId = params?.imageId || "";

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
