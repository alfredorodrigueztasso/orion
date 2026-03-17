/**
 * ChatTypingIndicator Component
 *
 * Circular processing indicator shown before content generation begins.
 * Intentionally abstract — communicates activity without representing
 * specific progress, reducing temporal expectations.
 *
 * Renders in assistant-message layout so the transition to streaming
 * content feels seamless. Avatar hidden by default, matching ChatMessage.
 */

import React from "react";
import type { ChatTypingIndicatorProps } from "../Chat.types";
import styles from "../Chat.module.css";

export const ChatTypingIndicator: React.FC<ChatTypingIndicatorProps> = ({
  label = "Generating response",
  className,
  ...rest
}) => {
  return (
    <div
      className={[styles.message, styles.messageAssistant, className]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={label}
      {...rest}
    >
      <div className={styles.messageContent}>
        <div
          className={[
            styles.messageBubble,
            styles.messageBubbleAssistant,
            styles.thinkingBubble,
          ].join(" ")}
        >
          <span className={styles.thinkingSpinner} />
        </div>
      </div>
    </div>
  );
};

ChatTypingIndicator.displayName = "ChatTypingIndicator";
