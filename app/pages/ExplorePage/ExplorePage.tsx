import React from "react";
import { useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import {
  MessageOutlined,
  MoreOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Card,
  Row,
  Col,
  Radio,
  List,
  Space,
  Button,
  Popover,
  type RadioChangeEvent,
  Tooltip,
} from "antd";
import type { ImageType } from "~/types";
import { ImageModal, LikeImageButton } from "~/components";
import { convertUtcDateToLocalDateString } from "~/utils";

/**
 *
 * TODO: Try to get endless scroll working on this page. Use this blog for reference: https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
 */

const ExplorePage = () => {
  const loaderData = useLoaderData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const images = loaderData.data || [];
  const totalImages = images.length;
  const [displayImagesStyle, setDisplayImagesStyle] = React.useState("grid");

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
        <Typography.Title level={3}>
          Explore AI Generated Images
        </Typography.Title>
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
              size="small"
              value={displayImagesStyle}
            >
              <Radio.Button value="list">
                <UnorderedListOutlined />
              </Radio.Button>
              <Radio.Button value="grid">
                <TableOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
      {/* <div> */}
      <div className="container pt-8 max-w-5xl">
        <main className="bg-zinc-50">
          <div className="grid grid-cols-3 gap-1 lg:gap-4">
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
            <div className="relative overflow-hidden w-full pt-[100%]">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                className="absolute inset-0 object-cover w-full h-full"
                alt="..."
              />
            </div>
          </div>
        </main>
      </div>

      <Card
        loading={isLoadingData}
        style={{
          height: "calc(100vh - 140px)",
          overflow: "auto",
        }}
        bodyStyle={{
          textAlign: images ? "initial" : "center",
        }}
      >
        {totalImages && displayImagesStyle === "grid" ? (
          <Row gutter={16}>
            {images.map((image: ImageType) => {
              return (
                <Col key={image.id}>
                  <div style={{ marginBottom: 10 }}>
                    <ImageModal width={200} imageData={image} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip
                      title={
                        <Typography.Text style={{ color: "#fff" }}>
                          {image.title}
                          <br />
                          <Typography.Text italic style={{ color: "#fff" }}>
                            {image.prompt}
                            <br />
                            <br />
                            <Typography.Link
                              strong
                              href={`/profile/${image.user.id}`}
                            >
                              {image.user.username}
                            </Typography.Link>
                            <br />
                            {convertUtcDateToLocalDateString(image.createdAt)}
                          </Typography.Text>
                        </Typography.Text>
                      }
                    >
                      <Typography.Text ellipsis style={{ maxWidth: 160 }}>
                        {image.title || "Untitled"}
                      </Typography.Text>
                    </Tooltip>
                    <Popover
                      style={{ display: "block" }}
                      content={
                        <Space size="small" align="center">
                          <Space.Compact direction="vertical">
                            <LikeImageButton imageData={image} />
                            <Button
                              size="small"
                              style={{
                                border: "none",
                                boxShadow: "none",
                                cursor: "default",
                              }}
                              icon={<MessageOutlined />}
                            >
                              <span>
                                {image.comments.length > 0 &&
                                  image.comments.length}
                              </span>
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
          <List
            itemLayout="vertical"
            size="small"
            // size='large'
            // pagination={{
            //   onChange: (page) => {
            //     console.log(page);
            //   },
            //   pageSize: 3,
            // }}
            dataSource={images}
            renderItem={(image: ImageType) => (
              <List.Item
                key={image.id}
                style={{ marginTop: 8, marginBottom: 8 }}
              >
                <List.Item.Meta
                  style={{ margin: 0 }}
                  avatar={<ImageModal imageData={image} />}
                  title={image.title || "Untitled"}
                  description={
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography.Text italic style={{ marginBottom: 8 }}>
                          {image.prompt}
                        </Typography.Text>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <Typography.Link
                            strong
                            href={`/profile/${image.user.id}`}
                          >
                            {image.user.username}
                          </Typography.Link>
                          <Typography.Text italic>
                            {convertUtcDateToLocalDateString(image.createdAt)}
                          </Typography.Text>
                        </div>
                        <Space>
                          <LikeImageButton imageData={image} />
                          <Button
                            size="small"
                            style={{
                              border: "none",
                              boxShadow: "none",
                              cursor: "default",
                            }}
                            icon={<MessageOutlined />}
                          >
                            <span>
                              {image.comments.length > 0 &&
                                image.comments.length}
                            </span>
                          </Button>
                        </Space>
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </>
  );
};

export default ExplorePage;
