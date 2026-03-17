/**
 * Accordion Component - Collapsible content sections.
 *
 * @example
 * ```tsx
 * import { Accordion } from '@orion-ds/react';
 *
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Section 1', content: <p>Content for section 1</p> },
 *     { id: '2', title: 'Section 2', content: <p>Content for section 2</p> },
 *     { id: '3', title: 'Section 3', content: <p>Content for section 3</p> },
 *   ]}
 *   variant="bordered"
 *   allowMultiple
 * />
 * ```
 */
export { Accordion } from "./Accordion";
export type {
  AccordionProps,
  AccordionItem,
  AccordionVariant,
  AccordionItemProps,
} from "./Accordion.types";
