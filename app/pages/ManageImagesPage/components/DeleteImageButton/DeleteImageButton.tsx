import React from "react";
import { TrashIcon as DeleteOutlined } from "@heroicons/react/24/outline";
import { Typography, Button, Popconfirm, notification } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";

const DeleteImageButton = ({ image }: { image: ImageType }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    onSuccess: (response) => {
      notification.success({ message: response.data.message });
    },
    onError: (error) => {
      console.error(error);
      notification.error({ message: error.data.message });
    },
  });

  const [showPopConfirm, setShowPopConfirm] = React.useState(false);
  const togglePopConfirm = () => setShowPopConfirm(!showPopConfirm);

  const isLoadingData = isLoadingFetcher;

  const handleDeleteImage = () => {
    togglePopConfirm();
    fetcher.submit(
      { intent: "_delete_image" },
      { method: "DELETE", action: `/api/image/${image.id}?index` },
    );
  };

  return (
    <>
      <Popconfirm
        title="Delete this image"
        // @ts-ignore
        description={
          <>
            Are you sure to delete the image:
            <br />
            <Typography.Text strong italic>
              {image.prompt}
            </Typography.Text>
            <br />
            <br />
            This action can not be undone
          </>
        }
        popupVisible={showPopConfirm}
        onConfirm={handleDeleteImage}
        onCancel={togglePopConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button
          size="small"
          icon={<DeleteOutlined className="size-5" />}
          danger
          style={{ border: "none", textAlign: "left" }}
          loading={isLoadingData}
        >
          Delete
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeleteImageButton;
