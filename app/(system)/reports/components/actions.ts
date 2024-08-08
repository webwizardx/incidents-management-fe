'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { IncidentCountForChart } from './types';

export async function getIncidentsStatusCountForChart(): Promise<IncidentCountForChart> {
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

    console.log(
      `[${getIncidentsStatusCountForChart.name}] - ${url.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      await Promise.reject(data);
    }
    revalidatePath('/reports');
    return data;
  } catch (error) {
    console.error(
      `[${getIncidentsStatusCountForChart.name}] ERROR - ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
    return null as any;
  }
}
