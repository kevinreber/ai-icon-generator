export const getImageBlob = async (imageId: string) => {
  console.log("Get Image Blob Response ----------------------");
  const response = await fetch(`/api/image/${imageId}`);
  console.log(response);
  const data = await response.json();

  return data;
};
