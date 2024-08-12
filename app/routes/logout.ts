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

  // TODO: The logic below is for logging out with using session cookies
  // const cookieSession = await sessionStorage.getSession(
  // request.headers.get("cookie"),
  // );

  // return redirect("/", {
  //   headers: {
  //     "set-cookie": await sessionStorage.destroySession(cookieSession),
  //   },
  // });

  // The logic below is for logging out using our SSO authenticator session (ex: Google SSO logout)
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
