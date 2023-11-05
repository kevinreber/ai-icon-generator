import {
  type LoaderFunctionArgs,
  json,
  type SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { ExplorePage } from "~/pages";
import { getImages } from "~/server";
import { getSession } from "~/services";

export const meta: MetaFunction = () => {
  return [{ title: "Explore AI Generated Images" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);

  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;

  const images = await getImages(currentPage);

  return json({ data: images, user: googleSessionData });
};

export type ExplorePageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <ExplorePage />;
}
