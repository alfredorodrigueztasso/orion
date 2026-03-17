import type { ReactNode } from "react";

export type TimelineOrientation = "horizontal" | "vertical";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  /** Section title */
  title?: string;
  /** List of timeline events */
  events: TimelineEvent[];
  /** Layout orientation */
  orientation?: TimelineOrientation;
  /** Use compact layout */
  compact?: boolean;
  /** Optional className */
  className?: string;
}
