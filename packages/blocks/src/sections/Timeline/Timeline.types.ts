/**
 * Timeline Section Types
 *
 * Type definitions for the Orion Timeline section component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Timeline event item
 */
export interface TimelineEvent {
  /**
   * Event unique identifier
   */
  id: string | number;

  /**
   * Event date or period
   */
  date: string;

  /**
   * Event title
   */
  title: string;

  /**
   * Event description
   */
  description?: string;

  /**
   * Optional icon element
   */
  icon?: ReactNode;

  /**
   * Event status/type
   */
  status?: "completed" | "current" | "upcoming" | "default";

  /**
   * Additional content
   */
  content?: ReactNode;

  /**
   * Link URL
   */
  href?: string;
}

/**
 * Timeline section props
 *
 * @example
 * ```tsx
 * <Timeline
 *   title="Our Journey"
 *   events={[
 *     { id: 1, date: "2020", title: "Founded", status: "completed" },
 *     { id: 2, date: "2022", title: "Series A", status: "completed" },
 *     { id: 3, date: "2024", title: "Global Launch", status: "current" },
 *   ]}
 * />
 * ```
 */
export interface TimelineProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /**
   * Optional eyebrow text
   */
  eyebrow?: ReactNode;

  /**
   * Section title
   */
  title?: ReactNode;

  /**
   * Section description
   */
  description?: ReactNode;

  /**
   * Array of timeline events
   */
  events: TimelineEvent[];

  /**
   * Timeline orientation
   * @default 'vertical'
   */
  orientation?: "vertical" | "horizontal";

  /**
   * Alternate items left/right (vertical only)
   * @default false
   */
  alternating?: boolean;

  /**
   * Show connector line
   * @default true
   */
  showConnector?: boolean;

  /**
   * Background style
   * @default 'base'
   */
  background?: "base" | "subtle" | "none";

  /**
   * Compact mode (smaller spacing)
   * @default false
   */
  compact?: boolean;

  /**
   * Content alignment. Use 'left' when embedding Timeline inside a docs page
   * or column layout instead of a full-width section.
   * @default 'center'
   */
  align?: "center" | "left";
}
