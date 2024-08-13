import { TrashIcon as DeleteOutlined } from "@heroicons/react/24/outline";
import { Button } from "antd";
import type { ImageType, Comment } from "~/types";
import { useRemixFetcher } from "~/hooks";

const DeleteCommentButton = ({
  imageData,
  comment,
}: {
  imageData: ImageType;
  comment: Comment;
}) => {
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });

  const handleDeleteComment = (commentId: string) => {
    fetcher.submit(
      { intent: "image-delete-comment" },
      {
        method: "delete",
        action: `/api/image/${imageData.id}/comment/${commentId}`,
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
      onClick={() => handleDeleteComment(comment.id)}
    />
  );
};

export default DeleteCommentButton;
