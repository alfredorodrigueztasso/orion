"use client";

/**
 * AlertDialog Component
 *
 * A confirmation dialog that forces a user response.
 * Unlike Modal, it does NOT close on backdrop click or Escape by default.
 *
 * @example
 * ```tsx
 * <AlertDialog open={open} onClose={handleClose}>
 *   <AlertDialog.Icon variant="danger" />
 *   <AlertDialog.Title>Delete account?</AlertDialog.Title>
 *   <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
 *   <AlertDialog.Actions>
 *     <Button variant="ghost" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Delete</Button>
 *   </AlertDialog.Actions>
 * </AlertDialog>
 * ```
 */

import React, { createContext, useContext, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type {
  AlertDialogProps,
  AlertDialogIconProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionsProps,
} from "./AlertDialog.types";
import styles from "./AlertDialog.module.css";

// Internal context for sharing generated IDs between compound components
interface AlertDialogContextValue {
  titleId: string;
  descriptionId: string;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext(): AlertDialogContextValue | null {
  return useContext(AlertDialogContext);
}

const DEFAULT_ICONS = {
  info: <Info size={24} />,
  warning: <AlertTriangle size={24} />,
  danger: <AlertCircle size={24} />,
};

// Main AlertDialog component
export const AlertDialog: React.FC<AlertDialogProps> & {
  Icon: React.FC<AlertDialogIconProps>;
  Title: React.FC<AlertDialogTitleProps>;
  Description: React.FC<AlertDialogDescriptionProps>;
  Actions: React.FC<AlertDialogActionsProps>;
} = ({
  open,
  onClose,
  closeOnBackdrop = false,
  closeOnEscape = false,
  children,
  className,
}) => {
  const titleId = useId();
  const descriptionId = useId();

  // Handle Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const dialogClasses = [styles.dialog, className].filter(Boolean).join(" ");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <AlertDialogContext.Provider value={{ titleId, descriptionId }}>
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className={dialogClasses}>{children}</div>
      </div>
    </AlertDialogContext.Provider>,
    document.body,
  );
};

// AlertDialog.Icon subcomponent
const AlertDialogIcon: React.FC<AlertDialogIconProps> = ({
  variant = "info",
  icon,
  className,
}) => {
  const variantClass = {
    info: styles.iconInfo,
    warning: styles.iconWarning,
    danger: styles.iconDanger,
  }[variant];

  const classNames = [styles.icon, variantClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      {icon || DEFAULT_ICONS[variant]}
    </div>
  );
};

// AlertDialog.Title subcomponent
const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  className,
  children,
}) => {
  const ctx = useAlertDialogContext();
  const classNames = [styles.title, className].filter(Boolean).join(" ");
  return (
    <h2 id={ctx?.titleId} className={classNames}>
      {children}
    </h2>
  );
};

// AlertDialog.Description subcomponent
const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  className,
  children,
}) => {
  const ctx = useAlertDialogContext();
  const classNames = [styles.description, className].filter(Boolean).join(" ");
  return (
    <p id={ctx?.descriptionId} className={classNames}>
      {children}
    </p>
  );
};

// AlertDialog.Actions subcomponent
const AlertDialogActions: React.FC<AlertDialogActionsProps> = ({
  className,
  children,
}) => {
  const classNames = [styles.actions, className].filter(Boolean).join(" ");
  return <div className={classNames}>{children}</div>;
};

// Attach subcomponents
AlertDialog.Icon = AlertDialogIcon;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Actions = AlertDialogActions;

// Display names
AlertDialog.displayName = "AlertDialog";
AlertDialogIcon.displayName = "AlertDialog.Icon";
AlertDialogTitle.displayName = "AlertDialog.Title";
AlertDialogDescription.displayName = "AlertDialog.Description";
AlertDialogActions.displayName = "AlertDialog.Actions";
