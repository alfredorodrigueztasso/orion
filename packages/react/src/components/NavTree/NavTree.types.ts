/**
 * NavTree Types
 *
 * Type definitions for the Notion-style hierarchical navigation sidebar.
 * Supports collapsible sections with nested folders and pages, context menus,
 * and localStorage persistence of expanded/collapsed states.
 */

import type { ReactNode } from "react";
import type { DropdownItem } from "../../components/Dropdown";

/**
 * Node type discriminator
 */
export type NavTreeNodeType = "page" | "folder";

/**
 * Section header visual variant
 */
export type NavTreeSectionVariant = "node" | "label";

/**
 * A node in the navigation tree (page or folder)
 *
 * @example
 * ```tsx
 * const node: NavTreeNode = {
 *   id: 'getting-started',
 *   type: 'page',
 *   label: 'Getting Started',
 *   icon: <Rocket size={16} />,
 *   href: '/docs/getting-started'
 * };
 *
 * const folder: NavTreeNode = {
 *   id: 'components',
 *   type: 'folder',
 *   label: 'Components',
 *   icon: <Package size={16} />,
 *   children: [pageNode1, pageNode2]
 * };
 * ```
 */
export interface NavTreeNode {
  /** Unique identifier within the section */
  id: string;

  /** Node type: 'page' (leaf) or 'folder' (container) */
  type: NavTreeNodeType;

  /** Display label */
  label: string;

  /** Optional Lucide icon (16px recommended) */
  icon?: ReactNode;

  /** Optional navigation href (for pages) */
  href?: string;

  /** Optional badge or counter (e.g., unread count, item count) */
  badge?: number | string;

  /** Child nodes (folders only, but not enforced) */
  children?: NavTreeNode[];
}

/**
 * A top-level collapsible section containing nodes
 *
 * @example
 * ```tsx
 * const section: NavTreeSection = {
 *   id: 'essentials',
 *   title: 'Lo esencial',
 *   defaultExpanded: true,
 *   nodes: [
 *     { id: 'home', type: 'page', label: 'Home', href: '/' },
 *     { id: 'docs', type: 'folder', label: 'Documentation', children: [...] }
 *   ]
 * };
 * ```
 */
export interface NavTreeSection {
  /** Unique section identifier */
  id: string;

  /** Section title (displayed in header) */
  title: string;

  /** Section header visual variant (default: 'node') */
  variant?: NavTreeSectionVariant;

  /** Optional icon displayed next to section title */
  icon?: ReactNode;

  /** Optional badge or counter displayed on section header */
  badge?: number | string;

  /** Root-level nodes in this section */
  nodes: NavTreeNode[];

  /** Whether section is expanded by default (default: true) */
  defaultExpanded?: boolean;
}

/**
 * Action configuration callbacks for tree mutations
 */
export interface NavTreeActionConfig {
  /** Add new node: parentId is null for root, sectionId identifies the section */
  onAdd?: (parentId: string | null, sectionId: string) => void;

  /** Rename a node */
  onRename?: (nodeId: string) => void;

  /** Duplicate a node */
  onDuplicate?: (nodeId: string) => void;

  /** Move a node to a different location */
  onMove?: (nodeId: string) => void;

  /** Delete a node */
  onDelete?: (nodeId: string) => void;

  /** Get custom dropdown actions (merged with standard ones) */
  getCustomActions?: (node: NavTreeNode) => DropdownItem[];
}

/**
 * Root props for the NavTree component
 */
export interface NavTreeProps {
  /** Array of collapsible sections */
  sections: NavTreeSection[];

  /** ID of the currently active node (highlighted) */
  activeNodeId?: string;

  /** Callback when a node row is clicked (for page navigation) */
  onNodeClick?: (node: NavTreeNode) => void;

  /** Action callbacks for tree mutations */
  actions?: NavTreeActionConfig;

  /** localStorage key prefix (default: 'orion-nav-tree') */
  persistKey?: string;

  /** Header slot (e.g. workspace logo/switcher) */
  header?: ReactNode;

  /** Footer slot (e.g. UserMenu) */
  footer?: ReactNode;

  /** Sidebar width - number (pixels), or string (e.g. "20%", "clamp(200px, 25vw, 320px)") (default: 240) */
  width?: number | string;

  /** Additional CSS class */
  className?: string;

  /** Render nodes directly without section headers (default: false) */
  headless?: boolean;
}

/**
 * Internal context value shared across NavTree components
 * (not exported publicly)
 */
export interface NavTreeContextValue {
  activeNodeId?: string;
  openSectionIds: string[];
  openNodeIds: string[];
  toggleSection: (id: string) => void;
  toggleNode: (id: string) => void;
  isOpen: (id: string) => boolean;
  onNodeClick?: (node: NavTreeNode) => void;
  onNodeAdd?: (parentId: string | null, sectionId: string) => void;
  actionConfig?: NavTreeActionConfig;
  depth?: number; // for internal tracking
}
