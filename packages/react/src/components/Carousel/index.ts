/**
 * Carousel Component - Image/content slider.
 *
 * Atomic carousel component for use within cards, modals, or custom layouts.
 * For full-page carousel sections, use CarouselSection from sections.
 *
 * @example
 * ```tsx
 * import { Carousel } from '@orion-ds/react';
 *
 * <Carousel
 *   items={[
 *     { id: '1', image: '/slide1.jpg', title: 'Slide 1' },
 *     { id: '2', image: '/slide2.jpg', title: 'Slide 2' },
 *     { id: '3', image: '/slide3.jpg', title: 'Slide 3' },
 *   ]}
 *   autoPlay
 *   showNavigation
 * />
 * ```
 */
export { Carousel } from "./Carousel";
export { CarouselCard } from "./CarouselCard";
export type {
  CarouselProps,
  CarouselItem,
  CarouselCardProps,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
  CarouselOverlay,
  CarouselAlign,
  CarouselNavigationProps,
} from "./Carousel.types";
