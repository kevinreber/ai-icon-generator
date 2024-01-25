import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "pixstudio_session", // "pixstudio" stands for "Pixels Studio"
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: process.env.SESSION_SECRET!.split(","),
    secure: process.env.NODE_ENV === "production",
  },
});

export const getSessionUserId = async (request: Request) => {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  return cookieSession.get("userId");
};
