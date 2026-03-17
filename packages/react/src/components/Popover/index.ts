/**
 * Popover Component - Contextual content overlay.
 *
 * @example
 * ```tsx
 * import { Popover, Button } from '@orion-ds/react';
 *
 * <Popover
 *   trigger={<Button>Open Menu</Button>}
 *   content={
 *     <div>
 *       <p>Popover content here</p>
 *       <Button size="sm">Action</Button>
 *     </div>
 *   }
 *   placement="bottom"
 * />
 * ```
 */
export { Popover } from "./Popover";
export type {
  PopoverProps,
  PopoverPlacement,
  PopoverTrigger,
} from "./Popover.types";
