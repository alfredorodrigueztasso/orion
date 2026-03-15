"use client";

/**
 * Breadcrumb Component
 *
 * Navigation breadcrumbs showing current page location in site hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop' }
 *   ]}
 * />
 *
 * <Breadcrumb
 *   items={breadcrumbs}
 *   separator="slash"
 *   showHomeIcon
 *   maxItems={3}
 *   size="lg"
 * />
 *
 * <Breadcrumb
 *   items={items}
 *   separator="custom"
 *   customSeparator={<Icon name="arrow-right" />}
 * />
 * ```
 */

import React from "react";
import { Home } from "lucide-react";
import type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb.types";
import styles from "./Breadcrumb.module.css";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "chevron",
  customSeparator,
  showHomeIcon = false,
  maxItems,
  size = "md",
  className,
  linkProps,
}) => {
  // Collapse items if maxItems is set and exceeded
  const processedItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Always show first and last items, collapse middle
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));

    return [
      ...(firstItem ? [firstItem] : []),
      { label: "...", href: undefined } as BreadcrumbItem, // Ellipsis
      ...lastItems,
    ];
  }, [items, maxItems]);

  // Render separator
  const renderSeparator = (index: number) => {
    const separatorClasses = [
      styles.separator,
      separator === "chevron" && styles.chevron,
      separator === "slash" && styles.slash,
    ]
      .filter(Boolean)
      .join(" ");

    if (separator === "custom" && customSeparator) {
      return (
        <span
          key={`sep-${index}`}
          className={styles.separator}
          aria-hidden="true"
        >
          {customSeparator}
        </span>
      );
    }

    return (
      <span
        key={`sep-${index}`}
        className={separatorClasses}
        aria-hidden="true"
      />
    );
  };

  // Get icon size based on breadcrumb size
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 14;
      case "lg":
        return 18;
      default:
        return 16;
    }
  };

  // Render home icon
  const renderHomeIcon = () => {
    if (!showHomeIcon) return null;
    return (
      <span className={styles.homeIcon} aria-label="Home">
        <Home size={getIconSize()} />
      </span>
    );
  };

  // Render individual breadcrumb item
  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === processedItems.length - 1;
    const isEllipsis = item.label === "...";

    // Ellipsis (collapsed items indicator)
    if (isEllipsis) {
      return (
        <li key={`ellipsis-${index}`} className={styles.item}>
          <span className={styles.ellipsis} aria-label="More items">
            …
          </span>
        </li>
      );
    }

    // Current page (last item, non-clickable)
    if (isLast || !item.href) {
      return (
        <li
          key={index}
          className={styles.item}
          aria-current={isLast ? "page" : undefined}
        >
          <span className={styles.current}>
            {index === 0 && renderHomeIcon()}
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {item.label}
          </span>
        </li>
      );
    }

    // Clickable breadcrumb link
    return (
      <li key={index} className={styles.item}>
        <a href={item.href} className={styles.link} {...linkProps}>
          {index === 0 && renderHomeIcon()}
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          {item.label}
        </a>
      </li>
    );
  };

  // Container classes
  const breadcrumbClasses = [styles.breadcrumb, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <nav aria-label="Breadcrumb">
      <ol className={breadcrumbClasses}>
        {processedItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item, index)}
            {index < processedItems.length - 1 && renderSeparator(index)}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";
