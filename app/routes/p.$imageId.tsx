import {
  type LoaderFunctionArgs,
  json,
  type SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { getImage } from "~/server";
import { invariantResponse } from "~/utils";
import { GeneralErrorBoundary } from "~/components";
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
import { useLoggedInUser, useRemixFetcher } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { ImageType, Comment } from "~/types";

export const meta: MetaFunction = () => {
  return [{ title: "Image Details Page" }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const imageId = params.imageId || "";
  invariantResponse(imageId, "Image does not exist");

  const image = await getImage(imageId);

  return json({ data: image });
};

export type ImageDetailsPageImageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  const userData = useLoggedInUser();
  const isUserLoggedIn = Boolean(userData);

  const loaderData = useLoaderData<ImageDetailsPageImageLoader>();
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

  return (
    <div className="border rounded flex border-solid border-gray-500 m-auto w-fit">
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
        // className="border rounded flex border-solid border-gray-500 flex-col p-4"
        className="flex flex-col p-4"
        style={{ flexBasis: 420 }}
      >
        <Space style={{ marginBottom: "1rem" }}>
          <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />

          <div className="flex flex-col">
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
                    <Typography.Text italic>{imageData.model}</Typography.Text>
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
    </div>
  );
}

export const ErrorBoundary = () => {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        403: () => <p>You do not have permission</p>,
        404: ({ params }) => (
          <p>Image with id: "{params.imageId}" does not exist</p>
        ),
      }}
    />
  );
};
