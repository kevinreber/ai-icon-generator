import React from "react";
import {
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
} from "antd";
import { convertUtcDateToLocalDateString, fallbackImageSource } from "~/utils";
import {
  CopyToClipboardButton,
  LikeImageButton,
  CommentCard,
  AddImageToCollectionButton,
} from "~/components";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ExplorePageImageLoader } from "~/routes/explore.$imageId";
import { ImageType, Comment } from "~/types";

const ImageModalv2 = () => {
  const userData = React.useContext(UserContext);
  const isUserLoggedIn = Boolean(userData);
  const navigate = useNavigate();

  const loaderData = useLoaderData<ExplorePageImageLoader>();
  const imageData = loaderData.data;

  // const [showImageModal, setShowImageModal] = React.useState(false);
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
      { method: "post", action: `/api/image/${imageData.id}/comment?index` },
    );
  };

  const handleImageClick = () => {
    // TODO: Need to figure our how to pass the parent routes query params to this route
    // ! TODO: Try manually enetering query params
    navigate(`..`);
  };

  return (
    <>
      <Modal
        open={true}
        destroyOnClose
        onCancel={() => handleImageClick()}
        width="90%"
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
            <div
              style={{
                width: "100%",
                maxWidth: 1024,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={imageData.url}
                alt={imageData.prompt || "Generated Image"}
                fallback={fallbackImageSource}
                preview={false}
                placeholder={
                  <div
                    style={{
                      width: 1024,
                      height: 1024,
                      background: "black",
                    }}
                  />
                }
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
              <Typography.Link
                strong
                href={`/profile/${imageData.user!.username}`}
              >
                {imageData.user!.username}
              </Typography.Link>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {convertUtcDateToLocalDateString(imageData.createdAt!)}
              </Typography.Text>
            </div>
          </Space>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {imageData.title || "Untitled"}
            </Typography.Text>
            <Space size="small">
              <LikeImageButton imageData={imageData as ImageType} />
              <AddImageToCollectionButton imageData={imageData as ImageType} />
            </Space>
          </Space>

          <Tabs
            style={{ height: "100%" }}
            defaultActiveKey="comments"
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
                            name="comment"
                            style={{
                              margin: 0,
                            }}
                          >
                            <Space.Compact style={{ width: "100%" }}>
                              <Input placeholder="Leave a comment" allowClear />
                              <Button
                                type="primary"
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
                    {imageData.comments && imageData.comments.length > 0 ? (
                      imageData.comments.map((comment) => (
                        <CommentCard
                          key={comment.id}
                          imageData={imageData as ImageType}
                          comment={comment as Comment}
                        />
                      ))
                    ) : (
                      <Typography.Text
                        type="secondary"
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
                  <Space direction="vertical">
                    <Space direction="vertical" size="small">
                      <Typography.Text style={{ fontWeight: 600 }}>
                        Engine Model
                      </Typography.Text>
                      <Typography.Text italic>
                        {imageData.model}
                      </Typography.Text>
                    </Space>
                    <Space direction="vertical" size="small">
                      <Typography.Text style={{ fontWeight: 600 }}>
                        Style Preset
                      </Typography.Text>
                      <Typography.Text italic>
                        {imageData.stylePreset}
                      </Typography.Text>
                    </Space>
                    <Space direction="vertical" size="small">
                      <Typography.Text style={{ fontWeight: 600 }}>
                        Prompt
                      </Typography.Text>
                      <div>
                        <Typography.Text italic>
                          {imageData.prompt}
                        </Typography.Text>
                        <CopyToClipboardButton
                          stringToCopy={imageData.prompt || ""}
                        />
                      </div>
                    </Space>
                  </Space>
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ImageModalv2;