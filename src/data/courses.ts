import { createModules, digitalAssetReviews } from "@/data/course-content";
import type { Course, CourseLesson } from "@/types";

const figmaLessons: CourseLesson[] = [
  {
    id: "explore-ideas",
    title: "Explore ideas",
    durationSeconds: 950,
    video: {
      provider: "youtube",
      videoId: "dXQ7IHkTiMM",
      url: "https://www.youtube.com/watch?v=dXQ7IHkTiMM",
    },
  },
  {
    id: "create-designs",
    title: "Create designs",
    durationSeconds: 1285,
    video: {
      provider: "youtube",
      videoId: "wvFd-z7jSaA",
      url: "https://www.youtube.com/watch?v=wvFd-z7jSaA",
    },
  },
  {
    id: "build-prototypes",
    title: "Build prototypes",
    durationSeconds: 466,
    video: {
      provider: "youtube",
      videoId: "lTIeZ2ahEkQ",
      url: "https://www.youtube.com/watch?v=lTIeZ2ahEkQ",
    },
  },
];

// Sample catalog data. Replace the repository functions with API calls when a backend is ready.
const baseCourses: Omit<Course, "details">[] = [
  {
    id: "learn-figma",
    title: "Learn Figma from Basic",
    description:
      "Get comfortable with Figma, from exploring ideas to designing screens and building interactive prototypes.",
    category: "UI/UX Design",
    creator: "purepearl studio",
    image: "/images/courses/figma.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: figmaLessons.length,
    durationSeconds: figmaLessons.reduce((sum, lesson) => sum + lesson.durationSeconds, 0),
    lessons: figmaLessons,
    reviews: [
      {
        id: "figma-review-1",
        author: "Alex M.",
        rating: 5,
        quote: "A clear introduction to the basics of designing and prototyping in Figma.",
      },
    ],
  },
  {
    id: "build-digital-asset",
    title: "Build Digital Asset",
    description:
      "Learn a practical process for planning, designing, and presenting reusable digital assets.",
    category: "Graphic Design",
    creator: "purepearl studio",
    image: "/images/courses/digital-asset.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: 17,
    durationSeconds: 8160,
    lessons: [],
    reviews: [],
  },
  {
    id: "power-of-big-data",
    title: "The Power of Big Data",
    description: "Explore how data can reveal useful patterns and support smarter decisions.",
    category: "Data Science",
    creator: "purepearl studio",
    image: "/images/courses/big-data.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: 17,
    durationSeconds: 8160,
    lessons: [],
    reviews: [],
  },
  {
    id: "productivity-self-care",
    title: "Balancing Productivity and Self-Care",
    description:
      "Make room for focused work and healthy routines with practical planning techniques.",
    category: "Productivity",
    creator: "purepearl studio",
    image: "/images/courses/productivity.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: 17,
    durationSeconds: 8160,
    lessons: [],
    reviews: [],
  },
  {
    id: "money-management",
    title: "Mastering Money Management",
    description: "Build simple habits for budgeting, saving, and making confident money decisions.",
    category: "Freelance & Entrepreneurship",
    creator: "purepearl studio",
    image: "/images/courses/money.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: 17,
    durationSeconds: 8160,
    lessons: [],
    reviews: [],
  },
  {
    id: "startup-success",
    title: "From Idea to Startup Success",
    description:
      "Turn an early idea into a clear plan, test it with people, and take the first steps toward launch.",
    category: "Marketing",
    creator: "purepearl studio",
    image: "/images/courses/startup.png",
    price: 25,
    level: "Beginner",
    rating: 4.5,
    reviewCount: 59,
    learnerCount: 30,
    lessonCount: 17,
    durationSeconds: 8160,
    lessons: [],
    reviews: [],
  },
];
const additionalCourses: Array<[string, string, string, number]> = [
  ["design-systems", "Design Systems in Figma", "UI/UX Design", 0],
  ["brand-identity", "Create a Memorable Brand Identity", "Graphic Design", 1],
  ["data-storytelling", "Tell Better Stories with Data", "Data Science", 2],
  ["focused-work", "Build a Focused Work Routine", "Productivity", 3],
  ["freelance-pricing", "Pricing Your Freelance Work", "Freelance & Entrepreneurship", 4],
  ["social-content", "Plan Your Social Media Content", "Social Media", 5],
  ["digital-illustration", "Digital Illustration Essentials", "Digital Illustration", 0],
  ["motion-design", "Getting Started with Motion Design", "Animation", 1],
  ["web-foundations", "Web Design Foundations", "Web Development", 2],
  ["creative-habits", "Everyday Creative Habits", "Drawing & Painting", 3],
  ["creative-business", "Start Your Creative Business", "Creative Marketing", 4],
  ["product-launch", "Plan Your First Product Launch", "Marketing", 5],
  ["music-production", "Music Production Fundamentals", "Music", 0],
  ["photo-composition", "Photography and Composition", "Photography", 1],
  ["video-editing", "Video Editing Fundamentals", "Film & Video", 2],
  ["handmade-business", "Build Your Handmade Business", "Crafts", 3],
  ["cooking-basics", "Confident Cooking at Home", "Cooking", 4],
  ["customer-research", "Understand Your First Customers", "Marketing", 5],
];
const extendedCourses = [
  ...baseCourses,
  ...additionalCourses.map(([id, title, category, source], index) => ({
    ...baseCourses[source],
    id,
    title,
    category,
    description: `Build practical skills in ${category.toLowerCase()} with guided exercises and a project of your own.`,
    price: index % 3 === 0 ? 35 : 25,
    level: index % 3 === 0 ? ("Intermediate" as const) : ("Beginner" as const),
    lessons: [],
    reviews: [],
    lessonCount: 0,
    durationSeconds: 0,
  })),
];

