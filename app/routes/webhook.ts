import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { stripe } from "~/services/stripe.server";
import { handleStripeEvent } from "~/services/webhook.server";

//[credit @kiliman to get this webhook working](https://github.com/remix-run/remix/discussions/1978)
export const action: ActionFunction = async ({ request }) => {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  try {
    const { type, data, id } = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEB_HOOK_SECRET!
    );

    const userData = await handleStripeEvent(type, data, id);

    return { data: userData };
  } catch (err: any) {
    throw json({ errors: [{ message: err.message }] }, 400);
  }
};
