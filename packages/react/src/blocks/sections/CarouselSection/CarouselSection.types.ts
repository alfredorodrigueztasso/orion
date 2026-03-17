export interface CarouselItem {
  /** Unique identifier */
  id: string;
  /** Item title */
  title: string;
  /** Image URL */
  image: string;
  /** Optional description */
  description?: string;
  /** Optional link */
  href?: string;
}

export interface CarouselCardProps extends CarouselItem {
  /** Additional CSS class */
  className?: string;
}

export interface CarouselSectionProps {
  /** Array of carousel items */
  items: CarouselItem[];
  /** Enable automatic scrolling */
  autoScroll?: boolean;
  /** Auto-scroll interval in milliseconds */
  autoScrollInterval?: number;
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Additional CSS class */
  className?: string;
}
