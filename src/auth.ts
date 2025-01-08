import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactivatedAccountError,
  InvalidEmailPasswordError,
} from "./utils/error";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (+res.statusCode === 201) {
          // return user object with their profile data
          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
          };
          //401 is wrong password
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
          //400 is account is not activated
        } else if (+res.statusCode === 400) {
          throw new InactivatedAccountError();
        } else {
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      // console.log("Check account", account);
      // console.log("Check profile", profile);
      if (account?.provider === "google" && profile?.email) {
        // Call your API to handle login or user creation for Google
        const res = await sendRequest<IBackendRes<any>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login-google`,
          body: { email: profile.email, name: profile.name },
        });

        console.log("Check res", res);

        if (+res.statusCode === 201) {
          token.user = {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
          };
        } else {
          throw new Error("Failed to authenticate via Google.");
        }
      }

      if (user) {
        token.user = user as IUser; // Attaching user to token
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user; // Attaching token user to session
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
