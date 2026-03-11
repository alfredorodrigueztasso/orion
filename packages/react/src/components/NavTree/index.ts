/**
 * @orion/react NavTree Section
 *
 * Notion-style hierarchical navigation sidebar with collapsible sections,
 * folders, pages, and context menu actions.
 *
 * @example
 * ```tsx
 * import { NavTree } from '@orion-ds/react/sections';
 *
 * <NavTree
 *   sections={[
 *     {
 *       id: 'main',
 *       title: 'Navigation',
 *       nodes: [
 *         { id: 'home', type: 'page', label: 'Home', href: '/' }
 *       ]
 *     }
 *   ]}
 *   onNodeClick={(node) => navigate(node.href!)}
 * />
 * ```
 */

export { NavTree } from "./NavTree";
export type {
  NavTreeProps,
  NavTreeNode,
  NavTreeNodeType,
  NavTreeSection,
  NavTreeSectionVariant,
  NavTreeActionConfig,
  NavTreeContextValue,
} from "./NavTree.types";
