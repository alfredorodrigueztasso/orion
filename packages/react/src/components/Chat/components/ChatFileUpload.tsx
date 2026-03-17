"use client";

/**
 * ChatFileUpload Component
 *
 * File upload zone with drag-and-drop support.
 */

import React, { useState, useRef, useCallback } from "react";
import { Upload } from "lucide-react";
import type { ChatFileUploadProps } from "../Chat.types";
import { formatFileSize } from "../utils";
import styles from "../Chat.module.css";

export const ChatFileUpload: React.FC<ChatFileUploadProps> = ({
  onFilesSelected,
  accept = ["*/*"],
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB default
  children,
  className,
  ...rest
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const validFiles: File[] = [];

      Array.from(files).forEach((file) => {
        // Check file size
        if (maxSize && file.size > maxSize) {
          console.warn(
            `File ${file.name} exceeds max size of ${formatFileSize(maxSize)}`,
          );
          return;
        }

        // Check file type (basic check)
        const acceptAll = accept.includes("*/*");
        const acceptedTypes = accept.flatMap((type) => {
          if (type.endsWith("/*")) {
            return type; // e.g., 'image/*'
          }
          return type;
        });

        const isAccepted =
          acceptAll ||
          acceptedTypes.some((type) => {
            if (type.endsWith("/*")) {
              const category = type.split("/")[0];
              return file.type.startsWith(`${category}/`);
            }
            return file.type === type || file.name.endsWith(type);
          });

        if (!isAccepted) {
          console.warn(`File ${file.name} type not accepted`);
          return;
        }

        validFiles.push(file);
      });

      if (validFiles.length > 0) {
        onFilesSelected?.(validFiles);
      }
    },
    [accept, maxSize, onFilesSelected],
  );

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const { files } = e.dataTransfer;
      handleFiles(files);
    },
    [handleFiles],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input so same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [handleFiles],
  );

  // Handle click to open file dialog
  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div
      className={[
        styles.fileUpload,
        isDragging && styles.fileUploadDragging,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload files"
      {...rest}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(",")}
        multiple={multiple}
        onChange={handleInputChange}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {children || (
        <>
          <div className={styles.fileUploadIcon}>
            <Upload size={32} />
          </div>
          <div className={styles.fileUploadText}>
            <strong>Click to upload</strong> or drag and drop
          </div>
          <div className={styles.fileUploadHint}>
            Max file size: {formatFileSize(maxSize)}
          </div>
        </>
      )}
    </div>
  );
};

ChatFileUpload.displayName = "ChatFileUpload";
