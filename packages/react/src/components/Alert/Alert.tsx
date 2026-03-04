/**
 * Alert Component
 *
 * Notification and message alert component with status variants.
 * Uses Lucide icons for consistent iconography across the design system.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved successfully.
 * </Alert>
 *
 * <Alert variant="error" dismissible onClose={() => console.log('closed')}>
 *   An error occurred while processing your request.
 * </Alert>
 *
 * <Alert variant="warning" title="Warning">
 *   This action cannot be undone.
 * </Alert>
 *
 * <Alert variant="info" icon={<InfoIcon />}>
 *   Custom icon example
 * </Alert>
 * ```
 */

import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import type { AlertProps, AlertVariant } from "./Alert.types";
import styles from "./Alert.module.css";

/**
 * Default Lucide icons mapped to alert variants
 * These provide consistent iconography across the design system
 */
const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  inverse: <Info size={20} />,
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  dismissible = false,
  onClose,
  icon,
  className,
  children,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Memoize class names for performance
  const classNames = useMemo(
    () => [styles.alert, styles[variant], className].filter(Boolean).join(" "),
    [variant, className],
  );

  // Use custom icon or default Lucide icon for variant
  const displayIcon = useMemo(
    () => (icon !== undefined ? icon : DEFAULT_ICONS[variant]),
    [icon, variant],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classNames} role="alert" {...rest}>
      {/* Icon */}
      {displayIcon && (
        <div className={styles.icon} aria-hidden="true">
          {displayIcon}
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {children && <div className={styles.message}>{children}</div>}
      </div>

      {/* Close button */}
      {dismissible && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close alert"
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
