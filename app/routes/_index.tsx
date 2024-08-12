import { LandingPage } from "~/pages";
import { MetaFunction, json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Pixel Studio AI" }];
};

export const loader = async () => {
  return json({});
};

export default function Index() {
  return <LandingPage />;
}
