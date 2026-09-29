"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { courseCategories } from "@/data/course-categories";

export function CatalogControls({ query, basePath = "/courses" }: { query: Record<string, string>; basePath?: string }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [pending, startTransition] = useTransition();
  function change(name: string, value: string) {
    const params = new URLSearchParams(query);
    params.delete("page");
    if (value) params.set(name, value); else params.delete(name);
    startTransition(() => router.push(basePath + "?" + params.toString(), { scroll: false }));
  }
  const control = "max-w-full rounded-full border bg-white px-4 py-2.5 text-sm focus-visible:outline-persian-blue";
  return <div aria-busy={pending}>
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="extra-filters" className={control}>☷ Filter</button>
      <label><span className="sr-only">Course level</span><select className={control} value={query.level || ""} onChange={e => change("level", e.target.value)}><option value="">Level</option>{["Beginner", "Intermediate", "Advanced"].map(level => <option key={level}>{level}</option>)}</select></label>
      <label><span className="sr-only">Category</span><select className={control + " w-[130px]"} value={query.category || ""} onChange={e => change("category", e.target.value)}><option value="">Category</option>{courseCategories.filter(c => c !== "Featured").map(category => <option key={category}>{category}</option>)}</select></label>
      <label className="ml-auto"><span className="sr-only">Sort courses</span><select className={control} value={query.sort || "relevant"} onChange={e => change("sort", e.target.value)}><option value="relevant">Most relevant</option><option value="rating">Highest rated</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
    </div>
    {expanded && <div id="extra-filters" className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-shuttle-soft p-4"><label className="text-sm">Maximum price <select className={control + " ml-2"} value={query.price || ""} onChange={e => change("price", e.target.value)}><option value="">Any price</option><option value="25">$25</option><option value="50">$50</option></select></label><button onClick={() => startTransition(() => router.push(basePath, { scroll: false }))} className="text-sm text-persian-blue underline">Clear filters</button></div>}
    <p className="sr-only" role="status">{pending ? "Updating courses" : ""}</p>
  </div>;
}
