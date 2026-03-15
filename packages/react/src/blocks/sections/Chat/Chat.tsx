"use client";

/**
 * ChatSection Component
 *
 * Pre-built chat section with optional sidebar for conversation history.
 * Combines Chat component with Sidebar for a complete chat experience.
 *
 * @example
 * ```tsx
 * <ChatSection
 *   conversations={conversations}
 *   activeConversationId={activeId}
 *   messages={messages}
 *   onSendMessage={handleSend}
 *   onSelectConversation={handleSelect}
 *   onNewConversation={handleNew}
 *   isTyping={isTyping}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Menu, MessageSquare } from "lucide-react";
import { Chat, useStreamingText } from "@/components/Chat";
import type {
  ChatSectionProps,
  ChatMessage as ChatMessageType,
} from "@orion-ds/react";
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

export const ChatSection = forwardRef<HTMLDivElement, ChatSectionProps>(
  (
    {
      conversations = [],
      activeConversationId,
      messages = [],
      onSendMessage,
      onSelectConversation,
      onNewConversation,
      onDeleteConversation,
      isTyping = false,
      isLoading = false,
      header,
      inputConfig,
      hideSidebar = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const handleSend = useCallback(
      (message: string, attachments?: File[]) => {
        onSendMessage?.(message, attachments);
      },
      [onSendMessage],
    );

    return (
      <div
        ref={ref}
        className={[styles.section, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Sidebar */}
        {!hideSidebar && (
          <Chat.Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={onSelectConversation}
            onNewConversation={onNewConversation}
            onDeleteConversation={onDeleteConversation}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />
        )}

        {/* Main chat area */}
        <div className={styles.sectionMain}>
          <Chat>
            {/* Header */}
            <Chat.Header
              title={header?.title || "AI Assistant"}
              subtitle={header?.subtitle}
              avatar={header?.avatar}
              actions={
                <>
                  {/* Mobile menu button */}
                  {!hideSidebar && (
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
                  )}
                  {header?.actions}
                </>
              }
            />

            {/* Messages */}
            <Chat.Messages>
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <MessageSquare size={28} />
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
              placeholder={inputConfig?.placeholder || "Type a message..."}
              allowAttachments={inputConfig?.allowAttachments ?? true}
              allowVoiceRecording={inputConfig?.allowVoiceRecording ?? true}
              maxLength={inputConfig?.maxLength}
              isLoading={isLoading}
            />
          </Chat>
        </div>
      </div>
    );
  },
);

ChatSection.displayName = "ChatSection";
