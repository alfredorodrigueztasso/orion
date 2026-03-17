import type { ReactNode } from "react";

export interface SettingsNavItem {
  id: string;
  label: string;
  description?: string;
}

export interface SettingsNavGroup {
  title: string;
  items: SettingsNavItem[];
}

export interface SettingsLayoutProps {
  /** Page title */
  title?: string;
  /** Navigation groups with items */
  navigation: SettingsNavGroup[];
  /** Currently active section id */
  activeSection?: string;
  /** Callback when a nav item is selected */
  onNavigate?: (sectionId: string) => void;
  /** Content to display in the main area */
  children?: ReactNode;
  /** Optional className */
  className?: string;
}
