"use client";

/**
 * Popover Component
 *
 * A floating panel anchored to a trigger element.
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={<Button>Click me</Button>}
 *   content={<div>Popover content here</div>}
 *   placement="bottom-start"
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
import type { PopoverProps, PopoverPlacement } from "./Popover.types";
import styles from "./Popover.module.css";

/**
 * Calculate popover position
 */
const calculatePosition = (
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  placement: PopoverPlacement,
  offset: number,
): { top: number; left: number } => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let top = 0;
  let left = 0;

  // Base positions
  const positions = {
    top: triggerRect.top + scrollY - popoverRect.height - offset,
    bottom: triggerRect.bottom + scrollY + offset,
    left: triggerRect.left + scrollX - popoverRect.width - offset,
    right: triggerRect.right + scrollX + offset,
    centerX:
      triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2,
    centerY:
      triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2,
    startX: triggerRect.left + scrollX,
    endX: triggerRect.right + scrollX - popoverRect.width,
    startY: triggerRect.top + scrollY,
    endY: triggerRect.bottom + scrollY - popoverRect.height,
  };

  switch (placement) {
    case "top":
      top = positions.top;
      left = positions.centerX;
      break;
    case "top-start":
      top = positions.top;
      left = positions.startX;
      break;
    case "top-end":
      top = positions.top;
      left = positions.endX;
      break;
    case "bottom":
      top = positions.bottom;
      left = positions.centerX;
      break;
    case "bottom-start":
      top = positions.bottom;
      left = positions.startX;
      break;
    case "bottom-end":
      top = positions.bottom;
      left = positions.endX;
      break;
    case "left":
      top = positions.centerY;
      left = positions.left;
      break;
    case "left-start":
      top = positions.startY;
      left = positions.left;
      break;
    case "left-end":
      top = positions.endY;
      left = positions.left;
      break;
    case "right":
      top = positions.centerY;
      left = positions.right;
      break;
    case "right-start":
      top = positions.startY;
      left = positions.right;
      break;
    case "right-end":
      top = positions.endY;
      left = positions.right;
      break;
  }

  return { top, left };
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      content,
      placement = "bottom",
      triggerType = "click",
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      showArrow = true,
      offset = 8,
      closeOnClickOutside = true,
      closeOnEscape = true,
      openDelay = 0,
      closeDelay = 150,
      fullWidth = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Expose the trigger element via ref
    useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setIsOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange],
    );

    // Update position when open
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const newPosition = calculatePosition(
        triggerRect,
        popoverRect,
        placement,
        offset,
      );
      setPosition(newPosition);
    }, [placement, offset]);

    useEffect(() => {
      if (isOpen) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(updatePosition);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
          window.removeEventListener("resize", updatePosition);
          window.removeEventListener("scroll", updatePosition, true);
        };
      }
    }, [isOpen, updatePosition]);

    // Handle click outside
    useEffect(() => {
      if (!isOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          popoverRef.current &&
          !popoverRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeOnClickOutside, setIsOpen]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, setIsOpen]);

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      };
    }, []);

    // Trigger handlers
    const handleOpen = useCallback(() => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openDelay > 0) {
        openTimeoutRef.current = setTimeout(() => setIsOpen(true), openDelay);
      } else {
        setIsOpen(true);
      }
    }, [openDelay, setIsOpen]);

    const handleClose = useCallback(() => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeDelay > 0) {
        closeTimeoutRef.current = setTimeout(
          () => setIsOpen(false),
          closeDelay,
        );
      } else {
        setIsOpen(false);
      }
    }, [closeDelay, setIsOpen]);

    const handleToggle = useCallback(() => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleOpen, handleClose]);

    // Build trigger props based on trigger type
    const getTriggerProps = () => {
      const baseProps: Record<string, unknown> = {
        "aria-expanded": isOpen,
        "aria-haspopup": true,
      };

      switch (triggerType) {
        case "click":
          return { ...baseProps, onClick: handleToggle };
        case "hover":
          return {
            ...baseProps,
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          };
        case "focus":
          return {
            ...baseProps,
            onFocus: handleOpen,
            onBlur: handleClose,
          };
        case "manual":
          return baseProps;
        default:
          return baseProps;
      }
    };

    // Clone trigger with props
    const triggerElement = isValidElement(trigger)
      ? cloneElement(
          trigger as React.ReactElement<Record<string, unknown>>,
          getTriggerProps(),
        )
      : trigger;

    // Get arrow direction based on placement
    const getArrowPlacement = () => {
      if (placement.startsWith("top")) return "bottom";
      if (placement.startsWith("bottom")) return "top";
      if (placement.startsWith("left")) return "right";
      if (placement.startsWith("right")) return "left";
      return "top";
    };

    const popoverClasses = [styles.popover, isOpen && styles.visible, className]
      .filter(Boolean)
      .join(" ");

    const popoverElement = (
      <div
        ref={popoverRef}
        className={popoverClasses}
        style={{
          top: position.top,
          left: position.left,
        }}
        role="dialog"
        aria-modal="false"
        onMouseEnter={triggerType === "hover" ? handleOpen : undefined}
        onMouseLeave={triggerType === "hover" ? handleClose : undefined}
        {...rest}
      >
        {showArrow && (
          <div
            className={`${styles.arrow} ${styles[`arrow-${getArrowPlacement()}`]}`}
            aria-hidden="true"
          />
        )}
        <div className={styles.content}>{content}</div>
      </div>
    );

    const triggerClasses = [
      styles.trigger,
      fullWidth && styles.triggerFullWidth,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <div ref={triggerRef} className={triggerClasses}>
          {triggerElement}
        </div>
        {isOpen && createPortal(popoverElement, document.body)}
      </>
    );
  },
);

Popover.displayName = "Popover";
