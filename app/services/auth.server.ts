import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";
import { prisma } from "./prisma.server";
import { redirect } from "@remix-run/node";

export const SESSION_KEY = "_session";
// export const sessionKey = 'sessionId'

// Create an instance of the authenticator
// It will take session storage as an input parameter and creates the user session on successful authentication
export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: SESSION_KEY,
});
// You may specify a <User> type which the strategies will return (this will be stored in the session)
// export let authenticator = new Authenticator<User>(sessionStorage, { sessionKey: '_session' });

const getCallback = (provider: SocialsProvider) => {
  return `${process.env.ORIGIN}/auth/${provider}/callback`;
};

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: getCallback(SocialsProvider.GOOGLE),
    },
    async ({ profile }) => {
      // here you would find or create a user in your database
      // profile object contains all the user data like image, displayName, id
      return profile;
    },
  ),
);

export const userIdKey = "userId";

export const getUserId = async (request: Request) => {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const userId = cookieSession.get(userIdKey);
  console.log(userId);

  // ! TODO: This is temporary until we get to section where we get to SSO section
  const tempUser = await authenticator.isAuthenticated(request);

  // @ts-ignore
  return tempUser?.id || "";

  if (!userId) return null;
  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { id: userId },
  });
  if (!user) {
    // TODO: When passwords are setup
    // throw await logout({ request })
    return authenticator.logout(request, { redirectTo: "/" });
  }
  return user.id;
};

export const requireUserId = async (
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) => {
  const userId = await getUserId(request);
  if (!userId) {
    const requestUrl = new URL(request.url);
    redirectTo =
      redirectTo === null
        ? null
        : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
    const loginRedirect = ["/login", loginParams?.toString()]
      .filter(Boolean)
      .join("?");
    throw redirect(loginRedirect);
  }
  return userId;
};
