/**
 * SearchInput Component
 *
 * An input field optimized for search with icon and clear button.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={(e) => setQuery(e.target.value)}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */

import { forwardRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import type { SearchInputProps } from "./SearchInput.types";
import styles from "./SearchInput.module.css";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      size = "md",
      value,
      onClear,
      onSearch,
      showClear = true,
      showSearchButton = false,
      searchIcon,
      clearLabel = "Clear search",
      searchLabel = "Search",
      loading = false,
      fullWidth = false,
      disabled = false,
      className,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const hasValue = value !== undefined && value !== "";

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSearch) {
          onSearch(e.currentTarget.value);
        }
        onKeyDown?.(e);
      },
      [onSearch, onKeyDown],
    );

    const handleClear = useCallback(() => {
      onClear?.();
    }, [onClear]);

    const handleSearchClick = useCallback(() => {
      if (onSearch && typeof value === "string") {
        onSearch(value);
      }
    }, [onSearch, value]);

    const containerClasses = [
      styles.container,
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Size-specific class for input padding (CSS Modules requires flat classes)
    const sizeClassMap = { sm: "Sm", md: "Md", lg: "Lg", xl: "Xl" } as const;
    const sizeKey = sizeClassMap[size];

    const inputClasses = [styles.input, styles[`input${sizeKey}`]].join(" ");

    const searchIconClasses = [
      styles.searchIcon,
      styles[`searchIcon${sizeKey}`],
    ].join(" ");

    const clearButtonClasses = [
      styles.clearButton,
      styles[`clearButton${sizeKey}`],
    ].join(" ");

    const iconSize =
      size === "sm" ? 16 : size === "lg" ? 22 : size === "xl" ? 26 : 18;

    return (
      <div className={containerClasses}>
        <span className={searchIconClasses} aria-hidden="true">
          {loading ? (
            <Loader2 size={iconSize} className={styles.spinner} />
          ) : (
            searchIcon || <Search size={iconSize} />
          )}
        </span>

        <input
          ref={ref}
          type="search"
          className={inputClasses}
          value={value}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {showClear && hasValue && !loading && (
          <button
            type="button"
            className={clearButtonClasses}
            onClick={handleClear}
            aria-label={clearLabel}
          >
            <X size={iconSize - 2} />
          </button>
        )}

        {showSearchButton && (
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearchClick}
            aria-label={searchLabel}
            disabled={loading}
          >
            <Search size={iconSize} />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
