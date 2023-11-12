import { type ActionFunctionArgs } from "@remix-run/node";
import { addImageToCollection, removeImageFromCollection } from "~/server";
import { getSession } from "~/services";
import { prisma } from "~/services/prisma.server";
import { invariantResponse } from "~/utils/invariantResponse";

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
  const collectionId = params.collectionId || "";
  const imageId = params.imageId || "";

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to add/remove Image from Collection",
  );

  switch (request.method.toUpperCase()) {
    case "POST": {
      // Check if Collection already has Image
      const collectionHasImage = await prisma.collectionHasImage.findMany({
        where: {
          collectionId,
          imageId,
        },
      });

      // If Collection already has Image, remove Image from Collection
      if (collectionHasImage.length > 0) {
        const data = await removeImageFromCollection({ collectionId, imageId });

        return data;
      }

      const data = await addImageToCollection({ collectionId, imageId });

      return data;
    }
    default: {
      return {};
    }
  }
}
