'use server';

import { i18n } from '@/app/i18n';
import { PaginatedResponse } from '@/app/types';
import { buildQuery, cleanObject } from '@/helpers';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  Category,
  Comment,
  CommentPayload,
  Incident,
  IncidentPayload,
  QueryCategory,
  QueryComment,
  QueryIncident,
  QueryStatus,
  Status,
} from './types';

export async function createComment(payload: CommentPayload): Promise<Comment> {
  try {
    const cookie = headers().get('cookie') as string;
    const cleanedPayload = cleanObject(payload);
    console.log(`[${createComment.name}] - ${JSON.stringify(cleanedPayload)}`);
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/comments`);
    const response = await fetch(url.toString(), {
      body: JSON.stringify(cleanedPayload),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'POST',
    });

    console.log(`[${createComment.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/incidents/update/[id]');
    return data;
  } catch (error) {
    console.error(
      `[${createComment.name}] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  }
}

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
      await Promise.reject(data);
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
      await Promise.reject(data);
    }
    return data;
  } catch (error) {
    console.error(`[${getCategories.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getComments(
  query: QueryComment = {}
): Promise<PaginatedResponse<Comment>> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/comments`);
    const params = buildQuery(query);
    url.search = params.toString();

    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[${getComments.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }

    return data;
  } catch (error) {
    console.error(`[${getComments.name}] ERROR - ${JSON.stringify(error)}`);
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
      await Promise.reject(data);
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
    console.log('query', query);
    console.log('params', params.toString());
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
      await Promise.reject(data);
    }
    data.data = data.data.map((incident: Incident) => ({
      ...incident,
      ...(incident.status
        ? {
            status: {
              ...incident.status,
              name: i18n.status[incident.status.name],
            },
          }
        : {}),
    }));

    return data;
  } catch (error) {
    console.error(`[${getIncidents.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function getStatus(
  query: QueryStatus = {}
): Promise<PaginatedResponse<Status>> {
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
      await Promise.reject(data);
    }

    data.data = data.data.map((status: Status) => ({
      ...status,
      name: i18n.status[status.name],
    }));
    return data;
  } catch (error) {
    console.error(`[${getStatus.name}] ERROR - ${JSON.stringify(error)}`);
    return null as any;
  }
}

export async function autoAssignIncidentToUser(id: number): Promise<Incident> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/${id}/auto-assign`
    );

    const response = await fetch(url.toString(), {
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: {
        cookie,
      },
      method: 'PATCH',
    });

    console.log(`[${autoAssignIncidentToUser.name}] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }

    revalidatePath('/incidents');
    return data;
  } catch (error) {
    console.error(
      `[${autoAssignIncidentToUser.name}] ERROR - ${JSON.stringify(error)}`
    );
    return null as any;
  } finally {
    redirect('/incidents');
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
      await Promise.reject(data);
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
      await Promise.reject(data);
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
      await Promise.reject(data);
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
