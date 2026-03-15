"use client";

/**
 * Carousel Component
 *
 * An atomic carousel with horizontal scrolling, snap behavior, and peek effect.
 * This is a low-level component for use within cards, modals, or custom layouts.
 * For full-page carousel sections with title/description, use CarouselSection.
 *
 * @example
 * ```tsx
 * // Inside a Card
 * <Card>
 *   <Carousel
 *     items={[
 *       { image: <img src="/1.jpg" />, title: "Slide 1" },
 *       { image: <img src="/2.jpg" />, title: "Slide 2" },
 *     ]}
 *     variant="gallery"
 *     aspectRatio="16/9"
 *   />
 * </Card>
 *
 * // Inside a Modal
 * <Modal>
 *   <Modal.Body>
 *     <Carousel items={items} showNavigation showPagination />
 *   </Modal.Body>
 * </Modal>
 * ```
 */

import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import type { CarouselProps } from "./Carousel.types";
import { CarouselCard } from "./CarouselCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spacing } from "../../tokens/primitives";
import styles from "./Carousel.module.css";

// Parse spacing token values (e.g., "24px" -> 24)
const TRACK_PADDING = parseInt(spacing[6], 10);
const GAP_SM = parseInt(spacing[4], 10); // 16px
const GAP_MD = parseInt(spacing[6], 10); // 24px
const GAP_LG = parseInt(spacing[8], 10); // 32px

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      variant = "editorial",
      aspectRatio = "16/9",
      peek = true,
      autoScroll = false,
      autoScrollInterval = 5000,
      gap = "md",
      align = "edge",
      alignOffset,
      showNavigation = true,
      showPagination = false,
      onSlideChange,
      renderNavigation,
      highlightActive = false,
      loop = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    // Get gap width based on gap prop
    const getGapWidth = useCallback(() => {
      return gap === "sm" ? GAP_SM : gap === "lg" ? GAP_LG : GAP_MD;
    }, [gap]);

    // Get the card's layout width (without transforms that affect getBoundingClientRect)
    // When highlightActive is true, cards have scale transforms that change their visual size
    const getCardLayoutWidth = useCallback((track: HTMLDivElement): number => {
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return 0;

      // Use offsetWidth which gives layout width, not transformed width
      return firstCard.offsetWidth;
    }, []);

    const updateScrollState = useCallback(() => {
      if (!trackRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      const cardWidth = getCardLayoutWidth(trackRef.current);
      const gapWidth = getGapWidth();

      // Calculate end/start states
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      const isAtStart = scrollLeft <= 1;

      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);

      // Calculate active index based on scroll position
      let newIndex: number;

      // If at the end of scroll, the last card should be active
      if (isAtEnd) {
        newIndex = items.length - 1;
      } else {
        const index = Math.round(scrollLeft / (cardWidth + gapWidth));
        newIndex = Math.min(Math.max(0, index), items.length - 1);
      }

      if (newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
        onSlideChange?.(newIndex);
      }
    }, [gap, items.length, onSlideChange, getGapWidth, getCardLayoutWidth]);

    const scroll = useCallback(
      (direction: "left" | "right") => {
        if (!trackRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
        const cardWidth = getCardLayoutWidth(trackRef.current);
        const gapWidth = getGapWidth();
        const scrollAmount = cardWidth + gapWidth;

        // Calculate current scroll state directly (not from stale state)
        const isAtStart = scrollLeft <= 1;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

        // Handle loop behavior (simple jump to start/end)
        if (loop) {
          if (direction === "right" && isAtEnd) {
            // At end, loop to beginning
            trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
            return;
          }
          if (direction === "left" && isAtStart) {
            // At beginning, loop to end
            trackRef.current.scrollTo({
              left: scrollWidth - clientWidth,
              behavior: "smooth",
            });
            return;
          }
        }

        trackRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      },
      [gap, loop, getGapWidth, getCardLayoutWidth],
    );

    const scrollToIndex = useCallback(
      (index: number) => {
        if (!trackRef.current) return;

        const cardWidth = getCardLayoutWidth(trackRef.current);
        const gapWidth = getGapWidth();

        trackRef.current.scrollTo({
          left: index * (cardWidth + gapWidth),
          behavior: "smooth",
        });
      },
      [getGapWidth, getCardLayoutWidth],
    );

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      updateScrollState();
      track.addEventListener("scroll", updateScrollState);

      return () => {
        track.removeEventListener("scroll", updateScrollState);
      };
    }, [updateScrollState]);

    // Auto-scroll
    useEffect(() => {
      if (!autoScroll || items.length <= 1) return;

      const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % items.length;
        scrollToIndex(nextIndex);
      }, autoScrollInterval);

      return () => clearInterval(interval);
    }, [
      autoScroll,
      autoScrollInterval,
      activeIndex,
      items.length,
      scrollToIndex,
    ]);

    // For container alignment, calculate extra margin for first card
    const hasCustomAlign = align === "container" && alignOffset !== undefined;
    // Extra margin = alignOffset - default track padding (from spacing token)
    const firstCardMargin = hasCustomAlign
      ? Math.max(0, alignOffset - TRACK_PADDING)
      : 0;

    // Map props to camelCase class names
    const gapClass =
      gap === "sm" ? styles.gapSm : gap === "lg" ? styles.gapLg : styles.gapMd;
    const trackAlignClass =
      align === "container" ? styles.trackContainer : styles.trackEdge;

    const classNames = [
      styles.carousel,
      peek && styles.peek,
      highlightActive && styles.highlightActive,
      gapClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const trackClassNames = [styles.track, trackAlignClass]
      .filter(Boolean)
      .join(" ");

    // When loop is enabled, navigation is always available (if more than 1 item)
    const canLoopScroll = loop && items.length > 1;

    const navigationProps = {
      canScrollLeft: canLoopScroll || canScrollLeft,
      canScrollRight: canLoopScroll || canScrollRight,
      scrollLeft: () => scroll("left"),
      scrollRight: () => scroll("right"),
      activeIndex,
      totalItems: items.length,
    };

    return (
      <div ref={ref} className={classNames} {...rest}>
        <div
          ref={trackRef}
          className={trackClassNames}
          style={
            hasCustomAlign
              ? { scrollPaddingInlineStart: alignOffset }
              : undefined
          }
          role="region"
          aria-label="Carousel"
        >
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isActive = index === activeIndex;
            const isHighlighted = isActive && highlightActive;

            return (
              <CarouselCard
                key={item.title || index}
                item={item}
                aspectRatio={aspectRatio}
                variant={variant}
                className={isHighlighted ? styles.cardHighlighted : undefined}
                style={
                  // First card gets extra margin for container alignment
                  isFirst && firstCardMargin > 0
                    ? { marginLeft: firstCardMargin }
                    : undefined
                }
              />
            );
          })}
        </div>

        {showNavigation &&
          items.length > 1 &&
          (renderNavigation ? (
            renderNavigation(navigationProps)
          ) : (
            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => scroll("left")}
                disabled={!navigationProps.canScrollLeft}
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => scroll("right")}
                disabled={!navigationProps.canScrollRight}
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          ))}

        {showPagination && items.length > 1 && (
          <div className={styles.pagination}>
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = "Carousel";
