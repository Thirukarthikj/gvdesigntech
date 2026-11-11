export interface Course {
  id: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  overview: string;
  keyTopics: string[];
  softwareCovered: string[];
  recommendedFor: string[];
  learningOutcomes: string[];
}

export interface CourseCategory {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  heroImage: string;
  thumbnailImage: string;
  accentColor: string;
  iconName: string;
  courseCountNote: string;
  courses: Course[];
}

export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  course: string;
  preferredMode: string;
  message: string;
  website?: string; // honeypot
}

export interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  course?: string;
  preferredMode?: string;
  message?: string;
  general?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

