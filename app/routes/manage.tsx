import {
  type LoaderFunctionArgs,
  json,
  type ActionFunctionArgs,
  SerializeFrom,
  MetaFunction,
} from "@remix-run/node";
import { Alert } from "antd";
import { ManageImagesPage } from "~/pages";
import { getUserData } from "~/server";
import { getSession } from "~/services";
import { authenticator } from "~/services/auth.server";
import { loader as UserLoaderData } from "../root";
import { invariantResponse } from "~/utils/invariantResponse";
import { GeneralErrorBoundary } from "~/components";

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
    { title: `${username} | Manage Images` },
    {
      name: "Manage AI generated images",
      content: "Manage AI generated images",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const currentLoggedInUserData = googleSessionData;
  const currentLoggedInUserID = currentLoggedInUserData.id || "";

  invariantResponse(currentLoggedInUserID, "User does not exist");

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const data = await getUserData(currentLoggedInUserID, currentPage, pageSize);

  invariantResponse(data.user, "User does not exist");

  return json(data);
};

export type ManageImagesPageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <ManageImagesPage />;
}

export const ErrorBoundary = () => {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        403: () => <p>You do not have permission</p>,
      }}
      unexpectedErrorHandler={(error) => (
        <Alert
          message="Error"
          description="User Profile is currently unavailable"
          type="error"
          showIcon
        />
      )}
    />
  );
};
