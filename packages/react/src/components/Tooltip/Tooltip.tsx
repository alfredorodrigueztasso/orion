"use client";

/**
 * Tooltip Component
 *
 * Hover information tooltip with multiple placements.
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to edit">
 *   <Button icon={<EditIcon />} />
 * </Tooltip>
 *
 * <Tooltip content="Delete item" placement="right">
 *   <Button variant="danger" icon={<TrashIcon />} />
 * </Tooltip>
 * ```
 */

import React, { useState, useRef, cloneElement, isValidElement } from "react";
import type { TooltipProps } from "./Tooltip.types";
import styles from "./Tooltip.module.css";

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  delay = 200,
  disabled = false,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (disabled) return;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const tooltipClasses = [styles.tooltip, styles[placement], className]
    .filter(Boolean)
    .join(" ");

  // Clone child element and add event handlers
  const childElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
      })
    : children;

  return (
    <div className={styles.container}>
      {childElement}

      {isVisible && !disabled && (
        <div className={tooltipClasses} role="tooltip">
          {content}
          <div className={styles.arrow} />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
