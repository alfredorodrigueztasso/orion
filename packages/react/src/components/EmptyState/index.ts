/**
 * EmptyState Component - Placeholder for empty data views.
 *
 * @example
 * ```tsx
 * import { EmptyState, Button } from '@orion-ds/react';
 * import { Inbox } from 'lucide-react';
 *
 * <EmptyState
 *   icon={<Inbox size={48} />}
 *   title="No messages"
 *   description="You don't have any messages yet."
 *   action={<Button>Compose</Button>}
 * />
 * ```
 */
export { EmptyState } from "./EmptyState";
export type { EmptyStateProps, EmptyStateSize } from "./EmptyState.types";
