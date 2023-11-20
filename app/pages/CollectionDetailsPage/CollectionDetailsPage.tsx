import React from "react";
import {
  // Link,
  useLoaderData,
  useNavigation,
  // useSearchParams,
} from "@remix-run/react";
import {
  Typography,
  Card,
  // List,
  Space,
  // Pagination,
  Row,
  Col,
  Tooltip,
  Popover,
  Button,
  Empty,
} from "antd";
import type { GetCollectionDataAPIResponse, ImageType } from "~/types";
import {
  // convertNumberToLocaleString,
  convertUtcDateToLocalDateString,
  // getPaginationRange,
} from "~/utils";
import {
  DeleteCollectionButton,
  EditCollectionButton,
  ImageModal,
} from "~/components";
import { MoreOutlined } from "@ant-design/icons";
import {
  DeleteImageButton,
  DownloadImageButton,
  EditImageButton,
} from "../ManageImagesPage/components";
import { UserContext } from "~/context";

const DEFAULT_COLLECTION_DATA = {
  id: "",
  title: "",
  description: "",
  user: { id: "", username: "" },
  createdAt: "",
  updatedAt: "",
  images: [],
};

const CollectionDetailsPage = () => {
  const loaderData = useLoaderData() as unknown as {
    data: GetCollectionDataAPIResponse;
  };
  // const [searchParams, setSearchParams] = useSearchParams();
  const collectionData = loaderData.data.collection || DEFAULT_COLLECTION_DATA;

  const collections = collectionData.images || [];
  const totalCollections = collections.length || 0;
  const userData = React.useContext(UserContext);

  // const currentPage = Number(searchParams.get("page")) || 1;
  // const pageSize = Number(searchParams.get("page_size")) || 50;

  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  const isCurrentUsersCollection = collectionData.user.id === userData.id;

  // const handlePaginationChange = (page: number, pageSize: number) => {
  //   setSearchParams((prevParams: any) => ({
  //     ...prevParams,
  //     page,
  //     page_size: pageSize,
  //   }));
  // };

  // const paginationRange = getPaginationRange(
  //   currentPage,
  //   pageSize,
  //   totalCollections
  // );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1rem",
        }}
      >
        <Space direction="vertical" size="small">
          <Typography.Title level={3}>{collectionData.title}</Typography.Title>
          <Typography.Text>{collectionData.description}</Typography.Text>
          <Space>
            <Typography.Text italic>Created by</Typography.Text>
            <Typography.Link italic href={`/profile/${collectionData.user.id}`}>
              {collectionData.user.username}
            </Typography.Link>
            <Typography.Text italic type="secondary">
              {totalCollections} total images
            </Typography.Text>
          </Space>
        </Space>

        {isCurrentUsersCollection && (
          <Space style={{ marginLeft: "auto" }}>
            <EditCollectionButton
              key="edit-collection"
              // @ts-ignore
              collection={collectionData}
            />
            <DeleteCollectionButton
              key="delete-collection"
              collectionId={collectionData.id}
            />
          </Space>
        )}
      </div>
      <Card
        loading={isLoadingData}
        style={{
          height: "calc(100vh - 210px)",
          overflow: "auto",
        }}
      >
        {collectionData.images.length > 0 ? (
          <Row gutter={16}>
            {collectionData.images.map((image: ImageType) => {
              return (
                <Col key={image.id}>
                  <div style={{ marginBottom: 10 }}>
                    <ImageModal imageData={image} />
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
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
      {/* <Pagination
        style={{ padding: 16 }}
        size='small'
        showSizeChanger
        total={totalCollections}
        current={currentPage}
        pageSize={pageSize}
        pageSizeOptions={[50, 100, 150, 200]}
        onChange={handlePaginationChange}
      /> */}
    </>
  );
};

export default CollectionDetailsPage;
