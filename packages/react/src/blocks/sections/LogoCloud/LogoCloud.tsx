"use client";

import { forwardRef } from "react";
import type { LogoCloudProps } from "./LogoCloud.types";
import styles from "./LogoCloud.module.css";

export const LogoCloud = forwardRef<HTMLElement, LogoCloudProps>(
  ({ title, logos, className, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          {title && <p className={styles.title}>{title}</p>}
          <div className={styles.logos}>
            {logos.map((item) => (
              <div key={item.name} className={styles.logoItem}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={styles.logoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    {item.logo}
                  </a>
                ) : (
                  item.logo
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

LogoCloud.displayName = "LogoCloud";
