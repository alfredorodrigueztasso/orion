"use client";

/**
 * @orion-ds/react/dnd
 *
 * Heavy component entry point for drag-and-drop components.
 * This module requires the @dnd-kit peer dependencies:
 *   - @dnd-kit/core
 *   - @dnd-kit/sortable
 *   - @dnd-kit/utilities
 *
 * Usage:
 *   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
 *   import { CollapsibleFolder } from '@orion-ds/react/dnd';
 */

export { CollapsibleFolder } from "./components/CollapsibleFolder";
export type {
  CollapsibleFolderProps,
  SortOption,
} from "./components/CollapsibleFolder";
