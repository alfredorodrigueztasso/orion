/**
 * Tabs Component - Content section switching.
 *
 * @example
 * ```tsx
 * import { Tabs } from '@orion-ds/react';
 *
 * <Tabs
 *   items={[
 *     { id: 'overview', label: 'Overview', content: <OverviewPanel /> },
 *     { id: 'settings', label: 'Settings', content: <SettingsPanel /> },
 *     { id: 'users', label: 'Users', content: <UsersPanel /> },
 *   ]}
 *   defaultTab="overview"
 * />
 * ```
 */
export { Tabs } from "./Tabs";
export type { TabsProps, TabItem } from "./Tabs.types";
