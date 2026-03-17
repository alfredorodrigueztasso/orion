"use client";

/**
 * ChatPageTemplate
 *
 * Full-featured chat interface with message history, participants, and input controls.
 * Designed for both one-on-one and group chat scenarios.
 *
 * @example
 * ```tsx
 * <ChatPageTemplate
 *   title="Support Chat"
 *   messages={messages}
 *   onSendMessage={handleSend}
 *   participants={participants}
 * />
 * ```
 */

import { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@orion-ds/react";
import { Send, Paperclip, Smile } from "lucide-react";
import type { ChatPageTemplateProps } from "./ChatPageTemplate.types";
import styles from "./ChatPageTemplate.module.css";

export const ChatPageTemplate = forwardRef<
  HTMLDivElement,
  ChatPageTemplateProps
>(
  (
    {
      title = "Chat",
      messages = [],
      inputPlaceholder = "Type a message...",
      onSendMessage,
      participants = [],
      selectedParticipantId,
      onSelectParticipant,
      isTyping = false,
      isLoading = false,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = useCallback(() => {
      if (input.trim()) {
        onSendMessage?.(input.trim());
        setInput("");
      }
    }, [input, onSendMessage]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      },
      [handleSend],
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Sidebar with participants */}
        {participants.length > 0 && (
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Participants</h3>
            <div className={styles.participantsList}>
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={[
                    styles.participant,
                    selectedParticipantId === participant.id &&
                      styles.participantActive,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onSelectParticipant?.(participant.id)}
                >
                  {participant.avatar && (
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className={styles.participantAvatar}
                    />
                  )}
                  <div className={styles.participantInfo}>
                    <div className={styles.participantName}>
                      {participant.name}
                    </div>
                    {participant.status && (
                      <div
                        className={[
                          styles.participantStatus,
                          styles[`status${participant.status}`],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {participant.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main chat area */}
        <div className={styles.mainArea}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {error && <div className={styles.errorBadge}>{error}</div>}
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>💬</div>
                <h3 className={styles.emptyStateTitle}>No messages yet</h3>
                <p className={styles.emptyStateText}>
                  Start the conversation by sending a message
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={[
                      styles.messageWrapper,
                      styles[`message${message.role}`],
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className={styles.messageBubble}>
                      <p className={styles.messageContent}>{message.content}</p>
                      {message.timestamp && (
                        <span className={styles.messageTime}>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    {message.status && (
                      <span
                        className={[
                          styles.messageStatus,
                          styles[`status${message.status}`],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        title={message.status}
                      >
                        {message.status === "sending" && "⏱"}
                        {message.status === "sent" && "✓"}
                        {message.status === "error" && "✗"}
                      </span>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div
                    className={[
                      styles.messageWrapper,
                      styles.messageAssistant,
                    ].join(" ")}
                  >
                    <div className={styles.messageBubble}>
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={styles.inputArea}>
            <div className={styles.inputGroup}>
              <button
                className={styles.actionButton}
                aria-label="Attach file"
                disabled={isLoading}
              >
                <Paperclip size={20} />
              </button>

              <textarea
                className={styles.input}
                placeholder={inputPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
              />

              <button
                className={styles.actionButton}
                aria-label="Add emoji"
                disabled={isLoading}
              >
                <Smile size={20} />
              </button>

              <Button
                variant="primary"
                iconOnly
                icon={<Send size={20} />}
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                isLoading={isLoading}
                aria-label="Send message"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ChatPageTemplate.displayName = "ChatPageTemplate";
export default ChatPageTemplate;
