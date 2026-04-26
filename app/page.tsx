import Link from "next/link";
import { curriculum } from "@/content/curriculum";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { HomeProgress } from "@/components/learn/home-progress";
import { BookOpen, Clock, Play } from "lucide-react";

export default function HomePage() {
  const totalLessons = curriculum.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0
  );
  const totalMinutes = curriculum.reduce(
    (sum, mod) =>
      sum + mod.lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <span className="font-semibold text-foreground">API Learning</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Hero */}
        <section className="space-y-5">
          <Badge variant="secondary">Personal Learning Project</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Learn API Design from Scratch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Guided lessons on REST fundamentals, HTTP, and Node.js/Express —
            with a live request playground built right in.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />~{totalMinutes} minutes
            </span>
          </div>
          {/* Client component reads localStorage for progress + resume */}
          <HomeProgress curriculum={curriculum} />
        </section>

        <Separator />

        {/* Curriculum */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-foreground">Curriculum</h2>
          <div className="space-y-6">
            {curriculum.map((mod, mi) => (
              <div
                key={mod.slug}
                className="rounded-xl border border-border overflow-hidden"
              >
                <div className="px-6 py-4 bg-muted/40 border-b border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Module {mi + 1}
                    </Badge>
                    <h3 className="font-semibold text-foreground">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mod.description}
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {mod.lessons.map((lesson, li) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${mod.slug}/${lesson.slug}`}
                        className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-5 tabular-nums">
                            {li + 1}.
                          </span>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">
                            <Clock className="size-3 inline mr-1" />
                            {lesson.estimatedMinutes}m
                          </span>
                          <Play className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
