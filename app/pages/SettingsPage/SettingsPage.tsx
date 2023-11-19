import React from "react";
import { Typography } from "antd";
import { EditUserForm } from "~/components";

const SettingsPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography.Title level={3}>Settings</Typography.Title>
      </div>
      <div className="container pt-8 max-w-5xl">
        <EditUserForm />
      </div>
    </>
  );
};

export default SettingsPage;
