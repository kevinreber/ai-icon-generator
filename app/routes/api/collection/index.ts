import { type ActionArgs } from "@remix-run/node";
import { createNewCollection } from "~/server";
import { getSession } from "~/services";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  if (!userId) {
    throw new Error(
      "Missing User ID: Must be logged in to Create a Collection"
    );
  }

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
