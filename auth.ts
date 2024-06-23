import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';

async function login(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    return await response.json();
  } catch (error) {
    console.log(`${login.name} error: `, error);
    return {};
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const { access_token, user } = await login(email, password);
          if (!user) return null;
          return {
            id: user.userId,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            accessToken: access_token,
          };
        }
        return null;
      },
    }),
  ],
});
