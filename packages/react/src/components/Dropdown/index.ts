/**
 * Dropdown Component - Action menu with items.
 *
 * @example
 * ```tsx
 * import { Dropdown, Button } from '@orion-ds/react';
 * import { Edit, Trash, Copy } from 'lucide-react';
 *
 * <Dropdown
 *   trigger={<Button>Actions</Button>}
 *   items={[
 *     { label: 'Edit', icon: <Edit size={16} />, onClick: handleEdit },
 *     { label: 'Duplicate', icon: <Copy size={16} />, onClick: handleCopy },
 *     { type: 'divider' },
 *     { label: 'Delete', icon: <Trash size={16} />, onClick: handleDelete, danger: true },
 *   ]}
 * />
 * ```
 */
export { Dropdown } from "./Dropdown";
export type {
  DropdownProps,
  DropdownItem,
  DropdownGroup,
  DropdownPlacement,
} from "./Dropdown.types";
