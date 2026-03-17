/**
 * List Component - Vertical item list display.
 *
 * @example
 * ```tsx
 * import { List } from '@orion-ds/react';
 * import { User, Settings, LogOut } from 'lucide-react';
 *
 * <List
 *   items={[
 *     { id: '1', label: 'Profile', icon: <User size={18} />, onClick: goToProfile },
 *     { id: '2', label: 'Settings', icon: <Settings size={18} />, onClick: goToSettings },
 *     { id: '3', label: 'Log out', icon: <LogOut size={18} />, onClick: handleLogout },
 *   ]}
 * />
 * ```
 */
export { List } from "./List";
export type { ListProps, ListItem, ListSize, ListVariant } from "./List.types";
