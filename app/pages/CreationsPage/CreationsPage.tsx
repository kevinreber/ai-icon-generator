import React from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import {
  MessageOutlined,
  MoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
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
} from "antd";
import type { ImageType } from "~/types";
import {
  DeleteImageButton,
  DownloadImageButton,
  EditImageButton,
} from "./components";
import { ImageModal, LikeImageButton } from "~/components";

const CreationsPage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const imagesCreated = data.data || [];
  const totalImages = imagesCreated.length;
  const [displayImagesStyle, setDisplayImagesStyle] = React.useState("list");

  const handleImageDisplayChange = (event: RadioChangeEvent) => {
    console.log(event.target.value);
    setDisplayImagesStyle(event.target.value);
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
        <Typography.Title level={3}>Creations</Typography.Title>
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
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <Row gutter={16}>
              {imagesCreated.map((image: ImageType) => {
                return (
                  <Col key={image.id}>
                    <div style={{ marginBottom: 10 }}>
                      <ImageModal imageData={image} width={200} />
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
                              <EditImageButton image={image} />
                              <DownloadImageButton image={image} />
                              <DeleteImageButton image={image} />
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
          </Image.PreviewGroup>
        ) : totalImages && displayImagesStyle === "list" ? (
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
                extra={
                  <Space>
                    <EditImageButton image={image} />
                    <DownloadImageButton image={image} />
                    <DeleteImageButton image={image} />
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={<ImageModal imageData={image} />}
                  title={image.prompt}
                  description={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <LikeImageButton imageData={image} />
                        <Space style={{ color: "#64ffda" }}>
                          <MessageOutlined />
                          {image.comments.length > 0 && image.comments.length}
                        </Space>
                      </div>
                      <Typography.Text italic>
                        {new Date(image.createdAt).toLocaleString()}
                      </Typography.Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Typography.Text italic disabled>
            Icons generated will appear here
          </Typography.Text>
        )}
      </Card>
    </>
  );
};

export default CreationsPage;
