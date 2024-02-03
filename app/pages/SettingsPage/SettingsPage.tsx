import React from "react";
import { Typography } from "antd";
import { EditUserForm } from "~/components";
import PageContainer from "~/components/PageContainer";

const SettingsPage = () => {
  return (
    <PageContainer>
      <div className="flex justify-between items-baseline">
        <Typography.Title level={3}>Settings</Typography.Title>
      </div>
      <div className="container pt-8 max-w-5xl">
        <EditUserForm />
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
