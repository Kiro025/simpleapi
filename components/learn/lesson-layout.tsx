import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LessonSidebar } from "@/components/learn/lesson-sidebar";
import { CompleteButton } from "@/components/learn/complete-button";
import { ThemeToggle } from "@/components/theme-toggle";
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
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-sidebar-border overflow-hidden flex flex-col bg-sidebar">
        <LessonSidebar
          curriculum={curriculum}
          currentModuleSlug={currentModuleSlug}
          currentLessonSlug={currentLessonSlug}
        />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 h-12 border-b border-border/60 bg-background/80 backdrop-blur-sm flex items-center justify-between px-6">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {lessonTitle}
          </p>
          <ThemeToggle />
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 animate-fade-up">
            <article className="prose-lesson">{children}</article>

            {/* Bottom actions */}
            <div className="mt-8 pt-6 border-t border-border/60 space-y-4">
              <CompleteButton
                moduleSlug={currentModuleSlug}
                lessonSlug={currentLessonSlug}
              />

              {/* Prev / Next */}
              <div className="flex items-center justify-between gap-4">
                {prev ? (
                  <Link
                    href={`/learn/${prev.moduleSlug}/${prev.slug}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    <ChevronLeft className="size-3.5" />
                    {prev.title}
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/learn/${next.moduleSlug}/${next.slug}`}
                    className={buttonVariants({ variant: "default", size: "sm" })}
                  >
                    {next.title}
                    <ChevronRight className="size-3.5" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
