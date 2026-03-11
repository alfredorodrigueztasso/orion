/**
 * ChatPageTemplate Component
 *
 * Full-page ChatGPT-style layout with sidebar and user menu.
 *
 * @example
 * ```tsx
 * <ChatPageTemplate
 *   conversations={conversations}
 *   activeConversationId={activeId}
 *   messages={messages}
 *   onSendMessage={handleSend}
 *   onSelectConversation={handleSelect}
 *   onNewConversation={handleNew}
 *   user={{ name: 'John', avatar: '...' }}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Menu, LogOut, Settings, User } from "lucide-react";
import { Chat, useStreamingText } from "@orion-ds/react";
import type {
  ChatPageTemplateProps,
  ChatMessage as ChatMessageType,
} from "./ChatPageTemplate.types";
import styles from "./Chat.module.css";

/**
 * Internal wrapper that progressively reveals message content word-by-word.
 * Used automatically for messages with `isStreaming: true`.
 */
function StreamingChatMessage({ message }: { message: ChatMessageType }) {
  const { displayText, isComplete } = useStreamingText(message.content);

  return (
    <Chat.Message
      role={message.role}
      content={displayText}
      timestamp={message.timestamp}
      status={message.status}
      attachments={message.attachments}
      isStreaming={!isComplete}
    />
  );
}

export const ChatPageTemplate = forwardRef<
  HTMLDivElement,
  ChatPageTemplateProps
>(
  (
    {
      // Sidebar props
      conversations = [],
      activeConversationId,
      onSelectConversation,
      onNewConversation,
      onDeleteConversation,
      // Chat props
      messages = [],
      onSendMessage,
      isTyping = false,
      isLoading = false,
      // Header props
      user,
      onLogout,
      // Customization
      logo,
      inputConfig,
      className,
      ...rest
    },
    ref,
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSend = useCallback(
      (message: string, attachments?: File[]) => {
        onSendMessage?.(message, attachments);
      },
      [onSendMessage],
    );

    return (
      <div
        ref={ref}
        className={[styles.pageTemplate, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Sidebar with user footer */}
        <Chat.Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onNewConversation={onNewConversation}
          onDeleteConversation={onDeleteConversation}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          header={
            <div className={styles.pageTemplateSidebarHeader}>
              {/* Logo */}
              <div className={styles.pageTemplateSidebarHeaderLogo}>
                {logo || (
                  <span className={styles.pageTemplateSidebarHeaderLogoText}>
                    AI Chat
                  </span>
                )}
              </div>
              {/* Mobile close */}
              <button
                className={[styles.inputButton, styles.sidebarCloseButton].join(
                  " ",
                )}
                onClick={() => setSidebarCollapsed(true)}
                aria-label="Close sidebar"
              >
                <Menu size={20} />
              </button>
            </div>
          }
          footer={
            user && (
              <div style={{ position: "relative" }}>
                <button
                  className={[
                    styles.pageTemplateUserButton,
                    showUserMenu && styles.pageTemplateUserButtonActive,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-expanded={showUserMenu}
                  aria-haspopup="menu"
                >
                  {/* User avatar */}
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={styles.pageTemplateUserAvatar}
                    />
                  ) : (
                    <div className={styles.pageTemplateUserAvatarFallback}>
                      <User size={18} />
                    </div>
                  )}
                  <span className={styles.pageTemplateUserName}>
                    {user.name}
                  </span>
                </button>

                {/* User menu dropdown */}
                {showUserMenu && (
                  <div className={styles.pageTemplateUserMenu} role="menu">
                    <button
                      className={styles.pageTemplateMenuItem}
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to settings
                      }}
                      role="menuitem"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    {onLogout && (
                      <button
                        className={[
                          styles.pageTemplateMenuItem,
                          styles.pageTemplateMenuItemDanger,
                        ].join(" ")}
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        role="menuitem"
                      >
                        <LogOut size={16} />
                        Sign out
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          }
        />

        {/* Main chat area */}
        <div className={styles.sectionMain}>
          <Chat>
            {/* Header with mobile menu */}
            <Chat.Header
              title={
                conversations?.find((c) => c.id === activeConversationId)
                  ?.title || "New Chat"
              }
              actions={
                <button
                  className={[
                    styles.inputButton,
                    styles.sectionMobileMenuButton,
                  ].join(" ")}
                  onClick={() => setSidebarCollapsed(false)}
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </button>
              }
            />

            {/* Messages */}
            <Chat.Messages>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <Chat.Markdown content="✨" />
                  </div>
                  <div>
                    <h3 className={styles.emptyStateTitle}>
                      How can I help you today?
                    </h3>
                    <p className={styles.emptyStateText}>
                      Start a conversation by typing a message below.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg: ChatMessageType) =>
                  msg.isStreaming ? (
                    <StreamingChatMessage key={msg.id} message={msg} />
                  ) : (
                    <Chat.Message
                      key={msg.id}
                      role={msg.role}
                      content={msg.content}
                      timestamp={msg.timestamp}
                      status={msg.status}
                      attachments={msg.attachments}
                    />
                  ),
                )
              )}
              {isTyping && <Chat.TypingIndicator />}
            </Chat.Messages>

            {/* Input */}
            <Chat.Input
              onSend={handleSend}
              placeholder={inputConfig?.placeholder || "Message AI..."}
              allowAttachments={inputConfig?.allowAttachments ?? true}
              allowVoiceRecording={inputConfig?.allowVoiceRecording ?? true}
              maxLength={inputConfig?.maxLength}
              isLoading={isLoading}
            />
          </Chat>
        </div>

        {/* Click outside to close user menu */}
        {showUserMenu && (
          <div
            className={styles.pageTemplateMenuOverlay}
            onClick={() => setShowUserMenu(false)}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

ChatPageTemplate.displayName = "ChatPageTemplate";
