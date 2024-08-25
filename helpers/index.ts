import { SelectOption } from '@/app/types';
import { auth } from '@/auth';

export function buildQuery(query: any): URLSearchParams {
  query = cleanObject(query);
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(`${key}[]`, value.toString()));
    } else {
      params.append(key, (value as any).toString());
    }
  });

  return params;
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function customFetch(
  input: RequestInfo,
  init?: RequestInit | undefined
) {
  const session: any = await auth();
  const headers = {
    Authorization: `Bearer ${session?.user?.accessToken}`,
  };

  if (init) {
    init.headers = {
      ...init.headers,
      ...headers,
    };
  } else {
    init = {
      headers,
    };
  }

  return fetch(input, init);
}

export function cleanObject(obj: any): any {
  let cleanedObject: any = {};

  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      cleanedObject[key] = cleanObject(obj[key]); // recursive call for nested objects
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      cleanedObject[key] = obj[key];
    }
    if (Array.isArray(obj[key]) && !obj[key].length) {
      delete cleanedObject[key];
    }
  }

  return cleanedObject;
}

export function getSelectOptions(data: any[], label: string) {
  const options: SelectOption[] = [
    {
      label: 'Todos',
      value: null,
    },
  ];

  if (!data || !data.length) {
    return options;
  }

  options.push(
    ...data?.map((option) => ({
      label: option[label],
      value: option,
    }))
  );

  return options;
}
