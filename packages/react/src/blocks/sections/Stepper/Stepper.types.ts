export type StepperOrientation = "horizontal" | "vertical";

export interface StepItem {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepItem[];
  /** Index of the currently active step (0-based) */
  activeStep?: number;
  /** Layout orientation */
  orientation?: StepperOrientation;
  /** Callback when active step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Whether to show prev/next navigation buttons */
  showNavigation?: boolean;
  /** Optional className */
  className?: string;
}
