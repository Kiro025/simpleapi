"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { getAllLessons } from "@/content/curriculum";
import { buttonVariants } from "@/components/ui/button";
import type { Module } from "@/content/curriculum";

export function HomeProgress({ curriculum }: { curriculum: Module[] }) {
  const { completedLessons, totalLessons, isCompleted } =
    useProgress(curriculum);
  const percent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const all = getAllLessons();
  const nextLesson = all.find((l) => !isCompleted(l.moduleSlug, l.slug));

  if (completedLessons === 0) {
    return (
      <Link
        href={`/learn/${all[0].moduleSlug}/${all[0].slug}`}
        className={buttonVariants({ size: "lg" })}
      >
        Start Learning
      </Link>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Progress value={percent} className="w-48 h-2" />
        <span className="text-sm text-muted-foreground">
          {completedLessons}/{totalLessons} complete
        </span>
      </div>
      {nextLesson && (
        <Link
          href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}
          className={buttonVariants({ variant: "default" })}
        >
          Continue: {nextLesson.title}
        </Link>
      )}
    </div>
  );
}
