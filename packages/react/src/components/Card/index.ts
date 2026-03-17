/**
 * Card Component - Container for grouping related content.
 *
 * @example
 * ```tsx
 * import { Card, Button } from '@orion-ds/react';
 *
 * <Card variant="elevated">
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>Card content goes here.</Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
export { Card } from "./Card";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardVariant,
} from "./Card.types";
