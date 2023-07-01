import { type LoaderArgs, json } from "@remix-run/node";
import { ExplorePage } from "~/pages";
import { getIcons } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const icons = await getIcons();

  return json({ data: icons });
};

export default function Index() {
  return <ExplorePage />;
}
