'use server';

import { signIn, signOut } from '@/auth';
import { headers } from 'next/headers';
import {
  CheckCurrentPermissionsQuery,
  CheckPermissionsResponse,
  GetUserPermissionsResponse,
} from './types';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/incidents',
    });
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

export async function checkCurrentPermissions(
  query: CheckCurrentPermissionsQuery
): Promise<CheckPermissionsResponse> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/permissions/users/check-current`
    );
    url.search = new URLSearchParams(query as any).toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${checkCurrentPermissions.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(
      `[${checkCurrentPermissions.name}] ERROR - ${JSON.stringify(error)}`
    );
    return null as any;
  }
}

export async function getUserPermissions(
  userId?: number
): Promise<GetUserPermissionsResponse[]> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/permissions/users${
        userId ? `?id=${userId}` : ''
      }`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getUserPermissions.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(
      `[${getUserPermissions.name}] ERROR - ${JSON.stringify(error)}`
    );
    return null as any;
  }
}

export async function logout() {
  await signOut();
}
