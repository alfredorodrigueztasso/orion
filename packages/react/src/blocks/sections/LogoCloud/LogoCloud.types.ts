import type { HTMLAttributes, ReactNode } from "react";

export interface LogoItem {
  name: string;
  logo: ReactNode;
  href?: string;
}

export interface LogoCloudProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title?: string;
  /** Logos to display */
  logos: LogoItem[];
  /** Additional class name */
  className?: string;
}
