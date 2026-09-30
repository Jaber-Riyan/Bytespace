"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { courseCategories } from "@/data/course-categories";

type MenuName = "filters" | "level" | "category" | "sort";

function Icon({ name }: { name: MenuName | "check" | "chevron" | "price" }) {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "size-4 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "filters")
    return (
      <svg {...common}>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </svg>
    );
  if (name === "level")
    return (
      <svg {...common}>
        <path d="M5 19v-5M12 19V9M19 19V4" />
        <path d="M3 19h18" />
      </svg>
    );
  if (name === "category")
    return (
      <svg {...common}>
        <path d="M4 5.5 8 3l4 2.5v5L8 13l-4-2.5v-5ZM13 13.5l3-2 3 2v4l-3 2-3-2v-4ZM4 17h5" />
      </svg>
    );
  if (name === "sort")
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h11M4 17h6" />
      </svg>
    );
  if (name === "price")
    return (
      <svg {...common}>
        <path d="M12 3v18M16 7.5c0-1.4-1.8-2.5-4-2.5S8 6.1 8 7.5 9.8 10 12 10s4 1.1 4 2.5S14.2 15 12 15s-4-1.1-4-2.5" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}

function Trigger({
  icon,
  label,
  active,
  open,
  onClick,
  badge,
}: {
  icon: MenuName;
  label: string;
  active?: boolean;
  open: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={`group inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-persian-blue/15 ${
        open
          ? "border-persian-blue bg-persian-blue text-white shadow-[0_8px_24px_rgba(0,59,226,0.2)]"
          : active
            ? "border-persian-blue/20 bg-persian-blue/[0.06] text-persian-blue"
            : "border-black/[0.12] bg-white text-shuttle-ink hover:border-persian-blue/30 hover:bg-shuttle-soft"
      }`}
    >
      <Icon name={icon} />
      <span>{label}</span>
      {badge ? (
        <span className="grid size-5 place-items-center rounded-full bg-electric-lime text-[11px] font-bold text-shuttle-ink">
          {badge}
        </span>
      ) : (
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <Icon name="chevron" />
        </span>
      )}
    </button>
  );
}

function OptionButton({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-persian-blue/20 ${
        selected ? "bg-persian-blue text-white" : "text-shuttle-ink hover:bg-shuttle-soft"
      }`}
    >
      <span>{children}</span>
      {selected && <Icon name="check" />}
    </button>
  );
}

function MenuPanel({
  children,
  align = "left",
  wide = false,
}: {
  children: ReactNode;
  align?: "left" | "right";
  wide?: boolean;
}) {
  return (
    <div
      role="menu"
      className={`absolute top-[calc(100%+10px)] z-40 rounded-[20px] border border-black/[0.08] bg-white p-2 shadow-[0_20px_55px_rgba(29,35,52,0.16)] ${
        align === "right" ? "right-0" : "left-0"
      } ${wide ? "w-[min(360px,calc(100vw-40px))]" : "w-56"}`}
    >
      {children}
    </div>
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
  const rootRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [pending, startTransition] = useTransition();
  const activeFilterCount = [query.level, query.category, query.price].filter(Boolean).length;
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    ["relevant", "Most relevant"],
    ["rating", "Highest rated"],
    ["price-asc", "Price: low to high"],
    ["price-desc", "Price: high to low"],
  ] as const;

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  function toggle(menu: MenuName) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function change(name: string, value: string) {
    setOpenMenu(null);
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
    setOpenMenu(null);
    const params = new URLSearchParams(query);
    ["level", "category", "price", "page"].forEach((key) => params.delete(key));
    const search = params.toString();
    startTransition(() =>
      router.push(search ? `${basePath}?${search}` : basePath, { scroll: false }),
    );
  }

  const selectedSort =
    sortOptions.find(([value]) => value === (query.sort || "relevant"))?.[1] || "Most relevant";

  return (
    <div
      ref={rootRef}
      aria-busy={pending}
      className={`relative z-20 transition-opacity ${pending ? "opacity-65" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <Trigger
            icon="filters"
            label="Filter"
            badge={activeFilterCount}
            active={activeFilterCount > 0}
            open={openMenu === "filters"}
            onClick={() => toggle("filters")}
          />
          {openMenu === "filters" && (
            <MenuPanel wide>
              <div className="p-2">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="grid size-8 place-items-center rounded-lg bg-electric-lime">
                    <Icon name="price" />
                  </span>
                  Price range
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    ["", "Any price"],
                    ["25", "Up to $25"],
                    ["50", "Up to $50"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => change("price", value)}
                      className={`rounded-xl border px-2 py-3 text-xs font-medium transition ${
                        (query.price || "") === value
                          ? "border-persian-blue bg-persian-blue text-white"
                          : "border-black/[0.08] hover:border-persian-blue/30 hover:bg-shuttle-soft"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold text-persian-blue transition hover:bg-persian-blue/[0.06]"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </MenuPanel>
          )}
        </div>

        <div className="relative">
          <Trigger
            icon="level"
            label={query.level || "Level"}
            active={Boolean(query.level)}
            open={openMenu === "level"}
            onClick={() => toggle("level")}
          />
          {openMenu === "level" && (
            <MenuPanel>
              <OptionButton selected={!query.level} onClick={() => change("level", "")}>
                All levels
              </OptionButton>
              {levels.map((level) => (
                <OptionButton
                  key={level}
                  selected={query.level === level}
                  onClick={() => change("level", level)}
                >
                  {level}
                </OptionButton>
              ))}
            </MenuPanel>
          )}
        </div>

        <div className="relative">
          <Trigger
            icon="category"
            label={query.category || "Category"}
            active={Boolean(query.category)}
            open={openMenu === "category"}
            onClick={() => toggle("category")}
          />
          {openMenu === "category" && (
            <MenuPanel wide>
              <div className="max-h-80 overflow-y-auto p-1">
                <OptionButton selected={!query.category} onClick={() => change("category", "")}>
                  All categories
                </OptionButton>
                <div className="my-1 h-px bg-black/[0.06]" />
                {courseCategories
                  .filter((category) => category !== "Featured")
                  .map((category) => (
                    <OptionButton
                      key={category}
                      selected={query.category === category}
                      onClick={() => change("category", category)}
                    >
                      {category}
                    </OptionButton>
                  ))}
              </div>
            </MenuPanel>
          )}
        </div>

        <div className="relative ml-0 sm:ml-auto">
          <Trigger
            icon="sort"
            label={selectedSort}
            active={Boolean(query.sort && query.sort !== "relevant")}
            open={openMenu === "sort"}
            onClick={() => toggle("sort")}
          />
          {openMenu === "sort" && (
            <MenuPanel align="right">
              {sortOptions.map(([value, label]) => (
                <OptionButton
                  key={value}
                  selected={(query.sort || "relevant") === value}
                  onClick={() => change("sort", value)}
                >
                  {label}
                </OptionButton>
              ))}
            </MenuPanel>
          )}
        </div>
      </div>

      <p className="sr-only" role="status">
        {pending ? "Updating courses" : ""}
      </p>
    </div>
  );
}
