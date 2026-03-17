/**
 * ProfilePageTemplate Types
 */

import type { ReactNode } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: Date;
  phone?: string;
  location?: string;
}

export interface ProfilePageTemplateProps {
  /** User profile data */
  user?: UserProfile;

  /** Called when user clicks edit profile */
  onEditProfile?: () => void;

  /** Called when user clicks change password */
  onChangePassword?: () => void;

  /** Called when user clicks logout */
  onLogout?: () => void;

  /** Tab options to display */
  tabs?: Array<{ id: string; label: string }>;

  /** Currently active tab */
  activeTab?: string;

  /** Called when tab is selected */
  onSelectTab?: (tabId: string) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
