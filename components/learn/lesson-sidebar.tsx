"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, BookOpen, Circle } from "lucide-react";
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
    <div className="flex flex-col h-full">
      {/* Branding */}
      <div className="px-4 pt-5 pb-4 border-b border-sidebar-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
            <BookOpen className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-sidebar-foreground group-hover:text-primary transition-colors duration-200">
            API Learning
          </span>
        </Link>

        {/* Progress */}
        <div className="mt-3 space-y-1.5">
          <div className="relative h-1.5 rounded-full bg-sidebar-border overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {completedLessons} / {totalLessons} lessons
            {percent > 0 && (
              <span className="text-primary font-medium ml-1">
                · {percent}%
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Module groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {curriculum.map((mod) => (
          <div key={mod.slug}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-2 mb-1.5">
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
                        "relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      {/* Active left bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-primary" />
                      )}
                      {done ? (
                        <CheckCircle2 className={cn("size-3.5 shrink-0", isActive ? "text-primary" : "text-primary/60")} />
                      ) : (
                        <Circle className={cn("size-3.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground/30")} />
                      )}
                      <span className="truncate leading-tight">
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
