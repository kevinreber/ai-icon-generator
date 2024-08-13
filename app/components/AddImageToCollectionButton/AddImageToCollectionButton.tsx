import React from "react";
import { BookmarkIcon as BookFilled } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookOutlined } from "@heroicons/react/24/outline";
import { Button, Checkbox, Space, Tooltip, Typography } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";
import { CreateCollectionButton } from "~/components";

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
    // User must be logged in to add an Image to a Collection
    if (!userId) {
      return;
    }

    fetcher.submit(
      { intent: "_add-image-to-collection" },
      {
        method: "POST",
        action: `/api/collections/${collectionId}/images/${imageData.id}`,
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
      <Tooltip
        title={
          <>
            {userCollections.length ? (
              <Space direction="vertical">
                <CreateCollectionButton />
                {userCollections.map((collection) => {
                  const isCollectionChecked = collection.images.some(
                    // @ts-ignore
                    (image: { imageId: string }) =>
                      image.imageId === imageData.id,
                  );

                  return (
                    <Checkbox
                      key={collection.id}
                      value={collection.id}
                      onClick={handleAddImageToCollection}
                      checked={isCollectionChecked}
                      style={{ padding: 4 }}
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
          </>
        }
      >
        <Button
          size="small"
          style={{ border: "none", boxShadow: "none" }}
          icon={buttonIcon}
          onClick={toggleUserCollectionsModal}
          loading={isLoadingFetcher}
          disabled={!userId}
        />
      </Tooltip>
    </>
  );
};

export default AddImageToCollectionButton;
