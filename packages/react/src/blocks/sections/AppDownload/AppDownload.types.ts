import type { HTMLAttributes } from "react";

export type AppDownloadLayout = "centered" | "split-left" | "split-right";

export interface AppStoreBadge {
  store: "apple" | "google";
  href: string;
}

export interface AppFeature {
  title: string;
  description: string;
}

export interface AppRating {
  value: number;
  count: string;
}

export interface AppDownloadProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title: string;
  /** Section description */
  description?: string;
  /** Store badges to display */
  badges: AppStoreBadge[];
  /** App screenshot/preview image URL */
  appImage?: string;
  /** Feature bullets */
  features?: AppFeature[];
  /** Layout variant */
  layout?: AppDownloadLayout;
  /** Show QR code for download */
  showQrCode?: boolean;
  /** QR code image URL */
  qrCode?: string;
  /** App rating display */
  rating?: AppRating;
  /** Compact mode */
  compact?: boolean;
  /** Additional class name */
  className?: string;
}
