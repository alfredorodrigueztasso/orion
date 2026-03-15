"use client";

/**
 * Sidebar Component
 *
 * A collapsible navigation sidebar for SaaS applications.
 * Optimized for Product Mode with efficient space usage and clear hierarchy.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   sections={[
 *     {
 *       items: [
 *         { id: 'dashboard', label: 'Dashboard', icon: <Home />, href: '/' },
 *         { id: 'projects', label: 'Projects', icon: <Folder />, href: '/projects' }
 *       ]
 *     }
 *   ]}
 *   activeItem="dashboard"
 *   header={<Logo />}
 * />
 * ```
 */

import { forwardRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type {
  SidebarProps,
  SidebarItemProps,
  SidebarSectionProps,
  SidebarDividerProps,
} from "./Sidebar.types";
import styles from "./Sidebar.module.css";

// Sidebar.Divider sub-component
const SidebarDivider = forwardRef<HTMLHRElement, SidebarDividerProps>(
  ({ className, ...rest }, ref) => (
    <hr
      ref={ref}
      className={`${styles.divider} ${className || ""}`}
      {...rest}
    />
  ),
);

SidebarDivider.displayName = "Sidebar.Divider";

// Sidebar.Item sub-component
const SidebarItemComponent = forwardRef<HTMLElement, SidebarItemProps>(
  (
    { item, active = false, collapsed = false, depth = 0, className, ...rest },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const classNames = [
      styles.item,
      active && styles.itemActive,
      item.disabled && styles.itemDisabled,
      depth > 0 && styles.itemNested,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault();
        setExpanded(!expanded);
      }
      if (item.onClick && !item.disabled) {
        item.onClick();
      }
    };

    const content = (
      <>
        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
        {!collapsed && (
          <>
            <span className={styles.itemLabel}>{item.label}</span>
            {item.badge && (
              <span className={styles.itemBadge}>{item.badge}</span>
            )}
            {hasChildren && (
              <ChevronDown
                size={16}
                className={`${styles.itemChevron} ${expanded ? styles.chevronExpanded : ""}`}
              />
            )}
          </>
        )}
      </>
    );

    const Tag = item.href && !hasChildren ? "a" : "button";
    const tagProps =
      item.href && !hasChildren
        ? { href: item.href }
        : { type: "button" as const, onClick: handleClick };

    return (
      <li className={styles.itemWrapper}>
        <Tag
          ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
          className={classNames}
          aria-current={active ? "page" : undefined}
          aria-disabled={item.disabled}
          title={collapsed ? item.label : undefined}
          style={{
            paddingLeft:
              !collapsed && depth > 0
                ? `calc(var(--spacing-3) + ${depth * 12}px)`
                : undefined,
          }}
          {...tagProps}
          {...rest}
        >
          {content}
        </Tag>
        {hasChildren && expanded && !collapsed && (
          <ul className={styles.subItems}>
            {item.children!.map((child) => (
              <SidebarItemComponent
                key={child.id}
                item={child}
                active={false}
                collapsed={collapsed}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  },
);

SidebarItemComponent.displayName = "Sidebar.Item";

// Sidebar.Section sub-component
const SidebarSectionComponent = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ section, activeItem, collapsed = false, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        {section.title && !collapsed && (
          <div className={styles.sectionTitle}>{section.title}</div>
        )}
        <ul className={styles.sectionItems}>
          {section.items.map((item) => (
            <SidebarItemComponent
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </div>
    );
  },
);

SidebarSectionComponent.displayName = "Sidebar.Section";

// Main Sidebar component
const SidebarBase = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      sections,
      activeItem,
      collapsed = false,
      onCollapsedChange,
      header,
      footer,
      variant = "default",
      width = 240,
      collapsedWidth = 64,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.sidebar,
      styles[`variant-${variant}`],
      collapsed && styles.collapsed,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const sidebarStyle = {
      ...style,
      "--sidebar-width": `${collapsed ? collapsedWidth : width}px`,
    } as React.CSSProperties;

    const handleToggle = () => {
      if (onCollapsedChange) {
        onCollapsedChange(!collapsed);
      }
    };

    return (
      <nav ref={ref} className={classNames} style={sidebarStyle} {...rest}>
        {header && <div className={styles.header}>{header}</div>}

        <div className={styles.content}>
          {sections.map((section, index) => (
            <SidebarSectionComponent
              key={section.title || index}
              section={section}
              activeItem={activeItem}
              collapsed={collapsed}
            />
          ))}
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}

        {onCollapsedChange && (
          <button
            type="button"
            className={styles.collapseToggle}
            onClick={handleToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </nav>
    );
  },
);

SidebarBase.displayName = "Sidebar";

// Compose with sub-components
export const Sidebar = Object.assign(SidebarBase, {
  Item: SidebarItemComponent,
  Section: SidebarSectionComponent,
  Divider: SidebarDivider,
});
