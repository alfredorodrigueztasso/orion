/**
 * SettingsTemplate Types
 */

import type { ReactNode } from "react";

export interface SettingSection {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
}

export interface SettingsTemplateProps {
  /** Page title */
  title?: string;

  /** Settings sections */
  sections?: SettingSection[];

  /** Currently active section */
  activeSectionId?: string;

  /** Called when section is selected */
  onSelectSection?: (sectionId: string) => void;

  /** Called when settings are saved */
  onSave?: () => void;

  /** Called when settings are reset */
  onReset?: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Has unsaved changes */
  hasUnsavedChanges?: boolean;

  /** Error message */
  error?: string;

  /** Success message */
  successMessage?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
