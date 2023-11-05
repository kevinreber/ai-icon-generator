import { type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { SocialsProvider } from "remix-auth-socials";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/create",
    failureRedirect: "/",
  });
};
