/**
 * Slider Component - Range/value selection.
 *
 * @example
 * ```tsx
 * import { Slider } from '@orion-ds/react';
 *
 * <Slider min={0} max={100} value={50} onChange={setValue} />
 * <Slider min={0} max={100} value={[25, 75]} range />
 * <Slider min={0} max={10} step={1} marks showValue />
 * ```
 */
export { Slider } from "./Slider";
export type { SliderProps, SliderSize } from "./Slider.types";
