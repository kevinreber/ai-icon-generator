import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { GenerateIconPage } from "~/pages";
import { authenticator } from "~/services/auth.server";
import { geDallEGeneratedImage } from "~/server";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({});
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "_generate_icon": {
      const payload = formData.get("body");
      const formattedPayload = await JSON.parse(payload as any);

      const data = await geDallEGeneratedImage(formattedPayload);

      console.log("Data -----------------------");
      console.log(data);

      console.log("Data -----------------------");

      return data;
    }
    default: {
      return {};
    }
  }
}

export default function Index() {
  return <GenerateIconPage />;
}
