"use client";

/**
 * Breadcrumbs Component
 *
 * A standalone navigation breadcrumb trail for SaaS applications.
 * Optimized for Product Mode with clean, efficient navigation.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'projects', label: 'Projects', href: '/projects' },
 *     { id: 'current', label: 'Project Alpha' }
 *   ]}
 * />
 * ```
 */

import { forwardRef, useState, useMemo } from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import type { BreadcrumbsProps, BreadcrumbItem } from "./Breadcrumbs.types";
import styles from "./Breadcrumbs.module.css";

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      showHomeIcon = false,
      size = "md",
      className,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);

    const shouldCollapse =
      maxItems !== undefined && items.length > maxItems && !expanded;

    const visibleItems = useMemo(() => {
      if (!shouldCollapse) return items;

      const beforeItems = items.slice(0, itemsBeforeCollapse);
      const afterItems = items.slice(-itemsAfterCollapse);
      return [
        ...beforeItems,
        { id: "__collapsed__", label: "..." },
        ...afterItems,
      ];
    }, [items, shouldCollapse, itemsBeforeCollapse, itemsAfterCollapse]);

    const renderSeparator = () => {
      if (separator) {
        return <span className={styles.separator}>{separator}</span>;
      }
      return (
        <ChevronRight
          size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
          className={styles.separator}
        />
      );
    };

    const renderItem = (
      item: BreadcrumbItem,
      index: number,
      isLast: boolean,
    ) => {
      // Collapsed placeholder
      if (item.id === "__collapsed__") {
        return (
          <button
            type="button"
            className={styles.collapseButton}
            onClick={() => setExpanded(true)}
            aria-label="Show all breadcrumbs"
          >
            <MoreHorizontal
              size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
            />
          </button>
        );
      }

      const showIcon = index === 0 && showHomeIcon;
      const content = (
        <>
          {showIcon && (
            <Home
              size={size === "sm" ? 12 : size === "lg" ? 16 : 14}
              className={styles.homeIcon}
            />
          )}
          {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
          <span>{item.label}</span>
        </>
      );

      if (isLast) {
        return (
          <span
            className={`${styles.item} ${styles.itemCurrent}`}
            aria-current="page"
          >
            {content}
          </span>
        );
      }

      if (item.href) {
        return (
          <a href={item.href} className={styles.item}>
            {content}
          </a>
        );
      }

      if (item.onClick) {
        return (
          <button type="button" className={styles.item} onClick={item.onClick}>
            {content}
          </button>
        );
      }

      return <span className={styles.item}>{content}</span>;
    };

    const classNames = [styles.breadcrumbs, styles[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <nav ref={ref} className={classNames} aria-label="Breadcrumb" {...rest}>
        <ol className={styles.list}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            return (
              <li key={item.id} className={styles.listItem}>
                {renderItem(item, index, isLast)}
                {!isLast && renderSeparator()}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";
