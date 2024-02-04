import { type ActionFunctionArgs } from "@remix-run/node";
import { toggleCommentLikes } from "~/server";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);
  const commentId = params?.commentId || "";

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Like a Comment",
  );

  switch (request.method.toUpperCase()) {
    case "POST": {
      const response = await toggleCommentLikes({ commentId, userId });

      return response;
    }
    default: {
      return {};
    }
  }
}
