import { type LoaderArgs, json, type ActionArgs } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Alert } from "antd";
import { UserProfilePage } from "~/pages";
import { getUserData } from "~/server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = params.userId || "";
  if (!userId) {
    throw new Error("User does not exist");
  }

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const searchParams = new URL(request.url).searchParams;
  const currentPage = Math.max(Number(searchParams.get("page") || 1), 1);
  const pageSize = Number(searchParams.get("page_size")) || 50;

  const data = await getUserData(userId, currentPage, pageSize);
  // console.log(data);

  if (!data.user) {
    throw new Error("User does not exist");
  }

  return json(data);
};

// export async function action({ request }: ActionArgs) {
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
        type='error'
        showIcon
      />
    );
  } else if (error instanceof Error) {
    return (
      <Alert
        message='Error'
        description={error.message}
        type='error'
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
        message='Error'
        description='User Profile is currently unavailable'
        type='error'
        showIcon
      />
    );
  }
}
