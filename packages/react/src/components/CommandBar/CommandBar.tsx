"use client";

/**
 * CommandBar Component
 *
 * A command palette (Cmd+K) for quick navigation and actions.
 * Optimized for Product Mode with keyboard-first interaction.
 *
 * @example
 * ```tsx
 * <CommandBar
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   commands={[
 *     { id: 'home', label: 'Go to Home', icon: <Home />, onSelect: () => navigate('/') }
 *   ]}
 * />
 * ```
 */

import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Search, Command } from "lucide-react";
import type {
  CommandBarProps,
  CommandItem,
  CommandGroup,
} from "./CommandBar.types";
import styles from "./CommandBar.module.css";

export const CommandBar = forwardRef<HTMLDivElement, CommandBarProps>(
  (
    {
      open,
      onOpenChange,
      commands,
      recentCommands,
      onSelect,
      placeholder = "Type a command or search...",
      emptyMessage = "No results found.",
      footer,
      className,
      ...rest
    },
    ref,
  ) => {
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter commands based on search
    const filteredCommands = useMemo(() => {
      if (!search) return commands;

      const lowerSearch = search.toLowerCase();
      return commands.filter((cmd) => {
        const matchLabel = cmd.label.toLowerCase().includes(lowerSearch);
        const matchDescription = cmd.description
          ?.toLowerCase()
          .includes(lowerSearch);
        const matchKeywords = cmd.keywords?.some((k) =>
          k.toLowerCase().includes(lowerSearch),
        );
        return matchLabel || matchDescription || matchKeywords;
      });
    }, [commands, search]);

    // Group commands by category
    const groupedCommands = useMemo(() => {
      const groups: CommandGroup[] = [];
      const uncategorized: CommandItem[] = [];

      filteredCommands.forEach((cmd) => {
        if (cmd.category) {
          const existing = groups.find((g) => g.title === cmd.category);
          if (existing) {
            existing.commands.push(cmd);
          } else {
            groups.push({ title: cmd.category, commands: [cmd] });
          }
        } else {
          uncategorized.push(cmd);
        }
      });

      if (uncategorized.length > 0) {
        groups.unshift({ title: "", commands: uncategorized });
      }

      return groups;
    }, [filteredCommands]);

    // Flat list for keyboard navigation
    const flatList = useMemo(() => {
      const items: CommandItem[] = [];
      if (recentCommands && recentCommands.length > 0 && !search) {
        items.push(...recentCommands);
      }
      groupedCommands.forEach((group) => {
        items.push(...group.commands);
      });
      return items;
    }, [groupedCommands, recentCommands, search]);

    // Reset state when opening
    useEffect(() => {
      if (open) {
        setSearch("");
        setSelectedIndex(0);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIndex((i) => Math.min(i + 1, flatList.length - 1));
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedIndex((i) => Math.max(i - 1, 0));
            break;
          case "Enter": {
            e.preventDefault();
            const selected = flatList[selectedIndex];
            if (selected && !selected.disabled) {
              handleSelect(selected);
            }
            break;
          }
          case "Escape":
            e.preventDefault();
            onOpenChange(false);
            break;
        }
      },
      [flatList, selectedIndex, onOpenChange],
    );

    // Handle command selection
    const handleSelect = (command: CommandItem) => {
      onSelect?.(command);
      command.onSelect();
      onOpenChange(false);
    };

    // Scroll selected item into view
    useEffect(() => {
      const list = listRef.current;
      if (!list) return;

      const selectedEl = list.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }, [selectedIndex]);

    // Global keyboard shortcut
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          onOpenChange(!open);
        }
      };

      document.addEventListener("keydown", handleGlobalKeyDown);
      return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, [open, onOpenChange]);

    if (!open) return null;

    const classNames = [styles.commandBar, className].filter(Boolean).join(" ");

    let itemIndex = 0;

    return (
      <div className={styles.overlay} onClick={() => onOpenChange(false)}>
        <div
          ref={ref}
          className={classNames}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {/* Search input */}
          <div className={styles.inputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <kbd className={styles.shortcutHint}>ESC</kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className={styles.results}>
            {flatList.length === 0 ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : (
              <>
                {/* Recent commands */}
                {recentCommands && recentCommands.length > 0 && !search && (
                  <div className={styles.group}>
                    <div className={styles.groupTitle}>Recent</div>
                    {recentCommands.map((cmd) => {
                      const index = itemIndex++;
                      return (
                        <button
                          key={`recent-${cmd.id}`}
                          type="button"
                          data-index={index}
                          className={`${styles.item} ${index === selectedIndex ? styles.itemSelected : ""} ${cmd.disabled ? styles.itemDisabled : ""}`}
                          onClick={() => !cmd.disabled && handleSelect(cmd)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          {cmd.icon && (
                            <span className={styles.itemIcon}>{cmd.icon}</span>
                          )}
                          <span className={styles.itemContent}>
                            <span className={styles.itemLabel}>
                              {cmd.label}
                            </span>
                            {cmd.description && (
                              <span className={styles.itemDescription}>
                                {cmd.description}
                              </span>
                            )}
                          </span>
                          {cmd.shortcut && (
                            <kbd className={styles.itemShortcut}>
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Grouped commands */}
                {groupedCommands.map((group) => (
                  <div
                    key={group.title || "ungrouped"}
                    className={styles.group}
                  >
                    {group.title && (
                      <div className={styles.groupTitle}>{group.title}</div>
                    )}
                    {group.commands.map((cmd) => {
                      const index = itemIndex++;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          data-index={index}
                          className={`${styles.item} ${index === selectedIndex ? styles.itemSelected : ""} ${cmd.disabled ? styles.itemDisabled : ""}`}
                          onClick={() => !cmd.disabled && handleSelect(cmd)}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          {cmd.icon && (
                            <span className={styles.itemIcon}>{cmd.icon}</span>
                          )}
                          <span className={styles.itemContent}>
                            <span className={styles.itemLabel}>
                              {cmd.label}
                            </span>
                            {cmd.description && (
                              <span className={styles.itemDescription}>
                                {cmd.description}
                              </span>
                            )}
                          </span>
                          {cmd.shortcut && (
                            <kbd className={styles.itemShortcut}>
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          {footer ? (
            <div className={styles.footer}>{footer}</div>
          ) : (
            <div className={styles.footer}>
              <span className={styles.footerHint}>
                <Command size={12} /> <span>K to toggle</span>
              </span>
              <span className={styles.footerHint}>
                <span>↑↓</span> to navigate
              </span>
              <span className={styles.footerHint}>
                <span>↵</span> to select
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

CommandBar.displayName = "CommandBar";
