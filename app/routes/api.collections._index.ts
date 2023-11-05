import { type ActionFunctionArgs } from "@remix-run/node";
import { createNewCollection } from "~/server";
import { getSession } from "~/services";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  invariantResponse(
    !userId,
    "Missing User ID: Must be logged in to Create a Collection",
  );

  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "_create_collection": {
      const payload = JSON.parse(formData.get("body") as string);
      const { title, description = "" } = payload;
      const data = await createNewCollection({
        userId,
        title,
        description,
      });

      return data;
    }
    default: {
      return {};
    }
  }
}
