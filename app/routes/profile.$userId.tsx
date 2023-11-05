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
import { getUserData } from "~/server";
import { getSession } from "~/services";
import { authenticator } from "~/services/auth.server";
import { loader as UserLoaderData } from "../root";

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
  const userId = params.userId || "";
  if (!userId) {
    throw new Error("User does not exist");
  }

  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const currentLoggedInUserData = googleSessionData;
  const currentLoggedInUserID = currentLoggedInUserData.id || "";

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  // If UserA is visiting UserB's profile, we do not want to show UserB's Private images to UserA
  const shouldGetUsersPrivateImages = userId === currentLoggedInUserID;
  const data = await getUserData(
    userId,
    currentPage,
    pageSize,
    shouldGetUsersPrivateImages,
  );
  // console.log(data);

  if (!data.user) {
    throw new Error("User does not exist");
  }

  return json(data);
};

export type UserProfilePageLoader = SerializeFrom<typeof loader>;

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const intent = formData.get("intent");

//   switch (intent) {
//     case "_delete_image": {
//       const payload = JSON.parse(formData.get("body") as string);
//       const { imageId = "" } = payload;

//       const response = await deleteUserImage(imageId);
//       console.log("Response ------------------");
//       console.log(response);

//       return response;
//     }
//     default: {
//       return {};
//     }
//   }
// }

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
