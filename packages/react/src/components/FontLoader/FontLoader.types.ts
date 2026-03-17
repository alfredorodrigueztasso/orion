import type { ReactNode } from "react";

export interface FontLoaderProps {
  /**
   * Callback fired when fonts are successfully loaded
   */
  onLoad?: () => void;

  /**
   * Callback fired when fonts fail to load
   */
  onError?: (error: Error) => void;

  /**
   * Whether to show loading state while fonts are loading
   * @default false
   */
  showLoadingState?: boolean;

  /**
   * Custom component to display while loading fonts
   * Only used if `showLoadingState` is true
   */
  loadingComponent?: ReactNode;

  /**
   * Children to render after fonts are loaded
   */
  children?: ReactNode;
}
