import React from "react";
import type { HeroHighlightProps } from "./Hero.types";
import styles from "./Hero.module.css";

export const HeroHighlight: React.FC<HeroHighlightProps> = ({
  children,
  className,
}) => {
  return (
    <span className={`${styles.highlight} ${className || ""}`}>
      {children}
    </span>
  );
};

HeroHighlight.displayName = "HeroHighlight";
