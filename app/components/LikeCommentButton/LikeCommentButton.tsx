import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import type { Comment, ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { useLoaderData } from "@remix-run/react";

const LikeCommentButton = ({
  imageData,
  comment,
}: {
  imageData: ImageType;
  comment: Comment;
}) => {
  const loaderData = useLoaderData();
  const userId = loaderData.user?.id || undefined;
  const { fetcher, isLoadingFetcher } = useRemixFetcher();

  const handleLikeComment = () => {
    // User must be logged in to Like a Comment
    if (!userId) {
      return;
    }

    fetcher.submit(
      { intent: "image-toggle-like" },
      {
        method: "post",
        action: `api/image/${imageData.id}/comment/${comment.id}/like?index`,
      }
    );
  };

  const userLikesComment = comment.likes.some((like) => like.userId === userId);

  const buttonIcon = userLikesComment ? (
    <HeartTwoTone twoToneColor='#eb2f96' />
  ) : (
    <HeartOutlined style={{ color: "#eb2f96" }} />
  );

  return (
    <Button
      size='small'
      style={{ border: "none" }}
      icon={buttonIcon}
      onClick={handleLikeComment}
      loading={isLoadingFetcher}
      disabled={!userId}
    >
      <span>{comment.likes.length > 0 && comment.likes.length}</span>
    </Button>
  );
};

export default LikeCommentButton;
