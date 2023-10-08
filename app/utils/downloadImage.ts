import { getCurrentLocaleDateAsString } from "~/utils";

export const downloadBase64Image = async (
  base64Image: any,
  imageName: string,
) => {
  console.log("downloading image .....");
  const nowDate = getCurrentLocaleDateAsString();

  const link = window.document.createElement("a");
  link.href = `data:application/octet-stream;base64,${base64Image}`;
  link.download = `${imageName}_${nowDate}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
