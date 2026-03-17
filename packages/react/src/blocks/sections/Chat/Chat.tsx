"use client";

import React, { useState } from "react";
import type { ChatSectionProps } from "./Chat.types";
import styles from "./Chat.module.css";

export const ChatSection = React.forwardRef<HTMLElement, ChatSectionProps>(
  (
    {
      messages: messagesProp = [],
      conversations,
      activeConversationId: activeIdProp,
      onConversationSelect,
      onSendMessage,
      placeholder = "Type a message...",
      className,
    },
    ref
  ) => {
  const [messages, setMessages] = useState(messagesProp);
  const [activeConversationId, setActiveConversationId] = useState(
    activeIdProp || conversations?.[0]?.id || ""
  );
  const [inputValue, setInputValue] = useState("");

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    onConversationSelect?.(id);
  };

  const handleSend = () => {
    const content = inputValue.trim();
    if (!content) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    onSendMessage?.(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasSidebar = conversations && conversations.length > 0;

  return (
    <section ref={ref} className={`${styles.section} ${className || ""}`}>
      {hasSidebar && (
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Conversations</div>
          <div className={styles.conversationList}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`${styles.conversationItem} ${
                  activeConversationId === conv.id
                    ? styles.conversationItemActive
                    : ""
                }`}
                onClick={() => handleConversationSelect(conv.id)}
                type="button"
              >
                <span className={styles.conversationTitle}>{conv.title}</span>
              </button>
            ))}
          </div>
        </aside>
      )}

      <div className={styles.main}>
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.role === "user"
                  ? styles.messageUser
                  : msg.role === "assistant"
                    ? styles.messageAssistant
                    : styles.messageSystem
              }`}
            >
              {msg.role !== "system" && (
                <div className={styles.messageAvatar}>
                  {msg.role === "user" ? "U" : "A"}
                </div>
              )}
              <div
                className={`${styles.messageBubble} ${
                  msg.role === "user"
                    ? styles.messageBubbleUser
                    : msg.role === "assistant"
                      ? styles.messageBubbleAssistant
                      : styles.messageBubbleSystem
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Message input"
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
  }
);

ChatSection.displayName = "ChatSection";
