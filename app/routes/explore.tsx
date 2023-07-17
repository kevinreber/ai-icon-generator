import { type LoaderArgs, json } from "@remix-run/node";
import { ExplorePage } from "~/pages";
import { getImages } from "~/server";
import { getSession } from "~/services";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;

  const images = await getImages();

  return json({ data: images, user: googleSessionData });
};

export default function Index() {
  return <ExplorePage />;
}
