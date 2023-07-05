export const getImageBlob = async (imageId: string) => {
  const response = await fetch(`/api/image/${imageId}`);
  console.log("Get Image Blob Response ----------------------");
  console.log(response);
  const data = await response.json();
  console.log(data);

  console.log("Get Image Blob Response ----------------------");

  // const data = await fetch(imageURL)
  //   .then((response) => {
  //     return response.blob();
  //   })
  //   .then((blob) => {
  //     return URL.createObjectURL(blob);
  //   });

  // console.log(data);

  return data;
};
