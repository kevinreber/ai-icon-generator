import { TrashIcon as DeleteOutlined } from "@heroicons/react/24/outline";
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
        action: `/api/collections/${collectionId}`,
      },
    );
  };

  return (
    <Button
      size="small"
      style={{ border: "none" }}
      icon={<DeleteOutlined className="size-5"/>}
      danger
      loading={isLoadingFetcher}
      onClick={handleDeleteComment}
    >
      Delete
    </Button>
  );
};

export default DeleteCollectionButton;
