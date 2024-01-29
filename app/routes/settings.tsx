import {
  DataFunctionArgs,
  json,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import { SettingsPage } from "~/pages";
import { requireUserId } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "Settings Page" }];
};

export async function loader({ request }: DataFunctionArgs) {
  await requireUserId(request);
  return json({});
}

export type SettingsPageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <SettingsPage />;
}
