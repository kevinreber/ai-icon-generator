import { json, MetaFunction, SerializeFrom } from "@remix-run/node";
import { SettingsPage } from "~/pages";

export const meta: MetaFunction = () => {
  return [{ title: "Settings Page" }];
};

export const loader = async () => {
  return json({});
};

export type SettingsPageLoader = SerializeFrom<typeof loader>;

export default function Index() {
  return <SettingsPage />;
}
