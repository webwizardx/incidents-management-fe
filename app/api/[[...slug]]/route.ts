import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

async function getAccessToken() {
  let accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    const session: any = await auth();
    accessToken = session?.user?.accessToken;
  }
  return accessToken;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = await getAccessToken();
  ``;
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const slug = params.slug?.join('/') || '';
  const url = new URL(`${API_BASE_URL}/api/${slug}`);
  url.search = searchParams.toString();
  const response = await fetch(url.toString(), {
    body: JSON.stringify(body),
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: POST.name,
  });

  const DEBUG_INFO = {
    accessToken,
    body,
    method: POST.name,
    url: url.toString(),
  };

  console.log(`[/api] ${POST.name} - ${JSON.stringify(DEBUG_INFO)}`);

  return NextResponse.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = await getAccessToken();
  const searchParams = request.nextUrl.searchParams;
  const slug = params.slug?.join('/') || '';
  const url = new URL(`${API_BASE_URL}/api/${slug}`);
  url.search = searchParams.toString();
  const response = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const DEBUG_INFO = {
    accessToken,
    method: GET.name,
    url: url.toString(),
  };

  console.log(`[/api] ${GET.name} - ${JSON.stringify(DEBUG_INFO)}`);

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/pdf')) {
    const contentDisposition = response.headers.get(
      'content-disposition'
    ) as string;
    return new Response(response.body, {
      headers: {
        'Content-Disposition': contentDisposition,
        'Content-Type': 'application/pdf',
      },
    });
  } else {
    return NextResponse.json(await response.json(), {
      status: response.status,
      statusText: response.statusText,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = await getAccessToken();
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const slug = params.slug?.join('/') || '';
  const url = new URL(`${API_BASE_URL}/api/${slug}`);
  url.search = searchParams.toString();
  const response = await fetch(url.toString(), {
    body: JSON.stringify(body),
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: PATCH.name,
  });

  const DEBUG_INFO = {
    accessToken,
    body,
    method: PATCH.name,
    url: url.toString(),
  };

  console.log(`[/api] ${PATCH.name} - ${JSON.stringify(DEBUG_INFO)}`);

  return NextResponse.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = await getAccessToken();
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const slug = params.slug?.join('/') || '';
  const url = new URL(`${API_BASE_URL}/api/${slug}`);
  url.search = searchParams.toString();
  const response = await fetch(url.toString(), {
    body: JSON.stringify(body),
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: PUT.name,
  });

  const DEBUG_INFO = {
    accessToken,
    body,
    method: PUT.name,
    url: url.toString(),
  };

  console.log(`[/api] ${PUT.name} - ${JSON.stringify(DEBUG_INFO)}`);

  return NextResponse.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const accessToken = await getAccessToken();
  const searchParams = request.nextUrl.searchParams;
  const slug = params.slug?.join('/') || '';
  const url = new URL(`${API_BASE_URL}/api/${slug}`);
  url.search = searchParams.toString();
  const response = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: DELETE.name,
  });

  const DEBUG_INFO = {
    accessToken,
    method: DELETE.name,
    url: url.toString(),
  };

  console.log(`[/api] ${DELETE.name} - ${JSON.stringify(DEBUG_INFO)}`);

  return NextResponse.json(await response.json(), {
    status: response.status,
    statusText: response.statusText,
  });
}
