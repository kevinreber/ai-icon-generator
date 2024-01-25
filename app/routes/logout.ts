import {
  MetaFunction,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { authenticator, logout } from "~/services/auth.server";
import { sessionStorage } from "~/utils";

export const meta: MetaFunction = () => {
  return [{ title: "User Logout" }];
};

export const loader = () => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("logout action.............");

  // return logout({ request, redirectTo: "/" });

  const currentSession = await sessionStorage.getSession();
  return redirect("/", {
    headers: {
      "set-cookie": await sessionStorage.destroySession(currentSession),
    },
  });

  try {
    return authenticator.logout(request, { redirectTo: "/" });
  } catch (error) {
    const message = "Error while attempting to log out, please try again";
    console.error(error);
    return {
      success: false,
      message,
      error,
    };
  }
};
