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
import {
  DeleteImageButton,
  DownloadImageButton,
  EditImageButton,
} from "../ManageImagesPage/components";
import { UserContext } from "~/context";
import PageContainer from "~/components/PageContainer";

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

  const images = collectionData.images || [];
  const totalImages = images.length || 0;
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
    <PageContainer>
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
            <Typography.Link
              italic
              href={`/profile/${collectionData.user.username}`}
            >
              {collectionData.user.username}
            </Typography.Link>
            <Typography.Text italic type="secondary">
              {totalImages} total images
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
      <div className="container pt-8 max-w-5xl">
        {images.length > 0 ? (
          // {/* highlight on hover reference: https://www.hyperui.dev/blog/highlight-hover-effect-with-tailwindcss */}
          <ul className="grid grid-cols-3 gap-1 lg:gap-4 [&:hover>li]:opacity-50">
            {images.map((image: any) => {
              return (
                <li key={image.id} className="hover:!opacity-100">
                  <ImageModal imageData={image} />
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </PageContainer>
  );
};

export default CollectionDetailsPage;
