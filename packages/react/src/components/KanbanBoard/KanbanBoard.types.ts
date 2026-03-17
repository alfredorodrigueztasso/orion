/**
 * KanbanBoard Component Types
 *
 * Type definitions for the Orion KanbanBoard section component.
 * A drag-and-drop board for task management (Trello/Linear style).
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Kanban card/item
 */
export interface KanbanCard {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Card title
   */
  title: string;

  /**
   * Card description
   */
  description?: string;

  /**
   * Labels/tags
   */
  labels?: KanbanLabel[];

  /**
   * Assigned users
   */
  assignees?: KanbanAssignee[];

  /**
   * Due date
   */
  dueDate?: string;

  /**
   * Priority level
   */
  priority?: "low" | "medium" | "high" | "urgent";

  /**
   * Custom metadata
   */
  metadata?: Record<string, ReactNode>;

  /**
   * Cover image URL
   */
  coverImage?: string;
}

/**
 * Kanban label
 */
export interface KanbanLabel {
  /**
   * Label ID
   */
  id: string;

  /**
   * Label text
   */
  text: string;

  /**
   * Label color
   */
  color:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "gray";
}

/**
 * Kanban assignee
 */
export interface KanbanAssignee {
  /**
   * User ID
   */
  id: string;

  /**
   * User name
   */
  name: string;

  /**
   * Avatar URL
   */
  avatar?: string;
}

/**
 * Kanban column
 */
export interface KanbanColumn {
  /**
   * Column ID
   */
  id: string;

  /**
   * Column title
   */
  title: string;

  /**
   * Column color/variant
   */
  color?: "default" | "blue" | "green" | "yellow" | "red" | "purple";

  /**
   * Cards in this column
   */
  cards: KanbanCard[];

  /**
   * Max cards limit (WIP limit)
   */
  limit?: number;
}

/**
 * Drag result for move operations
 */
export interface KanbanDragResult {
  /**
   * Card that was moved
   */
  cardId: string;

  /**
   * Source column ID
   */
  sourceColumnId: string;

  /**
   * Source index
   */
  sourceIndex: number;

  /**
   * Destination column ID
   */
  destinationColumnId: string;

  /**
   * Destination index
   */
  destinationIndex: number;
}

/**
 * KanbanBoard section props
 *
 * @example
 * ```tsx
 * <KanbanBoard
 *   columns={[
 *     { id: 'todo', title: 'To Do', cards: [...] },
 *     { id: 'in-progress', title: 'In Progress', cards: [...] },
 *     { id: 'done', title: 'Done', cards: [...] }
 *   ]}
 *   onCardMove={handleCardMove}
 *   onCardClick={handleCardClick}
 * />
 * ```
 */
export interface KanbanBoardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Board columns
   */
  columns: KanbanColumn[];

  /**
   * Card move handler
   */
  onCardMove?: (result: KanbanDragResult) => void;

  /**
   * Card click handler
   */
  onCardClick?: (card: KanbanCard, columnId: string) => void;

  /**
   * Add card handler (shows add button if provided)
   */
  onAddCard?: (columnId: string) => void;

  /**
   * Add column handler (shows add column button if provided)
   */
  onAddColumn?: () => void;

  /**
   * Column menu handler
   */
  onColumnMenu?: (columnId: string) => void;

  /**
   * Compact card display
   * @default false
   */
  compact?: boolean;

  /**
   * Show card count in column headers
   * @default true
   */
  showCardCount?: boolean;

  /**
   * Enable drag and drop (visual only - actual DnD needs external library)
   * @default true
   */
  draggable?: boolean;
}
