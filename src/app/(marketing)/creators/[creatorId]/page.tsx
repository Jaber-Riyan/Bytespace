import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCreator } from "@/data/creators";
import { listCourses } from "@/lib/course-catalog";
import { Container } from "@/components/layout/container";
import { CreatorFollow } from "@/components/creator/creator-follow";
import { CatalogControls } from "@/components/course/catalog-controls";
import { CatalogResults } from "@/components/course/catalog-results";
import { CourseGridSkeleton } from "@/components/course/course-card-skeleton";

export default async function CreatorProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ creatorId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ creatorId }, raw] = await Promise.all([params, searchParams]);
  const creator = await getCreator(creatorId);
  if (!creator) notFound();
  const courses = await listCourses({ creatorId });
  const query = Object.fromEntries(
    Object.entries(raw).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
  const basePath = `/creators/${creatorId}`;
  return (
    <main data-header-theme="blue">
      <section className="blue-grid -mt-[120px] bg-persian-blue pt-[172px] pb-[80px] text-white">
        <Container>
          <div className="flex flex-wrap items-center gap-6">
            <Image
              src={creator.avatar}
              alt={creator.name}
              width={96}
              height={96}
              priority
              className="size-24 rounded-[24px] object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-[clamp(28px,3vw,36px)] font-semibold">
                  {creator.name}
                </h1>
                <span className="rounded-full bg-electric-lime px-6 py-1.5 text-sm text-shuttle-ink">
                  Creator
                </span>
              </div>
              <p className="mt-2 text-lg text-white/75">{creator.headline}</p>
            </div>
          </div>
          <div className="mt-10 text-lg leading-[1.7] text-white/75">
            {creator.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <CreatorFollow
            creatorId={creator.id}
            followerCount={creator.followerCount}
            products={courses.length}
          />
        </Container>
      </section>
      <Container className="py-[64px]">
        <CatalogControls query={query} basePath={basePath} />
        <div className="mt-10">
          <Suspense key={JSON.stringify(query)} fallback={<CourseGridSkeleton />}>
            <CatalogResults
              basePath={basePath}
              parameters={query}
              query={{
                creatorId,
                level: query.level,
                category: query.category,
                sort: query.sort,
                maxPrice: query.price ? Number(query.price) : undefined,
                page: Number(query.page) || 1,
                pageSize: 6,
              }}
            />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
