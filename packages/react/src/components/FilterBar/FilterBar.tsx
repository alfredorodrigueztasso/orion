"use client";

/**
 * FilterBar Component
 *
 * Horizontal filter controls with chips for SaaS dashboards.
 * Optimized for Product Mode with efficient filtering interactions.
 *
 * @example
 * ```tsx
 * <FilterBar
 *   filters={[
 *     { key: 'status', label: 'Status', type: 'select', options: statusOptions }
 *   ]}
 *   activeFilters={activeFilters}
 *   onFilterChange={handleFilterChange}
 *   onFilterRemove={handleFilterRemove}
 * />
 * ```
 */

import { forwardRef, useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, Filter, Calendar } from "lucide-react";
import type {
  FilterBarProps,
  FilterDefinition,
  FilterOption,
} from "./FilterBar.types";
import styles from "./FilterBar.module.css";

// Filter dropdown component
const FilterDropdown = ({
  filter,
  onSelect,
  onClose,
}: {
  filter: FilterDefinition;
  onSelect: (value: string | string[]) => void;
  onClose: () => void;
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleOptionClick = (option: FilterOption) => {
    if (filter.type === "multi-select") {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value];
      setSelectedValues(newValues);
    } else {
      onSelect(option.value);
      onClose();
    }
  };

  const handleApply = () => {
    if (selectedValues.length > 0) {
      onSelect(selectedValues);
    }
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      {filter.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.dropdownItem} ${selectedValues.includes(option.value) ? styles.dropdownItemSelected : ""}`}
          onClick={() => handleOptionClick(option)}
        >
          {filter.type === "multi-select" && (
            <span className={styles.checkbox}>
              {selectedValues.includes(option.value) && "✓"}
            </span>
          )}
          <span>{option.label}</span>
          {option.count !== undefined && (
            <span className={styles.optionCount}>{option.count}</span>
          )}
        </button>
      ))}
      {filter.type === "multi-select" && (
        <div className={styles.dropdownFooter}>
          <button
            type="button"
            className={styles.dropdownCancel}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.dropdownApply}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      activeFilters,
      onFilterChange,
      onFilterRemove,
      onClearAll,
      searchable = false,
      searchValue = "",
      onSearchChange,
      searchPlaceholder = "Search...",
      showCount = true,
      compact = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpenFilter(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFilterSelect = (key: string, value: string | string[]) => {
      onFilterChange(key, value);
    };

    const classNames = [styles.filterBar, compact && styles.compact, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Search */}
        {searchable && (
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}

        {/* Filter triggers */}
        <div className={styles.filters} ref={dropdownRef}>
          {filters.map((filter) => {
            const isActive = activeFilters.some((af) => af.key === filter.key);
            const isOpen = openFilter === filter.key;

            return (
              <div key={filter.key} className={styles.filterWrapper}>
                <button
                  type="button"
                  className={`${styles.filterTrigger} ${isActive ? styles.filterActive : ""}`}
                  onClick={() => setOpenFilter(isOpen ? null : filter.key)}
                >
                  {filter.icon ||
                    (filter.type.includes("date") ? (
                      <Calendar size={14} />
                    ) : (
                      <Filter size={14} />
                    ))}
                  <span>{filter.label}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  />
                </button>

                {isOpen && filter.type !== "text" && (
                  <FilterDropdown
                    filter={filter}
                    onSelect={(value) => handleFilterSelect(filter.key, value)}
                    onClose={() => setOpenFilter(null)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            {activeFilters.map((af) => (
              <span key={af.key} className={styles.chip}>
                <span className={styles.chipLabel}>{af.label}</span>
                <button
                  type="button"
                  className={styles.chipRemove}
                  onClick={() => onFilterRemove(af.key)}
                  aria-label={`Remove ${af.label} filter`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {onClearAll && activeFilters.length > 1 && (
              <button
                type="button"
                className={styles.clearAll}
                onClick={onClearAll}
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Filter count */}
        {showCount && activeFilters.length > 0 && (
          <span className={styles.count}>
            {activeFilters.length} filter{activeFilters.length !== 1 ? "s" : ""}{" "}
            active
          </span>
        )}
      </div>
    );
  },
);

FilterBar.displayName = "FilterBar";
