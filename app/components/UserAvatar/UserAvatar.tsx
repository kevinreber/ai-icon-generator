import React from "react";
import { Popover, Button, Avatar, Space, notification, Typography } from "antd";
import {
  CurrencyDollarIcon as DollarOutlined,
  Cog6ToothIcon as SettingOutlined,
  UserIcon as UserOutlined,
  ArrowLeftEndOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/outline";
import { useLoggedInUser, useRemixFetcher } from "~/hooks";

const UserAvatar = () => {
  const userData = useLoggedInUser();

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
              <span>{userData?.name}</span>
              <Typography.Link strong href={`/profile/${userData?.username}`}>
                {userData?.username}
              </Typography.Link>
            </div>
          </Space>
        }
        content={
          <Space align="center" direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text>
                <DollarOutlined className="size-5" style={{ marginRight: 4 }} />
                {userData?.credits} Credits
              </Typography.Text>
              <Button size="small" href="/checkout" type="link">
                Buy Credits
              </Button>
            </div>
            <Button
              className="full w-32"
              icon={<SettingOutlined className="size-5" />}
              href="/settings"
            >
              Settings
            </Button>
            <Button
              className="full w-32"
              disabled={isLoadingFetcher}
              onClick={handleLogOut}
            >
              <LogoutIcon className="size-5" /> Logout
            </Button>
          </Space>
        }
        trigger="click"
      >
        <Avatar
          style={{ cursor: isLoadingFetcher ? "wait" : "pointer" }}
          icon={<UserOutlined />}
          src={userData?.image}
        />
      </Popover>
    </>
  );
};

export default UserAvatar;
