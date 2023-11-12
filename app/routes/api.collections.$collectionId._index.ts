import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { deleteCollection, updateCollection } from "~/server";
import { getSession } from "~/services";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
  const collectionId = params.collectionId || "";

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Delete Collection",
  );

  switch (request.method.toUpperCase()) {
    case "DELETE": {
      const response = await deleteCollection(collectionId);
      console.log(response);

      return redirect("/collections");
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
