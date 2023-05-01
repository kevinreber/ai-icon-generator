import type Stripe from "stripe";
import { prisma } from "./prisma.server";

export const handleStripeEvent = async (
  type: string,
  data: Stripe.Event.Data,
  id: string
) => {
  try {
    const isTestEvent = id === "evt_00000000000000";

    if (isTestEvent) {
      return;
    }

    switch (type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = data.object as {
          id: string;
          amount: number;
          metadata: {
            userId: string;
          };
        };

        const creditsToAdd = 100;

        // Update users credits in DB after checkout
        const userData = await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata.userId,
          },
          data: {
            credits: {
              increment: creditsToAdd,
            },
          },
        });

        return userData;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    return;
  } catch (error) {
    console.error({ message: error });
  }
};
