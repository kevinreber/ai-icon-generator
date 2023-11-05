import { LandingPage } from "~/pages";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({});
};

export default function Index() {
  return <LandingPage />;
}
