"use client";

/**
 * PageHeader Component
 *
 * A page header for SaaS dashboards with breadcrumbs, title, description, and actions.
 * Optimized for Product Mode with minimal visual noise and clear hierarchy.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   breadcrumbs={[
 *     { label: 'Dashboard', href: '/' },
 *     { label: 'Users' }
 *   ]}
 *   title="Users"
 *   description="Manage user accounts and permissions"
 *   actions={<Button>Add User</Button>}
 * />
 * ```
 */

import { forwardRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { PageHeaderProps } from "./PageHeader.types";
import styles from "./PageHeader.module.css";

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      title,
      description,
      breadcrumbs,
      actions,
      tabs,
      activeTab,
      onTabChange,
      backLink,
      badge,
      variant = "default",
      size = "md",
      bordered = true,
      sticky = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.pageHeader,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      bordered && styles.bordered,
      sticky && styles.sticky,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleTabClick = (tabId: string, href?: string) => {
      if (onTabChange) {
        onTabChange(tabId);
      }
      if (href) {
        window.location.href = href;
      }
    };

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Back link */}
        {backLink && (
          <div className={styles.backLink}>
            {backLink.href ? (
              <a href={backLink.href} className={styles.backLinkAnchor}>
                <ChevronLeft size={16} />
                <span>{backLink.label || "Back"}</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={backLink.onClick}
                className={styles.backLinkButton}
              >
                <ChevronLeft size={16} />
                <span>{backLink.label || "Back"}</span>
              </button>
            )}
          </div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className={styles.breadcrumbItem}>
                  {index > 0 && (
                    <ChevronRight
                      size={14}
                      className={styles.breadcrumbSeparator}
                    />
                  )}
                  {crumb.href ? (
                    <a href={crumb.href} className={styles.breadcrumbLink}>
                      {crumb.label}
                    </a>
                  ) : crumb.onClick ? (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className={styles.breadcrumbButton}
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span
                      className={styles.breadcrumbCurrent}
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Main header row */}
        <div className={styles.main}>
          <div className={styles.titleSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{title}</h1>
              {badge && <span className={styles.badge}>{badge}</span>}
            </div>
            {description && <p className={styles.description}>{description}</p>}
          </div>

          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        {/* Tabs */}
        {tabs && tabs.length > 0 && (
          <div className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={activeTab === tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                onClick={() => handleTabClick(tab.id, tab.href)}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={styles.tabBadge}>{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

PageHeader.displayName = "PageHeader";