export const courses: Course[] = extendedCourses.map((course) => {
  const isDigital = course.id === "build-digital-asset";
  const lessons: CourseLesson[] = isDigital
    ? [
        ...figmaLessons,
        {
          id: "interactive-media",
          title: "Interactive media and engagement",
          durationSeconds: 960,
        },
        { id: "project-showcase", title: "Project showcase and critique", durationSeconds: 1080 },
        {
          id: "platform-optimization",
          title: "Optimizing for various platforms",
          durationSeconds: 840,
        },
      ]
    : course.lessons.length
      ? course.lessons
      : [
          {
            id: `${course.id}-foundations`,
            title: `${course.category} foundations`,
            durationSeconds: 720,
          },
          {
            id: `${course.id}-practice`,
            title: "Guided practice: develop your ideas",
            durationSeconds: 1260,
          },
          {
            id: `${course.id}-project`,
            title: "Create and present your first project",
            durationSeconds: 960,
          },
        ];
  const description = isDigital
    ? [
        "Embark on an enlightening exploration into the world of digital creation with our comprehensive course, “Build Digital Asset: A Comprehensive Guide.” This learning experience invites you to explore the process of crafting impactful digital content, from foundational concepts to presenting your work.",
        "Begin by building a foundation in digital asset creation. Understand how to organize ideas, create reusable visual elements, and communicate clearly through thoughtful design.",
        "Explore color, typography, and layout through hands-on exercises. Create and refine a project, practice presenting your design decisions, and develop a portfolio that shows your growing skills.",
      ]
    : [
        course.description,
        `Explore the fundamentals of ${course.category.toLowerCase()} through practical exercises. Develop a repeatable process, put your ideas into practice, and leave with a clear next step for your learning.`,
      ];
  return {
    ...course,
    lessons,
    lessonCount: lessons.length,
    durationSeconds: lessons.reduce((sum, lesson) => sum + lesson.durationSeconds, 0),
    ...(isDigital
      ? {
          level: "Intermediate" as const,
          rating: 4.8,
          reviewCount: 172,
          learnerCount: 199,
          reviews: digitalAssetReviews,
        }
      : {}),
    details: {
      modules: createModules(lessons, isDigital),
      ratingCounts: isDigital
        ? { 5: 148, 4: 18, 3: 4, 2: 1, 1: 1 }
        : { 5: 30, 4: 29, 3: 0, 2: 0, 1: 0 },
      headline: isDigital ? "Build Digital Asset: A Comprehensive Guide" : course.title,
      subtitle: isDigital
        ? "Unlock the Power of Digital Creation with Expert Guidance"
        : `Build your confidence in ${course.category.toLowerCase()}, one step at a time.`,
      descriptionParagraphs: description,
      previewImage: course.image,
      gallery: [
        { src: "/images/courses/figma.png", alt: "Sketching interface ideas" },
        { src: "/images/courses/digital-asset.png", alt: "Digital asset design exploration" },
        { src: "/images/courses/big-data.png", alt: "Data visualization project" },
        { src: "/images/courses/startup.png", alt: "Collaborative project planning" },
      ],
      learningOutcomes: isDigital
        ? [
            "Foundational Concepts",
            "Design Principles Mastery",
            "Advanced Techniques in Digital Creation",
            "Project Showcase and Critique",
            "Optimizing for Various Platforms",
            "Digital Asset Management Best Practices",
            "Monetization Strategies",
            "Capstone Project: Building Your Portfolio",
          ]
        : [
            `Understand the foundations of ${course.category.toLowerCase()}`,
            "Develop a practical, repeatable workflow",
            "Apply your learning to a personal project",
            "Present your work with confidence",
          ],
      includes: [
        "Learning Resources",
        "Quality Lesson Videos",
        "Certificate of Completion",
        "Private Consultation",
      ],
      instructor: {
        id: "purepearl-studio",
        avatar: "/images/courses/avatar-1.png",
        role: "Professional Creator",
        bio: "Practical guidance for curious people who want to turn their ideas into meaningful creative work.",
      },
    },
  };
});
