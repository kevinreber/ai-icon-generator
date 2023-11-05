import { type LoaderFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { CollectionsPage } from "~/pages";
import { getUserCollections } from "~/server";
import { authenticator } from "~/services/auth.server";
import { loader as UserLoaderData } from "../root";

export const meta: MetaFunction<
  typeof loader,
  { root: typeof UserLoaderData }
> = ({ data, params, matches }) => {
  // Incase our Profile loader ever fails, we can get logged in user data from root
  const userMatch = matches.find((match) => match.id === "root");
  const username = userMatch?.data.data?.username || userMatch?.data.data?.name;

  return [{ title: `${username} Collections` }];
};

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
