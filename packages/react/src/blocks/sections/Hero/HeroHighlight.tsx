/**
 * HeroHighlight Component
 *
 * A compound component for Hero that applies a brand gradient to text.
 * Used to highlight key words in headlines.
 *
 * @example
 * ```tsx
 * <Hero
 *   title={<>Build <Hero.Highlight>faster</Hero.Highlight> with Orion</>}
 * />
 * ```
 */

import type { HeroHighlightProps } from "./Hero.types";
import styles from "./Hero.module.css";

export const HeroHighlight = ({ children, className }: HeroHighlightProps) => {
  return (
    <span className={`${styles.highlight} ${className || ""}`}>{children}</span>
  );
};

HeroHighlight.displayName = "Hero.Highlight";
