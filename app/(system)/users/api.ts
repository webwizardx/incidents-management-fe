import { PaginatedResponse } from '@/app/types';
import { cleanObject, customFetch } from '@/helpers';
import { QueryRole, QueryUser, Role, User } from './types';

export async function createUser(
  payload: Omit<User, 'id' | 'role'>
): Promise<User> {
  try {
    const cleanedPayload = cleanObject(payload);
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users`);

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      method: 'POST',
    });

    console.log(`[${createUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    return data;
  } catch (error) {
    console.error(`[${createUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getRoles(
  query: QueryRole = {}
): Promise<PaginatedResponse<Role>> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/roles`);
    url.search = new URLSearchParams(query as any).toString();

    let response;

    response = await fetch(url.toString(), { cache: 'no-store' });

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

export async function getUsers(
  query: QueryUser = {}
): Promise<PaginatedResponse<User>> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users`);
    url.search = new URLSearchParams(query as any).toString();

    let response;

    response = await fetch(url.toString(), { cache: 'no-store' });

    console.log(`[${getUsers.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getUsers.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getUsersV2({
  isBrowserCall = false,
  query = {},
}: {
  query: QueryUser;
  isBrowserCall: boolean;
}): Promise<PaginatedResponse<User>> {
  try {
    const url = new URL(
      `${
        isBrowserCall
          ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
          : process.env.NEXT_PUBLIC_API_BASE_URL
      }${isBrowserCall ? '' : '/api'}/users`
    );
    url.search = new URLSearchParams(query as any).toString();

    let response;

    if (isBrowserCall) {
      response = await fetch(url.toString(), { cache: 'no-store' });
    } else {
      response = await customFetch(url.toString(), { cache: 'no-store' });
    }

    console.log(`[${getUsersV2.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getUsersV2.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function updateUser(
  id: number,
  payload: Partial<Omit<User, 'id' | 'role'>>
): Promise<User> {
  try {
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      method: 'PUT',
    });

    console.log(`[${updateUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    return data;
  } catch (error) {
    console.error(`[${updateUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function deleteUser(id: number): Promise<User> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      method: 'DELETE',
    });

    console.log(`[${deleteUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    return data;
  } catch (error) {
    console.error(`[${deleteUser.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}
