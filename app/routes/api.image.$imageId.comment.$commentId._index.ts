import { type ActionFunctionArgs } from "@remix-run/node";
import { deleteComment } from "~/server";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);
  const commentId = params?.commentId || "";

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit a Comment",
  );

  switch (request.method.toUpperCase()) {
    case "DELETE": {
      const response = await deleteComment(commentId);

      return response;
    }
    case "PATCH": {
      // const formData = await request.formData();
      // const payload = JSON.parse(formData.get("body") as string);
      // const { comment } = payload;
      // const response = await createComment({ imageId, userId, comment });
      // return response;
      return {};
    }
    default: {
      return {};
    }
  }
}
