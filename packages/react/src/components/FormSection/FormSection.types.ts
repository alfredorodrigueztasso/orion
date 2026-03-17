/**
 * FormSection Component Types
 *
 * Type definitions for the Orion FormSection section component.
 * Designed for Product Mode (SaaS dashboards) settings and form layouts.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * FormSection visual variant
 */
export type FormSectionVariant = "default" | "card" | "inline";

/**
 * FormSection section props
 *
 * @example
 * ```tsx
 * <FormSection
 *   title="Profile Information"
 *   description="Update your personal details"
 * >
 *   <Field label="Name" type="text" />
 *   <Field label="Email" type="email" />
 * </FormSection>
 * ```
 */
export interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section title (optional)
   * If not provided, header is omitted unless collapsible is true
   */
  title?: string;

  /**
   * Description text below title
   */
  description?: string;

  /**
   * Form field children
   */
  children: ReactNode;

  /**
   * Action buttons (save, cancel, etc.)
   */
  actions?: ReactNode;

  /**
   * Make section collapsible
   * @default false
   */
  collapsible?: boolean;

  /**
   * Default collapsed state (only when collapsible)
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * Show divider below section
   * @default false
   */
  divider?: boolean;

  /**
   * Visual variant
   * - default: Simple layout with border
   * - card: Wrapped in card container
   * - inline: Side-by-side title/fields layout
   * @default 'default'
   */
  variant?: FormSectionVariant;

  /**
   * Custom icon for section header
   */
  icon?: ReactNode;

  /**
   * Disable all fields in section
   * @default false
   */
  disabled?: boolean;
}

/**
 * FormSection.Group props for grouping related fields
 */
export interface FormSectionGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Group label
   */
  label?: string;

  /**
   * Help text for the group
   */
  helpText?: string;

  /**
   * Field children
   */
  children: ReactNode;

  /**
   * Number of columns for field layout
   * @default 1
   */
  columns?: 1 | 2 | 3;
}

/**
 * FormSection.Actions props for action button group
 */
export interface FormSectionActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Action button children
   */
  children: ReactNode;

  /**
   * Alignment of actions
   * @default 'end'
   */
  align?: "start" | "center" | "end" | "between";
}
