import type { NextRequest } from "next/server";
import { findTask, updateTask, deleteTask } from "@/lib/demo-data";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const task = findTask(parseInt(id, 10));
  if (!task) {
    return Response.json({ error: `Task with id ${id} not found` }, { status: 404 });
  }
  return Response.json({ data: task });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.title || typeof body.title !== "string") {
    return Response.json(
      { error: "Validation failed", message: "'title' is required", field: "title" },
      { status: 422 }
    );
  }

  const validStatuses = ["todo", "in-progress", "done"];
  const validPriorities = ["low", "medium", "high"];
  const status = validStatuses.includes(String(body.status)) ? (body.status as "todo" | "in-progress" | "done") : "todo";
  const priority = validPriorities.includes(String(body.priority)) ? (body.priority as "low" | "medium" | "high") : "medium";

  const updated = updateTask(parseInt(id, 10), { title: String(body.title), status, priority });
  if (!updated) {
    return Response.json({ error: `Task with id ${id} not found` }, { status: 404 });
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

  const updates: Parameters<typeof updateTask>[1] = {};
  if (body.title !== undefined) updates.title = String(body.title);
  if (body.status === "todo" || body.status === "in-progress" || body.status === "done") updates.status = body.status;
  if (body.priority === "low" || body.priority === "medium" || body.priority === "high") updates.priority = body.priority;

  const updated = updateTask(parseInt(id, 10), updates);
  if (!updated) {
    return Response.json({ error: `Task with id ${id} not found` }, { status: 404 });
  }
  return Response.json({ data: updated });
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const ok = deleteTask(parseInt(id, 10));
  if (!ok) {
    return Response.json({ error: `Task with id ${id} not found` }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
