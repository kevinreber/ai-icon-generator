import {
  MetaFunction,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "User Logout" }];
};

export const loader = () => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // TODO: Do this after we get the auth working with Password
  // const cookieSession = await sessionStorage.getSession(
  // 	request.headers.get('cookie'),
  // )
  // return redirect('/', {
  // 	headers: {
  // 		'set-cookie': await sessionStorage.destroySession(cookieSession),
  // 	},
  // })

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
