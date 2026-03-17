"use client";

import { forwardRef } from "react";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import styles from "./Breadcrumbs.module.css";

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator = "/", className, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          <nav className={styles.nav} aria-label="Breadcrumb">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <span key={item.id}>
                  {index > 0 && (
                    <span className={styles.separator} aria-hidden="true">
                      {" "}
                      {separator}{" "}
                    </span>
                  )}
                  {isLast || !item.href ? (
                    <span
                      className={styles.current}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a href={item.href} className={styles.link}>
                      {item.label}
                    </a>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      </section>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";
