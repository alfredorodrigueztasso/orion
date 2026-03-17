/**
 * Breadcrumb Component - Navigation hierarchy display.
 *
 * @example
 * ```tsx
 * import { Breadcrumb } from '@orion-ds/react';
 *
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Category', href: '/products/category' },
 *     { label: 'Item' }, // Current page (no href)
 *   ]}
 * />
 * ```
 */
export { Breadcrumb } from "./Breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbSeparator,
} from "./Breadcrumb.types";
