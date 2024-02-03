import React from "react";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { Typography, Pagination, Table } from "antd";
import { type ManageImagesPageLoader } from "~/routes/manage";
import { TABLE_COLUMNS } from "./TableColumns";
import PageContainer from "~/components/PageContainer";

const ManageImagesPage = () => {
  const data = useLoaderData() as ManageImagesPageLoader;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize = Number(searchParams.get("page_size")) || 50;

  const navigation = useNavigation();
  const isLoadingData = navigation.state !== "idle";
  const images = data.images || [];
  const totalImages = data.count;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setSearchParams((prevParams: any) => ({
      ...prevParams,
      page,
      page_size: pageSize,
    }));
  };

  return (
    <PageContainer>
      <div className="flex justify-between items-baseline">
        <Typography.Title level={3}>
          Manage AI Generated Images
        </Typography.Title>
      </div>

      <Table
        rowKey="id"
        columns={TABLE_COLUMNS}
        dataSource={images}
        bordered
        scroll={{ y: "calc(100vh - 210px)" }}
        pagination={false}
        loading={isLoadingData}
      />
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
    </PageContainer>
  );
};

export default ManageImagesPage;
