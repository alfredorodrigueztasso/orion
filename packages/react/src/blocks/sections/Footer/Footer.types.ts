import type { ReactNode } from "react";

export interface FooterLink {
  /** Link label */
  label: string;
  /** Link URL */
  href: string;
}

export interface FooterLinkGroup {
  /** Group heading */
  title: string;
  /** Links in this group */
  links: FooterLink[];
}

export interface FooterSocialLink {
  /** Accessible label */
  label: string;
  /** URL */
  href: string;
  /** Icon element */
  icon: ReactNode;
}

export interface FooterBrand {
  /** Brand / company name */
  name: string;
  /** Short description */
  description?: string;
  /** Logo element */
  logo?: ReactNode;
}

export type FooterVariant = "default" | "minimal" | "centered";

export interface FooterProps {
  /** Brand info displayed in the footer */
  brand: FooterBrand;
  /** Groups of links */
  linkGroups?: FooterLinkGroup[];
  /** Social media links */
  socialLinks?: FooterSocialLink[];
  /** Visual variant */
  variant?: FooterVariant;
  /** Copyright text override (defaults to brand name + year) */
  copyright?: string;
  /** Additional CSS class */
  className?: string;
}
