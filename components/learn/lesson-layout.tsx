import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
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
      <aside className="w-64 shrink-0 border-r border-border overflow-y-auto bg-sidebar">
        <div className="p-4 space-y-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="size-4" />
            API Learning
          </Link>

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
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${mod.slug}/${lesson.slug}`}
                        className={cn(
                          "flex items-center px-2 py-1.5 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        )}
                      >
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <article>{children}</article>
          <Separator className="my-8" />
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
