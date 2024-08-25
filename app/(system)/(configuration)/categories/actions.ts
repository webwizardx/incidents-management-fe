'use server';

import { i18n } from '@/app/i18n';
import { PaginatedResponse } from '@/app/types';
import { buildQuery, cleanObject } from '@/helpers';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Category, QueryCategory } from './types';

export async function createCategory(
  payload: Omit<Category, 'id'>
): Promise<Category> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories`
    );
    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'POST',
    });

    console.log(`[createCategory] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/categories');
    return data;
  } catch (error) {
    console.error(
      `[createCategory] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  } finally {
    redirect('/categories');
  }
}

export async function getCategory(id: number): Promise<Category> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[getCategory] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[getCategory] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getCategories(
  query: QueryCategory = {}
): Promise<PaginatedResponse<Category>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories`
    );
    const params = buildQuery(query);
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[getCategories] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[getCategories] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function updateCategory(
  id: number,
  payload: Partial<Omit<Category, 'id'>>
): Promise<Category> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PUT',
    });

    console.log(`[updateCategory] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/categories');
    return data;
  } catch (error) {
    console.error(`[updateCategory] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/categories');
  }
}

export async function patchCategory(
  id: number,
  payload: Partial<Omit<Category, 'id'>>
): Promise<Category> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PATCH',
    });

    console.log(`[patchCategory] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }

    revalidatePath('/categories');
    return data;
  } catch (error) {
    console.error(`[patchCategory] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/categories');
  }
}

export async function deleteCategory(id: number): Promise<Category> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/categories/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'DELETE',
    });

    console.log(`[deleteCategory] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }

    revalidatePath('/categories');
    return data;
  } catch (error) {
    console.error(`[deleteCategory] ERROR - ${JSON.stringify(error)}`);
    const errorMessage = (error as any)?.message || null;
    return i18n.categories[errorMessage];
  }
}
