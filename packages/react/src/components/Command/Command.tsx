"use client";

/**
 * Command Component
 *
 * A searchable command palette with keyboard navigation.
 * Built without cmdk — uses internal context for search state and filtering.
 *
 * @example
 * ```tsx
 * <Command>
 *   <Command.Input placeholder="Type a command..." />
 *   <Command.List>
 *     <Command.Empty>No results found.</Command.Empty>
 *     <Command.Group heading="Suggestions">
 *       <Command.Item onSelect={() => navigate('/calendar')}>
 *         <CalendarIcon size={16} /> Calendar
 *         <Command.Shortcut>⌘C</Command.Shortcut>
 *       </Command.Item>
 *     </Command.Group>
 *   </Command.List>
 * </Command>
 * ```
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { Divider } from "../Divider";
import type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from "./Command.types";
import styles from "./Command.module.css";

// ============================================================================
// CONTEXT
// ============================================================================

interface CommandContextValue {
  search: string;
  setSearch: (value: string) => void;
  filter: (value: string, search: string) => number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerItem: (id: string, value: string) => void;
  unregisterItem: (id: string) => void;
  items: Map<string, string>;
  getVisibleItems: () => string[];
  listId: string;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext(): CommandContextValue {
  const ctx = useContext(CommandContext);
  if (!ctx)
    throw new Error(
      "Command compound components must be used within <Command>",
    );
  return ctx;
}

const defaultFilter = (value: string, search: string): number => {
  if (!search) return 1;
  return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
};

// ============================================================================
// COMMAND ROOT
// ============================================================================

export const Command: React.FC<CommandProps> & {
  Input: React.FC<CommandInputProps>;
  List: React.FC<CommandListProps>;
  Empty: React.FC<CommandEmptyProps>;
  Group: React.FC<CommandGroupProps>;
  Item: React.FC<CommandItemProps>;
  Separator: React.FC<CommandSeparatorProps>;
  Shortcut: React.FC<CommandShortcutProps>;
  Dialog: React.FC<CommandDialogProps>;
} = ({
  value,
  onValueChange,
  filter = defaultFilter,
  children,
  className,
  ...rest
}) => {
  const [internalSearch, setInternalSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef(new Map<string, string>());
  const [, forceUpdate] = useState(0);
  const listId = useId();

  const search = value !== undefined ? value : internalSearch;
  const setSearch = useCallback(
    (v: string) => {
      if (value !== undefined) {
        onValueChange?.(v);
      } else {
        setInternalSearch(v);
      }
      setActiveIndex(0);
    },
    [value, onValueChange],
  );

  const registerItem = useCallback((id: string, itemValue: string) => {
    itemsRef.current.set(id, itemValue);
    forceUpdate((n) => n + 1);
  }, []);

  const unregisterItem = useCallback((id: string) => {
    itemsRef.current.delete(id);
    forceUpdate((n) => n + 1);
  }, []);

  const getVisibleItems = useCallback(() => {
    const visible: string[] = [];
    for (const [id, val] of itemsRef.current) {
      if (filter(val, search) > 0) {
        visible.push(id);
      }
    }
    return visible;
  }, [filter, search]);

  const contextValue = useMemo<CommandContextValue>(
    () => ({
      search,
      setSearch,
      filter,
      activeIndex,
      setActiveIndex,
      registerItem,
      unregisterItem,
      items: itemsRef.current,
      getVisibleItems,
      listId,
    }),
    [
      search,
      setSearch,
      filter,
      activeIndex,
      setActiveIndex,
      registerItem,
      unregisterItem,
      getVisibleItems,
      listId,
    ],
  );

  const rootRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const visible = getVisibleItems();
      if (!visible.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % visible.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + visible.length) % visible.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeId = visible[activeIndex];
        if (activeId) {
          const el = rootRef.current?.querySelector(
            `[data-command-id="${activeId}"]`,
          ) as HTMLElement;
          el?.click();
        }
      }
    },
    [getVisibleItems, activeIndex, setActiveIndex],
  );

  const commandClasses = [styles.command, className].filter(Boolean).join(" ");

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={commandClasses}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
};

// ============================================================================
// COMMAND.INPUT
// ============================================================================

const CommandInput: React.FC<CommandInputProps> = ({ className, ...rest }) => {
  const { search, setSearch, listId } = useCommandContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const wrapperClasses = [styles.inputWrapper, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <Search size={16} className={styles.searchIcon} aria-hidden="true" />
      <input
        ref={inputRef}
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        aria-controls={listId}
        {...rest}
      />
    </div>
  );
};

CommandInput.displayName = "Command.Input";

// ============================================================================
// COMMAND.LIST
// ============================================================================

const CommandList: React.FC<CommandListProps> = ({
  children,
  className,
  ...rest
}) => {
  const { listId } = useCommandContext();
  const listClasses = [styles.list, className].filter(Boolean).join(" ");

  return (
    <div id={listId} className={listClasses} role="listbox" {...rest}>
      {children}
    </div>
  );
};

CommandList.displayName = "Command.List";

// ============================================================================
// COMMAND.EMPTY
// ============================================================================

const CommandEmpty: React.FC<CommandEmptyProps> = ({ children, className }) => {
  const { getVisibleItems } = useCommandContext();
  const visible = getVisibleItems();

  if (visible.length > 0) return null;

  const emptyClasses = [styles.empty, className].filter(Boolean).join(" ");
  return (
    <div className={emptyClasses} role="status" aria-live="polite">
      {children}
    </div>
  );
};

CommandEmpty.displayName = "Command.Empty";

// ============================================================================
// COMMAND.GROUP
// ============================================================================

const CommandGroup: React.FC<CommandGroupProps> = ({
  heading,
  children,
  className,
}) => {
  const groupClasses = [styles.group, className].filter(Boolean).join(" ");

  return (
    <div className={groupClasses} role="group" aria-label={heading}>
      {heading && <div className={styles.groupHeading}>{heading}</div>}
      {children}
    </div>
  );
};

CommandGroup.displayName = "Command.Group";

// ============================================================================
// COMMAND.ITEM
// ============================================================================

let itemIdCounter = 0;

const CommandItem: React.FC<CommandItemProps> = ({
  onSelect,
  disabled = false,
  value: valueProp,
  children,
  className,
  ...rest
}) => {
  const {
    filter,
    search,
    activeIndex,
    getVisibleItems,
    registerItem,
    unregisterItem,
  } = useCommandContext();

  const idRef = useRef<string>("");
  if (!idRef.current) {
    idRef.current = `cmd-item-${++itemIdCounter}`;
  }
  const id = idRef.current;

  // Determine the text value for filtering
  const textValue = valueProp || extractText(children);

  useEffect(() => {
    registerItem(id, textValue);
    return () => unregisterItem(id);
  }, [id, textValue, registerItem, unregisterItem]);

  const isVisible = filter(textValue, search) > 0;
  const visibleItems = getVisibleItems();
  const myIndex = visibleItems.indexOf(id);
  const isActive = myIndex === activeIndex;

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
  };

  const itemClasses = [
    styles.item,
    disabled && styles.itemDisabled,
    !isVisible && styles.itemHidden,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={itemClasses}
      data-command-id={id}
      data-active={isActive}
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </div>
  );
};

CommandItem.displayName = "Command.Item";

// ============================================================================
// COMMAND.SEPARATOR
// ============================================================================

const CommandSeparator: React.FC<CommandSeparatorProps> = ({ className }) => {
  const separatorClasses = [styles.separator, className]
    .filter(Boolean)
    .join(" ");
  return <Divider spacing="none" className={separatorClasses} />;
};

CommandSeparator.displayName = "Command.Separator";

// ============================================================================
// COMMAND.SHORTCUT
// ============================================================================

const CommandShortcut: React.FC<CommandShortcutProps> = ({
  children,
  className,
}) => {
  const shortcutClasses = [styles.shortcut, className]
    .filter(Boolean)
    .join(" ");
  return <span className={shortcutClasses}>{children}</span>;
};

CommandShortcut.displayName = "Command.Shortcut";

// ============================================================================
// COMMAND.DIALOG
// ============================================================================

const CommandDialog: React.FC<CommandDialogProps> = ({
  open,
  onOpenChange,
  children,
  className,
}) => {
  // Handle escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return createPortal(
    <div className={styles.dialogBackdrop} onClick={handleBackdropClick}>
      <div
        className={[styles.dialogContent, className].filter(Boolean).join(" ")}
      >
        <Command>{children}</Command>
      </div>
    </div>,
    document.body,
  );
};

CommandDialog.displayName = "Command.Dialog";

// ============================================================================
// ATTACH SUB-COMPONENTS
// ============================================================================

Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Separator = CommandSeparator;
Command.Shortcut = CommandShortcut;
Command.Dialog = CommandDialog;
Command.displayName = "Command";

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Extract text content from React children for filtering.
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join(" ");
  if (React.isValidElement(children) && children.props) {
    return extractText(
      (children.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}
