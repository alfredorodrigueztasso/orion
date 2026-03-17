/**
 * Section Component
 *
 * A semantic section wrapper that provides consistent vertical spacing and backgrounds.
 * Part of the Orion Sections library for building complete page layouts.
 *
 * @example
 * ```tsx
 * <Section spacing="lg" background="subtle">
 *   <Container>
 *     <h2>Section Title</h2>
 *     <p>Section content</p>
 *   </Container>
 * </Section>
 * ```
 */

import { forwardRef, createElement } from "react";
import type { SectionProps } from "./Section.types";
import styles from "./Section.module.css";

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as = "section",
      spacing = "lg",
      background = "none",
      borderTop = false,
      borderBottom = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.section,
      styles[`spacing-${spacing}`],
      styles[`bg-${background}`],
      borderTop && styles.borderTop,
      borderBottom && styles.borderBottom,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return createElement(
      as,
      {
        ref,
        className: classNames,
        ...rest,
      },
      children,
    );
  },
);

Section.displayName = "Section";
