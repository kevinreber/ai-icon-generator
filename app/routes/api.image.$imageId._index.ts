import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { deleteUserImage, getImageBase64, updateImageData } from "~/server";
import { prisma } from "~/services/prisma.server";
import {
  getSessionUserId,
  requireUserWithPermission,
  toastSessionStorage,
} from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const imageId = params?.imageId || "";
  const data = await getImageBase64(imageId);

  return json({ data });
};

export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await getSessionUserId(request);
  const imageId = params.imageId;
  invariantResponse(imageId, "Invalid Image ID");
  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit an Image",
  );

  const image = await prisma.image.findFirst({
    select: { id: true, userId: true, user: { select: { username: true } } },
    where: { id: imageId },
  });

  invariantResponse(image, "Image does not exist");

  const isOwner = userId === image.userId;

  switch (request.method.toUpperCase()) {
    case "PATCH": {
      await requireUserWithPermission(
        request,
        isOwner ? "update:image:own" : "update:image:any",
      );
      console.log("Updating Image ID: ", imageId);

      const formData = await request.formData();
      const payload = JSON.parse(formData.get("body") as string);
      const response = await updateImageData(imageId, payload);
      console.log("Response", response);

      const toastCookieSession = await toastSessionStorage.getSession(
        request.headers.get("cookie"),
      );
      toastCookieSession.flash("toast", {
        type: "success",
        title: "Updated image",
        description: "Your image has been successfully updated",
      });

      return redirect(`/manage`, {
        headers: {
          "set-cookie":
            await toastSessionStorage.commitSession(toastCookieSession),
        },
      });
    }
    case "DELETE": {
      await requireUserWithPermission(
        request,
        isOwner ? "delete:image:own" : "delete:image:any",
      );

      console.log("Deleting Image ID: ", imageId);
      const response = await deleteUserImage(imageId);
      console.log("Response", response);

      const toastCookieSession = await toastSessionStorage.getSession(
        request.headers.get("cookie"),
      );
      toastCookieSession.flash("toast", {
        type: "success",
        title: "Deleted image",
        description: "Your image has been successfully deleted",
      });

      return redirect(`/manage`, {
        headers: {
          "set-cookie":
            await toastSessionStorage.commitSession(toastCookieSession),
        },
      });
    }
    default: {
      return {};
    }
  }
}
