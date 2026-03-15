"use client";

import { forwardRef, useState, useCallback } from "react";
import type { ToggleProps } from "./Toggle.types";
import styles from "./Toggle.module.css";

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed,
      defaultPressed = false,
      onPressedChange,
      variant = "default",
      size = "md",
      disabled,
      className,
      children,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isPressed = isControlled ? pressed : internalPressed;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const next = !isPressed;
        if (!isControlled) {
          setInternalPressed(next);
        }
        onPressedChange?.(next);
        onClick?.(e);
      },
      [isPressed, isControlled, onPressedChange, onClick],
    );

    const classNames = [
      styles.toggle,
      styles[variant],
      styles[size],
      isPressed && styles.pressed,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        aria-pressed={isPressed}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Toggle.displayName = "Toggle";
