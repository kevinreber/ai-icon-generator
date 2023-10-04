import { type LoaderArgs, json, redirect } from "@remix-run/node";
import { CollectionDetailsPage } from "~/pages";
import { getCollectionData } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  const collectionId = params?.collectionId || "";

  // const searchParams = new URL(request.url).searchParams;
  // const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  // const pageSize = Number(searchParams.get("page_size")) || 50;

  const collectionData = await getCollectionData(collectionId);

  if (!collectionData.collection) {
    return redirect("/collections");
  }

  return json({ data: collectionData });
};

export default function Index() {
  return <CollectionDetailsPage />;
}
