"use client";

import { forwardRef } from "react";
import type { ContactProps } from "./Contact.types";
import styles from "./Contact.module.css";

export const Contact = forwardRef<HTMLElement, ContactProps>(
  ({ title, description, contactInfo, className, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>

          {contactInfo && contactInfo.length > 0 && (
            <div className={styles.infoGrid}>
              {contactInfo.map((info) => (
                <div key={info.label} className={styles.infoCard}>
                  <p className={styles.infoLabel}>{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className={styles.infoLink}>
                      {info.value}
                    </a>
                  ) : (
                    <p className={styles.infoValue}>{info.value}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);

Contact.displayName = "Contact";
