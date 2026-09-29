import type { Course, CourseLesson } from "@/types";

const figmaLessons: CourseLesson[] = [
  { id: "explore-ideas", title: "Explore ideas", durationSeconds: 950, video: { provider: "youtube", videoId: "dXQ7IHkTiMM", url: "https://www.youtube.com/watch?v=dXQ7IHkTiMM" } },
  { id: "create-designs", title: "Create designs", durationSeconds: 1285, video: { provider: "youtube", videoId: "wvFd-z7jSaA", url: "https://www.youtube.com/watch?v=wvFd-z7jSaA" } },
  { id: "build-prototypes", title: "Build prototypes", durationSeconds: 466, video: { provider: "youtube", videoId: "lTIeZ2ahEkQ", url: "https://www.youtube.com/watch?v=lTIeZ2ahEkQ" } },
];

// Sample catalog data. Replace the repository functions with API calls when a backend is ready.
export const courses: Course[] = [
  {
    id: "learn-figma", title: "Learn Figma from Basic",
    description: "Get comfortable with Figma, from exploring ideas to designing screens and building interactive prototypes.",
    category: "UI/UX Design", creator: "purepearl studio", image: "/images/courses/figma.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: figmaLessons.length, durationSeconds: figmaLessons.reduce((sum, lesson) => sum + lesson.durationSeconds, 0),
    lessons: figmaLessons,
    reviews: [{ id: "figma-review-1", author: "Alex M.", rating: 5, quote: "A clear introduction to the basics of designing and prototyping in Figma." }],
  },
  {
    id: "build-digital-asset", title: "Build Digital Asset",
    description: "Learn a practical process for planning, designing, and presenting reusable digital assets.",
    category: "Graphic Design", creator: "purepearl studio", image: "/images/courses/digital-asset.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: 17, durationSeconds: 8160, lessons: [], reviews: [],
  },
  {
    id: "power-of-big-data", title: "The Power of Big Data",
    description: "Explore how data can reveal useful patterns and support smarter decisions.",
    category: "Data Science", creator: "purepearl studio", image: "/images/courses/big-data.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: 17, durationSeconds: 8160, lessons: [], reviews: [],
  },
  {
    id: "productivity-self-care", title: "Balancing Productivity and Self-Care",
    description: "Make room for focused work and healthy routines with practical planning techniques.",
    category: "Productivity", creator: "purepearl studio", image: "/images/courses/productivity.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: 17, durationSeconds: 8160, lessons: [], reviews: [],
  },
  {
    id: "money-management", title: "Mastering Money Management",
    description: "Build simple habits for budgeting, saving, and making confident money decisions.",
    category: "Freelance & Entrepreneurship", creator: "purepearl studio", image: "/images/courses/money.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: 17, durationSeconds: 8160, lessons: [], reviews: [],
  },
  {
    id: "startup-success", title: "From Idea to Startup Success",
    description: "Turn an early idea into a clear plan, test it with people, and take the first steps toward launch.",
    category: "Marketing", creator: "purepearl studio", image: "/images/courses/startup.png",
    price: 25, level: "Beginner", rating: 4.5, reviewCount: 59, learnerCount: 30,
    lessonCount: 17, durationSeconds: 8160, lessons: [], reviews: [],
  },
];