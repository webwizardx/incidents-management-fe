'use server';

import { i18n } from '@/app/i18n';
import { PaginatedResponse } from '@/app/types';
import { buildQuery, cleanObject } from '@/helpers';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { QueryRole, QueryUser, Role, User } from './types';

export async function createUser(
  payload: Omit<User, 'id' | 'role'>
): Promise<User> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users`);
    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'POST',
    });

    console.log(`[${createUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    revalidatePath('/users');
    return data;
  } catch (error) {
    console.error(
      `[${createUser.name}] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  } finally {
    redirect('/users');
  }
}

export async function getRoles(
  query: QueryRole = {}
): Promise<PaginatedResponse<Role>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/roles`);
    url.search = new URLSearchParams(query as any).toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getRoles.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getRoles.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getUser(id: number): Promise<User> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getUsers(
  query: QueryUser = {}
): Promise<PaginatedResponse<User>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users`);
    const params = buildQuery(query);
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getUsers.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    data.data = data.data.map((user: User) => ({
      ...user,
      ...(user.role
        ? { role: { ...user.role, name: i18n.roles[user.role.name] } }
        : {}),
    }));
    return data;
  } catch (error) {
    console.error(`[${getUsers.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function updateUser(
  id: number,
  payload: Partial<Omit<User, 'id' | 'role'>>
): Promise<User> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PUT',
    });

    console.log(`[${updateUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    revalidatePath('/users');
    return data;
  } catch (error) {
    console.error(`[${updateUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/users');
  }
}

export async function patchUser(
  id: number,
  payload: Partial<Omit<User, 'id' | 'role'>>
): Promise<User> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PATCH',
    });

    console.log(`[${patchUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    revalidatePath('/users');
    return data;
  } catch (error) {
    console.error(`[${patchUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/users');
  }
}

export async function deleteUser(id: number): Promise<User> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'DELETE',
    });

    console.log(`[${deleteUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    revalidatePath('/users');
    return data;
  } catch (error) {
    console.error(`[${deleteUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/users');
  }
}
