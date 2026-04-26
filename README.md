# API Learning Platform

An interactive learning platform for REST API design and Node.js/Express — built with Next.js 16.2.4.

Guided lessons with live HTTP playgrounds, editable code examples (Monaco), and inline quizzes. Every concept is demonstrated against real API endpoints built into the app.

## Curriculum

**Module 1 — REST Fundamentals**
1. What Is an API? — client/server model, JSON anatomy, HTTP request/response structure
2. HTTP Methods — GET, POST, PUT, PATCH, DELETE with live exercises
3. Status Codes — 2xx/4xx/5xx families, 422 vs 400, consistent error shapes
4. REST Principles — six constraints, URL design, versioning, nested resources

**Module 2 — Building with Node.js & Express**
1. Your First Express Endpoint — setup, route handlers, req/res, error paths
2. Complete CRUD — PUT, PATCH, DELETE handlers with full 5-method example
3. Middleware — request pipeline, custom middleware, CORS, morgan
4. Validation & Error Handling — Zod schemas, centralised error middleware
5. Query Params & Filtering — filtering, sorting, pagination
6. Project Structure — Express Router, routes/controllers/data layer separation

**Module 3 — Build a Complete REST API**
1. Designing Your API — spec-first approach, resource modeling, URL contracts
2. Build the Tasks API — full step-by-step implementation of every endpoint
3. API Best Practices — response envelopes, CORS, versioning, `.env`, production checklist

## Demo API Endpoints

All playground exercises hit real API routes built into this Next.js app. Data resets on server restart.

```
GET    /api/playground/users
POST   /api/playground/users
GET    /api/playground/users/:id
PUT    /api/playground/users/:id
PATCH  /api/playground/users/:id
DELETE /api/playground/users/:id

GET    /api/playground/tasks              supports ?status= ?priority= ?sort= ?order= ?page= ?limit=
POST   /api/playground/tasks
GET    /api/playground/tasks/:id
PUT    /api/playground/tasks/:id
PATCH  /api/playground/tasks/:id
DELETE /api/playground/tasks/:id

GET    /api/playground/echo
POST   /api/playground/echo
GET    /api/playground/error              always returns 500 (for demo purposes)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a New Lesson

1. Create `content/[module-slug]/[lesson-slug].mdx`
2. Add a static import to `content/loader.ts` (must be a static string — Turbopack requirement)
3. Add the lesson metadata to `content/curriculum.ts`

MDX components available without importing: `<RequestPlayground>`, `<MonacoEditor>`, `<Callout>`, `<MethodBadge>`, `<QuizCard>`, `<CodeBlock>`.

See `AGENTS.md` for full component API reference, Next.js 16 constraints, and all project patterns.

## Stack

- Next.js 16.2.4 with Turbopack
- MDX via `@next/mdx` (static import map for Turbopack compatibility)
- Shiki for syntax highlighting (dual light/dark theme)
- Monaco Editor for editable code examples
- Tailwind CSS v4 with OKLch color variables
- Progress tracking in localStorage
