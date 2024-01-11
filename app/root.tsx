import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Button, Layout, Result } from "antd";
import {
  type LoaderFunctionArgs,
  json,
  type LinksFunction,
  type SerializeFrom,
  DataFunctionArgs,
  redirect,
} from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { authenticator } from "~/services/auth.server";
import { getLoggedInUserData } from "~/server";
import {
  GeneralErrorBoundary,
  NavigationSidebar,
  ShowToast,
} from "./components";
import { UserContext } from "~/context";
import { Theme } from "@radix-ui/themes";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { Toaster } from "sonner";
import {
  combineHeaders,
  csrf,
  getTheme,
  getToast,
  honeypot,
  invariantResponse,
  sessionStorage,
  setTheme,
  toastSessionStorage,
} from "./utils";

// CSS
import antdStyles from "antd/dist/antd.css";
import darkStyle from "~/styles/antd.dark.css";
import globalStyles from "~/styles/global.css";
import tailwindStyles from "~/styles/tailwind.css";
import radixUIStyles from "@radix-ui/themes/styles.css";
import { z } from "zod";
import { parse } from "@conform-to/zod";
import { useTheme } from "./hooks/useTheme";

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

  const { toast, headers: toastHeaders } = await getToast(request);
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const userId = cookieSession.get("userId");
  console.log(userId);

  if (userId && !user) {
    // Edge case: something weird happened... The user is authenticated but we can't find
    // them in the database. Maybe they were deleted? Let's log them out.
    throw redirect("/", {
      headers: {
        "set-cookie": await sessionStorage.destroySession(cookieSession),
      },
    });
  }

  // if (!user) {
  //   throw json({ data: undefined });
  // }

  const userData = !user
    ? null
    : await getLoggedInUserData(user as any, request);

  console.log(userData);

  // const cookieSession = await sessionStorage.getSession(
  //   request.headers.get("cookie"),
  // );

  // TODO: figure out where to set this userId
  // @ts-ignore
  if (userData && userData.id) {
    // @ts-ignore
    cookieSession.set("userId", userData.id || "");
    await sessionStorage.commitSession(cookieSession);
  }

  return json(
    { userData, honeyProps, csrfToken, theme: getTheme(request), toast },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null,
        toastHeaders,
      ),
    },
  );
};

export type RootLoaderData = typeof loader;

export const ThemeFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  invariantResponse(
    formData.get("intent") === "update-theme",
    "Invalid intent",
    { status: 400 },
  );
  const submission = parse(formData, {
    schema: ThemeFormSchema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "success", submission } as const);
  }
  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }
  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ success: true, submission }, responseInit);
}

export type RootActionData = typeof action;

export default function App() {
  const loaderData = useLoaderData<RootLoaderData>();
  const userData = loaderData.userData;
  const theme = useTheme();

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
      <body style={{ margin: 0 }} className="dark h-full">
        {/* <Theme appearance="dark"> */}
        {/* TODO: Integrate theme when ready, will need to tweak some AntDesign components */}
        {/* <Theme appearance={theme}> */}
        <Toaster closeButton position="top-center" richColors />
        <AuthenticityTokenProvider token={loaderData.csrfToken}>
          <HoneypotProvider {...loaderData.honeyProps}>
            {/* @ts-ignore */}
            <UserContext.Provider value={userData}>
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
            </UserContext.Provider>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </HoneypotProvider>
        </AuthenticityTokenProvider>
        {loaderData.toast ? <ShowToast toast={loaderData.toast} /> : null}
        {/* </Theme> */}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" href="/">
                Back to Home
              </Button>
            }
          />
        ),
      }}
    />
  );
}
