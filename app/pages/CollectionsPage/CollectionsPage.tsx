import React from "react";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { Typography, Card, List, Space, Pagination } from "antd";
import type { GetUserCollectionsAPIResponse } from "~/types";
import { convertNumberToLocaleString, getPaginationRange } from "~/utils";
import {
  CreateCollectionButton,
  DeleteCollectionButton,
  EditCollectionButton,
} from "~/components";
import PageContainer from "~/components/PageContainer";

const CollectionsPage = () => {
  const loaderData = useLoaderData() as unknown as {
    data: GetUserCollectionsAPIResponse;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const collections = loaderData.data.collections || [];

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("page_size")) || 50;

  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";

  const totalCollections = loaderData.data.count;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setSearchParams((prevParams: any) => ({
      ...prevParams,
      page,
      page_size: pageSize,
    }));
  };

  const paginationRange = getPaginationRange(
    currentPage,
    currentPageSize,
    totalCollections,
  );

  return (
    <PageContainer>
      <div className="flex justify-between items-baseline">
        <Typography.Title level={3}>Collections</Typography.Title>
        <CreateCollectionButton />
      </div>
      <Card
        loading={isLoadingData}
        className="md:h-[calc(100vh-140px)]  h-[calc(100vh-260px)] overflow-auto"
      >
        <List
          itemLayout="horizontal"
          dataSource={collections}
          renderItem={(collection) => (
            <List.Item
              key={collection.id}
              actions={[
                <EditCollectionButton
                  key="edit=collection"
                  collection={collection}
                />,
                <DeleteCollectionButton
                  key="delete-collection"
                  collectionId={collection.id}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/collections/${collection.id}`}>
                    {collection.title}
                  </Link>
                }
                description={collection.description}
              />
              <Typography.Text type="secondary">
                {convertNumberToLocaleString(collection.images.length)} images
              </Typography.Text>
            </List.Item>
          )}
        />
      </Card>
      <div className="flex w-full justify-between items-center">
        <Pagination
          style={{ padding: 16 }}
          size="small"
          showSizeChanger
          total={totalCollections}
          current={currentPage}
          pageSize={currentPageSize}
          pageSizeOptions={[50, 100, 150, 200]}
          onChange={handlePaginationChange}
        />
        <Typography.Text>
          {paginationRange.startRange &&
          paginationRange.endRange &&
          totalCollections ? (
            <>
              Showing {convertNumberToLocaleString(paginationRange.startRange)}-
              {convertNumberToLocaleString(paginationRange.endRange)} of{" "}
              {convertNumberToLocaleString(totalCollections)} collections
            </>
          ) : (
            <Typography.Text italic type="secondary">
              No collections created yet
            </Typography.Text>
          )}
        </Typography.Text>
      </div>
    </PageContainer>
  );
};

export default CollectionsPage;
