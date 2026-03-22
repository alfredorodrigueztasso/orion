"use client";

import React, { useState } from "react";
import type { SettingsLayoutProps } from "./SettingsLayout.types";
import styles from "./SettingsLayout.module.css";

export const SettingsLayout = React.forwardRef<
  HTMLElement,
  SettingsLayoutProps
>(
  (
    {
      title = "Settings",
      navigation,
      activeSection: activeSectionProp,
      onNavigate,
      children,
      className,
    },
    ref,
  ) => {
    const [activeSection, setActiveSection] = useState(
      activeSectionProp || navigation[0]?.items[0]?.id || "",
    );

    const handleNavigate = (sectionId: string) => {
      setActiveSection(sectionId);
      onNavigate?.(sectionId);
    };

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>{title}</h2>
          {navigation.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <p className={styles.navGroupTitle}>{group.title}</p>
              {group.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    className={`${styles.navItem} ${
                      isActive ? styles.navItemActive : ""
                    }`}
                    onClick={() => handleNavigate(item.id)}
                    type="button"
                  >
                    <span
                      className={`${styles.navItemLabel} ${
                        isActive ? styles.navItemActiveLabel : ""
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.description && (
                      <span className={styles.navItemDescription}>
                        {item.description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>
        <main className={styles.main}>{children}</main>
      </section>
    );
  },
);

SettingsLayout.displayName = "SettingsLayout";
