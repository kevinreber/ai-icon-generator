import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { deleteCollection, updateCollection } from "~/server";
import { getSessionUserId } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);
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
