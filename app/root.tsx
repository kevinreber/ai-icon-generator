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
import {
  type LoaderFunctionArgs,
  json,
  type LinksFunction,
  type SerializeFrom,
} from "@remix-run/node";
// TODO: setup in Remix v2
import { cssBundleHref } from "@remix-run/css-bundle";
import { authenticator } from "~/services/auth.server";
import { getLoggedInUserData } from "~/server";
import { NavigationSidebar } from "./components";
import { UserContext } from "~/context";
import { Theme } from "@radix-ui/themes";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { csrf, honeypot } from "./utils";

// CSS
import antdStyles from "antd/dist/antd.css";
import darkStyle from "~/styles/antd.dark.css";
import globalStyles from "~/styles/global.css";
import tailwindStyles from "~/styles/tailwind.css";
import radixUIStyles from "@radix-ui/themes/styles.css";

// @ts-ignore
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: antdStyles },
    { rel: "stylesheet", href: darkStyle },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: radixUIStyles },
    cssBundleHref ? { rel: "stylesheet", href: cssBundleHref } : null,
  ].filter(Boolean);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const honeyProps = honeypot.getInputProps();
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  console.log(csrfToken);
  console.log(csrfCookieHeader);

  // if (!user) {
  //   throw json({ data: undefined });
  // }

  const userData = !user ? {} : await getLoggedInUserData(user as any);

  return json(
    { data: userData, honeyProps, csrfToken },
    {
      headers: csrfCookieHeader
        ? {
            "set-cookie": csrfCookieHeader,
          }
        : {},
    },
  );
};

type LoaderData = SerializeFrom<typeof loader>;

export default function App() {
  const loaderData = useLoaderData<LoaderData>();
  const userData = loaderData.data;

  return (
    <html lang="en">
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
      {/* Adding className="dark" ensures our app will always use dark mode via radix-ui – @reference: https://stackoverflow.com/a/77276471*/}
      <body style={{ margin: 0 }} className="dark">
        <Theme>
          <AuthenticityTokenProvider token={loaderData.csrfToken}>
            <HoneypotProvider {...loaderData.honeyProps}>
              {/* @ts-ignore */}
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
                      style={{
                        minHeight: "100vh",
                        width: "95%",
                        margin: "0 auto",
                      }}
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
            </HoneypotProvider>
          </AuthenticityTokenProvider>
        </Theme>
      </body>
    </html>
  );
}
