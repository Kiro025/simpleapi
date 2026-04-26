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

let nextId = 4;

export function addUser(user: Omit<User, "id">): User {
  const newUser = { ...user, id: nextId++ };
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
