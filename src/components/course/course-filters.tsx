import Link from "next/link";
import { courseCategories } from "@/data/course-categories";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

export function CourseFilters({
  selected = "Featured",
  basePath = "/",
  query = {},
}: {
  selected?: string;
  basePath?: string;
  query?: Record<string, string>;
}) {
  return (
    <div className={basePath === "/" ? "mx-auto max-w-[1090px]" : ""}>
      <HorizontalScroll
        label="Course categories"
        wrapDesktop={basePath === "/"}
        activeKey={selected}
      >
        {courseCategories.map((category) => {
          const params = new URLSearchParams(query);
          params.delete("page");
          if (category === "Featured") params.delete("category");
          else params.set("category", category);
          return (
            <Link
              key={category}
              href={`${basePath}${params.size ? "?" + params.toString() : ""}${basePath === "/" ? "#discover" : ""}`}
              scroll={false}
              aria-current={selected === category ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-3 text-[14px] leading-[19px] transition-colors hover:bg-electric-lime focus-visible:outline-2 focus-visible:outline-persian-blue ${selected === category ? "bg-electric-lime text-[#040819]" : "bg-shuttle-soft text-shuttle-ink"}`}
            >
              {category}
            </Link>
          );
        })}
        {basePath === "/" && (
          <Link
            href="/courses"
            className="shrink-0 self-center px-1 py-3 text-sm text-persian-blue"
          >
            + More
          </Link>
        )}
      </HorizontalScroll>
    </div>
  );
}
