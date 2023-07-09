import React from "react";
import { useLoaderData, useNavigation } from "@remix-run/react";
import {
  HeartOutlined,
  HeartTwoTone,
  LikeOutlined,
  MessageOutlined,
  MoreOutlined,
  StarOutlined,
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
} from "antd";
import type { ImageType } from "~/types";
import { ImageModal } from "./components";

const ExplorePage = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const imagesCreated = data.data || [];
  const totalImages = imagesCreated.length;
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
                    <ImageModal width={200} imageData={image} />
                    {/* <Image
                      width={200}
                      src={image.url}
                      alt={image.prompt}
                      fallback={fallbackImageSource}
                      style={{ borderRadius: 12, cursor: "pointer" }}
                      onClick={() => handleShowImageInModal(image)}
                      preview={false}
                    /> */}
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
                    // <Image
                    //   width={100}
                    //   src={image.url}
                    //   alt={image.prompt}
                    //   fallback={fallbackImageSource}
                    //   style={{ borderRadius: 12, cursor: "pointer" }}
                    //   onClick={() => handleShowImageInModal(image)}
                    //   preview={false}
                    // />
                    <ImageModal imageData={image} />
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
      {/* <ImageModal imageModalData={imageModalData} /> */}
    </>
  );
};

export default ExplorePage;
