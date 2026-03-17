"use client";

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors in child components and displays a fallback UI
 * instead of crashing the entire application.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>Error: {error.message}</p>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 *   onError={(error, info) => logErrorToService(error, info)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */

import React from "react";
import { AlertCircle } from "lucide-react";
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./ErrorBoundary.types";
import styles from "./ErrorBoundary.module.css";

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.hasError &&
      this.props.resetKey !== undefined &&
      prevProps.resetKey !== this.props.resetKey
    ) {
      this.reset();
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      const { fallback } = this.props;

      if (typeof fallback === "function") {
        return fallback(this.state.error, this.reset);
      }

      if (fallback) {
        return fallback;
      }

      return (
        <div className={styles.errorBoundary} role="alert">
          <AlertCircle size={32} className={styles.icon} />
          <p className={styles.title}>Something went wrong</p>
          <p className={styles.message}>{this.state.error.message}</p>
          <button
            className={styles.resetButton}
            onClick={this.reset}
            type="button"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
