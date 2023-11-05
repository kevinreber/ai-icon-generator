import { type ActionFunctionArgs } from "@remix-run/node";
import { updateUserData } from "~/server";
import { getSession } from "~/services";

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Edit user data");
  }

  switch (request.method.toUpperCase()) {
    case "PATCH": {
      const formData = await request.formData();
      const payload = JSON.parse(formData.get("body") as string);
      const response = await updateUserData(userId, payload);

      return response;
    }
    default: {
      return {};
    }
  }
}
