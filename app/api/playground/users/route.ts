import type { NextRequest } from "next/server";
import { users, addUser } from "@/lib/demo-data";

export async function GET() {
  return Response.json({
    data: users,
    total: users.length,
    _links: { self: "/api/playground/users" },
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return Response.json(
      { error: "Missing required fields: name, email" },
      { status: 400 }
    );
  }

  const user = addUser({
    name: String(body.name),
    email: String(body.email),
    role: body.role === "admin" ? "admin" : "member",
  });

  return Response.json({ data: user }, { status: 201 });
}
