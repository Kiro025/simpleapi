// Module-level singleton — shared across all route handlers in the same server process.
// Data resets on server restart, which is intentional for a learning context.

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
};

export const users: User[] = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "member" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", role: "member" },
];

let nextUserId = 4;

// ── Tasks ──────────────────────────────────────────────────────────────────

export type Task = {
  id: number;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export const tasks: Task[] = [
  { id: 1, title: "Research REST API design patterns", status: "done", priority: "high", createdAt: "2026-04-20T09:00:00.000Z" },
  { id: 2, title: "Build the Express server scaffold", status: "in-progress", priority: "high", createdAt: "2026-04-21T10:30:00.000Z" },
  { id: 3, title: "Write validation middleware", status: "todo", priority: "medium", createdAt: "2026-04-22T14:00:00.000Z" },
  { id: 4, title: "Add pagination to list endpoints", status: "todo", priority: "low", createdAt: "2026-04-23T08:15:00.000Z" },
];

let nextTaskId = 5;

export function addUser(user: Omit<User, "id">): User {
  const newUser = { ...user, id: nextUserId++ };
  users.push(newUser);
  return newUser;
}

export function findUser(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function updateUser(
  id: number,
  updates: Partial<Omit<User, "id">>
): User | null {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  return users[idx];
}

export function deleteUser(id: number): boolean {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

// ── Task helpers ────────────────────────────────────────────────────────────

export function addTask(task: Omit<Task, "id" | "createdAt">): Task {
  const newTask: Task = { ...task, id: nextTaskId++, createdAt: new Date().toISOString() };
  tasks.push(newTask);
  return newTask;
}

export function findTask(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  return tasks[idx];
}

export function deleteTask(id: number): boolean {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
