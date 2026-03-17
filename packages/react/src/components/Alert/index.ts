/**
 * Alert Component - System messages and notifications.
 *
 * @example
 * ```tsx
 * import { Alert } from '@orion-ds/react';
 *
 * <Alert variant="info" title="Info">This is an informational alert.</Alert>
 * <Alert variant="success" title="Success">Operation completed.</Alert>
 * <Alert variant="warning" title="Warning">Please review.</Alert>
 * <Alert variant="error" title="Error" onClose={() => {}}>Something went wrong.</Alert>
 * ```
 */
export { Alert } from "./Alert";
export type { AlertProps, AlertVariant } from "./Alert.types";
