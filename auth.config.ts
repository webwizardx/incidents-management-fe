import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

const PUBLIC_PAGES = ['/login'];

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);

      if (PUBLIC_PAGES.includes(request.nextUrl.pathname)) {
        if (isLoggedIn) {
          return NextResponse.redirect(`${process.env.BASE_URL}/dashboard`);
        }
        return true;
      }
      if (!isLoggedIn) {
        return NextResponse.redirect(`${process.env.BASE_URL}/login`);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const user = (session.user as any) || {};
        user.id = token.sub || '';
        user.name = token.name;
        user.email = token.email;
        user.accessToken = token.accessToken;
        session.user = user;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
} satisfies NextAuthConfig;
