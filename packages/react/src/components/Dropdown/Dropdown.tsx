"use client";

/**
 * Dropdown Component
 *
 * A menu that appears below a trigger element.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: handleEdit },
 *     { id: 'delete', label: 'Delete', danger: true, onClick: handleDelete },
 *   ]}
 * />
 * ```
 */

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
  isValidElement,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import type {
  DropdownProps,
  DropdownItem,
  DropdownPlacement,
  DropdownMenuItemProps,
} from "./Dropdown.types";
import styles from "./Dropdown.module.css";

/**
 * Calculate dropdown position
 */
const calculatePosition = (
  triggerRect: DOMRect,
  menuRect: DOMRect,
  placement: DropdownPlacement,
): { top: number; left: number } => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const offset = 4;

  let top = 0;
  let left = 0;

  switch (placement) {
    case "bottom-start":
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.left + scrollX;
      break;
    case "bottom":
      top = triggerRect.bottom + scrollY + offset;
      left =
        triggerRect.left + scrollX + (triggerRect.width - menuRect.width) / 2;
      break;
    case "bottom-end":
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.right + scrollX - menuRect.width;
      break;
    case "top-start":
      top = triggerRect.top + scrollY - menuRect.height - offset;
      left = triggerRect.left + scrollX;
      break;
    case "top":
      top = triggerRect.top + scrollY - menuRect.height - offset;
      left =
        triggerRect.left + scrollX + (triggerRect.width - menuRect.width) / 2;
      break;
    case "top-end":
      top = triggerRect.top + scrollY - menuRect.height - offset;
      left = triggerRect.right + scrollX - menuRect.width;
      break;
  }

  return { top, left };
};

/**
 * Menu Item Component
 */
const MenuItem = ({
  item,
  onSelect,
  onNavigate,
}: DropdownMenuItemProps & {
  onNavigate?: (direction: "up" | "down") => void;
}) => {
  const handleClick = () => {
    if (!item.disabled) {
      item.onClick?.();
      onSelect();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onNavigate?.("down");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onNavigate?.("up");
    }
  };

  const itemClasses = [
    styles.item,
    item.disabled && styles.disabled,
    item.danger && styles.danger,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClasses}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item.icon && (
        <span className={styles.icon} aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className={styles.label}>{item.label}</span>
      {item.shortcut && (
        <span className={styles.shortcut} aria-hidden="true">
          {item.shortcut}
        </span>
      )}
    </div>
  );
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items = [],
      groups = [],
      placement = "bottom-start",
      open: controlledOpen,
      onOpenChange,
      onSelect,
      minWidth = 180,
      closeOnSelect = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    // Expose the trigger element via ref
    useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Flatten all items for navigation
    const allItemsFlat = (groups.length > 0 ? groups : [{ items }])
      .flatMap((group) => group.items)
      .filter((item) => !item.disabled);

    const setIsOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
        if (!newOpen) {
          setFocusedIndex(-1);
        }
      },
      [isControlled, onOpenChange],
    );

    // Update position when open
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !menuRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const newPosition = calculatePosition(triggerRect, menuRect, placement);
      setPosition(newPosition);
    }, [placement]);

    useEffect(() => {
      if (isOpen) {
        requestAnimationFrame(updatePosition);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        // Focus first item when menu opens
        requestAnimationFrame(() => {
          const firstItem = itemRefs.current.get(0);
          if (firstItem) {
            firstItem.focus();
            setFocusedIndex(0);
          }
        });

        return () => {
          window.removeEventListener("resize", updatePosition);
          window.removeEventListener("scroll", updatePosition, true);
        };
      }
    }, [isOpen, updatePosition]);

    // Handle click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          menuRef.current &&
          !menuRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setIsOpen]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, setIsOpen]);

    const handleToggle = useCallback(() => {
      setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleItemSelect = useCallback(
      (item: DropdownItem) => {
        onSelect?.(item);
        if (closeOnSelect) {
          setIsOpen(false);
        }
      },
      [closeOnSelect, onSelect, setIsOpen],
    );

    // Handle keyboard navigation
    const handleNavigate = useCallback(
      (direction: "up" | "down") => {
        const totalItems = allItemsFlat.length;
        if (totalItems === 0) return;

        let newIndex: number;
        if (direction === "down") {
          newIndex = focusedIndex < totalItems - 1 ? focusedIndex + 1 : 0;
        } else {
          newIndex = focusedIndex > 0 ? focusedIndex - 1 : totalItems - 1;
        }

        setFocusedIndex(newIndex);
        const itemElement = itemRefs.current.get(newIndex);
        itemElement?.focus();
      },
      [focusedIndex, allItemsFlat.length],
    );

    // Clone trigger with props
    const triggerElement = isValidElement(trigger)
      ? cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
          onClick: handleToggle,
          "aria-expanded": isOpen,
          "aria-haspopup": "menu",
        })
      : trigger;

    // Determine all items to render
    const allItems = groups.length > 0 ? groups : [{ items }];

    const menuClasses = [styles.menu, isOpen && styles.visible, className]
      .filter(Boolean)
      .join(" ");

    // Track flat index for ref assignment
    let flatIndex = 0;

    const menuElement = (
      <div
        ref={menuRef}
        className={menuClasses}
        style={{
          top: position.top,
          left: position.left,
          minWidth,
        }}
        role="menu"
        aria-orientation="vertical"
        {...rest}
      >
        {allItems.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.group}>
            {group.label && (
              <div className={styles.groupLabel}>{group.label}</div>
            )}
            {group.items.map((item) => {
              const currentIndex = flatIndex;
              if (!item.disabled) {
                flatIndex++;
              }
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el && !item.disabled) {
                      itemRefs.current.set(currentIndex, el);
                    }
                  }}
                >
                  <MenuItem
                    item={item}
                    onSelect={() => handleItemSelect(item)}
                    onNavigate={handleNavigate}
                  />
                </div>
              );
            })}
            {groupIndex < allItems.length - 1 && (
              <div className={styles.separator} role="separator" />
            )}
          </div>
        ))}
      </div>
    );

    return (
      <>
        <div ref={triggerRef} className={styles.trigger}>
          {triggerElement}
        </div>
        {isOpen && createPortal(menuElement, document.body)}
      </>
    );
  },
);

Dropdown.displayName = "Dropdown";
