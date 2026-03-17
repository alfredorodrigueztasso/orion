import type { ReactNode } from "react";

export interface EmptyStateProps {
  /** Icon element to display */
  icon?: ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Optional action button */
  action?: ReactNode;
  /** Optional className */
  className?: string;
}
