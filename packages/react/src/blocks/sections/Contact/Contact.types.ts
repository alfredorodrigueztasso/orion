import type { HTMLAttributes } from "react";

export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
}

export interface ContactProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title: string;
  /** Section description */
  description?: string;
  /** Contact information items */
  contactInfo?: ContactInfo[];
  /** Additional class name */
  className?: string;
}
