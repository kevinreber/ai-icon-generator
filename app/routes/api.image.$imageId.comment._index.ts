import { type ActionFunctionArgs } from "@remix-run/node";
import { createComment } from "~/server";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);
  const imageId = params?.imageId || "";

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Create a Comment",
  );

  switch (request.method.toUpperCase()) {
    case "POST": {
      const formData = await request.formData();
      const payload = JSON.parse(formData.get("body") as string);
      const { comment } = payload;

      const response = await createComment({ imageId, userId, comment });

      return response;
    }
    default: {
      return {};
    }
  }
}
