import type { ReactNode } from "react";

export interface FeatureItem {
  /** Icon element rendered above the title */
  icon?: ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

export interface FeatureCardProps extends FeatureItem {
  /** Additional CSS class */
  className?: string;
}

export interface FeaturesProps {
  /** Section heading */
  title?: string;
  /** Section description below the heading */
  description?: string;
  /** Array of feature items */
  items: FeatureItem[];
  /** Number of grid columns (2 | 3 | 4) */
  columns?: 2 | 3 | 4;
  /** Additional CSS class */
  className?: string;
}
