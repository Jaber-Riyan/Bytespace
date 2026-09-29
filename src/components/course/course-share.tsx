"use client";
import { useState } from "react";
export function CourseShare({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: location.href });
        setMessage("");
      } else {
        await navigator.clipboard.writeText(location.href);
        setMessage("Link copied");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setMessage("Copy this page’s address to share the course.");
    }
  }
  return (
    <div className="shrink-0">
      <button
        onClick={share}
        className="rounded-full bg-electric-lime px-6 py-2 text-sm text-shuttle-ink"
      >
        ↗ Share
      </button>
      <p role="status" className="mt-1 max-w-44 text-xs">
        {message}
      </p>
    </div>
  );
}
