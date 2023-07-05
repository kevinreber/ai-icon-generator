import { type LoaderArgs, json } from "@remix-run/node";
import { getImageURLBlob, getImageBlobFromS3 } from "~/server";
import { getS3BucketURL } from "~/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  console.log("Server Side -----------------------------");
  const imageId = params?.imageId || "";
  const data = await getImageBlobFromS3(imageId);
  // const data = await getImageURLBlob(imageId);
  console.log(data);

  // const data = await fetch(imageURL)
  // .then((response) => {
  // return response.blob();
  // return response.arrayBuffer();
  // })
  // .then((blob) => {
  // return URL.createObjectURL(blob);
  // return Buffer.from(blob).toString("base64");
  // });

  // const data = await fetch(imageURL)
  //   .then((response) => response.arrayBuffer())
  //   .then((blob) => Buffer.from(blob).toString("base64"));
  // console.log(data);

  // const data = await getData(imageId);

  // console.log("Image ID: ", imageId);

  // const url = getS3BucketURL(imageId);
  // console.log("New URL ----------");
  // console.log(url);
  // const data = {};

  // console.log(data);
  console.log("Server Side -----------------------------");
  return json({ data });
};
