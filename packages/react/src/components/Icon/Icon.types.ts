/**
 * Icon Component Types
 *
 * Type definitions for the Orion Icon wrapper component.
 * Provides normalized icon rendering with design token integration.
 *
 * @see https://lucide.dev for available icons
 */

import type { LucideIcon, LucideProps } from "lucide-react";
import type { SVGProps } from "react";

/**
 * Icon size tokens (mapped to CSS variables)
 * - xs: 12px (--icon-size-xs) - Badges, compact UI
 * - sm: 16px (--icon-size-sm) - Inline text, small buttons
 * - md: 20px (--icon-size-md) - Default for buttons/inputs
 * - lg: 24px (--icon-size-lg) - Section headers
 * - xl: 32px (--icon-size-xl) - Large callouts
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Icon color variants (mapped to semantic tokens)
 */
export type IconColor =
  | "current" // currentColor (inherits from parent)
  | "primary" // --text-primary
  | "secondary" // --text-secondary
  | "tertiary" // --text-tertiary
  | "brand" // --text-brand
  | "success" // --status-success
  | "warning" // --status-warning
  | "error" // --status-error
  | "info" // --status-info
  | "inverse"; // --text-inverse

/**
 * Icon component props
 *
 * @example Decorative icon (hidden from screen readers)
 * ```tsx
 * import { Icon } from '@orion/react';
 * import { Search } from 'lucide-react';
 *
 * <Icon icon={Search} size="md" decorative />
 * ```
 *
 * @example Semantic icon (announced to screen readers)
 * ```tsx
 * <Icon icon={AlertCircle} size="lg" label="Warning" color="warning" />
 * ```
 *
 * @example Custom size in pixels
 * ```tsx
 * <Icon icon={Star} size={18} />
 * ```
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /**
   * Lucide icon component to render
   * Import directly from lucide-react for tree-shaking
   *
   * @example
   * import { Search } from 'lucide-react';
   * <Icon icon={Search} />
   */
  icon: LucideIcon;

  /**
   * Icon size - uses design tokens or custom pixel value
   * @default 'md'
   */
  size?: IconSize | number;

  /**
   * Icon color variant - uses semantic tokens
   * @default 'current'
   */
  color?: IconColor;

  /**
   * Stroke width (Lucide default: 2)
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Accessible label for screen readers
   * Required when decorative=false
   *
   * @example
   * <Icon icon={AlertCircle} label="Error occurred" />
   */
  label?: string;

  /**
   * Mark icon as decorative (hidden from screen readers)
   * Use when icon is purely visual and adjacent text provides meaning
   * @default false
   *
   * @example
   * <Button icon={<Icon icon={Search} decorative />}>Search</Button>
   */
  decorative?: boolean;

  /**
   * Disabled state (applies muted styling)
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props passed to Lucide icon components
 * Used internally for consistent rendering
 */
export type IconRenderProps = LucideProps;
