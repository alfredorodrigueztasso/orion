/**
 * ChatHeader Component
 *
 * Header bar with title, avatar, and action buttons.
 */

import React from "react";
import { Bot } from "lucide-react";
import type { ChatHeaderProps } from "../Chat.types";
import styles from "../Chat.module.css";

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "AI Assistant",
  subtitle,
  avatar,
  actions,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={[styles.header, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {/* Avatar */}
      <div className={styles.headerAvatar}>
        {avatar || (
          <div
            className={[styles.messageAvatar, styles.headerAvatarDefault]
              .filter(Boolean)
              .join(" ")}
          >
            <Bot size={20} />
          </div>
        )}
      </div>

      {/* Title/Subtitle */}
      <div className={styles.headerContent}>
        {children || (
          <>
            <h2 className={styles.headerTitle}>{title}</h2>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
          </>
        )}
      </div>

      {/* Actions */}
      {actions && <div className={styles.headerActions}>{actions}</div>}
    </div>
  );
};

ChatHeader.displayName = "ChatHeader";
