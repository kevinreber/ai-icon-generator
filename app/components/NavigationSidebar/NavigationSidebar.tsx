import React from "react";
import { Button, Layout, Space, Typography } from "antd";
import { SocialsProvider } from "remix-auth-socials";
import {
  BookOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useFetcher } from "@remix-run/react";
import { UserAvatar } from "~/components";
import { UserContext } from "~/context";

const NavigationSidebar = () => {
  const userData = React.useContext(UserContext);
  const isLoggedIn = Boolean(userData?.id);
  const fetcher = useFetcher();

  const handleLogIn = () => {
    fetcher.submit(
      { intent: "user-log-in" },
      { method: "post", action: `/api/auth/${SocialsProvider.GOOGLE}` },
    );
  };

  return (
    <Layout.Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        textAlign: "center",
        padding: 16,
        borderRight: "rgb(38, 38, 38) 1px solid",
        background: "#000",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography.Link
          href="/"
          style={{
            color: "#e6f1ff",
            height: 64,
            fontSize: 20,
            fontWeight: 600,
            textAlign: "left",
            padding: "0 8px",
          }}
        >
          AI Image Generator
        </Typography.Link>
        <Space direction="vertical" style={{ alignItems: "flex-start" }}>
          <Button
            type="link"
            href="/explore"
            icon={<SearchOutlined />}
            style={{ color: "#fff", fontSize: 16 }}
          >
            Explore
          </Button>
          {isLoggedIn && (
            <>
              <Button
                type="link"
                href="/collections"
                icon={<BookOutlined />}
                style={{ color: "#fff", fontSize: 16 }}
              >
                Collections
              </Button>
              <Button
                href="/create"
                type="link"
                style={{ color: "#fff", fontSize: 16 }}
                icon={<PlusCircleOutlined />}
              >
                Create
              </Button>
              <Button
                type="link"
                href={`/profile/${userData.username}`}
                icon={<UserOutlined />}
                style={{ color: "#fff", fontSize: 16 }}
              >
                Profile
              </Button>
              <Button
                type="link"
                href={`/manage`}
                icon={<ToolOutlined />}
                style={{ color: "#fff", fontSize: 16 }}
              >
                Manage
              </Button>
            </>
          )}
        </Space>
        {isLoggedIn ? (
          <div>
            <UserAvatar />
          </div>
        ) : (
          <Button onClick={handleLogIn}>Sign In</Button>
        )}
      </div>
    </Layout.Sider>
  );
};

export default NavigationSidebar;
