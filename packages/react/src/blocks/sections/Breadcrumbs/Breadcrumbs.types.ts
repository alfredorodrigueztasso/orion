import type { HTMLAttributes } from "react";

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Breadcrumb items (last item is current page) */
  items: BreadcrumbItem[];
  /** Custom separator character */
  separator?: string;
  /** Additional class name */
  className?: string;
}
