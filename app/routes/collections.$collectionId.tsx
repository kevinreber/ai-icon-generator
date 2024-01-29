import {
  type LoaderFunctionArgs,
  json,
  redirect,
  MetaFunction,
} from "@remix-run/node";
import { CollectionDetailsPage } from "~/pages";
import { getCollectionData } from "~/server";
import { authenticator } from "~/services/auth.server";
import {
  getS3BucketThumbnailURL,
  getS3BucketURL,
  getSessionUserId,
} from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const collectionTitle = data?.data.collection?.title;

  return [{ title: `Collections | ${collectionTitle}` }];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // TODO: after we implement other forms of login (Ex: SSO), we can use this to check if user is authenticated
  // const user = (await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/",
  // })) as { id: string };
  // const userId = await getSessionUserId(request);
  // if (!userId) {
  //   return redirect("/login");
  // }

  const collectionId = params?.collectionId || "";

  // const searchParams = new URL(request.url).searchParams;
  // const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  // const pageSize = Number(searchParams.get("page_size")) || 50;

  const collectionData = await getCollectionData(collectionId);
  const collectionImages =
    collectionData.collection?.images.map((imageData) => ({
      ...imageData.image,
      url: getS3BucketURL(imageData?.image?.id || ""),
      thumbnailURL: getS3BucketThumbnailURL(imageData?.image?.id || ""),
    })) || [];

  const formattedCollectionData = { ...collectionData };
  // @ts-ignore
  formattedCollectionData.collection.images = collectionImages;

  if (!collectionData.collection) {
    return redirect("/collections");
  }

  return json({ data: formattedCollectionData });
};

export default function Index() {
  return <CollectionDetailsPage />;
}
