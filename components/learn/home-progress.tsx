"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/use-progress";
import { getAllLessons } from "@/content/curriculum";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
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
        className={cn(
          buttonVariants({ size: "lg" }),
          "group gap-2 rounded-xl shadow-sm"
        )}
      >
        Start Learning
        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-150" />
      </Link>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mini progress bar */}
      <div className="flex items-center gap-3">
        <div className="relative w-40 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground">
          <span className="text-primary font-semibold">{percent}%</span>
          {" "}· {completedLessons}/{totalLessons}
        </span>
      </div>

      {nextLesson ? (
        <Link
          href={`/learn/${nextLesson.moduleSlug}/${nextLesson.slug}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "group gap-2 rounded-xl"
          )}
        >
          <RotateCcw className="size-3.5" />
          Continue: {nextLesson.title}
          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
        </Link>
      ) : (
        <p className="text-sm font-medium text-primary">
          🎉 All lessons complete!
        </p>
      )}
    </div>
  );
}
