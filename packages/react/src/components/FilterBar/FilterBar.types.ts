/**
 * FilterBar Component Types
 *
 * Type definitions for the Orion FilterBar section component.
 * Horizontal filter controls with chips for SaaS dashboards.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Filter option for select/multi-select filters
 */
export interface FilterOption {
  /**
   * Option value
   */
  value: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Optional count
   */
  count?: number;
}

/**
 * Filter definition
 */
export interface FilterDefinition {
  /**
   * Unique filter key
   */
  key: string;

  /**
   * Filter label
   */
  label: string;

  /**
   * Filter type
   */
  type: "select" | "multi-select" | "date" | "date-range" | "text";

  /**
   * Options for select types
   */
  options?: FilterOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Icon for the filter
   */
  icon?: ReactNode;
}

/**
 * Active filter value
 */
export interface ActiveFilter {
  /**
   * Filter key
   */
  key: string;

  /**
   * Filter value (or array for multi-select)
   */
  value: string | string[] | { start: string; end: string };

  /**
   * Display label for the chip
   */
  label: string;
}

/**
 * FilterBar section props
 *
 * @example
 * ```tsx
 * <FilterBar
 *   filters={[
 *     { key: 'status', label: 'Status', type: 'select', options: [...] },
 *     { key: 'date', label: 'Date', type: 'date-range' }
 *   ]}
 *   activeFilters={[
 *     { key: 'status', value: 'active', label: 'Active' }
 *   ]}
 *   onFilterChange={(key, value) => updateFilters(key, value)}
 *   onFilterRemove={(key) => removeFilter(key)}
 * />
 * ```
 */
export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Filter definitions
   */
  filters: FilterDefinition[];

  /**
   * Currently active filters
   */
  activeFilters: ActiveFilter[];

  /**
   * Filter change handler
   */
  onFilterChange: (
    key: string,
    value: string | string[] | { start: string; end: string } | null,
  ) => void;

  /**
   * Remove filter handler
   */
  onFilterRemove: (key: string) => void;

  /**
   * Clear all filters handler
   */
  onClearAll?: () => void;

  /**
   * Enable search input
   * @default false
   */
  searchable?: boolean;

  /**
   * Search value (controlled)
   */
  searchValue?: string;

  /**
   * Search change handler
   */
  onSearchChange?: (value: string) => void;

  /**
   * Search placeholder
   */
  searchPlaceholder?: string;

  /**
   * Show filter count
   * @default true
   */
  showCount?: boolean;

  /**
   * Compact mode
   * @default false
   */
  compact?: boolean;
}
