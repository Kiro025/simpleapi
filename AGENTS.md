<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Context: API Learning Platform

## What This Is
An interactive API learning platform built in Next.js 16.2.4. The user (Kiro) is learning REST API design and Node.js/Express, with a goal of eventually scaling this into a portfolio-worthy project for others.

**Phase 1 (current):** Personal learning tool  
**Phase 2 (future):** Public learning platform with auth, user accounts, GraphQL module

## What's Built (as of April 2026)

### App Routes
- `/` — Home page: curriculum overview, progress bar, resume CTA
- `/learn/[module]/[lesson]` — Lesson viewer (statically generated via `generateStaticParams`)
- `/api/playground/users` — GET (list), POST (create) — demo REST endpoint
- `/api/playground/users/[id]` — GET, PUT, DELETE — demo REST endpoint
- `/api/playground/echo` — GET, POST — echoes back the request

### Content
- `content/curriculum.ts` — Source of truth for module/lesson ordering and metadata
- `content/loader.ts` — **Static import map** for all MDX files (required for Turbopack — do NOT use dynamic template literals)
- `content/module-1/` — 4 lessons: what-is-an-api, http-methods, status-codes, rest-principles
- `content/module-2/` — 1 lesson: your-first-express-endpoint

### Components (`components/learn/`)
- `lesson-layout.tsx` — Server Component shell (sidebar + content)
- `lesson-sidebar.tsx` — **Client Component** (reads localStorage progress)
- `complete-button.tsx` — Client Component, marks lesson done/undone
- `request-playground.tsx` — **Client Component** — fires real HTTP requests to demo endpoints
- `code-block.tsx` — **Server Component** — Shiki syntax highlighting (dual theme)
- `copy-button.tsx` — Client Component — clipboard copy
- `callout.tsx` — Server Component — info/warning/success/tip boxes for MDX
- `method-badge.tsx` — Server Component — color-coded HTTP method label
- `monaco-editor.tsx` — **Client Component** — editable code viewer (dark/light sync via MutationObserver)
- `home-progress.tsx` — Client Component — progress bar + resume button on home page

### Hooks
- `hooks/use-progress.ts` — localStorage-backed lesson completion state
- `hooks/use-theme.ts` — dark/light/system toggle, persists to localStorage

### Lib
- `lib/demo-data.ts` — **Shared in-memory singleton** for demo API data. Import from here in all API routes — do not redeclare arrays locally.
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### MDX Components Available in .mdx Files
All these work as JSX inside any `.mdx` file without importing:
- `<RequestPlayground defaultMethod="GET" defaultUrl="/api/playground/users" title="..." description="..." defaultBody="..." />`
- `<Callout variant="info|warning|success|tip" title="...">...</Callout>`
- `<MethodBadge method="GET|POST|PUT|PATCH|DELETE" />`
- `<MonacoEditor initialCode="..." language="javascript" height={300} filename="server.js" readOnly />`
- `<CodeBlock language="js" filename="server.js">...</CodeBlock>` (also used by fenced code blocks automatically)

## Key Patterns & Rules

### Adding a New Lesson
1. Create the MDX file at `content/[module-slug]/[lesson-slug].mdx`
2. Add the import to `content/loader.ts` (static import, not dynamic template)
3. Add the lesson to `content/curriculum.ts`

### API Routes (Next.js 16 — CRITICAL)
- `params` is a **Promise** in both page components AND route handlers — always `await params`
- Route handler context: `{ params }: { params: Promise<{ id: string }> }`

### Turbopack (default in Next.js 16)
- Remark/rehype plugins must be strings, not function references
- MDX imports must be static — no `import(\`./path/${var}.mdx\`)`

### Dark Mode
- Toggled by `.dark` class on `<html>`  
- `app/layout.tsx` has a blocking inline script to prevent flash of wrong theme
- Shiki code blocks use CSS vars (`.shiki`/`.dark .shiki`) in `globals.css`

### Button Usage
- The `Button` component does **not** have `asChild`  
- For link-styled buttons, use: `<Link href="..." className={buttonVariants({ variant: "outline" })}>`

### Progress Tracking
- Stored in localStorage under key `"api-learn-progress"` as `Record<"moduleSlug:lessonSlug", boolean>`
- `useProgress(curriculum)` hook — always pass the full curriculum array
- `useTheme()` hook — cycles light → dark → system on click

## UI Stack
- Tailwind CSS v4 (CSS variables, OKLch colors, PostCSS)
- Base UI React (`@base-ui/react`) for unstyled primitives
- Shadcn components in `components/ui/`: Button, Badge, Progress, ScrollArea, Separator
- Lucide React for icons
- Geist Sans + Geist Mono fonts (via `next/font/google`)
