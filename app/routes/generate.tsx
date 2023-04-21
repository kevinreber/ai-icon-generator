import { type LoaderArgs, json } from "@remix-run/node";
import { GenerateIconPage } from "~/pages";
import { authenticator } from "~/services/auth.server";

export let loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({});
};

export default function Index() {
  return <GenerateIconPage />;
}
