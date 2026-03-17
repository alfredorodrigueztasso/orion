"use client";

/**
 * ChatSidebar Component
 *
 * Sidebar with conversation history, search, and management actions.
 * Conversations are grouped by date (Today, Yesterday, Previous 7 days, etc.)
 */

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Plus, Search, Trash2, MessageSquare, X } from "lucide-react";
import type { ChatSidebarProps, ChatConversation } from "../Chat.types";
import styles from "../Chat.module.css";

// Date grouping types
type DateGroup = "today" | "yesterday" | "previous7" | "previous30" | "older";

const groupLabels: Record<DateGroup, string> = {
  today: "Today",
  yesterday: "Yesterday",
  previous7: "Previous 7 days",
  previous30: "Previous 30 days",
  older: "Older",
};

// Order of date groups for rendering
const groupOrder: DateGroup[] = [
  "today",
  "yesterday",
  "previous7",
  "previous30",
  "older",
];

// Get the date group for a given date
const getDateGroup = (date: Date): DateGroup => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const diff =
    startOfToday.getTime() -
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days < 1) return "today";
  if (days < 2) return "yesterday";
  if (days < 7) return "previous7";
  if (days < 30) return "previous30";
  return "older";
};

// Format date for display (shown on individual items)
const formatDate = (date: Date): string => {
  const group = getDateGroup(date);

  if (group === "today") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } else if (group === "yesterday") {
    return "Yesterday";
  } else if (group === "previous7") {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
  } else {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }
};

// Group conversations by date
const groupConversationsByDate = (
  conversations: ChatConversation[],
): Map<DateGroup, ChatConversation[]> => {
  const groups = new Map<DateGroup, ChatConversation[]>();

  // Initialize all groups
  groupOrder.forEach((group) => groups.set(group, []));

  // Sort and group conversations
  conversations.forEach((conv) => {
    const group = getDateGroup(conv.updatedAt);
    groups.get(group)?.push(conv);
  });

  return groups;
};

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onSearch,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  className,
  ...rest
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Clear confirm timer on unmount
  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) {
        clearTimeout(confirmTimerRef.current);
      }
    };
  }, []);

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(query) ||
        conv.preview?.toLowerCase().includes(query),
    );
  }, [conversations, searchQuery]);

  // Group filtered conversations by date
  const groupedConversations = useMemo(() => {
    return groupConversationsByDate(filteredConversations);
  }, [filteredConversations]);

  // Handle search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  // Handle conversation selection
  const handleSelectConversation = useCallback(
    (id: string) => {
      onSelectConversation?.(id);
      // Close sidebar on mobile after selection
      if (collapsed && onCollapsedChange) {
        onCollapsedChange(true);
      }
    },
    [onSelectConversation, collapsed, onCollapsedChange],
  );

  // Handle delete with inline confirmation
  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();

      if (confirmDeleteId === id) {
        // Second click: actually delete
        onDeleteConversation?.(id);
        setConfirmDeleteId(null);
        if (confirmTimerRef.current) {
          clearTimeout(confirmTimerRef.current);
        }
      } else {
        // First click: show confirmation
        setConfirmDeleteId(id);
        // Auto-reset after 3 seconds
        if (confirmTimerRef.current) {
          clearTimeout(confirmTimerRef.current);
        }
        confirmTimerRef.current = setTimeout(() => {
          setConfirmDeleteId(null);
        }, 3000);
      }
    },
    [confirmDeleteId, onDeleteConversation],
  );

  // Check if there are any conversations to show
  const hasConversations = groupOrder.some(
    (group) => (groupedConversations.get(group)?.length ?? 0) > 0,
  );

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => onCollapsedChange?.(true)}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          styles.sidebar,
          collapsed && styles.sidebarCollapsed,
          !collapsed && styles.sidebarOpen,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Header */}
        <div className={styles.sidebarHeader}>
          {header || (
            <>
              <button
                className={[
                  styles.inputButton,
                  styles.inputButtonPrimary,
                  styles.sidebarNewButton,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={onNewConversation}
                aria-label="New conversation"
              >
                <span className={styles.sidebarNewButtonInner}>
                  <Plus size={18} />
                  <span>New Chat</span>
                </span>
              </button>

              {/* Mobile close button */}
              <button
                className={[styles.inputButton, styles.sidebarCloseButton].join(
                  " ",
                )}
                onClick={() => onCollapsedChange?.(true)}
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </>
          )}
        </div>

        {/* Search */}
        <div className={styles.sidebarSearch}>
          <div className={styles.sidebarSearchWrapper}>
            <Search size={16} className={styles.sidebarSearchIcon} />
            <input
              type="search"
              className={[
                styles.sidebarSearchInput,
                styles.sidebarSearchInputWithIcon,
              ].join(" ")}
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* Conversation list with date grouping */}
        <div
          className={styles.sidebarList}
          role="list"
          aria-label="Conversations"
        >
          {!hasConversations ? (
            <div className={styles.sidebarEmpty}>
              <MessageSquare size={32} className={styles.sidebarEmptyIcon} />
              <p>
                {searchQuery
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>
            </div>
          ) : (
            groupOrder.map((group) => {
              const groupConvs = groupedConversations.get(group) ?? [];
              if (groupConvs.length === 0) return null;

              return (
                <div key={group}>
                  <div className={styles.sidebarGroupHeader}>
                    {groupLabels[group]}
                  </div>
                  {groupConvs.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={[
                        styles.sidebarItem,
                        conversation.id === activeConversationId &&
                          styles.sidebarItemActive,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleSelectConversation(conversation.id)}
                      role="listitem"
                      aria-selected={conversation.id === activeConversationId}
                      aria-label={`Conversation: ${conversation.title}`}
                    >
                      <MessageSquare
                        size={18}
                        className={styles.sidebarItemIcon}
                      />

                      <div className={styles.sidebarItemContent}>
                        <span className={styles.sidebarItemTitle}>
                          {conversation.title}
                        </span>
                        {conversation.preview && (
                          <span className={styles.sidebarItemPreview}>
                            {conversation.preview}
                          </span>
                        )}
                      </div>

                      <span className={styles.sidebarItemDate}>
                        {formatDate(conversation.updatedAt)}
                      </span>

                      {onDeleteConversation && (
                        <button
                          className={styles.sidebarItemDelete}
                          onClick={(e) => handleDelete(e, conversation.id)}
                          aria-label={
                            confirmDeleteId === conversation.id
                              ? `Confirm delete ${conversation.title}`
                              : `Delete ${conversation.title}`
                          }
                        >
                          {confirmDeleteId === conversation.id ? (
                            <span className={styles.sidebarItemDeleteConfirm}>
                              Delete?
                            </span>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {footer && <div className={styles.sidebarFooter}>{footer}</div>}
      </aside>
    </>
  );
};

ChatSidebar.displayName = "ChatSidebar";
