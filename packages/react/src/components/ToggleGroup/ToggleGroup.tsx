"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useContext,
  useRef,
  createContext,
} from "react";
import type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupContextValue,
} from "./ToggleGroup.types";
import styles from "./ToggleGroup.module.css";

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext(): ToggleGroupContextValue {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) {
    throw new Error("ToggleGroup.Item must be used within a ToggleGroup");
  }
  return ctx;
}

const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, disabled: itemDisabled, className, children, ...rest }, ref) => {
    const {
      type: _type,
      value: groupValue,
      onItemToggle,
      variant: _variant,
      size: _size,
      disabled: groupDisabled,
    } = useToggleGroupContext();
    const isPressed = groupValue.includes(value);
    const isDisabled = itemDisabled || groupDisabled;

    const classNames = [styles.item, isPressed && styles.itemPressed, className]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        aria-pressed={isPressed}
        disabled={isDisabled}
        onClick={() => onItemToggle(value)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

ToggleGroupItem.displayName = "ToggleGroup.Item";

const ToggleGroupRoot = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type,
      value,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "md",
      disabled = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const normalizeValue = (v: string | string[] | undefined): string[] => {
      if (v === undefined) return [];
      return Array.isArray(v) ? v : [v];
    };

    const [internalValue, setInternalValue] = useState<string[]>(
      normalizeValue(defaultValue),
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? normalizeValue(value) : internalValue;

    const groupRef = useRef<HTMLDivElement>(null);

    const handleItemToggle = useCallback(
      (itemValue: string) => {
        let next: string[];
        if (currentValue.includes(itemValue)) {
          next = currentValue.filter((v) => v !== itemValue);
        } else if (type === "multiple") {
          next = [...currentValue, itemValue];
        } else {
          next = [itemValue];
        }

        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(type === "single" ? (next[0] ?? "") : next);
      },
      [currentValue, type, isControlled, onValueChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const container = groupRef.current;
        if (!container) return;

        const items = Array.from(
          container.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)",
          ),
        );
        const currentIndex = items.indexOf(e.target as HTMLButtonElement);
        if (currentIndex === -1) return;

        let nextIndex: number | undefined;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % items.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + items.length) % items.length;
        } else if (e.key === "Home") {
          nextIndex = 0;
        } else if (e.key === "End") {
          nextIndex = items.length - 1;
        }

        if (nextIndex !== undefined) {
          e.preventDefault();
          items[nextIndex]?.focus();
        }
      },
      [],
    );

    const classNames = [styles.group, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(" ");

    const ctx: ToggleGroupContextValue = {
      type,
      value: currentValue,
      onItemToggle: handleItemToggle,
      variant,
      size,
      disabled,
    };

    return (
      <ToggleGroupContext.Provider value={ctx}>
        <div
          ref={(node) => {
            (
              groupRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
          }}
          role="group"
          className={classNames}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);

ToggleGroupRoot.displayName = "ToggleGroup";

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
