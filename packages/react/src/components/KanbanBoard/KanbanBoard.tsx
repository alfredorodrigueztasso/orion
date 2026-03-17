"use client";

/**
 * KanbanBoard Component
 *
 * A drag-and-drop board for task management (Trello/Linear style).
 * Optimized for Product Mode with efficient task visualization.
 *
 * @example
 * ```tsx
 * <KanbanBoard
 *   columns={[
 *     { id: 'todo', title: 'To Do', cards: todoCards },
 *     { id: 'done', title: 'Done', cards: doneCards }
 *   ]}
 *   onCardClick={(card) => openDetail(card)}
 * />
 * ```
 */

import { forwardRef } from "react";
import { Plus, MoreHorizontal, Clock, AlertCircle } from "lucide-react";
import type {
  KanbanBoardProps,
  KanbanCard,
  KanbanColumn,
} from "./KanbanBoard.types";
import styles from "./KanbanBoard.module.css";

// Priority indicator
const PriorityIndicator = ({
  priority,
}: {
  priority?: KanbanCard["priority"];
}) => {
  if (!priority || priority === "low") return null;

  return (
    <span className={`${styles.priority} ${styles[`priority-${priority}`]}`}>
      <AlertCircle size={12} />
    </span>
  );
};

// Card component
const KanbanCardComponent = ({
  card,
  compact,
  onClick,
  draggable,
}: {
  card: KanbanCard;
  compact: boolean;
  onClick?: () => void;
  draggable: boolean;
}) => {
  return (
    <div
      className={`${styles.card} ${compact ? styles.cardCompact : ""}`}
      onClick={onClick}
      draggable={draggable}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {card.coverImage && !compact && (
        <div className={styles.cardCover}>
          <img src={card.coverImage} alt="" />
        </div>
      )}

      <div className={styles.cardContent}>
        {/* Labels */}
        {card.labels && card.labels.length > 0 && !compact && (
          <div className={styles.labels}>
            {card.labels.map((label) => (
              <span
                key={label.id}
                className={`${styles.label} ${styles[`label-${label.color}`]}`}
              >
                {label.text}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <div className={styles.cardTitle}>
          <PriorityIndicator priority={card.priority} />
          <span>{card.title}</span>
        </div>

        {/* Description */}
        {card.description && !compact && (
          <p className={styles.cardDescription}>{card.description}</p>
        )}

        {/* Footer */}
        {(card.dueDate || (card.assignees && card.assignees.length > 0)) && (
          <div className={styles.cardFooter}>
            {card.dueDate && (
              <span className={styles.dueDate}>
                <Clock size={12} />
                <span>{card.dueDate}</span>
              </span>
            )}

            {card.assignees && card.assignees.length > 0 && (
              <div className={styles.assignees}>
                {card.assignees.slice(0, 3).map((assignee) => (
                  <div
                    key={assignee.id}
                    className={styles.assignee}
                    title={assignee.name}
                  >
                    {assignee.avatar ? (
                      <img src={assignee.avatar} alt={assignee.name} />
                    ) : (
                      <span>{assignee.name.charAt(0)}</span>
                    )}
                  </div>
                ))}
                {card.assignees.length > 3 && (
                  <div className={styles.assigneeMore}>
                    +{card.assignees.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Column component
const KanbanColumnComponent = ({
  column,
  compact,
  showCardCount,
  draggable,
  onCardClick,
  onAddCard,
  onColumnMenu,
}: {
  column: KanbanColumn;
  compact: boolean;
  showCardCount: boolean;
  draggable: boolean;
  onCardClick?: (card: KanbanCard) => void;
  onAddCard?: () => void;
  onColumnMenu?: () => void;
}) => {
  const isOverLimit = column.limit && column.cards.length > column.limit;

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitleWrapper}>
          {column.color && column.color !== "default" && (
            <span
              className={`${styles.columnDot} ${styles[`dot-${column.color}`]}`}
            />
          )}
          <h3 className={styles.columnTitle}>{column.title}</h3>
          {showCardCount && (
            <span
              className={`${styles.columnCount} ${isOverLimit ? styles.columnCountOver : ""}`}
            >
              {column.cards.length}
              {column.limit && `/${column.limit}`}
            </span>
          )}
        </div>
        <div className={styles.columnActions}>
          {onAddCard && (
            <button
              type="button"
              className={styles.columnAction}
              onClick={onAddCard}
              aria-label="Add card"
            >
              <Plus size={16} />
            </button>
          )}
          {onColumnMenu && (
            <button
              type="button"
              className={styles.columnAction}
              onClick={onColumnMenu}
              aria-label="Column menu"
            >
              <MoreHorizontal size={16} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.columnCards}>
        {column.cards.map((card) => (
          <KanbanCardComponent
            key={card.id}
            card={card}
            compact={compact}
            draggable={draggable}
            onClick={() => onCardClick?.(card)}
          />
        ))}

        {column.cards.length === 0 && (
          <div className={styles.emptyColumn}>No cards yet</div>
        )}
      </div>

      {onAddCard && (
        <button
          type="button"
          className={styles.addCardButton}
          onClick={onAddCard}
        >
          <Plus size={16} />
          <span>Add card</span>
        </button>
      )}
    </div>
  );
};

export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onCardMove: _onCardMove,
      onCardClick,
      onAddCard,
      onAddColumn,
      onColumnMenu,
      compact = false,
      showCardCount = true,
      draggable = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [styles.kanbanBoard, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        <div className={styles.columns}>
          {columns.map((column) => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
              compact={compact}
              showCardCount={showCardCount}
              draggable={draggable}
              onCardClick={(card) => onCardClick?.(card, column.id)}
              onAddCard={onAddCard ? () => onAddCard(column.id) : undefined}
              onColumnMenu={
                onColumnMenu ? () => onColumnMenu(column.id) : undefined
              }
            />
          ))}

          {onAddColumn && (
            <button
              type="button"
              className={styles.addColumnButton}
              onClick={onAddColumn}
            >
              <Plus size={20} />
              <span>Add column</span>
            </button>
          )}
        </div>
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";
