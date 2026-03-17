"use client";

/**
 * ChatInput Component
 *
 * Multi-line input with attachment support, voice recording,
 * and send functionality.
 */

import React, { forwardRef, useCallback, useState, useRef } from "react";
import { Send, Paperclip, Mic, X, Image, File } from "lucide-react";
import type { ChatInputProps } from "../Chat.types";
import { useChatInput } from "../hooks/useChatInput";
import { ChatVoiceRecorder } from "./ChatVoiceRecorder";
import { formatFileSize } from "../utils";
import styles from "../Chat.module.css";

// Get file icon
const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/")) {
    return <Image size={14} />;
  }
  return <File size={14} />;
};

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      onSend,
      placeholder = "Type a message...",
      allowAttachments = true,
      allowVoiceRecording = true,
      allowAudioUpload: _allowAudioUpload = true,
      disabled = false,
      maxLength,
      acceptedFileTypes = [
        "image/*",
        "audio/*",
        ".pdf",
        ".doc",
        ".docx",
        ".txt",
      ],
      isLoading = false,
      pendingAttachments: externalAttachments,
      onRemoveAttachment: externalOnRemove,
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
      value,
      setValue,
      attachments,
      addAttachments,
      removeAttachment,
      handleSubmit: internalSubmit,
      handleKeyDown,
      textareaRef,
      isEmpty,
    } = useChatInput({
      maxLength,
      onSend,
      disabled: disabled || isLoading,
    });

    // Use external attachments if provided, otherwise internal
    const displayAttachments = externalAttachments || attachments;
    const handleRemoveAttachment = externalOnRemove || removeAttachment;

    // Combine refs via callback ref
    const combinedRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        // Set internal ref
        (
          textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
        ).current = node;
        // Forward ref
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef, textareaRef],
    );

    // Handle file selection
    const handleFileSelect = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          addAttachments(Array.from(files));
        }
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [addAttachments],
    );

    // Handle paste for images
    const handlePaste = useCallback(
      (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        const imageFiles: File[] = [];

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              imageFiles.push(file);
            }
          }
        }

        if (imageFiles.length > 0) {
          e.preventDefault();
          addAttachments(imageFiles);
        }
      },
      [addAttachments],
    );

    // Handle voice recording complete
    const handleVoiceRecordingComplete = useCallback(
      (blob: Blob) => {
        // Create a file-like object from the blob
        const file = Object.assign(blob, {
          name: `voice-${Date.now()}.webm`,
          lastModified: Date.now(),
        }) as File;
        addAttachments([file]);
        setShowVoiceRecorder(false);
      },
      [addAttachments],
    );

    // Handle submit
    const handleSubmit = useCallback(() => {
      if (disabled || isLoading) return;
      internalSubmit();
    }, [disabled, isLoading, internalSubmit]);

    const canSend = !isEmpty || displayAttachments.length > 0;

    return (
      <div
        className={[styles.inputContainer, className].filter(Boolean).join(" ")}
      >
        <div className={styles.inputWrapper}>
          {/* Pending attachments */}
          {displayAttachments.length > 0 && (
            <div className={styles.pendingAttachments}>
              {displayAttachments.map((file, index) => (
                <div key={index} className={styles.pendingAttachment}>
                  {getFileIcon(file)}
                  <span>{file.name}</span>
                  <span className={styles.pendingAttachmentSize}>
                    ({formatFileSize(file.size)})
                  </span>
                  <button
                    className={styles.pendingAttachmentRemove}
                    onClick={() => handleRemoveAttachment(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Voice recorder overlay */}
          {showVoiceRecorder && (
            <ChatVoiceRecorder
              onRecordingComplete={handleVoiceRecordingComplete}
              onCancel={() => setShowVoiceRecorder(false)}
            />
          )}

          {/* Main input box */}
          {!showVoiceRecorder && (
            <div className={styles.inputBox}>
              {/* Left actions (attachments) */}
              {allowAttachments && (
                <div className={styles.inputActions}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFileTypes.join(",")}
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    aria-hidden="true"
                  />
                  <button
                    className={styles.inputButton}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isLoading}
                    aria-label="Attach file"
                    title="Attach file"
                  >
                    <Paperclip size={20} />
                  </button>
                </div>
              )}

              {/* Textarea */}
              <textarea
                ref={combinedRef}
                className={styles.inputTextarea}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={placeholder}
                disabled={disabled || isLoading}
                maxLength={maxLength}
                rows={1}
                aria-label="Message input"
                {...rest}
              />

              {/* Right actions (voice, send) */}
              <div className={styles.inputActions}>
                {/* Voice recording button */}
                {allowVoiceRecording &&
                  !value &&
                  displayAttachments.length === 0 && (
                    <button
                      className={styles.inputButton}
                      onClick={() => setShowVoiceRecorder(true)}
                      disabled={disabled || isLoading}
                      aria-label="Record voice message"
                      title="Record voice message"
                    >
                      <Mic size={20} />
                    </button>
                  )}

                {/* Send button */}
                <button
                  className={[
                    styles.inputButton,
                    canSend && styles.inputButtonPrimary,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={handleSubmit}
                  disabled={disabled || isLoading || !canSend}
                  aria-label="Send message"
                  title="Send message"
                >
                  {isLoading ? (
                    <span className={styles.inputSpinner} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
