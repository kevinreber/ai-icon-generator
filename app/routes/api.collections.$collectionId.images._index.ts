import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getCollectionData } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  const collectionId = params?.collectionId || "";
  const collectionData = await getCollectionData(collectionId);

  if (!collectionData.collection) {
    return redirect("/collections");
  }

  return json({ data: collectionData });
};
