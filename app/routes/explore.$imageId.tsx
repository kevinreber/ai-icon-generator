import {
  type LoaderFunctionArgs,
  json,
  type SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { getImage } from "~/server";
import { invariantResponse } from "~/utils";
import { ImageModalv2 } from "~/components/ImageModalv2";

export const meta: MetaFunction = () => {
  return [{ title: "Explore AI Generated Images" }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const imageId = params.imageId || "";
  invariantResponse(imageId, "Image does not exist");

  const image = await getImage(imageId);

  return json({ data: image });
};

export type ExplorePageImageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <ImageModalv2 />;
}
