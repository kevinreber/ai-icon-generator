import React from "react";
import {
  EditOutlined,
  HeartOutlined,
  HeartTwoTone,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography, Card, Space, Button, Modal, Avatar } from "antd";
import type { ImageType, Comment } from "~/types";
import { useRemixFetcher } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import DeleteCommentButton from "./DeleteCommentButton";
import { convertUtcDateToLocalDateString } from "~/utils";

const CommentCard = ({
  imageData,
  comment,
}: {
  imageData: ImageType;
  comment: Comment;
}) => {
  const loaderData = useLoaderData();
  const userId = loaderData.user?.id || undefined;

  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });

  // TODO
  // const handleEditComment = (commentId: string) => {
  //   fetcher.submit(
  //     { intent: "image-edit-comment" },
  //     {
  //       method: "patch",
  //       action: `api/image/${imageData.id}/comment/${commentId}`,
  //     }
  //   );
  // };

  return (
    <Card size='small' style={{ marginBottom: 12 }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Space>
            <Avatar
              style={{ cursor: "pointer" }}
              icon={<UserOutlined />}
              size='small'
            />
            <Typography.Text strong>{imageData.user.username}</Typography.Text>
          </Space>
        </div>
        <Typography.Text type='secondary' style={{ fontSize: 12 }}>
          {convertUtcDateToLocalDateString(comment.createdAt)}
        </Typography.Text>
      </header>
      {comment.message}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size='small'
          style={{ border: "none" }}
          icon={<HeartOutlined style={{ color: "#eb2f96" }} />}
        >
          156
        </Button>
        {/* <HeartTwoTone twoToneColor='#eb2f96' /> */}
        {imageData.user.id === userId && (
          <Space>
            {/* TODO: Add Edit comment feature */}
            {/* <Button
              size='small'
              style={{ border: "none" }}
              icon={<EditOutlined />}
              loading={isLoadingFetcher}
              onClick={() => handleEditComment(comment.id)}
            /> */}
            <DeleteCommentButton imageData={imageData} comment={comment} />
          </Space>
        )}
      </footer>
    </Card>
  );
};

export default CommentCard;
