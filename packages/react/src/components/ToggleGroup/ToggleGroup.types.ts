import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ToggleGroupType = "single" | "multiple";
export type ToggleGroupVariant = "default" | "outline";
export type ToggleGroupSize = "sm" | "md" | "lg";

export interface ToggleGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Whether single or multiple items can be pressed. */
  type: ToggleGroupType;
  /** Controlled value (string for single, string[] for multiple). */
  value?: string | string[];
  /** Default value for uncontrolled usage. */
  defaultValue?: string | string[];
  /** Callback when value changes. */
  onValueChange?: (value: string | string[]) => void;
  /** Visual variant propagated to items. @default 'default' */
  variant?: ToggleGroupVariant;
  /** Size propagated to items. @default 'md' */
  size?: ToggleGroupSize;
  /** Disable all items. */
  disabled?: boolean;
  children?: ReactNode;
}

export interface ToggleGroupItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  /** Unique value for this item. */
  value: string;
  children?: ReactNode;
}

export interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string[];
  onItemToggle: (itemValue: string) => void;
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  disabled: boolean;
}
