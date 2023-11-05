import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { CollectionsPage } from "~/pages";
import { getUserCollections } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string };

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const collections = await getUserCollections(user.id, currentPage, pageSize);

  // console.log(collections);

  return json({ data: collections, user });
};

export default function Index() {
  return <CollectionsPage />;
}
