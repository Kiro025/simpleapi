import { notFound } from "next/navigation";
import { curriculum, getLesson, getAdjacentLessons } from "@/content/curriculum";
import { loadLesson } from "@/content/loader";
import { LessonLayout } from "@/components/learn/lesson-layout";

// Next.js 16: params is a Promise
type Props = {
  params: Promise<{ module: string; lesson: string }>;
};

export async function generateStaticParams() {
  return curriculum.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      module: mod.slug,
      lesson: lesson.slug,
    }))
  );
}

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false;

export default async function LessonPage({ params }: Props) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;

  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) notFound();

  const adjacent = getAdjacentLessons(moduleSlug, lessonSlug);
  const Content = await loadLesson(moduleSlug, lessonSlug);
  if (!Content) notFound();

  return (
    <LessonLayout
      curriculum={curriculum}
      currentModuleSlug={moduleSlug}
      currentLessonSlug={lessonSlug}
      lessonTitle={found.lesson.title}
      prev={adjacent.prev}
      next={adjacent.next}
    >
      <Content />
    </LessonLayout>
  );
}
