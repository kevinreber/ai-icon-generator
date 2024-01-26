import React from "react";
import { Popover, Button, Avatar, Space, notification, Typography } from "antd";
import {
  DollarOutlined,
  SettingOutlined,
  UserOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { useRemixFetcher } from "~/hooks";
import { UserContext } from "~/context";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const UserAvatar = () => {
  const userData = React.useContext(UserContext);
  const { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });

  const handleLogOut = () => {
    fetcher.submit(
      { intent: "user-log-out" },
      { method: "post", action: "/logout" },
    );
    notification.success({ message: "Successfully logged out" });
  };

  return (
    <>
      <Popover
        // placement="bottomRight"
        title={
          <Space>
            <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Space direction='vertical' size='small'> */}
              <span>{userData.name}</span>
              <Typography.Link strong href={`/profile/${userData.username}`}>
                {userData.username}
              </Typography.Link>
            </div>
          </Space>
        }
        content={
          <Space align="center" direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text>
                <DollarOutlined style={{ marginRight: 4 }} />
                {userData.credits} Credits
              </Typography.Text>
              <Button size="small" href="/checkout" type="link">
                Buy Credits
              </Button>
            </div>
            <Button
              className="full w-32"
              icon={<SettingOutlined />}
              href="/settings"
            >
              Settings
            </Button>
            <Button
              className="full w-32"
              disabled={isLoadingFetcher}
              onClick={handleLogOut}
            >
              <IconFont type="icon-tuichu" /> Logout
            </Button>
          </Space>
        }
        trigger="click"
      >
        <Avatar
          style={{ cursor: isLoadingFetcher ? "wait" : "pointer" }}
          icon={<UserOutlined />}
        />
      </Popover>
    </>
  );
};

export default UserAvatar;
