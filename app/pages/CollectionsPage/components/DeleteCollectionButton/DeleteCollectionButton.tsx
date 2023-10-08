import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRemixFetcher } from "~/hooks";

const DeleteCollectionButton = ({ collectionId }: { collectionId: string }) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });

  const handleDeleteComment = () => {
    fetcher.submit(
      { intent: "_delete_collection" },
      {
        method: "DELETE",
        action: `/api/collection/${collectionId}`,
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
