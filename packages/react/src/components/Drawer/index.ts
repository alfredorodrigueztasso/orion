/**
 * Drawer Component - Side panel overlay.
 *
 * @example
 * ```tsx
 * import { Drawer, Button } from '@orion-ds/react';
 *
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right" size="md">
 *   <Drawer.Header>Settings</Drawer.Header>
 *   <Drawer.Body>
 *     <p>Drawer content here</p>
 *   </Drawer.Body>
 *   <Drawer.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 */
export { Drawer } from "./Drawer";
export type {
  DrawerProps,
  DrawerPlacement,
  DrawerSize,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from "./Drawer.types";
