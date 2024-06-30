import { auth } from '@/auth';

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
    if (obj[key] && typeof obj[key] === 'object') {
      cleanedObject[key] = cleanObject(obj[key]); // recursive call for nested objects
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      cleanedObject[key] = obj[key];
    }
  }

  return cleanedObject;
}
