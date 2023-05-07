import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { Button, Layout, Menu, Space, Typography, ConfigProvider } from "antd";
import { type LoaderArgs, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { DollarOutlined } from "@ant-design/icons";
import { SocialsProvider } from "remix-auth-socials";
import { getUserData } from "~/server/";

export let loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return json({ data: undefined });
  }

  const userData = await getUserData(user as any);

  return json({ data: userData });
};

const INTENT_MAP = {
  USER_LOG_IN: "user-log-in",
  USER_LOG_OUT: "user-log-out",
};

export default function App() {
  const loaderData = useLoaderData();
  const isLoggedIn = loaderData.data;
  const fetcher = useFetcher();

  const handleLogIn = () => {
    fetcher.submit(
      { intent: INTENT_MAP.USER_LOG_IN },
      { method: "post", action: `/auth/${SocialsProvider.GOOGLE}` }
    );
  };

  const handleLogOut = () => {
    fetcher.submit(
      { intent: INTENT_MAP.USER_LOG_OUT },
      { method: "post", action: "/logout" }
    );
  };

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryBorder: "#64ffda",
              colorBgBase: "#0a1930",
              colorPrimary: "#64ffda",
              colorText: "#e6f1ff",
            },
          }}
        >
          <Layout>
            <Layout.Header className='header' style={{ display: "flex" }}>
              <Typography.Title
                level={4}
                style={{ color: "#fff", width: 240, margin: "auto" }}
              >
                AI Icon Generator
              </Typography.Title>
              <Menu
                style={{ width: "100%" }}
                theme='dark'
                mode='horizontal'
                items={[
                  {
                    key: "generate",
                    label: <Link to='/generate'>Generate Icons</Link>,
                  },
                ]}
              />
              <div style={{ margin: "auto" }}>
                {!isLoggedIn ? (
                  <Button onClick={handleLogIn}>Sign In</Button>
                ) : (
                  <Space>
                    <div
                      style={{
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        width: 110,
                      }}
                    >
                      <DollarOutlined style={{ marginRight: 4 }} />
                      <p style={{ display: "flex", alignItems: "center" }}>
                        {loaderData.data?.credits} Credits
                      </p>
                    </div>

                    <Button
                      icon={<DollarOutlined />}
                      href='/checkout'
                      type='primary'
                      ghost
                    >
                      Buy Credits
                    </Button>

                    <Button onClick={handleLogOut}>Logout</Button>
                  </Space>
                )}
              </div>
            </Layout.Header>
            <Layout style={{ minHeight: "96vh", width: "80%", margin: "auto" }}>
              {/* <Layout.Sider width={200} style={{ background: colorBgContainer }}> */}
              {/* <Menu
                mode='inline'
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                items={[{ key: "generate", label: "Generate" }]}
              /> */}
              {/* </Layout.Sider> */}
              <Layout>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
                <Layout.Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Outlet />
                </Layout.Content>
              </Layout>
            </Layout>
          </Layout>
        </ConfigProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
