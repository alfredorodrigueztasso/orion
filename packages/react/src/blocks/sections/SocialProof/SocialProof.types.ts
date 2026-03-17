import type { HTMLAttributes } from "react";

export interface SocialProofLogo {
  name: string;
  logo: string;
}

export interface SocialProofTestimonial {
  id: string | number;
  quote: string;
  author: string;
  title?: string;
  company?: string;
}

export interface SocialProofStat {
  value: string;
  label: string;
}

export interface SocialProofProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title: string;
  /** Company logos */
  logos?: SocialProofLogo[];
  /** Testimonial quotes */
  testimonials?: SocialProofTestimonial[];
  /** Stats/metrics */
  stats?: SocialProofStat[];
  /** Compact mode (stats only) */
  compact?: boolean;
  /** Additional class name */
  className?: string;
}
