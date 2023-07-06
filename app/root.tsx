import React from "react";
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
  useLocation,
} from "@remix-run/react";
import { Button, Layout, Menu, Space, Typography, ConfigProvider } from "antd";
import { type LoaderArgs, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { DollarOutlined } from "@ant-design/icons";
import { SocialsProvider } from "remix-auth-socials";
import { getUserData } from "~/server";
import * as gtag from "~/services/client/gtags.client";

export let loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return json({ data: undefined });
  }

  const userData = await getUserData(user as any);

  return json({ data: { userData, gaTrackingId: process.env.GA_TRACKING_ID } });
};

const INTENT_MAP = {
  USER_LOG_IN: "user-log-in",
  USER_LOG_OUT: "user-log-out",
};

export default function App() {
  const loaderData = useLoaderData();
  const location = useLocation();

  const isLoggedIn = loaderData.data.userData;
  const { gaTrackingId } = loaderData.data;
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

  React.useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  const navBarMenuItems = [
    {
      key: "generate",
      label: <Link to='/generate'>Generate Icons</Link>,
    },
    {
      key: "explore",
      label: <Link to='/explore'>Explore</Link>,
    },
  ];

  if (isLoggedIn) {
    navBarMenuItems.push({
      key: "creations",
      label: <Link to='/creations'>Creations</Link>,
    });
  }

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>
        {/* Reference to setup Google Analytics: https://github.com/remix-run/examples/tree/main/google-analytics */}
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id='gtag-init'
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        <ConfigProvider
          theme={{
            hashed: false,
            token: {
              colorPrimaryBorder: "#64ffda",
              colorBgBase: "#0a1930",
              colorPrimary: "#64ffda",
              colorText: "#e6f1ff",
              colorTextSecondary: "#ccd7f5",
              colorTextPlaceholder: "#495670",
              colorTextDisabled: "#495670",
            },
          }}
        >
          <Layout>
            <Layout.Header className='header' style={{ display: "flex" }}>
              <Typography.Link
                href='/'
                style={{
                  color: "#e6f1ff",
                  width: 240,
                  margin: "auto",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                AI Icon Generator
              </Typography.Link>
              <Menu
                style={{ width: "100%" }}
                theme='dark'
                mode='horizontal'
                items={navBarMenuItems}
              />
              <div>
                {!isLoggedIn ? (
                  <Button onClick={handleLogIn}>Sign In</Button>
                ) : (
                  <Space style={{ lineHeight: "normal" }}>
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
