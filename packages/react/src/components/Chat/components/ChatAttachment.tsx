"use client";

/**
 * ChatAttachment Component
 *
 * Unified attachment preview component that renders the appropriate
 * display based on attachment type (image, audio, file, code).
 */

import React from "react";
import { FileText, Code, X, Image as ImageIcon, Music } from "lucide-react";
import type { ChatAttachmentPreviewProps, AttachmentType } from "../Chat.types";
import { ChatImagePreview } from "./ChatImagePreview";
import { ChatAudioPlayer } from "./ChatAudioPlayer";
import { ChatCodeBlock } from "./ChatCodeBlock";
import { formatFileSize } from "../utils";
import styles from "../Chat.module.css";

// Get icon for attachment type
const getAttachmentIcon = (type: AttachmentType) => {
  switch (type) {
    case "image":
      return <ImageIcon size={18} />;
    case "audio":
      return <Music size={18} />;
    case "code":
      return <Code size={18} />;
    default:
      return <FileText size={18} />;
  }
};

export const ChatAttachment: React.FC<ChatAttachmentPreviewProps> = ({
  attachment,
  removable = false,
  onRemove,
  onClick,
  className,
  ...rest
}) => {
  const { type, name, url, content, language, size, duration, thumbnail } =
    attachment;

  // Render based on type
  switch (type) {
    case "image":
      if (url) {
        return (
          <div className={className} style={{ position: "relative" }} {...rest}>
            <ChatImagePreview
              src={url}
              alt={name}
              thumbnail={thumbnail}
              onClick={onClick}
            />
            {removable && onRemove && (
              <button
                className={styles.attachmentPreviewRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                aria-label={`Remove ${name}`}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "var(--surface-base)",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      }
      break;

    case "audio":
      if (url) {
        return (
          <div className={className} style={{ position: "relative" }} {...rest}>
            <ChatAudioPlayer src={url} duration={duration} title={name} />
            {removable && onRemove && (
              <button
                className={styles.attachmentPreviewRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                aria-label={`Remove ${name}`}
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      }
      break;

    case "code":
      if (content) {
        return (
          <ChatCodeBlock
            code={content}
            language={language}
            className={className}
            {...rest}
          />
        );
      }
      break;
  }

  // Default file preview for unhandled types or missing data
  return (
    <div
      className={[styles.attachmentPreview, className]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      <div className={styles.attachmentPreviewIcon}>
        {getAttachmentIcon(type)}
      </div>

      <div className={styles.attachmentPreviewInfo}>
        <span className={styles.attachmentPreviewName}>{name}</span>
        {size && (
          <span className={styles.attachmentPreviewMeta}>
            {formatFileSize(size)}
            {duration &&
              ` · ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`}
          </span>
        )}
      </div>

      {removable && onRemove && (
        <button
          className={styles.attachmentPreviewRemove}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${name}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

ChatAttachment.displayName = "ChatAttachment";
