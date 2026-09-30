"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { courseCategories } from "@/data/course-categories";

function TuneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none">
      <path
        d="M4 7h10M18 7h2M4 17h2M10 17h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none">
      <path
        d="m6.5 8 3.5 3.5L13.5 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none">
      <path
        d="M8 6h12M8 12h8M8 18h4M4 5v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SelectControl({
  label,
  value,
  onChange,
  children,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`group relative block min-w-0 ${className}`}>
      <span className="pointer-events-none absolute left-4 top-2 z-10 text-[10px] font-bold uppercase tracking-[0.12em] text-shuttle-muted transition-colors group-focus-within:text-persian-blue">
        {label}
      </span>
      <select
        className="h-[58px] w-full cursor-pointer appearance-none rounded-2xl border border-black/[0.09] bg-white pb-1.5 pl-4 pr-11 pt-5 text-[15px] font-medium text-shuttle-ink shadow-[0_1px_2px_rgba(20,24,40,0.03)] outline-none transition hover:border-black/20 hover:bg-[#fdfdfd] focus:border-persian-blue focus:ring-4 focus:ring-persian-blue/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-shuttle-muted transition group-focus-within:rotate-180 group-focus-within:text-persian-blue">
        <ChevronIcon />
      </span>
    </label>
  );
}

export function CatalogControls({
  query,
  basePath = "/courses",
}: {
  query: Record<string, string>;
  basePath?: string;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [pending, startTransition] = useTransition();
  const activeFilterCount = [query.level, query.category, query.price].filter(Boolean).length;

  function change(name: string, value: string) {
    const params = new URLSearchParams(query);
    params.delete("page");
    if (value) params.set(name, value);
    else params.delete(name);
    const search = params.toString();
    startTransition(() =>
      router.push(search ? `${basePath}?${search}` : basePath, { scroll: false }),
    );
  }

  function clearFilters() {
    const params = new URLSearchParams(query);
    ["level", "category", "price", "page"].forEach((key) => params.delete(key));
    const search = params.toString();
    startTransition(() =>
      router.push(search ? `${basePath}?${search}` : basePath, { scroll: false }),
    );
  }

  return (
    <div aria-busy={pending} className={pending ? "opacity-70" : "transition-opacity"}>
      <div className="rounded-[24px] border border-black/[0.07] bg-shuttle-soft/70 p-2 shadow-[0_16px_45px_rgba(33,38,54,0.07)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_1fr_1.25fr] lg:grid-cols-[auto_190px_240px_1fr_220px]">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls="extra-filters"
            className={`col-span-2 flex h-[58px] items-center justify-center gap-2.5 rounded-2xl px-5 text-sm font-bold outline-none transition focus-visible:ring-4 focus-visible:ring-persian-blue/20 sm:col-span-1 lg:justify-start ${
              expanded
                ? "bg-persian-blue text-white shadow-[0_8px_20px_rgba(0,59,226,0.24)]"
                : "bg-shuttle-ink text-white shadow-[0_8px_20px_rgba(36,37,40,0.14)] hover:bg-persian-blue"
            }`}
          >
            <TuneIcon />
            Filters
            {activeFilterCount > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-electric-lime text-[11px] text-shuttle-ink">
                {activeFilterCount}
              </span>
            )}
          </button>

          <SelectControl
            label="Level"
            value={query.level || ""}
            onChange={(value) => change("level", value)}
          >
            <option value="">All levels</option>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </SelectControl>

          <SelectControl
            label="Category"
            value={query.category || ""}
            onChange={(value) => change("category", value)}
          >
            <option value="">All categories</option>
            {courseCategories
              .filter((category) => category !== "Featured")
              .map((category) => (
                <option key={category}>{category}</option>
              ))}
          </SelectControl>

          <div className="hidden lg:block" />

          <div className="relative col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-shuttle-muted">
              <SortIcon />
            </span>
            <label className="group block">
              <span className="sr-only">Sort courses</span>
              <select
                className="h-[58px] w-full cursor-pointer appearance-none rounded-2xl border border-black/[0.09] bg-white pl-11 pr-11 text-[15px] font-medium text-shuttle-ink shadow-[0_1px_2px_rgba(20,24,40,0.03)] outline-none transition hover:border-black/20 focus:border-persian-blue focus:ring-4 focus:ring-persian-blue/10"
                value={query.sort || "relevant"}
                onChange={(event) => change("sort", event.target.value)}
              >
                <option value="relevant">Most relevant</option>
                <option value="rating">Highest rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-shuttle-muted transition group-focus-within:rotate-180 group-focus-within:text-persian-blue">
                <ChevronIcon />
              </span>
            </label>
          </div>
        </div>
      </div>

      {expanded && (
        <div
          id="extra-filters"
          className="mt-3 flex flex-col gap-4 rounded-[20px] border border-black/[0.07] bg-white p-4 shadow-[0_12px_35px_rgba(33,38,54,0.06)] sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="w-full sm:max-w-[220px]">
            <SelectControl
              label="Maximum price"
              value={query.price || ""}
              onChange={(value) => change("price", value)}
            >
              <option value="">Any price</option>
              <option value="25">Up to $25</option>
              <option value="50">Up to $50</option>
            </SelectControl>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-[50px] rounded-xl px-4 text-sm font-bold text-persian-blue outline-none transition hover:bg-persian-blue/5 focus-visible:ring-4 focus-visible:ring-persian-blue/15"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <p className="sr-only" role="status">
        {pending ? "Updating courses" : ""}
      </p>
    </div>
  );
}
