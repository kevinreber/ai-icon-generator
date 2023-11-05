import React from "react";
import { BookOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, Space, Typography } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";
import { CreateCollectionButton } from "~/components";
import { useActionData, useNavigation } from "@remix-run/react";
import { CreateImagePageActionData } from "~/routes/create._index";

const getImageIds = (collections: any[]) => {
  const imageIds: string[] = [];

  collections.forEach((collection) => {
    collection.images.forEach((image: { imageId: string }) => {
      imageIds.push(image.imageId);
    });
  });

  return imageIds;
};

const AddImagesToCollectionButton = ({ images }: { images: ImageType[] }) => {
  const userData = React.useContext(UserContext);
  const userId = userData?.id || undefined;

  const actionData = useActionData() as CreateImagePageActionData;
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  console.log(actionData);

  const imagesGenerated = Boolean(actionData && actionData.images);
  const imagesIds = images.map((image) => image.id);

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
  const [showUserCollectionsPopover, setShowUserCollectionsPopover] =
    React.useState(false);

  const userCollections = userData.collections || [];
  const userCollectionImages = getImageIds(userCollections);

  const toggleUserCollectionsPopover = () => {
    setShowUserCollectionsPopover(!showUserCollectionsPopover);
  };

  const handleAddImagesToCollection = (event: any) => {
    const collectionId = event.target.value;
    // User must be logged in to add an Image to a Collection
    if (!userId) {
      return;
    }

    fetcher.submit(
      {
        intent: "_add-image-to-collection",
        body: JSON.stringify({ images: imagesIds }),
      },
      {
        method: "POST",
        action: `/api/collections/${collectionId}/images?index`,
      },
    );
    toggleUserCollectionsPopover();
  };

  return (
    <>
      <Popover
        open={showUserCollectionsPopover}
        title={
          <>
            {userCollections.length ? (
              <Space direction="vertical">
                <CreateCollectionButton />
                {userCollections.map((collection) => {
                  const isCollectionChecked = userCollectionImages.some(
                    (imageId) => imagesIds.includes(imageId),
                  );

                  return (
                    <Checkbox
                      key={collection.id}
                      value={collection.id}
                      onClick={handleAddImagesToCollection}
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
          icon={<BookOutlined />}
          onClick={toggleUserCollectionsPopover}
          loading={isLoadingFetcher}
          disabled={!userId || !imagesGenerated || isLoadingData}
        >
          Add images to Collection
        </Button>
      </Popover>
    </>
  );
};

export default AddImagesToCollectionButton;
