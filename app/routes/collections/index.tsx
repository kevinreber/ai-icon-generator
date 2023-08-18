import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { CollectionsPage } from "~/pages";
import { createNewCollection, getUserCollections } from "~/server";
import { getSession } from "~/services";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string };

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const collections = await getUserCollections(user.id, currentPage, pageSize);

  return json({ data: collections, user });
};

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Create a Comment");
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "_create_collection": {
      const payload = JSON.parse(formData.get("body") as string);
      const { title, description = "" } = payload;
      const data = await createNewCollection({
        userId,
        title,
        description,
      });

      return data;
    }
    default: {
      return {};
    }
  }
}

export default function Index() {
  return <CollectionsPage />;
}
