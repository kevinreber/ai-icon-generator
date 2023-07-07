import { type ActionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionArgs) => {
  try {
    const data = await authenticator.logout(request, { redirectTo: "/" });

    return {
      success: true,
      message: "Successfully logged out",
      data,
    };
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
