/**
 * CarouselSection Component
 *
 * A full-page carousel section with title, description, and navigation.
 * Uses the atomic Carousel component internally.
 *
 * @example
 * ```tsx
 * <CarouselSection
 *   eyebrow={<Badge>Featured</Badge>}
 *   title="Featured Stories"
 *   description="Check out our latest articles and insights."
 *   alignToTitle={true}
 *   items={[
 *     {
 *       image: <img src="/hero-1.jpg" alt="" />,
 *       eyebrow: "Design",
 *       title: "The future of interfaces",
 *       description: "How AI is reshaping how we build",
 *       overlay: "gradient"
 *     },
 *     {
 *       image: <img src="/hero-2.jpg" alt="" />,
 *       eyebrow: "Engineering",
 *       title: "Building at scale",
 *       description: "Lessons from shipping to millions",
 *       overlay: "gradient"
 *     }
 *   ]}
 * />
 * ```
 */

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import type { CarouselSectionProps } from "./CarouselSection.types";
import { Section, Container } from "@orion-ds/react";
import { Carousel } from "@orion-ds/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CarouselSection.module.css";

// Spacing token values (in pixels)
const GAP_SM = 16; // --spacing-4
const GAP_MD = 24; // --spacing-6
const GAP_LG = 32; // --spacing-8

export const CarouselSection = forwardRef<HTMLElement, CarouselSectionProps>(
  (
    {
      eyebrow,
      title,
      description,
      items,
      variant = "editorial",
      aspectRatio = "16/9",
      peek = true,
      autoScroll = false,
      autoScrollInterval = 5000,
      gap = "md",
      background = "base",
      showNavigation = true,
      showPagination = false,
      alignToTitle = true,
      highlightActive = false,
      loop = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;
    const carouselRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [alignOffset, setAlignOffset] = useState<number | undefined>(
      undefined,
    );

    // Get the track element from the Carousel component
    const getTrackElement = useCallback(() => {
      return carouselRef.current?.querySelector(
        '[role="region"]',
      ) as HTMLDivElement | null;
    }, []);

    const updateScrollState = useCallback(() => {
      const track = getTrackElement();
      if (!track) return;

      const { scrollLeft, scrollWidth, clientWidth } = track;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }, [getTrackElement]);

    const scroll = useCallback(
      (direction: "left" | "right") => {
        const track = getTrackElement();
        if (!track) return;

        const cardWidth = track.children[0]?.getBoundingClientRect().width || 0;
        const gapWidth = gap === "sm" ? GAP_SM : gap === "md" ? GAP_MD : GAP_LG;
        const scrollAmount = cardWidth + gapWidth;

        track.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      },
      [gap, getTrackElement],
    );

    const scrollToIndex = useCallback(
      (index: number) => {
        const track = getTrackElement();
        if (!track) return;

        const cardWidth = track.children[0]?.getBoundingClientRect().width || 0;
        const gapWidth = gap === "sm" ? GAP_SM : gap === "md" ? GAP_MD : GAP_LG;

        track.scrollTo({
          left: index * (cardWidth + gapWidth),
          behavior: "smooth",
        });
      },
      [gap, getTrackElement],
    );

    // Measure header position for container alignment
    // Using useLayoutEffect to measure synchronously after DOM update
    useLayoutEffect(() => {
      if (!alignToTitle || !hasHeader) {
        setAlignOffset(undefined);
        return;
      }

      const measureOffset = () => {
        if (headerRef.current) {
          const rect = headerRef.current.getBoundingClientRect();
          setAlignOffset(Math.round(rect.left));
        }
      };

      // Measure immediately (synchronous in useLayoutEffect)
      measureOffset();

      // Handle window resize
      window.addEventListener("resize", measureOffset);

      return () => {
        window.removeEventListener("resize", measureOffset);
      };
    }, [alignToTitle, hasHeader]);

    useEffect(() => {
      const track = getTrackElement();
      if (!track) return;

      const handleScroll = () => {
        updateScrollState();

        // Calculate active index
        const cardWidth = track.children[0]?.getBoundingClientRect().width || 0;
        const gapWidth = gap === "sm" ? GAP_SM : gap === "md" ? GAP_MD : GAP_LG;
        const index = Math.round(track.scrollLeft / (cardWidth + gapWidth));
        setActiveIndex(Math.min(index, items.length - 1));
      };

      updateScrollState();
      track.addEventListener("scroll", handleScroll);

      return () => {
        track.removeEventListener("scroll", handleScroll);
      };
    }, [gap, items.length, updateScrollState, getTrackElement]);

    const classNames = [styles.section, className].filter(Boolean).join(" ");

    return (
      <Section
        ref={ref}
        spacing="lg"
        background={background}
        className={classNames}
        {...rest}
      >
        {hasHeader && (
          <Container size="xl">
            <header ref={headerRef} className={styles.header}>
              <div className={styles.headerContent}>
                {eyebrow && (
                  <div className={styles.headerEyebrow}>{eyebrow}</div>
                )}
                {title && <h2 className={styles.title}>{title}</h2>}
                {description && (
                  <p className={styles.description}>{description}</p>
                )}
              </div>

              {showNavigation && items.length > 1 && (
                <div className={styles.navigation}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    aria-label="Next"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </header>
          </Container>
        )}

        <Carousel
          ref={carouselRef}
          items={items}
          variant={variant}
          aspectRatio={aspectRatio}
          peek={peek}
          autoScroll={autoScroll}
          autoScrollInterval={autoScrollInterval}
          gap={gap}
          align={alignToTitle && hasHeader ? "container" : "edge"}
          alignOffset={alignOffset}
          showNavigation={!hasHeader && showNavigation}
          showPagination={false}
          highlightActive={highlightActive}
          loop={loop}
        />

        {showPagination && items.length > 1 && (
          <Container size="xl">
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
          </Container>
        )}
      </Section>
    );
  },
);

CarouselSection.displayName = "CarouselSection";
