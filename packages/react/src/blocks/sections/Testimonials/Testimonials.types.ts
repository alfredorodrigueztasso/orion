import type { ReactNode } from "react";

export interface TestimonialAuthor {
  /** Author name */
  name: string;
  /** Author role or title */
  role?: string;
  /** Company name */
  company?: string;
  /** Avatar element */
  avatar?: ReactNode;
}

export interface TestimonialItem {
  /** Testimonial quote text */
  quote: string;
  /** Author information */
  author: TestimonialAuthor;
  /** Star rating (1-5) */
  rating?: number;
}

export interface TestimonialCardProps extends TestimonialItem {
  /** Visual variant */
  variant?: "default" | "minimal";
  /** Additional CSS class */
  className?: string;
}

export type TestimonialsVariant = "default" | "minimal";

export interface TestimonialsProps {
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Array of testimonials */
  testimonials: TestimonialItem[];
  /** Grid columns (2 | 3) */
  columns?: 2 | 3;
  /** Visual variant */
  variant?: TestimonialsVariant;
  /** Additional CSS class */
  className?: string;
}
