"use client";

/**
 * ChatMessage Component
 *
 * Individual message bubble with support for text, markdown,
 * attachments, reactions, retry, and various states.
 */

import React from "react";
import {
  User,
  Bot,
  AlertCircle,
  Check,
  Clock,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import type { ChatMessageProps } from "../Chat.types";
import { ChatMarkdown } from "./ChatMarkdown";
import { ChatAttachment } from "./ChatAttachment";
import styles from "../Chat.module.css";

// Format timestamp
const formatTimestamp = (date?: Date): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

// Get status icon
const getStatusIcon = (status?: string) => {
  switch (status) {
    case "sending":
      return <Clock size={12} />;
    case "sent":
      return <Check size={12} />;
    case "error":
      return <AlertCircle size={12} />;
    default:
      return null;
  }
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  timestamp,
  status,
  attachments,
  avatar,
  showAvatar,
  actions,
  isStreaming,
  onImageClick,
  onRetry,
  reaction,
  onReaction,
  children,
  className,
  ...rest
}) => {
  const isUser = role === "user";
  const isSystem = role === "system";
  const isAssistant = role === "assistant";
  const shouldShowAvatar = showAvatar ?? false;

  // System messages have a different layout
  if (isSystem) {
    return (
      <div
        className={[styles.message, className].filter(Boolean).join(" ")}
        role="listitem"
        {...rest}
      >
        <div className={styles.messageContent}>
          <div className={styles.messageBubbleSystem}>
            {children || content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        styles.message,
        isUser && styles.messageUser,
        isAssistant && styles.messageAssistant,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="listitem"
      {...rest}
    >
      {/* Avatar */}
      {shouldShowAvatar && (
        <div
          className={[
            styles.messageAvatar,
            isUser ? styles.messageAvatarUser : styles.messageAvatarAssistant,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {avatar || (isUser ? <User size={18} /> : <Bot size={18} />)}
        </div>
      )}

      {/* Content */}
      <div className={styles.messageContent}>
        {/* Message bubble */}
        <div
          className={[
            styles.messageBubble,
            isUser ? styles.messageBubbleUser : styles.messageBubbleAssistant,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children || (
            <ChatMarkdown
              content={content}
              className={isUser ? styles.markdownUser : undefined}
            />
          )}

          {/* Streaming cursor */}
          {isStreaming && <span className={styles.streamingCursor} />}
        </div>

        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className={styles.messageAttachments}>
            {attachments.map((attachment) => (
              <ChatAttachment
                key={attachment.id}
                attachment={attachment}
                onClick={
                  attachment.type === "image" && onImageClick
                    ? () => onImageClick(attachment)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* Footer (timestamp, status, actions, reactions) */}
        <div className={styles.messageFooter}>
          {timestamp && (
            <span className={styles.messageTimestamp}>
              {formatTimestamp(timestamp)}
            </span>
          )}

          {status && (
            <span
              className={[
                styles.messageStatus,
                status === "error" && styles.messageStatusError,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {getStatusIcon(status)}
              {status === "error" && "Failed to send"}
            </span>
          )}

          {/* Retry button for failed messages */}
          {status === "error" && onRetry && (
            <button
              className={styles.messageRetry}
              onClick={onRetry}
              aria-label="Retry sending message"
            >
              <RotateCcw size={12} />
              Retry
            </button>
          )}

          {actions && <div className={styles.messageActions}>{actions}</div>}

          {/* Reactions for assistant messages */}
          {isAssistant && onReaction && (
            <div
              className={[
                styles.messageReactions,
                reaction && styles.messageReactionsVisible,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                className={[
                  styles.messageReactionButton,
                  reaction === "like" && styles.messageReactionActive,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onReaction("like")}
                aria-label="Like this response"
                aria-pressed={reaction === "like"}
              >
                <ThumbsUp size={14} />
              </button>
              <button
                className={[
                  styles.messageReactionButton,
                  reaction === "dislike" && styles.messageReactionActive,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onReaction("dislike")}
                aria-label="Dislike this response"
                aria-pressed={reaction === "dislike"}
              >
                <ThumbsDown size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ChatMessage.displayName = "ChatMessage";
