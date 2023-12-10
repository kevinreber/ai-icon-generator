import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { deleteUserImage, getImageBase64, updateImageData } from "~/server";
import { getSession } from "~/services";
import { prisma } from "~/services/prisma.server";
import { toastSessionStorage } from "~/utils";
import { invariantResponse } from "~/utils/invariantResponse";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const imageId = params?.imageId || "";
  const data = await getImageBase64(imageId);

  return json({ data });
};

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;
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

  invariantResponse(imageId, "Image does not exist");

  switch (request.method.toUpperCase()) {
    case "PATCH": {
      const permission = await prisma.permission.findFirst({
        select: { id: true },
        where: {
          roles: { some: { users: { some: { id: userId } } } },
          entity: "image",
          action: "update",
          access: image?.userId === userId ? "own" : "any",
        },
      });
      if (!permission) {
        throw json(
          {
            error: "Unauthorized",
            message: "You do not have permission to update this image",
          },
          { status: 403 },
        );
      }
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
      const permission = await prisma.permission.findFirst({
        select: { id: true },
        where: {
          roles: { some: { users: { some: { id: userId } } } },
          entity: "image",
          action: "delete",
          access: image?.userId === userId ? "own" : "any",
        },
      });
      if (!permission) {
        throw json(
          {
            error: "Unauthorized",
            message: "You do not have permission to delete this image",
          },
          { status: 403 },
        );
      }
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
