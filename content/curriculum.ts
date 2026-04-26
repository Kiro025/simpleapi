export type Lesson = {
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
};

export type Module = {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const curriculum: Module[] = [
  {
    slug: "module-1",
    title: "REST Fundamentals",
    description:
      "Understand what APIs are, how HTTP works, and the principles behind REST.",
    lessons: [
      {
        slug: "what-is-an-api",
        title: "What Is an API?",
        description:
          "Learn what APIs are, why they exist, and how they enable communication between systems.",
        estimatedMinutes: 10,
      },
      {
        slug: "http-methods",
        title: "HTTP Methods",
        description:
          "Explore GET, POST, PUT, PATCH, and DELETE and when to use each.",
        estimatedMinutes: 12,
      },
      {
        slug: "status-codes",
        title: "Status Codes",
        description:
          "Understand 2xx, 3xx, 4xx, and 5xx status codes and what they communicate.",
        estimatedMinutes: 10,
      },
      {
        slug: "rest-principles",
        title: "REST Principles",
        description:
          "The six constraints of REST and why they matter for API design.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    slug: "module-2",
    title: "Building with Node.js & Express",
    description:
      "Go from concept to working endpoints in Node.js using the Express framework.",
    lessons: [
      {
        slug: "your-first-express-endpoint",
        title: "Your First Express Endpoint",
        description:
          "Set up an Express server and build a working GET endpoint from scratch.",
        estimatedMinutes: 20,
      },
    ],
  },
];

export type LessonWithModule = Lesson & {
  moduleSlug: string;
  moduleTitle: string;
  lessonIndex: number;
  moduleIndex: number;
};

export function getAllLessons(): LessonWithModule[] {
  return curriculum.flatMap((mod, mi) =>
    mod.lessons.map((lesson, li) => ({
      ...lesson,
      moduleSlug: mod.slug,
      moduleTitle: mod.title,
      lessonIndex: li,
      moduleIndex: mi,
    }))
  );
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = curriculum.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { module: mod, lesson };
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string) {
  const all = getAllLessons();
  const idx = all.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug
  );
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
