/**
 * LoginTemplate Types
 */

import type { ReactNode } from "react";

export interface LoginTemplateProps {
  /** Page title */
  title?: string;

  /** Subtitle or description */
  subtitle?: string;

  /** Logo/branding element */
  logo?: ReactNode;

  /** Called when form is submitted */
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Success message */
  successMessage?: string;

  /** Link handler for signup */
  onSignupClick?: () => void;

  /** Link handler for forgot password */
  onForgotPasswordClick?: () => void;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
