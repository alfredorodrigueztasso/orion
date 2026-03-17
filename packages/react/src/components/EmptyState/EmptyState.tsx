/**
 * EmptyState Component
 *
 * Displays when there's no content to show.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<Inbox size={48} />}
 *   title="No messages yet"
 *   description="When you receive messages, they'll appear here."
 *   action={<Button>Send a message</Button>}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { EmptyStateProps } from "./EmptyState.types";
import styles from "./EmptyState.module.css";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      secondaryAction,
      size = "md",
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [styles.emptyState, styles[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {icon && (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {(action || secondaryAction) && (
          <div className={styles.actions}>
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
