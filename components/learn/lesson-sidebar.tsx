"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, BookOpen } from "lucide-react";
import type { Module } from "@/content/curriculum";

type Props = {
  curriculum: Module[];
  currentModuleSlug: string;
  currentLessonSlug: string;
};

export function LessonSidebar({
  curriculum,
  currentModuleSlug,
  currentLessonSlug,
}: Props) {
  const { completedLessons, totalLessons, isCompleted } =
    useProgress(curriculum);
  const percent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="p-4 space-y-6">
      {/* Header + overall progress */}
      <div className="space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <BookOpen className="size-4" />
          API Learning
        </Link>
        <Progress value={percent} className="h-1.5" />
        <p className="text-xs text-muted-foreground">
          {completedLessons}/{totalLessons} lessons complete
        </p>
      </div>

      {/* Module groups */}
      {curriculum.map((mod) => (
        <div key={mod.slug} className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
            {mod.title}
          </p>
          <ul className="space-y-0.5">
            {mod.lessons.map((lesson) => {
              const isActive =
                mod.slug === currentModuleSlug &&
                lesson.slug === currentLessonSlug;
              const done = isCompleted(mod.slug, lesson.slug);
              return (
                <li key={lesson.slug}>
                  <Link
                    href={`/learn/${mod.slug}/${lesson.slug}`}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    <CheckCircle2
                      className={cn(
                        "size-3.5 shrink-0",
                        done ? "text-primary" : "text-muted-foreground/30"
                      )}
                    />
                    <span className="truncate">{lesson.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
