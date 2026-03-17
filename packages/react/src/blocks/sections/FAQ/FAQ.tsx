"use client";

import React, { useState, useCallback } from "react";
import type { FAQProps, FAQItemCardProps } from "./FAQ.types";
import { FAQItemCard } from "./FAQItemCard";
import styles from "./FAQ.module.css";

type FAQComponent = React.ForwardRefExoticComponent<
  FAQProps & React.RefAttributes<HTMLElement>
> & {
  Item: React.FC<FAQItemCardProps>;
};

export const FAQ = React.forwardRef<HTMLElement, FAQProps>(
  ({ title, description, items, allowMultiple = false, className }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const handleToggle = useCallback(
      (id: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            if (!allowMultiple) {
              next.clear();
            }
            next.add(id);
          }
          return next;
        });
      },
      [allowMultiple],
    );

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <div className={styles.container}>
          {(title || description) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={styles.list}>
            {items.map((item) => (
              <FAQItemCard
                key={item.id}
                {...item}
                isOpen={openItems.has(item.id)}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
) as FAQComponent;

FAQ.displayName = "FAQ";
FAQ.Item = FAQItemCard;
