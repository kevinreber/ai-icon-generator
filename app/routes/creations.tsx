import { type LoaderArgs, json } from "@remix-run/node";
import { CreationsPage } from "~/pages";
import { getUserIcons } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string };

  const icons = await getUserIcons(user.id);

  return json({ data: icons });
};

export default function Index() {
  return <CreationsPage />;
}
