/**
 * KanbanPageTemplate Types
 */

import type { ReactNode } from "react";

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority?: "low" | "medium" | "high";
  assignee?: { name: string; avatar?: string };
  dueDate?: Date;
  labels?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  count?: number;
}

export interface KanbanPageTemplateProps {
  /** Page title */
  title?: string;

  /** Kanban columns */
  columns?: KanbanColumn[];

  /** Tasks */
  tasks?: KanbanTask[];

  /** Called when task is moved */
  onTaskMove?: (taskId: string, columnId: string) => void;

  /** Called when creating new task */
  onCreateTask?: (columnId: string) => void;

  /** Called when editing task */
  onEditTask?: (taskId: string) => void;

  /** Called when deleting task */
  onDeleteTask?: (taskId: string) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
