"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useContext,
  useId,
  createContext,
  cloneElement,
  isValidElement,
} from "react";
import type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleContextValue,
} from "./Collapsible.types";
import styles from "./Collapsible.module.css";

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(): CollapsibleContextValue {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      "Collapsible.Trigger/Content must be used within a Collapsible",
    );
  }
  return ctx;
}

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ asChild, className, children, onClick, ...rest }, ref) => {
  const { open, disabled, toggle, contentId, triggerId } =
    useCollapsibleContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      toggle();
      onClick?.(e);
    },
    [toggle, onClick],
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      {
        id: triggerId,
        "aria-expanded": open,
        "aria-controls": contentId,
        disabled,
        onClick: handleClick,
      },
    );
  }

  const classNames = [styles.trigger, className].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      className={classNames}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
});

CollapsibleTrigger.displayName = "Collapsible.Trigger";

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ forceMount, className, children, ...rest }, ref) => {
    const { open, triggerId, contentId } = useCollapsibleContext();

    if (!forceMount && !open) {
      return null;
    }

    const contentClasses = [
      styles.content,
      open && styles.contentOpen,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={contentClasses}
        {...rest}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    );
  },
);

CollapsibleContent.displayName = "Collapsible.Content";

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const contentId = useId();
    const triggerId = useId();

    const toggle = useCallback(() => {
      if (disabled) return;
      const next = !isOpen;
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    }, [isOpen, isControlled, disabled, onOpenChange]);

    const classNames = [styles.collapsible, className]
      .filter(Boolean)
      .join(" ");

    const ctx: CollapsibleContextValue = {
      open: isOpen,
      disabled,
      toggle,
      contentId,
      triggerId,
    };

    return (
      <CollapsibleContext.Provider value={ctx}>
        <div
          ref={ref}
          className={classNames}
          data-state={isOpen ? "open" : "closed"}
          {...rest}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

CollapsibleRoot.displayName = "Collapsible";

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
