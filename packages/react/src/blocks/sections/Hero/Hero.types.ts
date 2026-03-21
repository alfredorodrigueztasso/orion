import type { ReactNode } from "react";

export type HeroAlign = "center" | "left";
export type HeroSize = "sm" | "md" | "lg";
export type HeroVariant = "default" | "gradient" | "image";
export type HeroLayout = "stacked" | "split";

export interface HeroHighlightProps {
  /** Content to highlight with gradient */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export interface HeroProps {
  /** Eyebrow badge above the title */
  badge?: ReactNode;
  /** Heading content (can include Hero.Highlight) */
  title: ReactNode;
  /** Supporting text below the title */
  description?: string;
  /** Primary call-to-action element */
  primaryAction?: ReactNode;
  /** Secondary call-to-action element */
  secondaryAction?: ReactNode;
  /** Social proof / trust indicators below actions */
  trustIndicators?: ReactNode;
  /** Text alignment */
  align?: HeroAlign;
  /** Size variant controlling spacing and typography */
  size?: HeroSize;
  /** Visual variant */
  variant?: HeroVariant;
  /** Layout mode */
  layout?: HeroLayout;
  /** Background image URL (for image variant) */
  backgroundImage?: string;
  /** Additional CSS class */
  className?: string;
}
