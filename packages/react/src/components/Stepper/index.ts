/**
 * Stepper Component - Multi-step process indicator.
 *
 * @example
 * ```tsx
 * import { Stepper } from '@orion-ds/react';
 *
 * <Stepper
 *   steps={[
 *     { id: '1', label: 'Account', status: 'completed' },
 *     { id: '2', label: 'Profile', status: 'current' },
 *     { id: '3', label: 'Review', status: 'pending' },
 *   ]}
 *   current={1}
 * />
 * ```
 */
export { Stepper } from "./Stepper";
export type {
  StepperProps,
  StepItem,
  StepStatus,
  StepperOrientation,
  StepperSize,
} from "./Stepper.types";
