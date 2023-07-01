import { type LoaderArgs, json } from "@remix-run/node";
import { ExplorePage } from "~/pages";
import { getIcons } from "~/server";

export const loader = async ({ request }: LoaderArgs) => {
  const icons = await getIcons();

  return json({ data: icons });
};

export default function Index() {
  return <ExplorePage />;
}
