import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LessonSidebar } from "@/components/learn/lesson-sidebar";
import { CompleteButton } from "@/components/learn/complete-button";
import type { Module, LessonWithModule } from "@/content/curriculum";

type Props = {
  curriculum: Module[];
  currentModuleSlug: string;
  currentLessonSlug: string;
  lessonTitle: string;
  prev: LessonWithModule | null;
  next: LessonWithModule | null;
  children: React.ReactNode;
};

export function LessonLayout({
  curriculum,
  currentModuleSlug,
  currentLessonSlug,
  lessonTitle,
  prev,
  next,
  children,
}: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — client component reads localStorage for progress */}
      <aside className="w-64 shrink-0 border-r border-border overflow-y-auto bg-sidebar">
        <LessonSidebar
          curriculum={curriculum}
          currentModuleSlug={currentModuleSlug}
          currentLessonSlug={currentLessonSlug}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <article>{children}</article>
          <Separator className="my-8" />

          {/* Mark complete / incomplete */}
          <div className="flex items-center justify-between mb-6">
            <CompleteButton
              moduleSlug={currentModuleSlug}
              lessonSlug={currentLessonSlug}
            />
            <span className="text-xs text-muted-foreground italic">
              {lessonTitle}
            </span>
          </div>

          {/* Prev / Next nav */}
          <div className="flex items-center justify-between">
            {prev ? (
              <Link
                href={`/learn/${prev.moduleSlug}/${prev.slug}`}
                className={buttonVariants({ variant: "outline" })}
              >
                <ChevronLeft className="size-4" />
                {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/learn/${next.moduleSlug}/${next.slug}`}
                className={buttonVariants({ variant: "default" })}
              >
                {next.title}
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
