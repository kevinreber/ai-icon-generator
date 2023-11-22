import { createCookie } from "@remix-run/node";
import { CSRF, CSRFError } from "remix-utils/csrf/server";

const cookie = createCookie("csrf", {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
  sameSite: "lax",
  secrets: process.env.SESSION_SECRET?.split(","),
});

export const csrf = new CSRF({ cookie });

export const checkCSRFToken = async (formData: FormData, request: Request) => {
  try {
    console.log(request.headers);

    await csrf.validate(formData, request.headers);
  } catch (error) {
    if (error instanceof CSRFError) {
      throw new Response("Invalid CSRF token", { status: 403 });
    }
    throw error;
  }
};
