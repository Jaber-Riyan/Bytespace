"use client";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useLocalPreference } from "@/lib/use-local-preference";

export function LessonProgress({
  courseId,
  lessons,
}: {
  courseId: string;
  lessons: { id: string; title: string }[];
}) {
  const [stored, setStored] = useLocalPreference(`bytespace:progress:v1:${courseId}`);
  let completed: string[] = [];
  try {
    const parsed: unknown = JSON.parse(stored || "[]");
    if (Array.isArray(parsed))
      completed = [
        ...new Set(
          parsed.filter(
            (id): id is string =>
              typeof id === "string" && lessons.some((lesson) => lesson.id === id),
          ),
        ),
      ];
  } catch {
    /* Ignore stale or invalid local preferences. */
  }
  const value = lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0;
  function toggle(id: string) {
    setStored(
      JSON.stringify(
        completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id],
      ),
    );
  }
  return (
    <div className="mt-5">
      <div className="rounded-2xl border p-4">
        <p className="text-sm">Learning Progress</p>
        <p className="mt-1 text-4xl font-bold" aria-live="polite">
          {value}%
        </p>
        <ProgressBar value={value} className="mt-3" />
      </div>
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-persian-blue">Update your progress</summary>
        <div className="mt-3 space-y-3">
          {lessons.map((lesson) => (
            <label key={lesson.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={completed.includes(lesson.id)}
                onChange={() => toggle(lesson.id)}
                className="mt-1 accent-persian-blue"
              />
              <span>{lesson.title}</span>
            </label>
          ))}
        </div>
        <p className="mt-3 text-shuttle-muted">Your progress is saved on this device.</p>
      </details>
    </div>
  );
}
