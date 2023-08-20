import { type ActionArgs } from "@remix-run/node";
import { deleteCollection, updateCollection } from "~/server";
import { getSession } from "~/services";

export async function action({ request, params }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
  const collectionId = params.collectionId || "";

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Delete Collection");
  }

  switch (request.method.toUpperCase()) {
    case "DELETE": {
      const response = await deleteCollection(collectionId);

      return response;
    }
    case "PATCH": {
      const formData = await request.formData();
      const payload = JSON.parse(formData.get("body") as string);

      const response = await updateCollection(collectionId, payload);

      return response;
    }
    default: {
      return {};
    }
  }
}
