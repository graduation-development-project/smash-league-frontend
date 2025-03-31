import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {
  InactivatedAccountError,
  InvalidEmailPasswordError,
} from './utils/error';
import { sendRequest } from './utils/api';
import { AccessToken, IUser } from './types/next-auth';
import axios from 'axios';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
    }),
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // const res = await sendRequest<IBackendRes<ILogin>>({
        //   method: "POST",
        //   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-in`,
        //   body: {
        //     email: credentials.username,
        //     password: credentials.password,
        //   },
        // });
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-in`,
            {
              email: credentials.username,
              password: credentials.password,
            },
          );

          // console.log('Check res in authorize', res);

          if (+res.status === 201) {
            return {
              id: res.data?.id,
              name: res.data?.name,
              email: res.data?.email,
              access_token: res.data?.accessToken,
              refresh_token: res.data?.refreshToken,
              userRoles: res.data?.roles || [],
            };
          } else {
            return null;
          }
        } catch (error: any) {
          if (error.status === 400) {
            throw new InvalidEmailPasswordError();
          } else if (error.status === 401) {
            throw new InactivatedAccountError();
          } else {
            throw new Error('Internal Server Error');
          }
        }
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        // console.log("Check user", user);
        token.user = user as IUser;
        token.expires_at = Math.floor(Date.now() / 1000) + 3600; // 1-hour expiry
      }
      if (trigger === 'update' && session?.user?.userRoles) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.user.userRoles = session.user.userRoles;
      }

      if (account) {
        if (account.provider === 'google' && profile?.email) {
          const res = await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login-google`,
            body: { email: profile.email, name: profile.name },
          });

          if (res.status === 200) {
            token.user = {
              id: res.data?.id,
              name: res.data?.name,
              email: res.data?.email,
              access_token: res.data?.access_token,
              refresh_token: res.data?.refresh_token,
            };
          } else {
            throw new Error('Failed to authenticate via Google.');
          }
        }

        return {
          ...token,
          access_token: account.access_token ?? account.accessToken,
          expires_at:
            account.expires_at ?? Math.floor(Date.now() / 1000) + 3600,
          refresh_token: account.refresh_token ?? token.refresh_token,
        };
      }

      // If the access token is still valid, return it
      if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      // Refresh token flow
      if (!token?.user?.refresh_token) {
        console.error('Missing refresh token, logging out.');
        return { ...token, error: 'RefreshTokenError' };
      }

      try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token!,
          }),
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          access_token: tokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
          refresh_token: tokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error('Error refreshing access token:', error);
        return { ...token, error: 'RefreshTokenError' };
      }
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      // console.log("Session:", session.user);
      // Attaching token user to session
      return session;
    },

    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
}
