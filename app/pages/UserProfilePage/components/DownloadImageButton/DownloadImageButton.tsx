import { DownloadOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import type { ImageType } from "~/types";
// import { useRemixFetcher } from "~/hooks";
import { downloadBase64Image } from "~/utils";
import { getImageBlob } from "~/client";
import React from "react";

// TODO: Explore using action function
// export async function action({ request }: ActionArgs) {
//   console.log("Action function!!!!!!!!!!");
//   const formData = await request.formData();

//   const payload = JSON.parse(formData.get("body") as string);
//   const { imageId = "" } = payload;
//   return { data: "downloading.....", imageId };

// }

const DownloadImageButton = ({ image }: { image: ImageType }) => {
  // TODO: Look into using fetcher
  // const { fetcher, isLoadingFetcher } = useRemixFetcher({
  //   onSuccess: (response) => {
  //     console.log("DOWNLOAD IMAGE BUTTON: response");
  //     console.log(response);

  //     notification.success({ message: response.data.message });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     notification.error({ message: error.data.message });
  //   },
  // });

  const [isDownloadingImage, setIsDownloadingImage] = React.useState(false);

  const handleDownloadImage = async () => {
    setIsDownloadingImage(true);
    console.log("downloading.....");

    const data: any = await getImageBlob(image.id);
    await downloadBase64Image(data.data, image.id);
    setIsDownloadingImage(false);
  };

  return (
    <>
      <Tooltip title='Download image'>
        <Button
          size='small'
          icon={<DownloadOutlined />}
          style={{ border: "none", textAlign: "left" }}
          onClick={handleDownloadImage}
          loading={isDownloadingImage}
        >
          Download
        </Button>
      </Tooltip>
    </>
  );
};

export default DownloadImageButton;
