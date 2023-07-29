import { type LoaderArgs, json } from "@remix-run/node";
import { ExplorePage } from "~/pages";
import { getImages } from "~/server";
import { getSession } from "~/services";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);

  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;

  const images = await getImages(currentPage);

  return json({ data: images, user: googleSessionData });
};

export default function Index() {
  return <ExplorePage />;
}
