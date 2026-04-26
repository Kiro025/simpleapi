import type { NextRequest } from "next/server";
import { tasks, addTask } from "@/lib/demo-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order") ?? "asc";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  let result = [...tasks];

  if (status) result = result.filter((t) => t.status === status);
  if (priority) result = result.filter((t) => t.priority === priority);

  if (sort === "createdAt") {
    result.sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return order === "desc" ? -diff : diff;
    });
  } else if (sort === "priority") {
    const rank = { high: 3, medium: 2, low: 1 };
    result.sort((a, b) => {
      const diff = rank[a.priority] - rank[b.priority];
      return order === "desc" ? -diff : diff;
    });
  }

  const total = result.length;
  const start = (page - 1) * limit;
  const data = result.slice(start, start + limit);

  return Response.json({
    data,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
    _links: { self: "/api/playground/tasks" },
  });
}

export async function POST(request: NextRequest) {
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

  const task = addTask({ title: String(body.title), status, priority });
  return Response.json({ data: task }, { status: 201 });
}
