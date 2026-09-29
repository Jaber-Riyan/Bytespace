import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";

export default function Loading() {
  return (
    <main>
      <SiteHeader />
      <Container className="grid animate-pulse gap-10 py-12 md:py-[72px] lg:grid-cols-[minmax(0,1fr)_390px]" role="status" aria-label="Loading course">
        <div>
          <div className="h-5 w-28 rounded bg-shuttle-soft" />
          <div className="mt-5 h-14 w-3/4 rounded bg-shuttle-soft" />
          <div className="mt-6 h-24 w-full max-w-[680px] rounded bg-shuttle-soft" />
          <div className="mt-12 h-52 rounded-[20px] bg-shuttle-soft" />
        </div>
        <div className="h-[360px] rounded-[24px] bg-shuttle-soft" />
        <span className="sr-only">Loading course</span>
      </Container>
    </main>
  );
}