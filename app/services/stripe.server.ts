import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const stripeCheckout = async ({
  userId,
}: {
  userId: string;
}): Promise<string> => {
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.ORIGIN}/generate`!,
    cancel_url: `${process.env.ORIGIN}/generate`!,
    line_items: [{ price: process.env.STRIPE_CREDITS_PRICE_ID, quantity: 1 }],
    mode: "payment",
    metadata: {
      userId: userId,
    },
    payment_method_types: ["card", "us_bank_account"],
  });

  return session.url!;
};
