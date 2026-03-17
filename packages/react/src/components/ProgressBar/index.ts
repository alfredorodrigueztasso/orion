/**
 * ProgressBar Component - Visual progress indicator.
 *
 * @example
 * ```tsx
 * import { ProgressBar } from '@orion-ds/react';
 *
 * <ProgressBar value={75} max={100} />
 * <ProgressBar value={50} variant="success" showLabel />
 * <ProgressBar value={30} size="sm" variant="brand" />
 * ```
 */
export { ProgressBar } from "./ProgressBar";
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarVariant,
} from "./ProgressBar.types";
