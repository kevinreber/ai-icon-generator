import { type LoaderArgs, json } from "@remix-run/node";
import { getImageBase64 } from "~/server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const imageId = params?.imageId || "";
  const data = await getImageBase64(imageId);

  return json({ data });
};
