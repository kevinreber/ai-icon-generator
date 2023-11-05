import { type ActionFunctionArgs } from "@remix-run/node";
import { createComment } from "~/server";
import { getSession } from "~/services";

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const imageId = params?.imageId || "";
  const userId = googleSessionData.id;

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Create a Comment");
  }

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