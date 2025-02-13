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
    Google({
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
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
            role: "athlete",
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
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user as IUser; // Store the user in the JWT // Store access_token for API calls
      }

      if (account) {
        if (account.provider === "google" && profile?.email) {
          const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login-google`,
            body: { email: profile.email, name: profile.name },
          });

          if (res.statusCode === 201) {
            token.user = {
              _id: res.data?._id,
              name: res.data?.name,
              email: res.data?.email,
              role: "admin",
            };
          } else {
            throw new Error("Failed to authenticate via Google.");
          }
        }

        return {
          ...token,
          accessToken: account.access_token ?? account.accessToken,
          expires_at:
            account.expires_at ?? Math.floor(Date.now() / 1000) + 3600,
          refresh_token: account.refresh_token ?? token.refresh_token,
        };
      }

      if (Date.now() < (token.access_expire ?? token.expires_at) * 1000) {
        return token;
      }

      if (!token.refresh_token) {
        throw new TypeError("Missing refresh_token");
      }

      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          accessToken: tokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
          refresh_token: tokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access_token", error);
        token.error = "RefreshTokenError";
        return token;
      }
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

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}
