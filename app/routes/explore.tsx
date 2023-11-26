import {
  type LoaderFunctionArgs,
  json,
  type SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ExplorePage } from "~/pages";
import { getImages } from "~/server";

export const meta: MetaFunction = () => {
  return [{ title: "Explore AI Generated Images" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get("q") || "";
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);

  const data = await getImages(searchTerm, currentPage);

  return json({ data });
};

export type ExplorePageLoader = typeof loader;

export default function Index() {
  return (
    <>
      <ExplorePage />
      <Outlet />
    </>
  );
}
