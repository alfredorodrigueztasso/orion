/**
 * Navbar Component Types
 *
 * Type definitions for the Orion Navbar component.
 */

import type { ReactNode, HTMLAttributes } from "react";

/**
 * Navbar height variants
 */
export type NavbarHeight = "sm" | "md" | "lg";

/**
 * Navbar background variants
 */
export type NavbarVariant = "solid" | "transparent" | "glass";

/**
 * Navbar color scheme (for transparent/glass variants on colored backgrounds)
 */
export type NavbarColorScheme = "auto" | "light" | "dark";

/**
 * Navbar component props
 *
 * @example
 * ```tsx
 * <Navbar>
 *   <Navbar.Brand>
 *     <img src="/logo.svg" alt="Logo" />
 *   </Navbar.Brand>
 *   <Navbar.Nav>
 *     <Navbar.Link href="/">Home</Navbar.Link>
 *     <Navbar.Link href="/about">About</Navbar.Link>
 *   </Navbar.Nav>
 *   <Navbar.Actions>
 *     <Button>Sign In</Button>
 *   </Navbar.Actions>
 * </Navbar>
 * ```
 */
export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Navbar content
   */
  children: ReactNode;

  /**
   * Navbar height
   * @default 'md'
   */
  height?: NavbarHeight;

  /**
   * Navbar variant
   * @default 'solid'
   */
  variant?: NavbarVariant;

  /**
   * Color scheme for text/links when using transparent or glass variants
   * - 'auto': Uses default theme colors (dark text on light, light text on dark)
   * - 'light': Forces light/white text (use on dark backgrounds)
   * - 'dark': Forces dark text (use on light backgrounds)
   * @default 'auto'
   */
  colorScheme?: NavbarColorScheme;

  /**
   * Sticky positioning
   * @default false
   */
  sticky?: boolean;

  /**
   * Border on bottom
   * @default true
   */
  bordered?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Navbar Brand props
 */
export interface NavbarBrandProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

/**
 * Navbar Nav (navigation links container) props
 */
export interface NavbarNavProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Navbar Link props
 */
export interface NavbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  active?: boolean;
  /**
   * Callback when link is clicked (useful for closing mobile menu)
   */
  onClick?: () => void;
}

/**
 * Navbar Actions (right side actions) props
 */
export interface NavbarActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Navbar Toggle (hamburger button) props
 */
export interface NavbarToggleProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;
  /**
   * Toggle callback
   */
  onToggle: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Navbar Collapse (collapsible container) props
 */
export interface NavbarCollapseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content to show in collapse
   */
  children: ReactNode;
  /**
   * Whether the collapse is open (controlled by Toggle)
   */
  isOpen: boolean;
}
