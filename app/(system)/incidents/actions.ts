'use server';

import { PaginatedResponse } from '@/app/types';
import { buildQuery, cleanObject } from '@/helpers';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  Category,
  Incident,
  IncidentPayload,
  QueryCategory,
  QueryIncident,
  QueryStatus,
} from './types';

export async function createIncident(
  payload: IncidentPayload
): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents`
    );
    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'POST',
    });

    console.log(`[${createIncident.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    revalidatePath('/incidents');
    return data;
  } catch (error) {
    console.error(
      `[${createIncident.name}] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  } finally {
    redirect('/incidents');
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
    url.search = new URLSearchParams(query as any).toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getCategories.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getCategories.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getIncident(id: number): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getIncident.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getIncident.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getIncidents(
  query: QueryIncident = {}
): Promise<PaginatedResponse<Incident>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents`
    );
    const params = buildQuery(query);
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getIncidents.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getIncidents.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getStatus(
  query: QueryStatus = {}
): Promise<PaginatedResponse<Category>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/status`);
    url.search = new URLSearchParams(query as any).toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getStatus.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getStatus.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function updateIncident(
  id: number,
  payload: Partial<IncidentPayload>
): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PUT',
    });

    console.log(`[${updateIncident.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }
    revalidatePath('/incidents');
    return data;
  } catch (error) {
    console.error(`[${updateIncident.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/incidents');
  }
}

export async function patchIncident(
  id: number,
  payload: Partial<IncidentPayload>
): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/${id}`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PATCH',
    });

    console.log(`[${patchIncident.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    revalidatePath('/incidents');
    return data;
  } catch (error) {
    console.error(`[${patchIncident.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/incidents');
  }
}

export async function deleteIncident(id: number): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/${id}`
    );

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'DELETE',
    });

    console.log(`[${deleteIncident.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      Promise.reject(data);
    }

    revalidatePath('/incidents');
    return data;
  } catch (error) {
    console.error(`[${deleteIncident.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  } finally {
    redirect('/incidents');
  }
}