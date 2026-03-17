import type { ReactNode } from "react";

export type CTAVariant = "default" | "brand" | "subtle";

export interface CTAProps {
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description?: string;
  /** CTA variant style */
  variant?: CTAVariant;
  /** Action buttons (ReactNode) */
  actions?: ReactNode;
  /** Optional className */
  className?: string;
}
