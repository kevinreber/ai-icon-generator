import React from "react";
import { useNavigate } from "@remix-run/react";
import { ImageTagType } from "~/server/getImages";

const ImageV2 = ({ imageData }: { imageData: ImageTagType }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    // redirect user to explore.$imageId page when image is clicked
    // (this is the page that shows the image modal)
    // TODO: Need to figure our how to pass the this current routes query params to this route
    // ! TODO: Try manually entering query params
    navigate(`${imageData.id}`);
  };

  return (
    <div
      // TODO: Add hover affect that shows count of likes and comments
      className="relative overflow-hidden w-full pt-[100%]"
      onClick={() => handleImageClick()}
    >
      <img
        className="inset-0 object-cover cursor-pointer absolute w-full h-full"
        src={imageData.thumbnailURL}
        alt={imageData.prompt}
        // fallback={fallbackImageSource}
        // style={{ cursor: "pointer", maxWidth: 150, height: 'auto' }}
        // placeholder={
        //   <div
        //     style={{
        //       width,
        //       height: imagePreviewHeight,
        //       backgroundColor: "#d9d9d9",
        //     }}
        //   />
        // }
        // }
      />
    </div>
  );
};

export default ImageV2;