import type { NextRequest } from "next/server";
import { findUser, updateUser, deleteUser } from "@/lib/demo-data";

// Next.js 16: params is a Promise in route handlers
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const user = findUser(parseInt(id, 10));
  if (!user) {
    return Response.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );
  }
  return Response.json({ data: user });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updated = updateUser(parseInt(id, 10), {
    name: body.name !== undefined ? String(body.name) : undefined,
    email: body.email !== undefined ? String(body.email) : undefined,
    role: body.role === "admin" ? "admin" : body.role === "member" ? "member" : undefined,
  });

  if (!updated) {
    return Response.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );
  }
  return Response.json({ data: updated });
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updates: Partial<Omit<import("@/lib/demo-data").User, "id">> = {};
  if (body.name !== undefined) updates.name = String(body.name);
  if (body.email !== undefined) updates.email = String(body.email);
  if (body.role === "admin" || body.role === "member") updates.role = body.role;

  const updated = updateUser(parseInt(id, 10), updates);
  if (!updated) {
    return Response.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );
  }
  return Response.json({ data: updated });
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const ok = deleteUser(parseInt(id, 10));
  if (!ok) {
    return Response.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );
  }
  return new Response(null, { status: 204 });
}
