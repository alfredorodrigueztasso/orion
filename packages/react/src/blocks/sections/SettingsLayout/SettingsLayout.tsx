"use client";

/**
 * SettingsLayout Component
 *
 * A layout for settings pages with navigation sidebar.
 * Optimized for Product Mode with clear navigation and content separation.
 *
 * @example
 * ```tsx
 * <SettingsLayout
 *   navigation={[
 *     { items: [{ id: 'profile', label: 'Profile', icon: <User /> }] }
 *   ]}
 *   activeSection="profile"
 *   onNavigate={setActiveSection}
 * >
 *   <ProfileSettings />
 * </SettingsLayout>
 * ```
 */

import { forwardRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type {
  SettingsLayoutProps,
  SettingsNavItem,
} from "./SettingsLayout.types";
import styles from "./SettingsLayout.module.css";

export const SettingsLayout = forwardRef<HTMLDivElement, SettingsLayoutProps>(
  (
    {
      navigation,
      activeSection,
      onNavigate,
      children,
      title,
      description,
      headerActions,
      navWidth = 240,
      stickyNav = true,
      mobileNav = true,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const handleNavClick = (item: SettingsNavItem) => {
      if (!item.disabled) {
        onNavigate(item.id);
        setMobileNavOpen(false);
      }
    };

    const classNames = [styles.settingsLayout, className]
      .filter(Boolean)
      .join(" ");

    const layoutStyle = {
      ...style,
      "--nav-width": `${navWidth}px`,
    } as React.CSSProperties;

    return (
      <div ref={ref} className={classNames} style={layoutStyle} {...rest}>
        {/* Header */}
        {(title || mobileNav) && (
          <header className={styles.header}>
            <div className={styles.headerContent}>
              {mobileNav && (
                <button
                  type="button"
                  className={styles.mobileNavToggle}
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  aria-label="Toggle navigation"
                >
                  {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
              <div className={styles.headerText}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {description && (
                  <p className={styles.description}>{description}</p>
                )}
              </div>
            </div>
            {headerActions && (
              <div className={styles.headerActions}>{headerActions}</div>
            )}
          </header>
        )}

        <div className={styles.body}>
          {/* Navigation */}
          <nav
            className={`${styles.nav} ${stickyNav ? styles.navSticky : ""} ${mobileNavOpen ? styles.navOpen : ""}`}
          >
            {navigation.map((group, groupIndex) => (
              <div key={group.title || groupIndex} className={styles.navGroup}>
                {group.title && (
                  <div className={styles.navGroupTitle}>{group.title}</div>
                )}
                <ul className={styles.navList}>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`${styles.navItem} ${activeSection === item.id ? styles.navItemActive : ""} ${item.disabled ? styles.navItemDisabled : ""}`}
                        onClick={() => handleNavClick(item)}
                        aria-current={
                          activeSection === item.id ? "page" : undefined
                        }
                      >
                        {item.icon && (
                          <span className={styles.navItemIcon}>
                            {item.icon}
                          </span>
                        )}
                        <span className={styles.navItemContent}>
                          <span className={styles.navItemLabel}>
                            {item.label}
                          </span>
                          {item.description && (
                            <span className={styles.navItemDescription}>
                              {item.description}
                            </span>
                          )}
                        </span>
                        {item.badge && (
                          <span className={styles.navItemBadge}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Overlay for mobile */}
          {mobileNavOpen && (
            <div
              className={styles.overlay}
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Content */}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    );
  },
);

SettingsLayout.displayName = "SettingsLayout";
