"use client";

/**
 * QuickActions Component
 *
 * A FAB or floating action bar for quick access to common actions.
 * Optimized for Product Mode with efficient action access.
 *
 * @example
 * ```tsx
 * <QuickActions
 *   variant="fab"
 *   actions={[
 *     { id: 'new', label: 'New Item', icon: <Plus />, onClick: handleNew }
 *   ]}
 * />
 * ```
 */

import { forwardRef, useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import type { QuickActionsProps, QuickAction } from "./QuickActions.types";
import styles from "./QuickActions.module.css";

export const QuickActions = forwardRef<HTMLDivElement, QuickActionsProps>(
  (
    {
      actions,
      variant = "fab",
      position = "bottom-right",
      primaryAction,
      triggerIcon,
      showLabels,
      fixed = true,
      offset = 24,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine if labels should show
    const shouldShowLabels = showLabels ?? variant === "bar";

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleActionClick = (action: QuickAction) => {
      if (!action.disabled) {
        action.onClick();
        if (variant === "fab" || variant === "menu") {
          setIsOpen(false);
        }
      }
    };

    const classNames = [
      styles.quickActions,
      styles[`variant-${variant}`],
      styles[`position-${position}`],
      fixed && styles.fixed,
      isOpen && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const containerStyle = {
      ...style,
      "--offset": `${offset}px`,
    } as React.CSSProperties;

    // FAB variant
    if (variant === "fab") {
      return (
        <div
          ref={containerRef}
          className={classNames}
          style={containerStyle}
          {...rest}
        >
          {/* Action items (shown when expanded) */}
          <div className={styles.fabActions}>
            {actions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={`${styles.fabAction} ${action.variant ? styles[`action-${action.variant}`] : ""} ${action.disabled ? styles.actionDisabled : ""}`}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
                title={action.label}
              >
                <span className={styles.fabActionIcon}>{action.icon}</span>
                {shouldShowLabels && (
                  <span className={styles.fabActionLabel}>{action.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* Main FAB trigger */}
          <button
            type="button"
            className={styles.fabTrigger}
            onClick={() => {
              if (primaryAction && !isOpen) {
                handleActionClick(primaryAction);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close actions" : "Open actions"}
          >
            <span
              className={`${styles.fabTriggerIcon} ${isOpen ? styles.fabTriggerIconRotate : ""}`}
            >
              {isOpen ? <X size={24} /> : triggerIcon || <Plus size={24} />}
            </span>
          </button>
        </div>
      );
    }

    // Bar variant
    if (variant === "bar") {
      return (
        <div ref={ref} className={classNames} style={containerStyle} {...rest}>
          <div className={styles.bar}>
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={`${styles.barAction} ${action.variant ? styles[`action-${action.variant}`] : ""} ${action.disabled ? styles.actionDisabled : ""}`}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                title={action.label}
              >
                <span className={styles.barActionIcon}>{action.icon}</span>
                {shouldShowLabels && (
                  <span className={styles.barActionLabel}>{action.label}</span>
                )}
                {action.shortcut && (
                  <kbd className={styles.shortcut}>{action.shortcut}</kbd>
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Menu variant
    return (
      <div
        ref={containerRef}
        className={classNames}
        style={containerStyle}
        {...rest}
      >
        {/* Menu items */}
        {isOpen && (
          <div className={styles.menu}>
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={`${styles.menuAction} ${action.variant ? styles[`action-${action.variant}`] : ""} ${action.disabled ? styles.actionDisabled : ""}`}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
              >
                <span className={styles.menuActionIcon}>{action.icon}</span>
                <span className={styles.menuActionLabel}>{action.label}</span>
                {action.shortcut && (
                  <kbd className={styles.shortcut}>{action.shortcut}</kbd>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Menu trigger */}
        <button
          type="button"
          className={styles.menuTrigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : triggerIcon || <Plus size={20} />}
        </button>
      </div>
    );
  },
);

QuickActions.displayName = "QuickActions";
