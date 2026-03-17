import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface CollapsibleProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue"
> {
  /** Controlled open state. */
  open?: boolean;
  /** Default open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Disable the trigger. */
  disabled?: boolean;
  children?: ReactNode;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of a wrapper button. */
  asChild?: boolean;
  children?: ReactNode;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Keep content mounted in the DOM even when closed. */
  forceMount?: boolean;
  children?: ReactNode;
}

export interface CollapsibleContextValue {
  open: boolean;
  disabled: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
}
