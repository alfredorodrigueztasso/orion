/**
 * Field Component Types
 *
 * Type definitions for the Orion Field component (input with label and error).
 *
 * @important Field is a SELF-CONTAINED component - it renders its own input.
 * Do NOT use children to pass an input element.
 *
 * @module Field
 * @see {@link ./README.md} for full documentation
 */

import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Field component props
 *
 * @important Field is PROPS-BASED, not a wrapper. It renders its own `<input>`.
 *
 * @example Basic usage
 * ```tsx
 * <Field
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 * />
 * ```
 *
 * @example With validation error
 * ```tsx
 * <Field
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={emailError}
 * />
 * ```
 *
 * @example With icons
 * ```tsx
 * import { Mail, Eye } from 'lucide-react';
 *
 * <Field
 *   label="Email"
 *   type="email"
 *   leftIcon={<Mail size={18} />}
 *   placeholder="you@example.com"
 * />
 * ```
 *
 * @example WRONG - Don't use children
 * ```tsx
 * // WRONG - Field doesn't accept children for input
 * <Field label="Email">
 *   <input type="email" />  // This won't work!
 * </Field>
 *
 * // CORRECT - Use props
 * <Field label="Email" type="email" />
 * ```
 */
export interface FieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /**
   * Input label text displayed above the input.
   * Required for accessibility unless aria-label is provided.
   *
   * @example
   * ```tsx
   * <Field label="Email Address" type="email" />
   * ```
   */
  label?: string;

  /**
   * Error message - shows error state and displays message below input.
   * Takes precedence over helperText when both are provided.
   * Automatically associated with input via aria-describedby.
   *
   * @example
   * ```tsx
   * <Field
   *   label="Email"
   *   type="email"
   *   error="Please enter a valid email address"
   * />
   * ```
   */
  error?: string;

  /**
   * Helper text displayed below input (when no error).
   * Provides additional context or instructions.
   *
   * @example
   * ```tsx
   * <Field
   *   label="Password"
   *   type="password"
   *   helperText="Must be at least 8 characters"
   * />
   * ```
   */
  helperText?: string;

  /**
   * Icon to display on the left side of input.
   * Use 18px icons (size={18}) for best results.
   *
   * @example
   * ```tsx
   * import { Mail } from 'lucide-react';
   * <Field leftIcon={<Mail size={18} />} label="Email" type="email" />
   * ```
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display on the right side of input.
   * Can be an icon or interactive element (e.g., password toggle).
   *
   * @example
   * ```tsx
   * import { Eye, EyeOff } from 'lucide-react';
   *
   * <Field
   *   label="Password"
   *   type={showPassword ? 'text' : 'password'}
   *   rightIcon={
   *     <button onClick={() => setShowPassword(!showPassword)}>
   *       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
   *     </button>
   *   }
   * />
   * ```
   */
  rightIcon?: ReactNode;

  /**
   * Full width input - expands to fill container.
   *
   * @example
   * ```tsx
   * <form style={{ maxWidth: '400px' }}>
   *   <Field label="Name" fullWidth />
   *   <Field label="Email" type="email" fullWidth />
   * </form>
   * ```
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Input size variant.
   *
   * @semanticGuide
   * - `sm`: Dense UIs, tables, compact forms
   * - `md`: Default - most forms (recommended)
   * - `lg`: Prominent forms, search inputs
   *
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Shows "(optional)" indicator next to label.
   * Use when most fields are required but some are optional.
   *
   * @example
   * ```tsx
   * <Field label="Phone Number" type="tel" optional />
   * ```
   *
   * @default false
   */
  optional?: boolean;

  // ============================================================================
  // ACCESSIBILITY PROPS (inherited from InputHTMLAttributes but documented here)
  // ============================================================================

  /**
   * Accessible label for screen readers when no visible label is provided.
   * REQUIRED if `label` prop is not provided.
   *
   * @example
   * ```tsx
   * // Icon-only search input
   * <Field
   *   aria-label="Search"
   *   leftIcon={<Search size={18} />}
   *   placeholder="Search..."
   * />
   * ```
   */
  "aria-label"?: string;

  /**
   * Additional element IDs that describe this input.
   * Automatically includes error and helper text IDs when provided.
   *
   * @example
   * ```tsx
   * <p id="password-requirements">Must be 8+ characters</p>
   * <Field
   *   label="Password"
   *   type="password"
   *   aria-describedby="password-requirements"
   * />
   * ```
   */
  "aria-describedby"?: string;
}
