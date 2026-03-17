/**
 * Icon Component - Render Lucide icons with Orion styling.
 *
 * Prefer importing icons directly from lucide-react for better tree-shaking.
 *
 * @example
 * ```tsx
 * import { Icon } from '@orion-ds/react';
 * // Or directly: import { Search, Settings } from 'lucide-react';
 *
 * <Icon name="search" size="md" />
 * <Icon name="settings" size="lg" color="brand" />
 *
 * // Preferred: Direct import from lucide-react
 * import { Search } from 'lucide-react';
 * <Search size={20} />
 * ```
 */
export { Icon } from "./Icon";
export type {
  IconProps,
  IconSize,
  IconColor,
  IconRenderProps,
} from "./Icon.types";
