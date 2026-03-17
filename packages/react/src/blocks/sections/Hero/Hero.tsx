"use client";

import React from "react";
import type { HeroProps, HeroHighlightProps } from "./Hero.types";
import { HeroHighlight } from "./HeroHighlight";
import styles from "./Hero.module.css";

type HeroComponent = React.ForwardRefExoticComponent<
  HeroProps & React.RefAttributes<HTMLElement>
> & {
  Highlight: React.FC<HeroHighlightProps>;
};

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      title,
      description,
      primaryAction,
      secondaryAction,
      align = "center",
      size = "md",
      className,
    },
    ref,
  ) => {
    const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";
    const alignClass = align === "left" ? styles.left : "";

    return (
      <section
        ref={ref}
        className={`${styles.section} ${sizeClass} ${alignClass} ${className || ""}`}
      >
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
      </section>
    );
  },
) as HeroComponent;

Hero.displayName = "Hero";
Hero.Highlight = HeroHighlight;
