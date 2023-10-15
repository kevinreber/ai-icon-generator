import { DeleteOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useRemixFetcher } from "~/hooks";

const DeleteCollectionButton = ({ collectionId }: { collectionId: string }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    onSuccess: (response) => {
      const message =
        response.data.message || "Successfully deleted collection";
      notification.success({ message });
    },
    onError: (error) => {
      console.error(error);
      notification.error({ message: error.message });
    },
  });

  const handleDeleteComment = () => {
    fetcher.submit(
      { intent: "_delete_collection" },
      {
        method: "DELETE",
        action: `/api/collections/${collectionId}`,
      },
    );
  };

  return (
    <Button
      size="small"
      style={{ border: "none" }}
      icon={<DeleteOutlined />}
      danger
      loading={isLoadingFetcher}
      onClick={handleDeleteComment}
    >
      Delete
    </Button>
  );
};

export default DeleteCollectionButton;
