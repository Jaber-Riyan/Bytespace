import type { Creator } from "@/types";

export const creators: Creator[] = [
  {
    id: "purepearl-studio",
    name: "PurePearl Studio",
    avatar: "/images/courses/avatar-1.png",
    headline: "Passionate UI/UX, Web designer",
    biography: [
      "Welcome to the creative world of PurePearl Studio. Here, you’ll discover the passion, expertise, and inspiration that drive my creative journey. Let’s explore and learn together!",
      "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
    followerCount: 12,
  },
];

export async function getCreator(id: string): Promise<Creator | undefined> {
  return creators.find((creator) => creator.id === id);
}
