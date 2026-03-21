/**
 * Hero Component
 *
 * A flexible hero section for landing pages with support for titles, CTAs,
 * media, and trust indicators. Composes atomic components from @orion/react.
 *
 * @example
 * ```tsx
 * <Hero
 *   badge={<Badge>New Release</Badge>}
 *   title="Build faster with Orion"
 *   description="The AI-first design system for modern apps"
 *   primaryAction={<Button>Get Started</Button>}
 *   secondaryAction={<Button variant="ghost">Learn More</Button>}
 *   align="center"
 *   size="lg"
 * />
 * ```
 *
 * @example Fullscreen with background
 * ```tsx
 * <Hero
 *   layout="fullscreen"
 *   variant="background"
 *   backgroundImage="/hero.jpg"
 *   title={<>Build <Hero.Highlight>faster</Hero.Highlight></>}
 *   primaryAction={<Button size="lg">Get Started</Button>}
 * />
 * ```
 */

/**
 * Hero Component
 *
 * A flexible hero section for landing pages with support for titles, CTAs,
 * media, and trust indicators.
 *
 * @example
 * ```tsx
 * <Hero
 *   badge={<Badge>New Release</Badge>}
 *   title="Build faster with Orion"
 *   description="The AI-first design system for modern apps"
 *   primaryAction={<Button>Get Started</Button>}
 *   secondaryAction={<Button variant="ghost">Learn More</Button>}
 *   align="center"
 *   size="lg"
 * />
 * ```
 *
 * @example Fullscreen with background
 * ```tsx
 * <Hero
 *   layout="fullscreen"
 *   variant="background"
 *   backgroundImage="/hero.jpg"
 *   title={<>Build <Hero.Highlight>faster</Hero.Highlight></>}
 *   primaryAction={<Button size="lg">Get Started</Button>}
 * />
 * ```
 */

import { forwardRef, useEffect } from "react";
import type { HeroProps } from "./Hero.types";
import { HeroHighlight } from "./HeroHighlight";
import styles from "./Hero.module.css";

// SVG placeholder for default media
const DefaultMediaPlaceholder = () => (
  <div className={styles.defaultMedia}>
    <svg
      className={styles.defaultMediaIcon}
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  </div>
);

// Main Hero component
const HeroBase = forwardRef<HTMLElement, HeroProps>(
  (
    {
      badge,
      title,
      headline,
      description,
      primaryAction,
      secondaryAction,
      media,
      mediaPosition = "right",
      showDefaultMedia = false,
      trustIndicators,
      align = "center",
      size = "lg",
      layout = "contained",
      variant = "default",
      backgroundImage,
      backgroundOverlay = 0.6,
      elevated = false,
      fullHeight = false,
      className,
      ...rest
    },
    ref,
  ) => {
    // Support deprecated headline prop with warning
    const effectiveTitle = title ?? headline;

    // Deprecation warnings
    useEffect(() => {
      if (headline && process.env.NODE_ENV === "development") {
        console.warn(
          '[Hero] The "headline" prop is deprecated. Use "title" instead. ' +
            "headline will be removed in v3.0.",
        );
      }
    }, [headline]);

    useEffect(() => {
      if (fullHeight && process.env.NODE_ENV === "development") {
        console.warn(
          '[Hero] The "fullHeight" prop is deprecated. Use layout="fullscreen" instead.',
        );
      }
    }, [fullHeight]);

    // Handle deprecated fullHeight prop
    const effectiveLayout = fullHeight ? "fullscreen" : layout;

    // Determine if we should show media
    const effectiveMedia = media || (showDefaultMedia ? <DefaultMediaPlaceholder /> : null);
    const hasMedia = !!effectiveMedia;
    const hasActions = primaryAction || secondaryAction;
    const isBackgroundVariant = variant === "background";

    const classNames = [
      styles.hero,
      styles[`align-${align}`],
      styles[`size-${size}`],
      styles[`layout-${effectiveLayout}`],
      isBackgroundVariant && styles["variant-background"],
      elevated && effectiveLayout === "card" && styles.elevated,
      hasMedia && !isBackgroundVariant && styles.hasMedia,
      hasMedia && !isBackgroundVariant && styles[`media-${mediaPosition}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <section
        ref={ref}
        className={classNames}
        {...rest}
      >
        {/* Background image for background variant */}
        {isBackgroundVariant && backgroundImage && (
          <>
            <div className={styles.backgroundImage}>
              <img src={backgroundImage} alt="" aria-hidden="true" />
            </div>
            <div
              className={styles.backgroundOverlay}
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,${backgroundOverlay * 0.8}), rgba(0,0,0,${backgroundOverlay}))`,
              }}
            />
          </>
        )}

        <div className={styles.container}>
          <div className={styles.content}>
            {badge && <div className={styles.badge}>{badge}</div>}

            <h1 className={styles.headline}>{effectiveTitle}</h1>

            {description && <p className={styles.description}>{description}</p>}

            {hasActions && (
              <div className={styles.actions}>
                {primaryAction}
                {secondaryAction}
              </div>
            )}

            {trustIndicators && <div className={styles.trustIndicators}>{trustIndicators}</div>}
          </div>

          {hasMedia && !isBackgroundVariant && <div className={styles.media}>{effectiveMedia}</div>}
        </div>
      </section>
    );
  },
);

HeroBase.displayName = "Hero";

// Create compound component
type HeroComponent = typeof HeroBase & {
  Highlight: typeof HeroHighlight;
};

export const Hero = HeroBase as HeroComponent;
Hero.Highlight = HeroHighlight;
