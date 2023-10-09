import React from "react";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import {
  MessageOutlined,
  MoreOutlined,
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
  Tooltip,
  Pagination,
  Avatar,
} from "antd";
import type { ImageType } from "~/types";
import {
  DeleteImageButton,
  DownloadImageButton,
  EditImageButton,
} from "./components";
import { ImageModal, LikeImageButton } from "~/components";
import { convertUtcDateToLocalDateString } from "~/utils";
import { ToggleIsImagePrivateButton } from "./components/ToggleIsImagePrivateButton";

const UserProfilePage = () => {
  const data = useLoaderData();
  const userData = data.user;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("page_size")) || 50;

  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const images = data.images || [];
  const currentImagesShown = images.length;
  const totalImages = data.count;
  const [displayImagesStyle, setDisplayImagesStyle] = React.useState("list");

  const handleImageDisplayChange = (event: RadioChangeEvent) => {
    console.log(event.target.value);
    setDisplayImagesStyle(event.target.value);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setSearchParams((prevParams: any) => ({
      ...prevParams,
      page,
      page_size: pageSize,
    }));
  };

  return (
    <>
      <Space style={{ marginBottom: "1rem", alignItems: "inherit" }}>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          style={{ cursor: "pointer" }}
          icon={<UserOutlined />}
        />
        <div>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {userData.username}
          </Typography.Title>
          <Typography.Text>{totalImages} images</Typography.Text>
        </div>
      </Space>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
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
      <Card
        loading={isLoadingData}
        style={{
          height: "calc(100vh - 228px)",
          overflow: "auto",
        }}
        bodyStyle={{
          textAlign: images ? "initial" : "center",
        }}
      >
        {currentImagesShown && displayImagesStyle === "grid" ? (
          // <Image.PreviewGroup
          //   preview={{
          //     onChange: (current, prev) =>
          //       console.log(`current index: ${current}, prev index: ${prev}`),
          //   }}
          // >
          <Row gutter={16}>
            {images.map((image: ImageType) => {
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
                      content={
                        <Space size="small">
                          <Space.Compact direction="vertical">
                            {/* Align Private Button in center of Popover */}
                            <div style={{ margin: "auto" }}>
                              <ToggleIsImagePrivateButton image={image} />
                            </div>
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
        ) : // </Image.PreviewGroup>
        currentImagesShown && displayImagesStyle === "list" ? (
          <List
            itemLayout="vertical"
            size="small"
            loading={isLoadingData}
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
                extra={
                  <Space direction="vertical" size="small">
                    <div
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      <ToggleIsImagePrivateButton image={image} />
                    </div>
                    <Space>
                      <EditImageButton image={image} />
                      <DownloadImageButton image={image} />
                      <DeleteImageButton image={image} />
                    </Space>
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={<ImageModal imageData={image} />}
                  title={image.title || "Untitled"}
                  style={{ marginBottom: 0 }}
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
                          <Typography.Link href={`/profile/${image.user.id}`}>
                            {image.user.username}
                          </Typography.Link>
                          <Typography.Text italic>
                            {convertUtcDateToLocalDateString(image.createdAt)}
                          </Typography.Text>
                        </div>
                        <Space>
                          <LikeImageButton imageData={image} />
                          <Space>
                            <MessageOutlined />
                            {image.comments.length > 0 && image.comments.length}
                          </Space>
                        </Space>
                      </div>
                    </>
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
      <Pagination
        style={{ padding: 16 }}
        size="small"
        showSizeChanger
        total={totalImages}
        current={currentPage}
        pageSize={currentPageSize}
        showTotal={(total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} images`
        }
        pageSizeOptions={[50, 100, 150, 200]}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default UserProfilePage;
