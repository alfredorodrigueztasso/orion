/**
 * CarouselSection Component Exports
 *
 * Full-page carousel section with title, description, and navigation.
 * For atomic carousel use, import Carousel from components.
 */

export { CarouselSection } from "./CarouselSection";

// Re-export CarouselCard from the atomic component for convenience
export { CarouselCard } from "@orion-ds/react";

export type {
  CarouselSectionProps,
  CarouselItem,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
  CarouselOverlay,
} from "./CarouselSection.types";

// Re-export CarouselCardProps from the atomic component
export type { CarouselCardProps } from "@orion-ds/react";
