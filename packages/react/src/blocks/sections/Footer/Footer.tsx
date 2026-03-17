"use client";

import React from "react";
import type { FooterProps } from "./Footer.types";
import styles from "./Footer.module.css";

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      linkGroups,
      socialLinks,
      variant = "default",
      copyright,
      className,
    },
    ref,
  ) => {
    const year = new Date().getFullYear();
    const copyrightText = copyright || `\u00A9 ${year} ${brand.name}. All rights reserved.`;

    const layoutClass =
      variant === "centered"
        ? styles.centeredLayout
        : variant === "minimal"
          ? styles.minimalLayout
          : styles.defaultLayout;

    if (variant === "minimal") {
      return (
        <footer ref={ref} className={`${styles.footer} ${className || ""}`}>
          <div className={`${styles.container} ${layoutClass}`}>
            <div className={styles.brandBlock}>
              {brand.logo}
              <h3 className={styles.brandName}>{brand.name}</h3>
            </div>
            {socialLinks && socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
            <p className={styles.copyright}>{copyrightText}</p>
          </div>
        </footer>
      );
    }

    if (variant === "centered") {
      return (
        <footer ref={ref} className={`${styles.footer} ${className || ""}`}>
          <div className={`${styles.container} ${layoutClass}`}>
            <div className={styles.brandBlock}>
              {brand.logo}
              <h3 className={styles.brandName}>{brand.name}</h3>
              {brand.description && (
                <p className={styles.brandDescription}>{brand.description}</p>
              )}
            </div>
            {linkGroups && linkGroups.length > 0 && (
              <div className={styles.linkGroupsRow}>
                {linkGroups.map((group) => (
                  <div key={group.title} className={styles.linkGroup}>
                    <h4 className={styles.linkGroupTitle}>{group.title}</h4>
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={styles.link}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
            <p className={styles.copyright}>{copyrightText}</p>
          </div>
        </footer>
      );
    }

    // Default variant
    return (
      <footer ref={ref} className={`${styles.footer} ${className || ""}`}>
        <div className={styles.container}>
          <div className={layoutClass}>
            <div className={styles.brandBlock}>
              {brand.logo}
              <h3 className={styles.brandName}>{brand.name}</h3>
              {brand.description && (
                <p className={styles.brandDescription}>{brand.description}</p>
              )}
            </div>
            {linkGroups?.map((group) => (
              <div key={group.title} className={styles.linkGroup}>
                <h4 className={styles.linkGroupTitle}>{group.title}</h4>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={styles.link}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.bottom}>
            <p className={styles.copyright}>{copyrightText}</p>
            {socialLinks && socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
