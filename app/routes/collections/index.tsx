import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { CollectionsPage } from "~/pages";
import { deleteUserImage, getUserImages } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string };

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const images = await getUserImages(user.id, currentPage, pageSize);

  return json({ data: images, user });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "_delete_image": {
      const payload = JSON.parse(formData.get("body") as string);
      const { imageId = "" } = payload;

      const response = await deleteUserImage(imageId);
      console.log("Response ------------------");
      console.log(response);

      return response;
    }
    default: {
      return {};
    }
  }
}

export default function Index() {
  return <CollectionsPage />;
}
