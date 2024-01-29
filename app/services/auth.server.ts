import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";
import { prisma } from "./prisma.server";
import { redirect } from "@remix-run/node";
import {
  getSessionUserId,
  combineResponseInits,
  getSessionExpirationDate,
} from "~/utils";
import { safeRedirect } from "remix-utils/safe-redirect";
import { type Password, type User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const SESSION_KEY = "_session";
export const USER_ID_KEY = "userId";

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

export async function getUserId(request: Request) {
  const userId = await getSessionUserId(request);
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { id: userId },
  });
  if (!user) {
    throw await logout({ request });
  }

  // ! TODO: This is for when we have SSO setup until we get to section where we get to SSO section
  // const tempUser = await authenticator.isAuthenticated(request);

  return user.id;
}

export async function login({
  username,
  password,
}: {
  username: User["username"];
  password: string;
}) {
  return verifyUserPassword({ username }, password);
}

// TODO: This is currently being handled on the /signup route action manually b/c
// users can create an account using either email and username or SSO
// export async function signup({
// 	email,
// 	username,
// 	password,
// 	name,
// }: {
// 	email: User['email']
// 	username: User['username']
// 	name: User['name']
// 	password: string
// }) {
// 	const hashedPassword = await getPasswordHash(password)

// 	const user = await prisma.user.create({
// 		select: { id: true },
// 		data: {
// 			email: email.toLowerCase(),
// 			username: username.toLowerCase(),
// 			name,
// 			password: {
// 				create: {
// 					hash: hashedPassword,
// 				},
// 			},
// 		},
// 	})

// 	return user
// }

export async function logout(
  {
    request,
    redirectTo = "/",
  }: {
    request: Request;
    redirectTo?: string;
  },
  responseInit?: ResponseInit,
) {
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  throw redirect(
    safeRedirect(redirectTo),
    combineResponseInits(responseInit, {
      headers: {
        "set-cookie": await sessionStorage.destroySession(cookieSession),
      },
    }),
  );
}

export async function getPasswordHash(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export const requireUserId = async (
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) => {
  const userId = await getUserId(request);
  // const userId = await getSessionUserId(request);
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

export async function requireAnonymous(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect("/explore");
  }
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);
  const user = await prisma.user.findUnique({
    select: { id: true, username: true },
    where: { id: userId },
  });
  if (!user) {
    throw await logout({ request });
  }
  return user;
}

export async function verifyUserPassword(
  where: Pick<User, "username"> | Pick<User, "id">,
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where,
    select: { id: true, password: { select: { hash: true } } },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  return { id: userWithPassword.id };
}
