/**
 * Stepper Component Types
 *
 * Type definitions for the Orion Stepper/Wizard component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Stepper orientation
 */
export type StepperOrientation = "horizontal" | "vertical";

/**
 * Stepper size variants
 */
export type StepperSize = "sm" | "md" | "lg";

/**
 * Step status
 */
export type StepStatus = "complete" | "current" | "upcoming" | "error";

/**
 * Step item definition
 */
export interface StepItem {
  /**
   * Unique identifier for the step
   */
  id: string;

  /**
   * Step title/label
   */
  title: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Custom icon for the step
   */
  icon?: ReactNode;

  /**
   * Whether this step is optional
   */
  optional?: boolean;

  /**
   * Whether this step has an error
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Whether this step is disabled
   */
  disabled?: boolean;
}

/**
 * Stepper component props
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { id: '1', title: 'Account', description: 'Create your account' },
 *     { id: '2', title: 'Profile', description: 'Set up your profile' },
 *     { id: '3', title: 'Complete', description: 'Review and finish' },
 *   ]}
 *   currentStep={1}
 * />
 * ```
 */
export interface StepperProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Array of step items
   */
  steps: StepItem[];

  /**
   * Current active step index (0-based)
   * @default 0
   */
  currentStep?: number;

  /**
   * Callback when a step is clicked (if clickable)
   */
  onStepClick?: (stepIndex: number, step: StepItem) => void;

  /**
   * Whether steps are clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Stepper orientation
   * @default 'horizontal'
   */
  orientation?: StepperOrientation;

  /**
   * Size variant
   * @default 'md'
   */
  size?: StepperSize;

  /**
   * Whether to show step numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Whether to show connector lines between steps
   * @default true
   */
  showConnectors?: boolean;

  /**
   * Whether completed steps should be marked with a checkmark
   * @default true
   */
  showCheckmarks?: boolean;

  /**
   * Alternative label position (only for horizontal orientation)
   * @default 'bottom'
   */
  labelPosition?: "bottom" | "right";

  /**
   * Enable horizontal scrolling on mobile for better UX with many steps
   * When enabled, labels remain visible and the stepper scrolls horizontally.
   * Auto-scrolls to center the current step when it changes.
   * @default false
   */
  scrollable?: boolean;
}

/**
 * Step component props (internal)
 */
export interface StepProps {
  step: StepItem;
  index: number;
  status: StepStatus;
  size: StepperSize;
  showNumber: boolean;
  showCheckmark: boolean;
  clickable: boolean;
  onClick?: () => void;
  labelPosition: "bottom" | "right";
}
