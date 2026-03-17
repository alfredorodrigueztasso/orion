/**
 * Toast Component - Temporary notification messages.
 *
 * @example
 * ```tsx
 * import { ToastProvider, useToast, Button } from '@orion-ds/react';
 *
 * // Wrap app with ToastProvider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Use in any component
 * function MyComponent() {
 *   const { toast } = useToast();
 *
 *   return (
 *     <Button onClick={() => toast({ title: 'Saved!', variant: 'success' })}>
 *       Save
 *     </Button>
 *   );
 * }
 * ```
 */
export { ToastProvider, useToast } from "./Toast";
export type {
  Toast,
  ToastOptions,
  ToastVariant,
  ToastPosition,
  ToastProviderProps,
  ToastContextValue,
} from "./Toast.types";
