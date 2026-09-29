import { Container } from "@/components/layout/container";
export default function Loading() {
  return (
    <main role="status" aria-label="Loading course" className="relative -mt-[120px]">
      <div className="blue-grid absolute inset-x-0 top-0 h-[958px] bg-persian-blue" />
      <Container className="relative pt-[180px] pb-20 motion-safe:animate-pulse">
        <div className="h-12 w-3/4 rounded bg-white/20" />
        <div className="mt-6 h-6 w-1/2 rounded bg-white/20" />
        <div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,720px)_minmax(0,412px)]">
          <div className="aspect-[3/2] rounded-3xl bg-shuttle-soft" />
          <div className="h-[760px] rounded-3xl bg-white" />
        </div>
        <span className="sr-only">Loading course</span>
      </Container>
    </main>
  );
}
