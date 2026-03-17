/**
 * Button Component - Primary action element for triggering events.
 *
 * @example
 * ```tsx
 * import { Button } from '@orion-ds/react';
 *
 * <Button variant="primary">Click me</Button>
 * <Button variant="secondary" icon={<Plus size={20} />}>Add Item</Button>
 * <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
 * <Button variant="danger" size="sm">Delete</Button>
 * ```
 */
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";
