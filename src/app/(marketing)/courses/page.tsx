import { CourseCard } from "@/components/course/course-card";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
export default function CoursesPage() {
  return (
    <main>
      <SiteHeader />
      <Container className="py-16">
        <h1 className="text-4xl font-semibold">Explore courses</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            id="learn-figma"
            title="Learn Figma from Basic"
            creator="purepearl studio"
            price={25}
          />
        </div>
      </Container>
    </main>
  );
}
