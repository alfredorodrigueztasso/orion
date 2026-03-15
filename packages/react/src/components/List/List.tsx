"use client";

/**
 * List Component
 *
 * A flexible list component for displaying items with various layouts.
 *
 * @example
 * ```tsx
 * <List
 *   items={[
 *     { id: '1', primary: 'Item 1', secondary: 'Description' },
 *     { id: '2', primary: 'Item 2', leading: <UserIcon /> },
 *   ]}
 *   interactive
 * />
 * ```
 */

import { forwardRef, useCallback } from "react";
import { Check } from "lucide-react";
import type { ListProps, ListItem, ListItemProps } from "./List.types";
import styles from "./List.module.css";

/**
 * Single List Item
 */
const ListItemComponent = ({
  item,
  size,
  interactive,
  selectable,
  onClick,
}: ListItemProps) => {
  const handleClick = useCallback(() => {
    if (!item.disabled && (interactive || selectable) && item.onClick) {
      item.onClick();
    }
    onClick?.();
  }, [item, interactive, selectable, onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && (interactive || selectable)) {
        e.preventDefault();
        handleClick();
      }
    },
    [interactive, selectable, handleClick],
  );

  const itemClasses = [
    styles.item,
    styles[size],
    interactive && styles.interactive,
    selectable && styles.selectable,
    item.selected && styles.selected,
    item.disabled && styles.disabled,
    item.className,
  ]
    .filter(Boolean)
    .join(" ");

  const isClickable =
    !item.disabled && (interactive || selectable || item.onClick);

  return (
    <li
      className={itemClasses}
      role={selectable ? "option" : interactive ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-selected={selectable ? item.selected : undefined}
      aria-disabled={item.disabled}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {item.leading && (
        <span className={styles.leading} aria-hidden="true">
          {item.leading}
        </span>
      )}

      <div className={styles.content}>
        <span className={styles.primary}>{item.primary}</span>
        {item.secondary && (
          <span className={styles.secondary}>{item.secondary}</span>
        )}
      </div>

      {item.trailing && (
        <span className={styles.trailing}>{item.trailing}</span>
      )}

      {selectable && item.selected && (
        <span className={styles.checkmark} aria-hidden="true">
          <Check size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
        </span>
      )}
    </li>
  );
};

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      items,
      size = "md",
      variant = "default",
      interactive = false,
      selectable = false,
      onSelect,
      renderItem,
      emptyContent,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleItemClick = useCallback(
      (item: ListItem) => {
        if (onSelect && !item.disabled) {
          onSelect(item);
        }
      },
      [onSelect],
    );

    const listClasses = [styles.list, styles[variant], className]
      .filter(Boolean)
      .join(" ");

    if (items.length === 0 && emptyContent) {
      return <div className={styles.empty}>{emptyContent}</div>;
    }

    return (
      <ul
        ref={ref}
        className={listClasses}
        role={selectable ? "listbox" : "list"}
        {...rest}
      >
        {items.map((item, index) =>
          renderItem ? (
            <li key={item.id} className={styles.customItem}>
              {renderItem(item, index)}
            </li>
          ) : (
            <ListItemComponent
              key={item.id}
              item={item}
              size={size}
              interactive={interactive}
              selectable={selectable}
              onClick={() => handleItemClick(item)}
            />
          ),
        )}
      </ul>
    );
  },
);

List.displayName = "List";
