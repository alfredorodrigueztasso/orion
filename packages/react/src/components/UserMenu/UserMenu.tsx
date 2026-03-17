"use client";

/**
 * UserMenu Component
 *
 * A dropdown profile menu for SaaS applications.
 * Optimized for Product Mode with efficient user account management.
 *
 * @example
 * ```tsx
 * <UserMenu
 *   user={{ name: 'John Doe', email: 'john@example.com' }}
 *   sections={[
 *     { id: 'account', items: [{ id: 'profile', label: 'Profile' }] }
 *   ]}
 * />
 * ```
 */

import { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { UserMenuProps, UserMenuItem } from "./UserMenu.types";
import styles from "./UserMenu.module.css";

// Status indicator colors
const statusColors: Record<string, string> = {
  online: "var(--text-success)",
  away: "var(--text-warning)",
  busy: "var(--text-error)",
  offline: "var(--text-tertiary)",
};

export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
  (
    {
      user,
      sections,
      open: controlledOpen,
      onOpenChange,
      trigger,
      align = "end",
      placement = "bottom",
      showHeader = true,
      compact = false,
      fullWidth = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const setOpen = (value: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    const handleItemClick = (item: UserMenuItem) => {
      if (item.disabled) return;
      item.onClick?.();
      setOpen(false);
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const classNames = [
      styles.userMenu,
      fullWidth && styles.userMenuFullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    const triggerClasses = [styles.trigger, compact && styles.triggerCompact]
      .filter(Boolean)
      .join(" ");
    const dropdownClasses = [
      styles.dropdown,
      isOpen && styles.dropdownOpen,
      align === "start" && styles.dropdownStart,
      placement === "top" && styles.dropdownTop,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Trigger */}
        {trigger ? (
          <div onClick={() => setOpen(!isOpen)}>{trigger}</div>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            className={triggerClasses}
            onClick={() => setOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <div className={styles.avatar}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarInitials}>
                  {user.initials || getInitials(user.name)}
                </span>
              )}
              {user.status && (
                <span
                  className={styles.statusIndicator}
                  style={{ backgroundColor: statusColors[user.status] }}
                />
              )}
            </div>
            {!compact && (
              <>
                <div className={styles.triggerInfo}>
                  <span className={styles.triggerName}>{user.name}</span>
                  {user.role && (
                    <span className={styles.triggerRole}>{user.role}</span>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                />
              </>
            )}
          </button>
        )}

        {/* Dropdown */}
        <div ref={menuRef} className={dropdownClasses} role="menu">
          {showHeader && (
            <div className={styles.header}>
              <div className={styles.headerAvatar}>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={styles.avatarImage}
                  />
                ) : (
                  <span className={styles.avatarInitials}>
                    {user.initials || getInitials(user.name)}
                  </span>
                )}
              </div>
              <div className={styles.headerInfo}>
                <span className={styles.headerName}>{user.name}</span>
                {user.email && (
                  <span className={styles.headerEmail}>{user.email}</span>
                )}
              </div>
            </div>
          )}

          {sections.map((section, sectionIndex) => (
            <div key={section.id} className={styles.section}>
              {section.label && (
                <div className={styles.sectionLabel}>{section.label}</div>
              )}
              {section.items.map((item) => {
                const itemClasses = [
                  styles.item,
                  item.danger && styles.itemDanger,
                  item.disabled && styles.itemDisabled,
                ]
                  .filter(Boolean)
                  .join(" ");

                if (item.href && !item.disabled) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={itemClasses}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      {item.icon && (
                        <span className={styles.itemIcon}>{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={styles.itemBadge}>{item.badge}</span>
                      )}
                      {item.shortcut && (
                        <span className={styles.itemShortcut}>
                          {item.shortcut}
                        </span>
                      )}
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={itemClasses}
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.icon && (
                      <span className={styles.itemIcon}>{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={styles.itemBadge}>{item.badge}</span>
                    )}
                    {item.shortcut && (
                      <span className={styles.itemShortcut}>
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
              {sectionIndex < sections.length - 1 && (
                <div className={styles.divider} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

UserMenu.displayName = "UserMenu";
