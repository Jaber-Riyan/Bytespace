import type { CourseLesson, CourseModule, CourseReview } from "@/types";

export const digitalAssetModules: Omit<CourseModule, "lessonIds">[] = [
  { id: "foundations", title: "Introduction to Digital Assets", description: "Lay the groundwork by understanding digital elements and navigating design software tools. Dive into the essentials of digital asset creation." },
  { id: "principles", title: "Design Principles for Impact", description: "Master the principles that shape impactful designs, from color theory to typography. Elevate your visual communication skills." },
  { id: "user-centered", title: "User-Centric Design Strategies", description: "Explore design thinking and user experience essentials. Craft digital assets with a focus on thoughtful, user-centered design." },
  { id: "interactive", title: "Interactive Media and Engagement", description: "Engage your audience through interactive presentations and multimedia elements. Master the art of creating immersive digital experiences." },
  { id: "showcase", title: "Project Showcase and Critique", description: "Perfect your presentation skills and embrace collaboration through peer critique. Showcase your work with confidence." },
  { id: "platforms", title: "Optimizing Digital Assets for Various Platforms", description: "Adapt your digital creations for mobile platforms and social media. Make your work accessible across diverse digital landscapes." },
];
export function createModules(lessons: CourseLesson[], digital: boolean): CourseModule[] {
  return lessons.map((lesson, i) => ({
    id: digital ? digitalAssetModules[i].id : lesson.id,
    title: digital ? digitalAssetModules[i].title : lesson.title,
    description: digital ? digitalAssetModules[i].description : "Build a strong foundation through practical explanations and guided exercises. Apply each new skill to a project of your own.",
    lessonIds: [lesson.id],
  }));
}
export const digitalAssetReviews: CourseReview[] = [
  { id: "digital-review-1", author: "PurePearl Studio", role: "UI/UX Designer", avatar: "/images/courses/avatar-1.png", createdAt: "2025-09-10", rating: 5, quote: "The course provided me with a comprehensive understanding of digital asset creation. The lessons were practical and immediately applicable to my work. Highly recommended!" },
  { id: "digital-review-2", author: "Albert Flores", role: "UI/UX Designer", avatar: "/images/courses/avatar-2.png", createdAt: "2025-09-14", rating: 5, quote: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience." },
  { id: "digital-review-3", author: "Cody Fisher", role: "UI/UX Designer", avatar: "/images/courses/avatar-3.png", createdAt: "2025-10-01", rating: 4, quote: "The project showcase and critique module helped me refine my skills through valuable feedback. I would love even more exercises in the advanced modules." },
  { id: "digital-review-4", author: "Brooklyn Simmons", role: "UI/UX Designer", avatar: "/images/courses/avatar-4.png", createdAt: "2025-10-12", rating: 5, quote: "The lessons on optimizing digital assets for various platforms were particularly insightful. The practical examples and engaging content kept me motivated throughout." },
];
