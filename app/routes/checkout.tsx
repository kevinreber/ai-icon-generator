import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { stripeCheckout } from "~/services/stripe.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as { id: string };

  const url = await stripeCheckout({
    userId: user.id,
  });

  return redirect(url);
};
