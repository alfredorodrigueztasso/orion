"use client";

/**
 * Accordion Component
 *
 * A collapsible content panel for displaying information in a compact way.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'What is Orion?', content: 'A design system...' },
 *     { id: '2', title: 'How do I install?', content: 'Run npm install...' },
 *   ]}
 * />
 * ```
 */

import { forwardRef, useState, useCallback, useId } from "react";
import { ChevronDown } from "lucide-react";
import type { AccordionProps, AccordionItemProps } from "./Accordion.types";
import styles from "./Accordion.module.css";

/**
 * Individual accordion item component
 */
const AccordionItemComponent = ({
  item,
  isExpanded,
  onToggle,
  variant,
  animated,
}: AccordionItemProps) => {
  const contentId = useId();
  const headerId = useId();

  const itemClasses = [
    styles.item,
    styles[variant],
    isExpanded && styles.expanded,
    item.disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    styles.content,
    animated && styles.animated,
    isExpanded && styles.contentExpanded,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={itemClasses}>
      <button
        id={headerId}
        type="button"
        className={styles.header}
        onClick={onToggle}
        disabled={item.disabled}
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        {item.icon && (
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className={styles.title}>{item.title}</span>
        <span
          className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ""}`}
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={contentClasses}
        hidden={!isExpanded}
      >
        <div className={styles.contentInner}>{item.content}</div>
      </div>
    </div>
  );
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      variant = "default",
      allowMultiple = false,
      defaultExpanded = [],
      expanded: controlledExpanded,
      onChange,
      animated = true,
      className,
      ...rest
    },
    ref,
  ) => {
    // Internal state for uncontrolled mode
    const [internalExpanded, setInternalExpanded] =
      useState<string[]>(defaultExpanded);

    // Determine if controlled or uncontrolled
    const isControlled = controlledExpanded !== undefined;
    const expandedIds = isControlled ? controlledExpanded : internalExpanded;

    const handleToggle = useCallback(
      (itemId: string) => {
        let newExpanded: string[];

        if (expandedIds.includes(itemId)) {
          // Collapse the item
          newExpanded = expandedIds.filter((id) => id !== itemId);
        } else if (allowMultiple) {
          // Expand (multiple allowed)
          newExpanded = [...expandedIds, itemId];
        } else {
          // Expand (single only)
          newExpanded = [itemId];
        }

        if (!isControlled) {
          setInternalExpanded(newExpanded);
        }

        onChange?.(newExpanded);
      },
      [expandedIds, allowMultiple, isControlled, onChange],
    );

    const containerClasses = [styles.accordion, styles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses} {...rest}>
        {items.map((item) => (
          <AccordionItemComponent
            key={item.id}
            item={item}
            isExpanded={expandedIds.includes(item.id)}
            onToggle={() => handleToggle(item.id)}
            variant={variant}
            animated={animated}
          />
        ))}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
