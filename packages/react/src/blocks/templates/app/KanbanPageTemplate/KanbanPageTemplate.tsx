"use client";

/**
 * KanbanPageTemplate
 *
 * Task management board with drag-and-drop capable columns.
 * Ideal for agile workflows and project management interfaces.
 *
 * @example
 * ```tsx
 * <KanbanPageTemplate
 *   title="Sprint Board"
 *   columns={columns}
 *   tasks={tasks}
 *   onTaskMove={handleMove}
 *   onCreateTask={handleCreate}
 * />
 * ```
 */

import { forwardRef, useCallback } from "react";
import { Button, Badge } from "@orion-ds/react";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import type {
  KanbanPageTemplateProps,
  KanbanTask,
} from "./KanbanPageTemplate.types";
import styles from "./KanbanPageTemplate.module.css";

function getPriorityColor(priority?: string) {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "info";
  }
}

function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: KanbanTask;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}) {
  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <h4 className={styles.taskTitle}>{task.title}</h4>
        <div className={styles.taskActions}>
          <button
            className={styles.taskActionButton}
            onClick={() => onEdit?.(task.id)}
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            className={[styles.taskActionButton, styles.taskActionButtonDanger]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onDelete?.(task.id)}
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className={styles.taskDescription}>{task.description}</p>
      )}

      <div className={styles.taskMeta}>
        {task.priority && (
          <Badge variant={getPriorityColor(task.priority)} size="sm">
            {task.priority}
          </Badge>
        )}

        {task.dueDate && (
          <div className={styles.dueDateBadge}>
            <Calendar size={12} />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className={styles.labels}>
          {task.labels.map((label) => (
            <span key={label} className={styles.label}>
              {label}
            </span>
          ))}
        </div>
      )}

      {task.assignee && (
        <div className={styles.assignee}>
          {task.assignee.avatar && (
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className={styles.assigneeAvatar}
            />
          )}
          <span className={styles.assigneeName}>{task.assignee.name}</span>
        </div>
      )}
    </div>
  );
}

export const KanbanPageTemplate = forwardRef<
  HTMLDivElement,
  KanbanPageTemplateProps
>(
  (
    {
      title = "Kanban Board",
      columns = [],
      tasks = [],
      onTaskMove,
      onCreateTask,
      onEditTask,
      onDeleteTask,
      isLoading = false,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleTaskDelete = useCallback(
      (taskId: string) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
          onDeleteTask?.(taskId);
        }
      },
      [onDeleteTask],
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {error && <div className={styles.error}>{error}</div>}
        </div>

        {/* Board */}
        <div className={styles.board}>
          {columns.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No columns configured</p>
            </div>
          ) : (
            columns.map((column) => {
              const columnTasks = tasks.filter(
                (task) => task.columnId === column.id,
              );

              return (
                <div key={column.id} className={styles.column}>
                  {/* Column Header */}
                  <div className={styles.columnHeader}>
                    <div>
                      <h3 className={styles.columnTitle}>{column.title}</h3>
                      <span className={styles.columnCount}>
                        {columnTasks.length}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      iconOnly
                      icon={<Plus size={18} />}
                      onClick={() => onCreateTask?.(column.id)}
                      disabled={isLoading}
                      aria-label="Add task"
                    />
                  </div>

                  {/* Tasks */}
                  <div className={styles.tasks}>
                    {columnTasks.length === 0 ? (
                      <div className={styles.emptyColumn}>
                        <p className={styles.emptyColumnText}>No tasks</p>
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={onEditTask}
                          onDelete={handleTaskDelete}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  },
);

KanbanPageTemplate.displayName = "KanbanPageTemplate";
export default KanbanPageTemplate;
