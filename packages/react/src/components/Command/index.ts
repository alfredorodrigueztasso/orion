/**
 * Command Component - Searchable command palette with keyboard navigation.
 *
 * @example
 * ```tsx
 * import { Command } from '@orion-ds/react';
 *
 * <Command>
 *   <Command.Input placeholder="Type a command..." />
 *   <Command.List>
 *     <Command.Empty>No results found.</Command.Empty>
 *     <Command.Group heading="Suggestions">
 *       <Command.Item onSelect={() => {}}>Calendar</Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command>
 * ```
 */
export { Command } from "./Command";
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from "./Command.types";
