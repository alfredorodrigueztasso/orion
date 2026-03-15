"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useContext,
  useRef,
  useEffect,
  createContext,
} from "react";
import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
  InputOTPContextValue,
} from "./InputOTP.types";
import styles from "./InputOTP.module.css";

const InputOTPContext = createContext<InputOTPContextValue | null>(null);

function useInputOTPContext(): InputOTPContextValue {
  const ctx = useContext(InputOTPContext);
  if (!ctx) {
    throw new Error(
      "InputOTP.Slot/Group/Separator must be used within an InputOTP",
    );
  }
  return ctx;
}

const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, children, ...rest }, ref) => {
    const classNames = [styles.group, className].filter(Boolean).join(" ");
    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  },
);

InputOTPGroup.displayName = "InputOTP.Group";

const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...rest }, ref) => {
    const {
      value,
      activeIndex,
      size: _size,
      disabled,
      isFocused,
      focusInput,
    } = useInputOTPContext();
    const char = value[index];
    const isActive = isFocused && index === activeIndex;
    const isFilled = char !== undefined && char !== "";

    const classNames = [
      styles.slot,
      isActive && styles.slotActive,
      isFilled && styles.slotFilled,
      disabled && styles.slotDisabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} onClick={focusInput} {...rest}>
        {isFilled ? char : isActive ? <span className={styles.caret} /> : null}
      </div>
    );
  },
);

InputOTPSlot.displayName = "InputOTP.Slot";

const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, children, ...rest }, ref) => {
    const classNames = [styles.separator, className].filter(Boolean).join(" ");
    return (
      <div ref={ref} className={classNames} role="separator" {...rest}>
        {children ?? <span aria-hidden="true">&ndash;</span>}
      </div>
    );
  },
);

InputOTPSeparator.displayName = "InputOTP.Separator";

const InputOTPRoot = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      maxLength,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      type = "numeric",
      size = "md",
      disabled = false,
      autoFocus = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const activeIndex = Math.min(currentValue.length, maxLength - 1);

    const pattern = type === "numeric" ? "[0-9]" : "[a-zA-Z0-9]";
    const regex = type === "numeric" ? /[^0-9]/g : /[^a-zA-Z0-9]/g;

    useEffect(() => {
      if (autoFocus) {
        inputRef.current?.focus();
      }
    }, [autoFocus]);

    const updateValue = useCallback(
      (newValue: string) => {
        const filtered = newValue.replace(regex, "").slice(0, maxLength);
        if (!isControlled) {
          setInternalValue(filtered);
        }
        onChange?.(filtered);
        if (filtered.length === maxLength) {
          onComplete?.(filtered);
        }
      },
      [maxLength, regex, isControlled, onChange, onComplete],
    );

    const handleInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.value);
      },
      [updateValue],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && currentValue.length === 0) {
          e.preventDefault();
        }
      },
      [currentValue],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text/plain");
        updateValue(pasted);
      },
      [updateValue],
    );

    const focusInput = useCallback(() => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    }, [disabled]);

    const classNames = [styles.root, styles[size], className]
      .filter(Boolean)
      .join(" ");

    const ctx: InputOTPContextValue = {
      value: currentValue,
      activeIndex,
      size,
      disabled,
      isFocused,
      focusInput,
    };

    return (
      <InputOTPContext.Provider value={ctx}>
        <div
          ref={ref}
          className={classNames}
          onClick={focusInput}
          data-otp-container
          {...rest}
        >
          <input
            ref={inputRef}
            className={styles.hiddenInput}
            type="text"
            inputMode={type === "numeric" ? "numeric" : "text"}
            pattern={`${pattern}*`}
            maxLength={maxLength}
            value={currentValue}
            disabled={disabled}
            autoComplete="one-time-code"
            aria-label={`OTP input, ${maxLength} digits`}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
          />
          {children}
        </div>
      </InputOTPContext.Provider>
    );
  },
);

InputOTPRoot.displayName = "InputOTP";

export const InputOTP = Object.assign(InputOTPRoot, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});
