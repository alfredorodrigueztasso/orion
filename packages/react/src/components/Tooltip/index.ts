/**
 * Tooltip Component - Hover information display.
 *
 * @example
 * ```tsx
 * import { Tooltip, Button } from '@orion-ds/react';
 *
 * <Tooltip content="Click to submit">
 *   <Button>Submit</Button>
 * </Tooltip>
 *
 * <Tooltip content="Edit settings" placement="right">
 *   <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
 * </Tooltip>
 * ```
 */
export { Tooltip } from "./Tooltip";
export type { TooltipProps, TooltipPlacement } from "./Tooltip.types";
