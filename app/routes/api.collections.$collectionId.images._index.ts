import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  addImageToCollection,
  removeImageFromCollection,
  getCollectionData,
} from "~/server";
import { getSession } from "~/services";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  const collectionId = params?.collectionId || "";
  const collectionData = await getCollectionData(collectionId);

  if (!collectionData.collection) {
    return redirect("/collections");
  }

  return json({ data: collectionData });
};

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
  const collectionId = params.collectionId || "";

  if (!userId) {
    throw new Error("Missing User ID: Must be logged in to Delete Collection");
  }

  switch (request.method.toUpperCase()) {
    case "POST": {
      const formData = await request.formData();
      const payload = formData.get("body");
      const formattedPayload = await JSON.parse(payload as string);
      const images: string[] = formattedPayload.images;
      const dataResponse: any = [];

      await Promise.all(
        images.map(async (imageId) => {
          let data;
          const collectionHasImage = await prisma.collectionHasImage.findMany({
            where: {
              collectionId,
              imageId,
            },
          });

          // If Collection already has Image, remove Image from Collection
          if (collectionHasImage.length > 0) {
            data = await removeImageFromCollection({
              collectionId,
              imageId,
            });
          } else {
            data = await addImageToCollection({
              collectionId,
              imageId,
            });
          }
          dataResponse.push(data);
        }),
      ).catch((error) => {
        console.error(error);
      });

      return dataResponse;
    }
    default: {
      return {};
    }
  }
}
