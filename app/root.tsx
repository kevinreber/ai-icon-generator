import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { Button, Layout, Space, Typography, ConfigProvider } from "antd";
import { type LoaderArgs, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { SocialsProvider } from "remix-auth-socials";
import { getUserData } from "~/server";
import { UserAvatar } from "./components";

// CSS
import globalStyles from "~/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: globalStyles }];
}

export let loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return json({ data: undefined });
  }

  const userData = await getUserData(user as any);

  return json({ data: userData });
};

export default function App() {
  const loaderData = useLoaderData();
  const isLoggedIn = loaderData.data;
  const fetcher = useFetcher();

  const handleLogIn = () => {
    fetcher.submit(
      { intent: "user-log-in" },
      { method: "post", action: `/auth/${SocialsProvider.GOOGLE}` }
    );
  };

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <script
          data-name='BMC-Widget'
          data-cfasync='false'
          src='https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js'
          data-id='kevinreber'
          data-description='Support me on Buy me a coffee!'
          data-message='Thank you for visiting! Buy me a coffee so I build more cool things ☕'
          data-color='#40DCA5'
          data-position='Right'
          data-x_margin='18'
          data-y_margin='18'
        ></script>
      </head>
      <body style={{ margin: 0 }}>
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
            <Layout.Header
              className='header'
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography.Link
                href='/'
                style={{
                  color: "#e6f1ff",
                  width: 240,
                  margin: "auto 0",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                AI Icon Generator
              </Typography.Link>

              <Space>
                <Button
                  type='link'
                  href='/explore'
                  style={{ width: 100, color: "#fff" }}
                >
                  Explore
                </Button>
                {!isLoggedIn ? (
                  <Button onClick={handleLogIn}>Sign In</Button>
                ) : (
                  <>
                    <Button
                      href='/creations'
                      type='link'
                      style={{ width: 100, color: "#fff" }}
                    >
                      Creations
                    </Button>
                    <Button
                      href='/create'
                      type='primary'
                      ghost
                      style={{ width: 100, marginRight: 10 }}
                    >
                      Create
                    </Button>
                    <UserAvatar />
                  </>
                )}
              </Space>
            </Layout.Header>
            <Layout style={{ minHeight: "96vh", width: "80%", margin: "auto" }}>
              <Layout>
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
