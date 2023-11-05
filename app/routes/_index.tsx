import { LandingPage } from "~/pages";
import { MetaFunction, json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "AI Image Generator" }];
};

export const loader = async () => {
  return json({});
};

export default function Index() {
  return <LandingPage />;
}
