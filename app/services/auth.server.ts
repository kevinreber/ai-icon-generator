import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";
import bcrypt from "bcryptjs";

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

export const getPasswordHash = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
