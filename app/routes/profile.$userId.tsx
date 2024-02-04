import {
  type LoaderFunctionArgs,
  json,
  type ActionFunctionArgs,
  SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Alert } from "antd";
import { UserProfilePage } from "~/pages";
import { getUserDataByUsername } from "~/server";
import { getSession } from "~/services";
import { authenticator } from "~/services/auth.server";
import { loader as UserLoaderData } from "../root";
import { invariantResponse } from "~/utils/invariantResponse";

export const meta: MetaFunction<
  typeof loader,
  { root: typeof UserLoaderData }
> = ({ data, params, matches }) => {
  // TODO: Use user's username instead of userId so we can dynamically store it in our meta tag
  const userId = params.userId;

  // Incase our Profile loader ever fails, we can get logged in user data from root
  const userMatch = matches.find((match) => match.id === "root");
  const username =
    userMatch?.data.data?.username || userMatch?.data.data?.name || userId;

  return [
    { title: `${username} | Profile` },
    {
      name: "description",
      content: `Checkout ${username}'s AI generated images`,
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const username = params.userId || "";
  invariantResponse(username, "Username does not exist");

  // await authenticator.isAuthenticated(request, {
  //   failureRedirect: "/",
  // });

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 250;

  const data = await getUserDataByUsername(username, currentPage, pageSize);

  invariantResponse(data.user, "User does not exist");

  return json(data);
};

export type UserProfilePageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <UserProfilePage />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Alert
        message={`${error.status} ${error.statusText}`}
        description={error.data}
        type="error"
        showIcon
      />
    );
  } else if (error instanceof Error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );

    // <div>
    //   <h1>Error</h1>
    //   <p>{error.message}</p>
    //   <p>The stack trace is:</p>
    //   <pre>{error.stack}</pre>
    // </div>
  } else {
    return (
      <Alert
        message="Error"
        description="User Profile is currently unavailable"
        type="error"
        showIcon
      />
    );
  }
}
