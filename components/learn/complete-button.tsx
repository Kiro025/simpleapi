"use client";

import { useProgress } from "@/hooks/use-progress";
import { curriculum } from "@/content/curriculum";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  moduleSlug: string;
  lessonSlug: string;
};

export function CompleteButton({ moduleSlug, lessonSlug }: Props) {
  const { isCompleted, markComplete, markIncomplete } =
    useProgress(curriculum);
  const done = isCompleted(moduleSlug, lessonSlug);

  return (
    <button
      onClick={() =>
        done
          ? markIncomplete(moduleSlug, lessonSlug)
          : markComplete(moduleSlug, lessonSlug)
      }
      className={cn(
        buttonVariants({ variant: done ? "secondary" : "default", size: "sm" }),
        "gap-2 transition-all duration-200",
        done && "border-primary/20"
      )}
    >
      {done ? (
        <CheckCircle2 className="size-3.5 text-primary" />
      ) : (
        <Circle className="size-3.5" />
      )}
      {done ? "Completed" : "Mark as Complete"}
    </button>
  );
}
