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
          return NextResponse.redirect(`${process.env.BASE_URL}/incidents`);
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
        token.role = (user as any).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const user = (session.user as any) || {};
        user.accessToken = token.accessToken;
        user.email = token.email;
        user.id = Number(token.sub) || '';
        user.name = token.name;
        user.role = token.role;
        session.user = user;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
} satisfies NextAuthConfig;
