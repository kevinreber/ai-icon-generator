import { getCurrentLocaleDateAsString } from "~/utils";

export const downloadImage = async (blob: any, imageName: string) => {
  console.log("downloading image .....");

  const link = window.document.createElement("a");
  // const blob = new Blob([imageSrc], { type: "image/png" });
  console.log(blob);

  const nowDate = getCurrentLocaleDateAsString();
  const blobURL = (link.href = window.URL.createObjectURL(blob));
  console.log("Blob URL -----------------");
  console.log(blobURL);

  console.log("Blob URL -----------------");

  link.href = window.URL.createObjectURL(blob);
  link.download = `${imageName}_${nowDate}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
