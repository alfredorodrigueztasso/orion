import type { HTMLAttributes } from "react";

export type BlogLayout = "grid" | "list";

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  author?: BlogAuthor;
  date?: string;
  readTime?: number;
  href?: string;
}

export interface BlogProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title: string;
  /** Section description */
  description?: string;
  /** List of articles to display */
  articles: BlogArticle[];
  /** Layout mode */
  layout?: BlogLayout;
  /** Number of columns in grid layout */
  columns?: 2 | 3 | 4;
  /** Additional class name */
  className?: string;
}
