"use client";

/**
 * Combobox Component
 *
 * An autocomplete input with searchable dropdown options.
 *
 * @example
 * ```tsx
 * <Combobox
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Select a framework..."
 * />
 * ```
 */

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X, Check, Loader2 } from "lucide-react";
import type { ComboboxProps, ComboboxOption } from "./Combobox.types";
import styles from "./Combobox.module.css";

// Default filter function
const defaultFilter = (option: ComboboxOption, inputValue: string): boolean => {
  const searchTerm = inputValue.toLowerCase().trim();
  if (!searchTerm) return true;

  return (
    option.label.toLowerCase().includes(searchTerm) ||
    option.value.toLowerCase().includes(searchTerm) ||
    (option.description?.toLowerCase().includes(searchTerm) ?? false)
  );
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      onInputChange,
      size = "md",
      label,
      helperText,
      error,
      loading = false,
      clearable = true,
      allowFreeInput = false,
      filterFn = defaultFilter,
      openOnFocus = true,
      minChars = 0,
      emptyText = "No results found",
      renderOption,
      maxHeight = 300,
      fullWidth = false,
      placeholder,
      disabled,
      className,
      id: providedId,
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const listboxId = `${inputId}-listbox`;

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });

    // Find the selected option
    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value) ?? null,
      [options, value],
    );

    // Sync input value with selection
    useEffect(() => {
      if (selectedOption) {
        setInputValue(selectedOption.label);
      } else if (!allowFreeInput) {
        setInputValue("");
      }
    }, [selectedOption, allowFreeInput]);

    // Filter options based on input
    const filteredOptions = useMemo(() => {
      if (inputValue.length < minChars) return [];
      return options.filter((opt) => filterFn(opt, inputValue));
    }, [options, inputValue, minChars, filterFn]);

    // Update dropdown position
    const updatePosition = useCallback(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }, []);

    useEffect(() => {
      if (isOpen) {
        updatePosition();
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
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
        ) {
          setIsOpen(false);
          // Reset input if no selection
          if (!allowFreeInput && !value) {
            setInputValue("");
          } else if (selectedOption) {
            setInputValue(selectedOption.label);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, allowFreeInput, value, selectedOption]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setHighlightedIndex(-1);
        onInputChange?.(newValue);

        if (!isOpen && newValue.length >= minChars) {
          setIsOpen(true);
        }

        // Clear selection if input doesn't match and not allowing free input
        if (
          selectedOption &&
          newValue !== selectedOption.label &&
          !allowFreeInput
        ) {
          onChange?.(null, null);
        }
      },
      [
        isOpen,
        minChars,
        onInputChange,
        selectedOption,
        allowFreeInput,
        onChange,
      ],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (openOnFocus && !disabled) {
          setIsOpen(true);
        }
        onFocus?.(e);
      },
      [openOnFocus, disabled, onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Don't close immediately to allow click on options
        setTimeout(() => {
          if (!dropdownRef.current?.contains(document.activeElement)) {
            setIsOpen(false);
            if (!allowFreeInput && !value) {
              setInputValue("");
            } else if (selectedOption) {
              setInputValue(selectedOption.label);
            }
          }
        }, 200);
        onBlur?.(e);
      },
      [allowFreeInput, value, selectedOption, onBlur],
    );

    const selectOption = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;

        onChange?.(option.value, option);
        setInputValue(option.label);
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.focus();
      },
      [onChange],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(null, null);
        setInputValue("");
        inputRef.current?.focus();
      },
      [onChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else {
              setHighlightedIndex((prev) =>
                Math.min(prev + 1, filteredOptions.length - 1),
              );
            }
            break;

          case "ArrowUp":
            e.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            break;

          case "Enter":
            e.preventDefault();
            if (
              isOpen &&
              highlightedIndex >= 0 &&
              filteredOptions[highlightedIndex]
            ) {
              selectOption(filteredOptions[highlightedIndex]);
            }
            break;

          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            if (selectedOption) {
              setInputValue(selectedOption.label);
            } else {
              setInputValue("");
            }
            break;

          case "Tab":
            setIsOpen(false);
            break;
        }

        onKeyDown?.(e);
      },
      [
        isOpen,
        highlightedIndex,
        filteredOptions,
        selectOption,
        selectedOption,
        onKeyDown,
      ],
    );

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && dropdownRef.current) {
        const options = dropdownRef.current.querySelectorAll('[role="option"]');
        options[highlightedIndex]?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const containerClasses = [
      styles.container,
      styles[size],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    const renderOptionContent = (option: ComboboxOption, index: number) => {
      const isSelected = option.value === value;
      const isHighlighted = index === highlightedIndex;

      if (renderOption) {
        return renderOption(option, isSelected, isHighlighted);
      }

      return (
        <>
          {option.icon && (
            <span className={styles.optionIcon} aria-hidden="true">
              {option.icon}
            </span>
          )}
          <div className={styles.optionContent}>
            <span className={styles.optionLabel}>{option.label}</span>
            {option.description && (
              <span className={styles.optionDescription}>
                {option.description}
              </span>
            )}
          </div>
          {isSelected && (
            <Check
              size={iconSize}
              className={styles.checkIcon}
              aria-hidden="true"
            />
          )}
        </>
      );
    };

    const dropdownContent = (
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${isOpen && styles.visible}`}
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
          maxHeight,
        }}
        role="listbox"
        id={listboxId}
        aria-label={label || placeholder}
      >
        {loading ? (
          <div className={styles.loading}>
            <Loader2 size={iconSize} className={styles.spinner} />
            <span>Loading...</span>
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className={styles.empty}>{emptyText}</div>
        ) : (
          filteredOptions.map((option, index) => {
            const isHighlighted = index === highlightedIndex;
            const isSelected = option.value === value;

            return (
              <div
                key={option.value}
                className={[
                  styles.option,
                  isHighlighted && styles.highlighted,
                  isSelected && styles.selected,
                  option.disabled && styles.disabled,
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {renderOptionContent(option, index)}
              </div>
            );
          })
        )}
      </div>
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          className={styles.inputWrapper}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            {...rest}
            ref={(node) => {
              // Handle both refs
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              (
                inputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = node;
            }}
            id={inputId}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
          />

          <div className={styles.actions}>
            {clearable && value && !disabled && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Clear selection"
                tabIndex={-1}
              >
                <X size={iconSize} />
              </button>
            )}
            <span
              className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
              aria-hidden="true"
            >
              <ChevronDown size={iconSize} />
            </span>
          </div>
        </div>

        {(helperText || error) && (
          <span className={error ? styles.errorText : styles.helperText}>
            {error || helperText}
          </span>
        )}

        {isOpen && createPortal(dropdownContent, document.body)}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
