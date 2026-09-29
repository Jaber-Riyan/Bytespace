import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";

const routes = [
  ["Search courses", "/courses"],
  ["Creator profile", "/creators/demo"],
  ["Sign in", "/sign-in"],
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-brand-cream">
      <SiteHeader />
      <section className="relative isolate min-h-[calc(100vh-7.5rem)] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-x-[10%] top-1/2 -z-10 aspect-square rounded-full border border-brand-purple/10 bg-brand-lilac/50" />
        <Container className="flex flex-col items-center text-center">
          <p className="mb-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-purple shadow-sm">
            Learn, create, and grow
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] text-brand-ink sm:text-7xl">
            Get Access to Hundreds Courses Available
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-brand-muted">
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>
          <form
            action="/courses"
            className="mt-12 flex w-full max-w-xl gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-brand-purple/10">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <input
              id="course-search"
              name="q"
              placeholder="Course, topic, creator"
              className="min-w-0 flex-1 bg-transparent px-4 text-brand-ink outline-none placeholder:text-brand-muted"
            />
            <button className="rounded-xl bg-brand-purple px-6 py-3 font-medium text-white hover:bg-brand-purple-dark">
              Search
            </button>
          </form>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {routes.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-brand-purple/15 bg-white/70 px-5 py-2 text-sm font-medium text-brand-ink hover:border-brand-purple/40">
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
