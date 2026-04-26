import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  return Response.json({
    echo: { queryParams: params },
    receivedAt: new Date().toISOString(),
    method: "GET",
    path: "/api/playground/echo",
  });
}

export async function POST(request: NextRequest) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // Non-JSON body — echo empty object
  }
  return Response.json({
    echo: body,
    receivedAt: new Date().toISOString(),
    method: "POST",
    path: "/api/playground/echo",
  });
}
