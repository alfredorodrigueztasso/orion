import type { ReactNode, ErrorInfo } from "react";

export interface ErrorBoundaryProps {
  /** Content to render when no error has occurred */
  children: ReactNode;
  /** Custom fallback UI to display when an error is caught */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /** Callback fired when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Reset error state when this key changes */
  resetKey?: string | number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
