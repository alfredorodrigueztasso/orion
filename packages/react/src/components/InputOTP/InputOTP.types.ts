import type { HTMLAttributes, ReactNode } from "react";

export type InputOTPType = "numeric" | "alphanumeric";
export type InputOTPSize = "sm" | "md" | "lg";

export interface InputOTPProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Number of OTP slots. */
  maxLength: number;
  /** Controlled value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback when value changes. */
  onChange?: (value: string) => void;
  /** Callback when all slots are filled. */
  onComplete?: (value: string) => void;
  /** Input type — determines keyboard and allowed characters. @default 'numeric' */
  type?: InputOTPType;
  /** Size of the OTP slots. @default 'md' */
  size?: InputOTPSize;
  /** Disable the input. */
  disabled?: boolean;
  /** Auto-focus the input on mount. */
  autoFocus?: boolean;
  children?: ReactNode;
}

export interface InputOTPGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** Index of this slot (0-based). */
  index: number;
}

export interface InputOTPSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface InputOTPContextValue {
  value: string;
  activeIndex: number;
  size: InputOTPSize;
  disabled: boolean;
  isFocused: boolean;
  focusInput: () => void;
}
