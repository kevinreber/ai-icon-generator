import React from "react";
import { BookOutlined, BookFilled } from "@ant-design/icons";
import { Button, Checkbox, Modal, Space, Typography, notification } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";

const getImageIds = (collections: any[]) => {
  const imageIds: string[] = [];

  collections.forEach((collection) => {
    collection.images.forEach((image: { imageId: string }) => {
      imageIds.push(image.imageId);
    });
  });

  return imageIds;
};

const AddImageToCollectionButton = ({
  imageData,
}: {
  imageData: ImageType;
}) => {
  const userData = React.useContext(UserContext);
  const userId = userData?.id || undefined;

  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   const successMessage =
    //     response.data.message || "Successfully added Image to Collection";
    //   notification.success({ message: successMessage });
    // },
    // onError: (error) => {
    //   const errorMessage =
    //     error.data.message || "Error adding Image to Collection";
    //   console.error(error);
    //   notification.error({ message: errorMessage });
    // },
  });
  const [showUserCollectionsModal, setShowUserCollectionsModal] =
    React.useState(false);

  const userCollections = userData.collections || [];
  const userCollectionImages = getImageIds(userCollections);

  const toggleUserCollectionsModal = () => {
    setShowUserCollectionsModal(!showUserCollectionsModal);
  };

  const handleAddImageToCollection = (event: any) => {
    const collectionId = event.target.value;
    // User must be logged in to Like an Image
    if (!userId) {
      return;
    }

    fetcher.submit(
      { intent: "image-toggle-like" },
      {
        method: "POST",
        action: `/api/collection/${collectionId}/images/${imageData.id}`,
      },
    );
    toggleUserCollectionsModal();
  };

  const userAddedImageToCollection = userCollectionImages.some(
    (image) => image === imageData.id,
  );

  const buttonIcon = userAddedImageToCollection ? (
    <BookFilled />
  ) : (
    <BookOutlined />
  );

  return (
    <>
      <Button
        size="small"
        style={{ border: "none", boxShadow: "none" }}
        icon={buttonIcon}
        onClick={toggleUserCollectionsModal}
        loading={isLoadingFetcher}
        disabled={!userId}
      />
      <Modal
        title="Add Image to Collection"
        footer={null}
        open={showUserCollectionsModal}
        onCancel={toggleUserCollectionsModal}
      >
        {userCollections.length ? (
          <Space direction="vertical">
            {userCollections.map((collection) => {
              const isCollectionChecked = collection.images.some(
                // @ts-ignore
                (image: { imageId: string }) => image.imageId === imageData.id,
              );

              return (
                <Checkbox
                  key={collection.id}
                  value={collection.id}
                  onClick={handleAddImageToCollection}
                  checked={isCollectionChecked}
                >
                  {collection.title}
                </Checkbox>
              );
            })}
          </Space>
        ) : (
          <Typography.Text italic type="secondary">
            No Collections
          </Typography.Text>
        )}
      </Modal>
    </>
  );
};

export default AddImageToCollectionButton;
