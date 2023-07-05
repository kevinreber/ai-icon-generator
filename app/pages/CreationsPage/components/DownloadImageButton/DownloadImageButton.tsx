import { DownloadOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { downloadImage } from "~/utils";
import { getImageBlob } from "~/client";

// TODO: Explore using action function
// export async function action({ request }: ActionArgs) {
//   console.log("Action function!!!!!!!!!!");
//   const formData = await request.formData();

//   const payload = JSON.parse(formData.get("body") as string);
//   const { imageId = "" } = payload;
//   return { data: "downloading.....", imageId };

// }

const DownloadImageButton = ({ image }: { image: ImageType }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    onSuccess: (response) => {
      console.log("DOWNLOAD IMAGE BUTTON: response");
      console.log(response);

      notification.success({ message: response.data.message });
    },
    onError: (error) => {
      console.error(error);
      notification.error({ message: error.data.message });
    },
  });

  const handleDownloadImage = async () => {
    console.log("downloading.....");
    // alert("success");
    // return;

    // const data: any = await getImageBlob(image.url);
    const data: any = await getImageBlob(image.id);
    console.log(data);
    // const blob = await data.blob();
    // const blob = new Blob([data.data.imageBlob]);

    // console.log(blob);

    // const data: any = await getImageBlob(image.id);
    console.log("Client Response ----------");
    // console.log(data);

    // await downloadImage(blob, image.id);
  };

  return (
    <>
      <Tooltip title='Download image'>
        <Button
          size='small'
          icon={<DownloadOutlined />}
          style={{ border: "none", textAlign: "left" }}
          onClick={handleDownloadImage}
          loading={isLoadingFetcher}
        >
          Download
        </Button>
      </Tooltip>
    </>
  );
};

export default DownloadImageButton;
