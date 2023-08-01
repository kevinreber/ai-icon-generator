import React from "react";
import { HeartFilled, HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import type { ImageType } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";

const LikeImageButton = ({ imageData }: { imageData: ImageType }) => {
  const userData = React.useContext(UserContext);
  const userId = userData?.id || undefined;
  const { fetcher, isLoadingFetcher } = useRemixFetcher();

  const handleLikeImage = () => {
    // User must be logged in to Like an Image
    if (!userId) {
      return;
    }

    fetcher.submit(
      { intent: "image-toggle-like" },
      {
        method: "post",
        action: `api/image/${imageData.id}/like?index`,
      }
    );
  };

  const userLikesImage = imageData.likes.some((like) => like.userId === userId);

  const buttonIcon = userLikesImage ? (
    // <HeartTwoTone twoToneColor='#eb2f96' />
    <HeartFilled style={{ color: "#eb2f96" }} />
  ) : (
    <HeartOutlined style={{ color: "rgba(0, 0, 0, 0.45)" }} />
    // <HeartOutlined style={{ color: "#eb2f96" }} />
  );

  return (
    <Button
      size='small'
      style={{ border: "none", boxShadow: "none" }}
      icon={buttonIcon}
      onClick={handleLikeImage}
      loading={isLoadingFetcher}
      disabled={!userId}
    >
      <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
        {imageData.likes.length > 0 && imageData.likes.length}
      </span>
    </Button>
  );
};

export default LikeImageButton;
