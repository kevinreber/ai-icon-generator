import React from "react";
import {
  HeartOutlined,
  HeartTwoTone,
  InfoCircleOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Image,
  Space,
  Button,
  Modal,
  Avatar,
  Tabs,
  Form,
  Input,
  Descriptions,
} from "antd";
import { convertUtcDateToLocalDateString, fallbackImageSource } from "~/utils";
import type { ImageType, Comment } from "~/types";
import { CopyToClipboardButton } from "~/components";
import { useRemixFetcher } from "~/hooks";
import { CommentCard } from "../CommentCard";
import { useLoaderData } from "@remix-run/react";

const ImageModal = ({
  imageData,
  width = 100,
}: {
  imageData: ImageType;
  width?: number;
}) => {
  const loaderData = useLoaderData();
  const isUserLoggedIn = Boolean(loaderData.user);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [formInstance] = Form.useForm();

  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });

  const handleCommentFormSubmit = (formValues: { comment: string }) => {
    fetcher.submit(
      { intent: "image-add-comment", body: JSON.stringify(formValues) },
      { method: "post", action: `api/image/${imageData.id}/comment?index` }
    );
  };

  return (
    <>
      <Image
        width={width}
        src={imageData.url}
        alt={imageData.prompt}
        fallback={fallbackImageSource}
        style={{ borderRadius: 12, cursor: "pointer" }}
        onClick={() => setShowImageModal(true)}
        preview={false}
      />
      <Modal
        open={showImageModal}
        destroyOnClose
        onCancel={() => setShowImageModal(false)}
        width='90%'
        footer={null}
        bodyStyle={{ display: "flex", padding: 0, height: "100%" }}
        style={{ top: "5%", padding: 0, height: "90%" }}
      >
        <div
          style={{
            flex: "1 1 100%",
            background: "black",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 300,
              paddingBottom: 0,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%", maxWidth: 1024 }}>
              <Image
                src={imageData.url}
                alt={imageData.prompt}
                fallback={fallbackImageSource}
                // style={{ borderRadius: 12 }}
                preview={false}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 16,
            flexBasis: 420,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          <Space style={{ marginBottom: "1rem" }}>
            <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text strong>
                {imageData.user.username}
              </Typography.Text>
              <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                {convertUtcDateToLocalDateString(imageData.createdAt)}
              </Typography.Text>
            </div>
          </Space>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {imageData.title || "Undefined"}
            </Typography.Text>
            <Button
              size='small'
              style={{ border: "none" }}
              icon={<HeartOutlined style={{ color: "#eb2f96" }} />}
            >
              156
            </Button>
            {/* <HeartTwoTone twoToneColor='#eb2f96' /> */}
          </Space>

          <Tabs
            style={{ height: "100%" }}
            defaultActiveKey='comments'
            items={[
              {
                label: (
                  <span>
                    <MessageOutlined />
                    Comments
                  </span>
                ),
                key: "comment",
                children: (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    {isUserLoggedIn && (
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          bottom: 0,
                        }}
                      >
                        <Form
                          onFinish={handleCommentFormSubmit}
                          initialValues={{ comment: undefined }}
                          form={formInstance}
                        >
                          <Form.Item
                            name='comment'
                            style={{
                              margin: 0,
                            }}
                          >
                            <Space.Compact style={{ width: "100%" }}>
                              <Input placeholder='Leave a comment' allowClear />
                              <Button
                                type='primary'
                                ghost
                                icon={<SendOutlined />}
                                onClick={() => formInstance.submit()}
                                loading={isLoadingFetcher}
                              />
                            </Space.Compact>
                          </Form.Item>
                        </Form>
                      </div>
                    )}
                    {imageData.comments.length ? (
                      imageData.comments.map((comment: Comment) => (
                        <CommentCard
                          key={comment.id}
                          imageData={imageData}
                          comment={comment}
                        />
                      ))
                    ) : (
                      <Typography.Text
                        type='secondary'
                        italic
                        style={{ alignSelf: "center" }}
                      >
                        No comments
                      </Typography.Text>
                    )}
                  </div>
                ),
              },
              {
                label: (
                  <span>
                    <InfoCircleOutlined />
                    Info
                  </span>
                ),
                key: "info",
                children: (
                  <div>
                    <Descriptions
                      layout='vertical'
                      labelStyle={{ fontWeight: 600 }}
                      colon={false}
                    >
                      <Descriptions.Item label='Prompt'>
                        <Typography.Text italic>
                          {imageData.prompt}
                        </Typography.Text>
                        <CopyToClipboardButton
                          stringToCopy={imageData.prompt}
                        />
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
