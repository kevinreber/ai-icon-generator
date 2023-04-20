import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout, Menu, Typography, theme } from "antd";

export default function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>
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
                  background: colorBgContainer,
                }}
              >
                <Outlet />
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
