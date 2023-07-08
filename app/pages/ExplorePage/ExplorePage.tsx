import React, { useEffect } from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import {
  HeartOutlined,
  HeartTwoTone,
  InfoCircleOutlined,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
  SendOutlined,
  StarOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Image,
  Card,
  Row,
  Col,
  Radio,
  List,
  Space,
  Button,
  Popover,
  type RadioChangeEvent,
  Modal,
  Avatar,
  Tabs,
  Form,
  Input,
  Descriptions,
} from "antd";
import { fallbackImageSource } from "~/utils";
import type { ImageType, Comment } from "~/types";
import { CopyToClipboardButton } from "~/components";

const DEFAULT_IMAGE_MODAL_DATA = {
  id: "",
  prompt: "",
  title: "",
  user: { id: "", username: "" },
  createdAt: "",
  url: "",
  comments: [],
};

const ExplorePage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const imagesCreated = data.data || [];
  const totalImages = imagesCreated.length;
  const [displayImagesStyle, setDisplayImagesStyle] = React.useState("grid");
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [imageModalData, setImageModalData] = React.useState(
    DEFAULT_IMAGE_MODAL_DATA
  );

  const handleImageDisplayChange = (event: RadioChangeEvent) => {
    console.log(event.target.value);
    setDisplayImagesStyle(event.target.value);
  };

  const handleShowImageInModal = (imageData: any) => {
    console.log(imageData);

    setImageModalData(imageData);
    setShowImageModal(true);
  };

  const [formInstance] = Form.useForm();

  const handleCommentFormSubmit = (formValues: { comment: string }) => {
    console.log(formValues);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography.Title level={3}>Explore Icons</Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 180,
            width: "100%",
            alignItems: "baseline",
          }}
        >
          <Typography.Text>Total Images: {totalImages}</Typography.Text>
          <div>
            <Radio.Group
              onChange={handleImageDisplayChange}
              // defaultValue='list'
              size='small'
              value={displayImagesStyle}
            >
              <Radio.Button value='list'>
                <UnorderedListOutlined />
              </Radio.Button>
              <Radio.Button value='grid'>
                <TableOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
      <Card
        loading={isLoadingData}
        style={{ minHeight: totalImages ? "" : 400 }}
        bodyStyle={{ textAlign: imagesCreated ? "initial" : "center" }}
      >
        {totalImages && displayImagesStyle === "grid" ? (
          // <Image.PreviewGroup
          //   preview={{
          //     onChange: (current, prev) =>
          //       console.log(`current index: ${current}, prev index: ${prev}`),
          //   }}
          // >
          <Row gutter={16}>
            {imagesCreated.map((image: ImageType) => {
              return (
                <Col key={image.id}>
                  <div style={{ marginBottom: 10 }}>
                    <Image
                      width={200}
                      src={image.url}
                      alt={image.prompt}
                      fallback={fallbackImageSource}
                      style={{ borderRadius: 12, cursor: "pointer" }}
                      onClick={() => handleShowImageInModal(image)}
                      preview={false}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography.Text
                      ellipsis={{
                        tooltip: (
                          <Typography.Text>
                            {image.prompt}
                            <br />
                            <br />
                            <Typography.Text italic>
                              Created By: {image.user.username}
                              <br />
                              {new Date(image.createdAt).toLocaleString()}
                            </Typography.Text>
                          </Typography.Text>
                        ),
                      }}
                      style={{ maxWidth: 160 }}
                    >
                      {image.prompt}
                    </Typography.Text>
                    <Popover
                      content={
                        <Space size='small'>
                          <Space.Compact direction='vertical'>
                            <Button
                              icon={<StarOutlined />}
                              style={{ textAlign: "left" }}
                              type='link'
                            >
                              156
                            </Button>
                            <Button
                              icon={<LikeOutlined />}
                              style={{ textAlign: "left" }}
                              type='link'
                            >
                              156
                            </Button>
                            <Button
                              icon={<MessageOutlined />}
                              style={{ textAlign: "left" }}
                              type='link'
                            >
                              2
                            </Button>
                          </Space.Compact>
                        </Space>
                      }
                    >
                      <Button
                        icon={<MoreOutlined rotate={90} />}
                        style={{ border: "none" }}
                      />
                    </Popover>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          // </Image.PreviewGroup>
          <List
            itemLayout='vertical'
            size='small'
            // size='large'
            // pagination={{
            //   onChange: (page) => {
            //     console.log(page);
            //   },
            //   pageSize: 3,
            // }}
            dataSource={imagesCreated}
            renderItem={(image: ImageType) => (
              <List.Item
                key={image.id}
                style={{ marginTop: 8, marginBottom: 8 }}
              >
                <List.Item.Meta
                  style={{ margin: 0 }}
                  avatar={
                    <Image
                      width={100}
                      src={image.url}
                      alt={image.prompt}
                      fallback={fallbackImageSource}
                      style={{ borderRadius: 12, cursor: "pointer" }}
                      onClick={() => handleShowImageInModal(image)}
                      preview={false}
                    />
                  }
                  title={image.prompt}
                  description={
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography.Text>
                          Created By: {image.user.username}
                        </Typography.Text>
                        <Typography.Text italic>
                          {new Date(image.createdAt).toLocaleString()}
                        </Typography.Text>
                      </div>
                      <div>
                        <Button icon={<StarOutlined />} type='link'>
                          156
                        </Button>
                        <Button icon={<LikeOutlined />} type='link'>
                          156
                        </Button>
                        <Button icon={<MessageOutlined />} type='link'>
                          2
                        </Button>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
      {/* Modal */}
      <Modal
        open={showImageModal}
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
                src={imageModalData.url}
                alt={imageModalData.prompt}
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
                {imageModalData.user.username}
              </Typography.Text>
              <Typography.Text type='secondary' style={{ fontSize: 12 }}>
                {new Date(imageModalData.createdAt).toLocaleString()}
              </Typography.Text>
            </div>
          </Space>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {imageModalData.title || "Undefined"}
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
                            />
                          </Space.Compact>
                        </Form.Item>
                      </Form>
                    </div>
                    {imageModalData.comments.length ? (
                      imageModalData.comments.map((comment: Comment) => (
                        <Card size='small' key={comment.id}>
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
                                {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                                <Typography.Text strong>
                                  {imageModalData.user.username}
                                </Typography.Text>
                              </Space>
                            </div>
                            <Typography.Text
                              type='secondary'
                              style={{ fontSize: 12 }}
                            >
                              {new Date(
                                imageModalData.createdAt
                              ).toLocaleString()}
                            </Typography.Text>
                            {/* </div> */}
                          </header>
                          {comment.message}
                          <footer>
                            <Button
                              size='small'
                              icon={
                                <HeartOutlined
                                  style={{ color: "#eb2f96", border: "none" }}
                                />
                              }
                              // type="link"
                            >
                              156
                            </Button>
                            {/* <HeartTwoTone twoToneColor='#eb2f96' /> */}
                          </footer>
                        </Card>
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
                          {imageModalData.prompt}
                        </Typography.Text>
                        <CopyToClipboardButton
                          stringToCopy={imageModalData.prompt}
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

export default ExplorePage;
