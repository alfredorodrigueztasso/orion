/**
 * FontLoader Component - Loads brand fonts from Google Fonts.
 *
 * Note: ThemeProvider automatically includes FontLoader by default.
 * Only use directly if disabling auto-loading.
 *
 * @example
 * ```tsx
 * import { FontLoader } from '@orion-ds/react';
 *
 * // Usually not needed - ThemeProvider handles this automatically
 * // Only use if you disabled auto-loading:
 * <ThemeProvider disableAutoFontLoading>
 *   <FontLoader />
 *   <App />
 * </ThemeProvider>
 * ```
 */
export { FontLoader } from "./FontLoader";
export type { FontLoaderProps } from "./FontLoader.types";
