"use client";
export default function CourseError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="font-heading text-3xl">Courses could not be loaded</h1><p className="mt-4 text-shuttle-muted">Please try again in a moment.</p><button onClick={reset} className="mt-6 rounded-full bg-electric-lime px-6 py-3">Try again</button></main>;
}
