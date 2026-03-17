"use client";

/**
 * Toast Component
 *
 * A notification system for showing temporary messages.
 *
 * @example
 * ```tsx
 * // Wrap your app with ToastProvider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use the useToast hook in any component
 * const { toast, success, error } = useToast();
 *
 * toast({ message: 'Hello!' });
 * success('Operation completed');
 * error('Something went wrong');
 * ```
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import type {
  Toast,
  ToastOptions,
  ToastProviderProps,
  ToastContextValue,
  ToastItemProps,
} from "./Toast.types";
import styles from "./Toast.module.css";

// Generate unique ID
let toastCounter = 0;
const generateId = () => `toast-${++toastCounter}`;

// Toast Context
const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to access toast functions
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

/**
 * Individual Toast Item
 */
const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
      toast.onDismiss?.();
    }, 200); // Match animation duration
  }, [toast, onDismiss]);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      timerRef.current = setTimeout(handleDismiss, toast.duration);
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [toast.duration, handleDismiss]);

  // Pause timer on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (toast.duration && toast.duration > 0) {
      timerRef.current = setTimeout(handleDismiss, toast.duration);
    }
  };

  const toastClasses = [
    styles.toast,
    styles[toast.variant || "info"],
    isExiting && styles.exiting,
  ]
    .filter(Boolean)
    .join(" ");

  const getIcon = () => {
    switch (toast.variant) {
      case "success":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.667 5L7.5 14.167 3.333 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "error":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="7.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10 6v5M10 13.5v.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "warning":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8.57 3.216L1.538 15.143a1.667 1.667 0 001.429 2.524h14.066a1.667 1.667 0 001.429-2.524L11.43 3.216a1.667 1.667 0 00-2.858 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 7.5v3.333M10 14.167h.008"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default: // info
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="7.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10 9v4.5M10 6.5v.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={toastClasses}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.icon} aria-hidden="true">
        {getIcon()}
      </span>

      <div className={styles.content}>
        {toast.title && <div className={styles.title}>{toast.title}</div>}
        <div className={styles.message}>{toast.message}</div>
      </div>

      {toast.action && (
        <button
          type="button"
          className={styles.action}
          onClick={() => {
            toast.action?.onClick();
            handleDismiss();
          }}
        >
          {toast.action.label}
        </button>
      )}

      {toast.dismissible !== false && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * Toast Provider Component
 */
export const ToastProvider = ({
  children,
  position = "bottom-right",
  maxToasts = 5,
  defaultDuration = 5000,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = generateId();

      // Handle both 'variant' and 'type' (alias for backward compatibility)
      const { type, ...optionsWithoutType } = options as ToastOptions & {
        type?: string;
      };
      const variant = optionsWithoutType.variant || type || "info";

      const newToast: Toast = {
        id,
        duration: defaultDuration,
        dismissible: true,
        variant: variant as any,
        ...optionsWithoutType,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Remove oldest toasts if exceeding max
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      return id;
    },
    [defaultDuration, maxToasts],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Shorthand methods
  const info = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, variant: "info", ...options }),
    [addToast],
  );

  const success = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, variant: "success", ...options }),
    [addToast],
  );

  const warning = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, variant: "warning", ...options }),
    [addToast],
  );

  const error = useCallback(
    (message: string, options?: Partial<ToastOptions>) =>
      addToast({ message, variant: "error", ...options }),
    [addToast],
  );

  const value: ToastContextValue = {
    toast: addToast,
    info,
    success,
    warning,
    error,
    dismiss: dismissToast,
    dismissAll,
  };

  const containerClasses = [styles.container, styles[position]]
    .filter(Boolean)
    .join(" ");

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 &&
        createPortal(
          <div className={containerClasses} aria-label="Notifications">
            {toasts.map((toast) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                onDismiss={dismissToast}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "ToastProvider";
