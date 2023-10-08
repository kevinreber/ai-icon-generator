import { authenticator } from "~/services/auth.server";
import { SocialsProvider } from "remix-auth-socials";
import { type ActionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  // initiating authentication using Google Strategy
  // on success --> redirect to dasboard
  // on failure --> back to homepage/login
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/create",
    failureRedirect: "/",
  });
};
