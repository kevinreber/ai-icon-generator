import React from "react";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { MessageOutlined } from "@ant-design/icons";
import { Typography, Card, List, Space, Pagination } from "antd";
import type { ImageType } from "~/types";
import { CreateCollectionButton } from "./components";
import { ImageModal, LikeImageButton } from "~/components";
import {
  convertNumberToLocaleString,
  convertUtcDateToLocalDateString,
  getPaginationRange,
} from "~/utils";

const CollectionsPage = () => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(data);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  // const images = data.data.images || [];
  // const currentImagesShown = images.length;
  const totalImages = data.data.count;
  const displayImagesStyle = "list";

  const handlePaginationChange = (page: number, pageSize: number) => {
    setSearchParams((prevParams: any) => ({
      ...prevParams,
      page,
      page_size: pageSize,
    }));
  };

  const paginationRange = getPaginationRange(
    currentPage,
    pageSize,
    totalImages
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography.Title level={3}>Collections</Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Space style={{ marginLeft: "auto" }}>
            <Typography.Text>
              {paginationRange.startRange &&
              paginationRange.endRange &&
              totalImages ? (
                <>
                  Showing{" "}
                  {convertNumberToLocaleString(paginationRange.startRange)}-
                  {convertNumberToLocaleString(paginationRange.endRange)} of{" "}
                  {convertNumberToLocaleString(totalImages)} images
                </>
              ) : (
                <Typography.Text italic type='secondary'>
                  No collections created yet
                </Typography.Text>
              )}
            </Typography.Text>
            <CreateCollectionButton />
          </Space>
        </div>
      </div>
      <Card
        loading={isLoadingData}
        style={{
          height: "calc(100vh - 140px)",
          overflow: "auto",
        }}
        // bodyStyle={{
        //   textAlign: images ? "initial" : "center",
        // }}
      >
        {
          // currentImagesShown &&
          displayImagesStyle === "list" ? (
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
              // dataSource={images}
              dataSource={[]}
              renderItem={(image: ImageType) => (
                <List.Item
                  key={image.id}
                  // extra={
                  //   <Space>
                  //     <EditImageButton image={image} />
                  //     <DownloadImageButton image={image} />
                  //     <DeleteImageButton image={image} />
                  //   </Space>
                  // }
                >
                  <List.Item.Meta
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
                            <Space>
                              <MessageOutlined />
                              {image.comments.length > 0 &&
                                image.comments.length}
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
          )
        }
      </Card>
      <Pagination
        style={{ padding: 16 }}
        size='small'
        showSizeChanger
        total={totalImages}
        current={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[50, 100, 150, 200]}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default CollectionsPage;
