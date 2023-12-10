import { type LoaderFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { Alert } from "antd";
import { GeneralErrorBoundary } from "~/components";
import { requireUserWithRole } from "~/utils";

export const meta: MetaFunction = () => {
  return [{ title: "Admin Page" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserWithRole(request, "admin");

  return json({});
};

export default function Index() {
  return (
    <>
      <h2>Admin Page</h2>
      <p>In progress...</p>
    </>
  );
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
          description="You do not have permission to view this page"
          type="error"
          showIcon
        />
      )}
    />
  );
};
