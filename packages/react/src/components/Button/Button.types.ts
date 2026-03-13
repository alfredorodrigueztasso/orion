/**
 * Button Component Types
 *
 * Type definitions for the Orion Button component.
 *
 * @module Button
 * @see {@link ./README.md} for full documentation
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button visual variants - each has specific semantic meaning.
 *
 * @semanticGuide
 * - `primary`: Main CTA - Submit, Save, Continue, Get Started
 * - `secondary`: Supporting action ON LIGHT BACKGROUNDS - Cancel, Back, Learn More
 * - `secondaryInverse`: Supporting action ON DARK/COLORED BACKGROUNDS - Learn More on hero photo
 * - `ghost`: Subtle/tertiary action ON LIGHT BACKGROUNDS - Close, Dismiss, Skip
 * - `ghostInverse`: Subtle/tertiary action ON DARK/COLORED BACKGROUNDS - Skip on banner
 * - `danger`: Destructive action - Delete, Remove, Unsubscribe
 * - `inverse`: Primary CTA on colored backgrounds - Hero CTAs, Banners
 *
 * @backgroundContext
 * Use regular variants (secondary, ghost) on light/white backgrounds.
 * Use inverse variants (secondaryInverse, ghostInverse) on dark/colored/photo backgrounds.
 *
 * @example Light background context
 * ```tsx
 * <Button variant="primary">Save</Button>           // Main action
 * <Button variant="secondary">Cancel</Button>       // Supporting
 * <Button variant="ghost">Skip</Button>             // Tertiary
 * ```
 *
 * @example Dark/colored background context (hero, photo, colored banner)
 * ```tsx
 * <Button variant="inverse">Get Started</Button>         // Primary on brand bg
 * <Button variant="secondaryInverse">Learn More</Button> // Supporting on photo
 * <Button variant="ghostInverse">Skip</Button>           // Tertiary on dark bg
 * ```
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryInverse"
  | "ghost"
  | "ghostInverse"
  | "danger"
  | "inverse";

/**
 * Button sizes - automatically adapt to current mode (display/product/app).
 *
 * @modeAware Sizes scale per data-mode:
 * - Display mode: sm=40px, md=56px, lg=64px (spacious, marketing)
 * - Product mode: sm=28px, md=32px, lg=36px (compact, SaaS)
 * - App mode: sm=40px, md=44px, lg=48px (touch-friendly, mobile)
 *
 * @semanticGuide
 * - `sm`: Dense UIs, tables, inline actions
 * - `md`: Default - most buttons (recommended)
 * - `lg`: Hero CTAs, prominent actions
 *
 * @example
 * ```tsx
 * <Button size="sm">Edit</Button>           // Dense UI
 * <Button size="md">Submit</Button>         // Default
 * <Button size="lg">Get Started</Button>    // Hero CTA
 * ```
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button component props
 *
 * @example Basic usage
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 *
 * @example With icon
 * ```tsx
 * import { Download } from 'lucide-react';
 *
 * <Button icon={<Download size={20} />}>
 *   Download
 * </Button>
 * ```
 *
 * @example Icon-only (requires aria-label)
 * ```tsx
 * import { Settings } from 'lucide-react';
 *
 * <Button
 *   iconOnly
 *   icon={<Settings size={20} />}
 *   aria-label="Settings"
 * />
 * ```
 *
 * @example Loading state
 * ```tsx
 * <Button isLoading>
 *   Saving...
 * </Button>
 * ```
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button.
   *
   * @semanticGuide
   * - `primary`: Main CTA (Submit, Save, Continue)
   * - `secondary`: Supporting action on LIGHT backgrounds (Cancel, Back)
   * - `secondaryInverse`: Supporting action on DARK/COLORED backgrounds
   * - `ghost`: Subtle action on LIGHT backgrounds (Close, Dismiss)
   * - `ghostInverse`: Subtle action on DARK/COLORED backgrounds
   * - `danger`: Destructive action (Delete, Remove)
   * - `inverse`: Primary CTA on colored backgrounds
   *
   * @backgroundContext
   * Use `secondary`/`ghost` on white/light backgrounds.
   * Use `secondaryInverse`/`ghostInverse` on dark/colored/photo backgrounds.
   *
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button. Automatically adapts to current mode.
   *
   * @modeAware
   * - Display: 40/56/64px heights (spacious)
   * - Product: 28/32/36px heights (compact)
   * - App: 40/44/48px heights (touch-friendly)
   *
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Loading state - shows spinner and disables interaction.
   * Button text remains visible but dimmed.
   *
   * @example
   * ```tsx
   * <Button isLoading>Saving...</Button>
   * ```
   *
   * @default false
   */
  isLoading?: boolean;

  /**
   * Text to display during loading state instead of children.
   * Screen-reader accessible alternative for custom loading messaging.
   *
   * @example
   * ```tsx
   * <Button isLoading loadingText="Saving...">Save Changes</Button>
   * ```
   *
   * @default undefined (uses children)
   */
  loadingText?: string;

  /**
   * Full width button - expands to fill container.
   * Useful for form submissions and card footers.
   *
   * @example
   * ```tsx
   * <Card.Footer>
   *   <Button fullWidth>Continue</Button>
   * </Card.Footer>
   * ```
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display on the left side of button text.
   * Use 20px icons (size={20}) for best results.
   *
   * @example
   * ```tsx
   * import { Download } from 'lucide-react';
   * <Button icon={<Download size={20} />}>Download</Button>
   * ```
   */
  icon?: ReactNode;

  /**
   * Icon to display on the right side of button text.
   * Commonly used for chevrons/arrows indicating action direction.
   *
   * @example
   * ```tsx
   * import { ChevronRight } from 'lucide-react';
   * <Button iconRight={<ChevronRight size={20} />}>Continue</Button>
   * ```
   */
  iconRight?: ReactNode;

  /**
   * Icon-only button (no text, just icon).
   *
   * @requires aria-label - MUST provide aria-label for accessibility
   *
   * @example
   * ```tsx
   * import { Settings } from 'lucide-react';
   *
   * // CORRECT - has aria-label
   * <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
   *
   * // WRONG - missing aria-label (accessibility violation)
   * <Button iconOnly icon={<Settings size={20} />} />
   * ```
   *
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Button content (text and/or elements).
   * Ignored when iconOnly is true.
   */
  children?: ReactNode;
}
