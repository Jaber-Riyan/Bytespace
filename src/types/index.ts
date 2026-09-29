export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseLesson = {
  id: string;
  title: string;
  durationSeconds: number;
  video?: { provider: "youtube"; videoId: string; url: string };
};

export type CourseReview = {
  id: string;
  author: string;
  rating: number;
  quote: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  creator: string;
  image: string;
  price: number;
  level: CourseLevel;
  rating: number;
  reviewCount: number;
  learnerCount: number;
  lessonCount: number;
  durationSeconds: number;
  lessons: CourseLesson[];
  reviews: CourseReview[];
  details: CourseDetails;
};
export type CourseDetails = {
  headline: string;
  subtitle: string;
  descriptionParagraphs: string[];
  previewImage: string;
  gallery: { src: string; alt: string }[];
  learningOutcomes: string[];
  includes: string[];
  instructor: { id: string; avatar: string; role: string; bio: string };
};
