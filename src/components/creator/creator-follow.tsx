"use client";
import { useLocalPreference } from "@/lib/use-local-preference";

export function CreatorFollow({ creatorId, followerCount, products }: { creatorId: string; followerCount: number; products: number }) {
  const [value, setValue] = useLocalPreference(`bytespace:following:v1:${creatorId}`);
  const following = value === "true";
  return <div className="mt-10 flex flex-wrap items-center gap-4">
    <span className="rounded-full bg-white px-6 py-3 text-shuttle-ink"><strong className="mr-2 font-medium text-persian-blue">{products}</strong>Products</span>
    <span aria-live="polite" className="rounded-full bg-white px-6 py-3 text-shuttle-ink"><strong className="mr-2 font-medium text-persian-blue">{followerCount + Number(following)}</strong>Followers</span>
    <div className="ml-auto"><button aria-pressed={following} onClick={() => setValue(String(!following))} className="rounded-full bg-electric-lime px-6 py-3 font-medium text-shuttle-ink">{following ? "Following" : "Follow"}</button><p className="sr-only" role="status">{following ? "Following this creator on this device." : ""}</p></div>
  </div>;
}
