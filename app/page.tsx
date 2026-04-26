import Link from "next/link";
import { curriculum } from "@/content/curriculum";
import { ThemeToggle } from "@/components/theme-toggle";
import { HomeProgress } from "@/components/learn/home-progress";
import { BookOpen, Clock, ArrowRight, Zap, Terminal, Globe } from "lucide-react";

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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground tracking-tight">
            API Learning
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, oklch(0.52 0.22 264 / 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, oklch(0.65 0.18 290 / 0.07) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-7 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
            <Zap className="size-3" />
            Personal Learning Project
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Learn API Design</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.52 0.22 264), oklch(0.65 0.18 290))",
              }}
            >
              from Scratch
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Guided lessons on REST fundamentals, HTTP, and Node.js/Express —
            with a live request playground built right in.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4 text-primary/70" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-primary/70" />~{totalMinutes} min
            </span>
          </div>

          {/* CTA */}
          <HomeProgress curriculum={curriculum} />
        </div>

        {/* Feature chips */}
        <div className="max-w-4xl mx-auto px-6 pb-10 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {[
            { icon: Globe, label: "Live HTTP playground" },
            { icon: Terminal, label: "Real API endpoints" },
            { icon: BookOpen, label: "Interactive lessons" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
            >
              <Icon className="size-3 text-primary/70" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <main className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Curriculum
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Work through modules in order — each builds on the last.
          </p>
        </div>

        <div className="space-y-4">
          {curriculum.map((mod, mi) => (
            <div
              key={mod.slug}
              className="group rounded-2xl border border-border bg-card overflow-hidden shadow-xs transition-shadow duration-300 hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${0.05 * mi}s` }}
            >
              {/* Module header */}
              <div className="px-6 py-5 flex items-start gap-4 border-b border-border/60 bg-gradient-to-r from-muted/60 to-transparent">
                <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">
                    {mi + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground leading-tight">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Lessons */}
              <ul className="divide-y divide-border/50">
                {mod.lessons.map((lesson, li) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${mod.slug}/${lesson.slug}`}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-accent/50 transition-all duration-150 group/item"
                    >
                      <div className="flex items-center gap-3">
                        <span className="size-5 rounded-md bg-muted text-muted-foreground flex items-center justify-center text-[11px] font-semibold tabular-nums shrink-0">
                          {li + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors duration-150">
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {lesson.estimatedMinutes}m
                        </span>
                        <ArrowRight className="size-3.5 text-muted-foreground/50 group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all duration-150" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
