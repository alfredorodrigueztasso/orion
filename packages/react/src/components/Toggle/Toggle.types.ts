import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Default pressed state for uncontrolled usage. */
  defaultPressed?: boolean;
  /** Callback when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Visual variant. @default 'default' */
  variant?: ToggleVariant;
  /** Size of the toggle. @default 'md' */
  size?: ToggleSize;
  children?: ReactNode;
}
