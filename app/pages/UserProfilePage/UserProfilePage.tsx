import React from "react";
import { useLoaderData } from "@remix-run/react";
import { Avatar, Space, Typography } from "antd";
import { ImageModal } from "~/components";
import { type UserProfilePageLoader } from "~/routes/profile.$userId";
import { UserOutlined } from "@ant-design/icons";
import PageContainer from "~/components/PageContainer";

/**
 *
 * TODO: Try to get endless scroll working on this page. Use this blog for reference: https://dev.to/vetswhocode/infinite-scroll-with-remix-run-1g7
 */

const UserProfilePage = () => {
  const loaderData = useLoaderData<UserProfilePageLoader>();
  const images = loaderData.images || [];
  const userData = loaderData.user;
  const totalImages = loaderData.count;

  return (
    <PageContainer>
      <Space style={{ alignItems: "inherit" }}>
        <Avatar
          size={{ md: 40, lg: 64, xl: 80, xxl: 100 }}
          style={{ cursor: "pointer" }}
          icon={<UserOutlined />}
        />
        <div>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            {userData?.username || ""}
          </Typography.Title>
          <Typography.Text>{totalImages} images</Typography.Text>
        </div>
      </Space>
      <div className="container pt-8 max-w-5xl">
        {/* highlight on hover reference: https://www.hyperui.dev/blog/highlight-hover-effect-with-tailwindcss */}
        <ul className="grid grid-cols-3 gap-1 lg:gap-4 [&:hover>li]:opacity-50">
          {images.map((image: any) => {
            return (
              <li key={image.id} className="hover:!opacity-100">
                <ImageModal imageData={image} />
              </li>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default UserProfilePage;
