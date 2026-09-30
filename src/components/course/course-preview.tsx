"use client";
import Image from "next/image";
import type { CourseLesson } from "@/types";

export function CoursePreview({
  poster,
  title,
  video,
  autoPlay = false,
}: {
  poster: string;
  title: string;
  video?: CourseLesson["video"];
  autoPlay?: boolean;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[24px] bg-[#0b0c10] shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
      {video ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}?${new URLSearchParams({
            autoplay: autoPlay ? "1" : "0",
            rel: "0",
            modestbranding: "1",
          })}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-white">
            <div>
              <span className="mx-auto grid size-14 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
                  <path d="M8 6.5 17 12l-9 5.5v-11Z" fill="currentColor" />
                </svg>
              </span>
              <p className="mt-4 text-sm font-bold">Video coming soon</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
