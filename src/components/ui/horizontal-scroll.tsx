"use client";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";

export function HorizontalScroll({ children, label, wrapDesktop = false, activeKey }: { children: ReactNode; label: string; wrapDesktop?: boolean; activeKey?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; left: number } | null>(null);
  const dragged = useRef(false);
  const [edges, setEdges] = useState({ back: false, forward: false });
  function updateEdges() {
    const rail = railRef.current;
    if (rail) setEdges({ back: rail.scrollLeft > 2, forward: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2 });
  }
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(rail);
    for (const child of rail.children) observer.observe(child);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!rail || !active || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [activeKey]);
  function move(direction: number) {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * .75, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  function end(event: PointerEvent<HTMLDivElement>) {
    if (railRef.current?.hasPointerCapture(event.pointerId)) railRef.current.releasePointerCapture(event.pointerId);
    drag.current = null;
  }
  const arrow = "flex size-9 shrink-0 items-center justify-center rounded-full border bg-white disabled:opacity-30 " + (wrapDesktop ? "md:hidden" : "");
  return <nav aria-label={label} className="flex min-w-0 items-center gap-2">
    <button className={arrow} aria-label={`Previous ${label.toLowerCase()}`} disabled={!edges.back} onClick={() => move(-1)}>←</button>
    <div ref={railRef} onScroll={updateEdges}
      onPointerDown={event => { dragged.current = false; if (event.pointerType === "mouse" && event.button === 0) drag.current = { id: event.pointerId, x: event.clientX, left: event.currentTarget.scrollLeft }; }}
      onPointerMove={event => { const start = drag.current; if (!start || start.id !== event.pointerId) return; const delta = event.clientX - start.x; if (Math.abs(delta) < 5 && !dragged.current) return; dragged.current = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.scrollLeft = start.left - delta; event.preventDefault(); }}
      onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null; }}
      onDragStart={event => event.preventDefault()}
      onClickCapture={event => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } }}
      className={`course-category-rail relative flex min-w-0 flex-1 cursor-grab gap-4 overflow-x-auto overscroll-x-contain whitespace-nowrap select-none ${wrapDesktop ? "md:flex-wrap md:justify-center md:gap-y-[21px] md:overflow-visible" : ""}`}>
      {children}
    </div>
    <button className={arrow} aria-label={`Next ${label.toLowerCase()}`} disabled={!edges.forward} onClick={() => move(1)}>→</button>
  </nav>;
}
