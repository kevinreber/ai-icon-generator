import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { GenerateIconPage } from "~/pages";
import { authenticator } from "~/services/auth.server";
import { getDallEGeneratedImage } from "~/server";
import { updateUserCredits } from "~/server/updateUserCredits";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json({});
};

export async function action({ request }: ActionArgs) {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string; displayName: string };

  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "_generate_icon": {
      const payload = formData.get("body");
      const formattedPayload = await JSON.parse(payload as string);

      // Verify user has enough credits
      try {
        await updateUserCredits(user.id, formattedPayload.numberOfIcons);
      } catch (error: any) {
        console.error(error);
        return { image: "", message: "Error", error: error.message };
      }

      const data = await getDallEGeneratedImage(
        formattedPayload,
        user.id,
        user.displayName
      );

      console.log("Data -----------------------");
      console.log(data);

      console.log("Data -----------------------");

      return { ...data, message: "Success" };
    }
    default: {
      return {};
    }
  }
}

export default function Index() {
  return <GenerateIconPage />;
}
