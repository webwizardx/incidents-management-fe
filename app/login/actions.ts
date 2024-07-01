'use server';

import { signIn, signOut } from '@/auth';
import { headers } from 'next/headers';
import { CheckPermissionsQuery, CheckPermissionsResponse } from './types';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

export async function checkPermissions({
  id,
  ...query
}: CheckPermissionsQuery): Promise<CheckPermissionsResponse> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/permissions/users/${id}`
    );
    url.search = new URLSearchParams(query as any).toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${checkPermissions.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(
      `[${checkPermissions.name}] ERROR - ${JSON.stringify(error)}`
    );
    return null as any;
  }
}

export async function logout() {
  await signOut();
}
