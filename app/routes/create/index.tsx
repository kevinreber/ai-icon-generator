import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { CreateImagePage } from "~/pages";
import { authenticator } from "~/services/auth.server";
import { getDallEGeneratedImage } from "~/server";
import { updateUserCredits } from "~/server/updateUserCredits";
import { createNewImages } from "~/server/createNewImages";

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
    case "_generate_image": {
      const payload = formData.get("body");
      const formattedPayload = await JSON.parse(payload as string);

      // Verify user has enough credits
      try {
        await updateUserCredits(user.id, formattedPayload.numberOfImages);
      } catch (error: any) {
        console.error(error);
        return { image: "", message: "Error", error: error.message };
      }

      const data = await createNewImages(formattedPayload, user.id);

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
  return <CreateImagePage />;
}
