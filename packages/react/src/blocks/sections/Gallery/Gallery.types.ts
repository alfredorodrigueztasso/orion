import type { HTMLAttributes } from "react";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title?: string;
  /** Images to display */
  images: GalleryImage[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Additional class name */
  className?: string;
}
