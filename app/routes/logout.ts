import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return authenticator.logout(request, { redirectTo: "/" });
  } catch (error) {
    const message = "Error while attempting to log out, please try again";
    console.error(error);
    return {
      success: false,
      message,
      data: {},
      error,
    };
  }
};
