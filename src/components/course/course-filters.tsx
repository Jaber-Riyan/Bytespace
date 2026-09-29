"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import Link from "next/link";
import { courseCategories } from "@/data/course-categories";

type DragPosition = { pointerId: number; startX: number; startScrollLeft: number };

export function CourseFilters({ selected = "Featured", basePath = "/" }: { selected?: string; basePath?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragPosition | null>(null);
  const draggedRef = useRef(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateArrows = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setCanGoBack(isMobile && rail.scrollLeft > 2);
      setCanGoForward(isMobile && rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
    };

    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(rail);
    window.addEventListener("resize", updateArrows);
    updateArrows();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !window.matchMedia("(max-width: 767px)").matches) return;
    const active = rail.querySelector<HTMLElement>('[aria-current="true"]');
    if (!active) return;
    const target = rail.scrollLeft + active.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - active.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [selected]);

  function scrollCategories(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0 || !window.matchMedia("(max-width: 767px)").matches) return;
    const rail = railRef.current;
    if (!rail) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: rail.scrollLeft };
    draggedRef.current = false;
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (!draggedRef.current && Math.abs(distance) < 5) return;
    if (!draggedRef.current) {
      draggedRef.current = true;
      rail.setPointerCapture(event.pointerId);
      rail.style.cursor = "grabbing";
    }
    event.preventDefault();
    rail.scrollLeft = drag.startScrollLeft - distance;
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (rail?.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    if (rail) rail.style.cursor = "";
    dragRef.current = null;
  }

  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!draggedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    draggedRef.current = false;
  }

  return (
    <nav aria-label="Course categories" className="mx-auto flex w-full max-w-[1090px] min-w-0 items-center gap-2 md:block">
      <button
        type="button"
        aria-label="Previous categories"
        onClick={() => scrollCategories(-1)}
        disabled={!canGoBack}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-shuttle-soft text-shuttle-ink disabled:opacity-35 md:hidden"
      >
        <span aria-hidden="true">←</span>
      </button>
      <div
        ref={railRef}
        onScroll={() => {
          const rail = railRef.current;
          if (!rail) return;
          setCanGoBack(rail.scrollLeft > 2);
          setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={onClickCapture}
        className="course-category-rail flex min-w-0 flex-1 gap-4 overflow-x-auto overscroll-x-contain whitespace-nowrap select-none cursor-grab md:cursor-auto md:select-text md:flex-wrap md:justify-center md:gap-y-[21px] md:overflow-visible md:whitespace-normal"
      >
        {courseCategories.map((category) => (
          <Link
            key={category}
            href={category === "Featured" ? `${basePath}${basePath === "/" ? "#discover" : ""}` : `${basePath}?category=${encodeURIComponent(category)}${basePath === "/" ? "#discover" : ""}`}
            scroll={false}
            aria-current={selected === category ? "true" : undefined}
            className={`shrink-0 rounded-full px-4 py-3 text-[14px] leading-[19px] transition-colors hover:bg-electric-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-persian-blue ${selected === category ? "bg-electric-lime text-[#040819]" : "bg-shuttle-soft text-shuttle-ink"}`}
          >
            {category}
          </Link>
        ))}
        <Link href="/courses" className="shrink-0 self-center px-1 py-3 text-[14px] text-persian-blue hover:underline">+ More</Link>
      </div>
      <button
        type="button"
        aria-label="Next categories"
        onClick={() => scrollCategories(1)}
        disabled={!canGoForward}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-shuttle-soft text-shuttle-ink disabled:opacity-35 md:hidden"
      >
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}