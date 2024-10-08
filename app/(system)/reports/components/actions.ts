'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { ChartDataMap } from './types';

export async function getAssignedIncidentsCountForChart(): Promise<ChartDataMap> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/assigned-incidents-count-for-chart`
    );
    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[getAssignedIncidentsCountForChart] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/reports');
    return data;
  } catch (error) {
    console.error(
      `[getAssignedIncidentsCountForChart] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  }
}

export async function getIncidentsStatusCountForChart(): Promise<ChartDataMap> {
  try {
    const cookie = headers().get('cookie') as string;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/incidents/status-count-for-chart`
    );
    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        cookie,
      },
    });

    console.log(`[getIncidentsStatusCountForChart] - ${url.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/reports');
    return data;
  } catch (error) {
    console.error(
      `[getIncidentsStatusCountForChart] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  }
}
