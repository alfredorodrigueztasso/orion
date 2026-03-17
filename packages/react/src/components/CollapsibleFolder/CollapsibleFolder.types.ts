/**
 * CollapsibleFolder Section Types
 *
 * Type definitions for the CollapsibleFolder section - generic collapsible container
 * for organizing items with drag & drop support.
 */

import type { HTMLAttributes } from "react";

/**
 * Sort option for organizing items
 */
export interface SortOption {
  /**
   * Display label
   */
  label: string;

  /**
   * Internal value
   */
  value: string;
}

/**
 * CollapsibleFolder component props
 *
 * Generic folder component that can contain any type of items (agents, files, documents, etc.)
 * with drag & drop, sorting, and folder management features.
 *
 * @template TItem - The type of items in the folder. Must have `id` property and optional `draggable` boolean.
 *
 * @example
 * ```tsx
 * // With files
 * <CollapsibleFolder
 *   id="folder-1"
 *   title="Documents"
 *   itemCount={3}
 *   items={files}
 *   itemLabel="File"
 *   itemLabelPlural="Files"
 *   emptyText="No files in this folder"
 *   renderItem={(file) => <FileCard {...file} />}
 * />
 *
 * // With custom items
 * <CollapsibleFolder
 *   id="folder-2"
 *   title="Projects"
 *   itemCount={2}
 *   items={projects}
 *   itemLabel="Project"
 *   itemLabelPlural="Projects"
 *   renderItem={(project) => (
 *     <div>{project.name} - {project.status}</div>
 *   )}
 * />
 * ```
 */
export interface CollapsibleFolderProps<
  TItem extends { id: string; draggable?: boolean; [key: string]: any },
> extends Omit<HTMLAttributes<HTMLDivElement>, "onDrop"> {
  /**
   * Unique folder identifier
   */
  id: string;

  /**
   * Folder title/name
   */
  title: string;

  /**
   * Number of items in folder
   */
  itemCount: number;

  /**
   * Array of items to display
   */
  items: TItem[];

  /**
   * Render function for each item
   * @param item - The item to render
   * @param index - The item's index in the items array
   * @returns React node to render for this item
   */
  renderItem: (item: TItem, index: number) => React.ReactNode;

  /**
   * Singular label for items (used in badge)
   * @default "Item"
   */
  itemLabel?: string;

  /**
   * Plural label for items (used in badge)
   * @default "Items"
   */
  itemLabelPlural?: string;

  /**
   * Empty state message when folder contains no items
   * @default "No items in this folder"
   */
  emptyText?: string;

  /**
   * Fallback label for sort button
   * @default "Sort"
   */
  sortLabel?: string;

  /**
   * Default expanded state
   * @default true
   */
  defaultExpanded?: boolean;

  /**
   * Available sort options
   */
  sortOptions?: SortOption[];

  /**
   * Currently selected sort value
   */
  selectedSort?: string;

  /**
   * Sort option change handler
   */
  onSortChange?: (value: string) => void;

  /**
   * Drop handler for drag & drop
   * @param itemId - ID of the item being dropped
   * @param folderId - ID of the target folder
   * @param index - Position index where the item will be inserted (optional, defaults to end)
   */
  onDrop?: (itemId: string, folderId: string, index?: number) => void;

  /**
   * Rename folder handler
   */
  onFolderEdit?: () => void;

  /**
   * Delete folder handler
   */
  onFolderDelete?: () => void;

  /**
   * Invite participants to folder handler
   */
  onFolderInvite?: () => void;

  /**
   * Is this folder currently a valid drop target
   * @internal
   */
  isDropTarget?: boolean;

  /**
   * Briefly set to true after a successful drop for micro-feedback
   * @internal
   */
  isDropCompleted?: boolean;

  /**
   * Callback when drag enters folder (for syncing @dnd-kit state)
   * @internal
   */
  onDragEnter?: () => void;

  /**
   * Callback when drag leaves folder (for syncing @dnd-kit state)
   * @internal
   */
  onDragLeaveFolder?: () => void;
}
