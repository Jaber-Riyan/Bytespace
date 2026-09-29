"use client";
import Image from "next/image";
import { useState } from "react";
import type { CourseLesson } from "@/types";

export function CoursePreview({
  poster,
  title,
  video,
}: {
  poster: string;
  title: string;
  video?: CourseLesson["video"];
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-shuttle-soft">
      {playing && video ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
          {video && (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play course preview"
              className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-black/30 text-4xl text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            >
              <span aria-hidden="true">▶</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
