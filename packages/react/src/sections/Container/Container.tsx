/**
 * Container Component
 *
 * A layout wrapper that constrains content to a maximum width with consistent padding.
 * Part of the Orion Sections library for building complete page layouts.
 *
 * @example
 * ```tsx
 * <Container size="lg">
 *   <h1>Page Title</h1>
 *   <p>Content goes here</p>
 * </Container>
 * ```
 */

import { forwardRef } from "react";
import type { ContainerProps } from "./Container.types";
import styles from "./Container.module.css";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "lg",
      centered = true,
      padded = true,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.container,
      styles[size],
      centered && styles.centered,
      padded && styles.padded,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
