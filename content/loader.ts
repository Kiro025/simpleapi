import type React from "react";

// Explicit static import map — Turbopack requires statically analyzable paths.
// Add new lessons here when they're created.
const lessonMap: Record<
  string,
  Record<string, () => Promise<{ default: React.ComponentType }>>
> = {
  "module-1": {
    "what-is-an-api": () =>
      import("./module-1/what-is-an-api.mdx") as Promise<{
        default: React.ComponentType;
      }>,
    "http-methods": () =>
      import("./module-1/http-methods.mdx") as Promise<{
        default: React.ComponentType;
      }>,
    "status-codes": () =>
      import("./module-1/status-codes.mdx") as Promise<{
        default: React.ComponentType;
      }>,
    "rest-principles": () =>
      import("./module-1/rest-principles.mdx") as Promise<{
        default: React.ComponentType;
      }>,
  },
  "module-2": {
    "your-first-express-endpoint": () =>
      import("./module-2/your-first-express-endpoint.mdx") as Promise<{
        default: React.ComponentType;
      }>,
  },
};

export async function loadLesson(
  moduleSlug: string,
  lessonSlug: string
): Promise<React.ComponentType | null> {
  const moduleImports = lessonMap[moduleSlug];
  if (!moduleImports) return null;
  const importer = moduleImports[lessonSlug];
  if (!importer) return null;
  const mod = await importer();
  return mod.default;
}
