"use client";

/**
 * ChatMessages Component
 *
 * Scrollable container for chat messages with auto-scroll support
 * and accessibility features.
 */

import React, { forwardRef } from "react";
import { ArrowDown } from "lucide-react";
import type { ChatMessagesProps } from "../Chat.types";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { Button } from "../../Button";
import styles from "../Chat.module.css";

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ children, autoScroll = true, className, ...rest }, forwardedRef) => {
    const { scrollRef, isAtBottom, scrollToBottom } = useAutoScroll({
      enabled: autoScroll,
    });

    // Combine refs
    const handleRef = (node: HTMLDivElement | null) => {
      // Set internal ref
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;

      // Forward ref
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return (
      <div
        ref={handleRef}
        className={[styles.messages, className].filter(Boolean).join(" ")}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        aria-relevant="additions"
        {...rest}
      >
        <div className={styles.messagesInner}>{children}</div>

        {/* Scroll to bottom button (shown when not at bottom) */}
        {!isAtBottom && (
          <div className={styles.scrollToBottomWrapper}>
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              icon={<ArrowDown size={18} />}
              onClick={scrollToBottom}
              aria-label="Scroll to latest messages"
              className={styles.scrollToBottomButton}
            />
          </div>
        )}
      </div>
    );
  },
);

ChatMessages.displayName = "ChatMessages";
