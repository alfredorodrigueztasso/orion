/**
 * PageHeader Component Types
 *
 * Type definitions for the Orion PageHeader section component.
 * Designed for Product Mode (SaaS dashboards) with breadcrumbs, actions, and tabs.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Display label
   */
  label: string;

  /**
   * Navigation URL (optional for current item)
   */
  href?: string;

  /**
   * Click handler (alternative to href)
   */
  onClick?: () => void;
}

/**
 * Tab item for page header navigation
 */
export interface PageHeaderTab {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Optional badge/count
   */
  badge?: ReactNode;

  /**
   * Tab href for navigation
   */
  href?: string;
}

/**
 * PageHeader size variant
 */
export type PageHeaderSize = "sm" | "md" | "lg";

/**
 * PageHeader visual variant
 */
export type PageHeaderVariant =
  | "default"
  | "compact"
  | "with-tabs"
  | "transparent";

/**
 * PageHeader section props
 *
 * @example
 * ```tsx
 * <PageHeader
 *   breadcrumbs={[
 *     { label: 'Dashboard', href: '/' },
 *     { label: 'Users' }
 *   ]}
 *   title="Users"
 *   description="Manage user accounts and permissions"
 *   actions={<Button>Add User</Button>}
 * />
 * ```
 */
export interface PageHeaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * Page title
   */
  title: ReactNode;

  /**
   * Optional description below title
   */
  description?: ReactNode;

  /**
   * Breadcrumb navigation items
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Action buttons/elements aligned right
   */
  actions?: ReactNode;

  /**
   * Tab navigation items
   */
  tabs?: PageHeaderTab[];

  /**
   * Currently active tab ID
   */
  activeTab?: string;

  /**
   * Tab change handler
   */
  onTabChange?: (tabId: string) => void;

  /**
   * Back link for navigation
   */
  backLink?: {
    label?: string;
    href?: string;
    onClick?: () => void;
  };

  /**
   * Optional badge next to title
   */
  badge?: ReactNode;

  /**
   * Visual variant
   * - default: Standard layout with padding
   * - compact: Reduced spacing
   * - with-tabs: Includes tab navigation
   * @default 'default'
   */
  variant?: PageHeaderVariant;

  /**
   * Size variant
   * @default 'md'
   */
  size?: PageHeaderSize;

  /**
   * Show border at bottom
   * @default true
   */
  bordered?: boolean;

  /**
   * Sticky positioning
   * @default false
   */
  sticky?: boolean;
}
