import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Layout } from "antd";
import { type LoaderArgs, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { getLoggedInUserData } from "~/server";
import { NavigationSidebar } from "./components";
import { UserContext } from "~/context";

// CSS
import antdStyles from "antd/dist/antd.css";
import darkStyle from "~/css/antd.dark.css";
import globalStyles from "~/css/global.css";

export function links() {
  return [
    { rel: "stylesheet", href: antdStyles },
    { rel: "stylesheet", href: darkStyle },
    { rel: "stylesheet", href: globalStyles },
  ];
}

export let loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return json({ data: undefined });
  }

  const userData = await getLoggedInUserData(user as any);

  return json({ data: userData });
};

export default function App() {
  const loaderData = useLoaderData();
  const userData = loaderData.data;

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        {/* <script
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
        ></script> */}
      </head>
      <body style={{ margin: 0 }}>
        <UserContext.Provider value={userData}>
          {/* <ConfigProvider
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
        > */}
          <Layout>
            <NavigationSidebar />
            <Layout style={{ marginLeft: 200 }}>
              <Layout
                style={{ minHeight: "100vh", width: "95%", margin: "0 auto" }}
              >
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
          </Layout>
          {/* </ConfigProvider> */}
        </UserContext.Provider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
