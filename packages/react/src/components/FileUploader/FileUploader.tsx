"use client";

/**
 * FileUploader Component
 *
 * A drag & drop file upload zone for SaaS applications.
 * Optimized for Product Mode with clean, efficient file management.
 *
 * @example
 * ```tsx
 * <FileUploader
 *   accept={['image/*', '.pdf']}
 *   maxFiles={5}
 *   maxSize={10 * 1024 * 1024}
 *   onFilesAdded={(files) => handleUpload(files)}
 * />
 * ```
 */

import { forwardRef, useRef, useState, useCallback } from "react";
import {
  Upload,
  File,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import type { FileUploaderProps } from "./FileUploader.types";
import styles from "./FileUploader.module.css";

// Get icon based on file type
const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return FileImage;
  if (type.startsWith("video/")) return FileVideo;
  if (type.startsWith("audio/")) return FileAudio;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return File;
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      accept,
      maxFiles,
      maxSize,
      multiple = true,
      onFilesAdded,
      onFileRemove,
      files = [],
      disabled = false,
      dropzoneContent,
      placeholder = "Drag and drop files here, or click to browse",
      showFileList = true,
      compact = false,
      variant = "default",
      error,
      helperText,
      className,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragError, setDragError] = useState<string | null>(null);

    const validateFiles = useCallback(
      (fileList: FileList | File[]): { valid: File[]; errors: string[] } => {
        const valid: File[] = [];
        const errors: string[] = [];
        const filesArray = Array.from(fileList);

        // Check max files
        if (maxFiles && files.length + filesArray.length > maxFiles) {
          errors.push(`Maximum ${maxFiles} files allowed`);
          return { valid, errors };
        }

        filesArray.forEach((file) => {
          // Check file size
          if (maxSize && file.size > maxSize) {
            errors.push(
              `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`,
            );
            return;
          }

          // Check file type
          if (accept && accept.length > 0) {
            const isAccepted = accept.some((type) => {
              if (type.startsWith(".")) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
              }
              if (type.endsWith("/*")) {
                return file.type.startsWith(type.replace("/*", "/"));
              }
              return file.type === type;
            });
            if (!isAccepted) {
              errors.push(`${file.name} is not an accepted file type`);
              return;
            }
          }

          valid.push(file);
        });

        return { valid, errors };
      },
      [accept, maxFiles, maxSize, files.length],
    );

    const handleFiles = useCallback(
      (fileList: FileList | File[]) => {
        if (disabled) return;

        const { valid, errors } = validateFiles(fileList);

        if (errors.length > 0 && errors[0]) {
          setDragError(errors[0]);
          setTimeout(() => setDragError(null), 3000);
        }

        if (valid.length > 0) {
          onFilesAdded?.(valid);
        }
      },
      [disabled, validateFiles, onFilesAdded],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
          setIsDragging(true);
        }
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      },
      [handleFiles],
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          handleFiles(e.target.files);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = "";
      },
      [handleFiles],
    );

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    };

    const acceptString = accept?.join(",");

    const classNames = [
      styles.fileUploader,
      styles[variant],
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const dropzoneClasses = [
      styles.dropzone,
      isDragging && styles.dropzoneDragging,
      disabled && styles.dropzoneDisabled,
      (error || dragError) && styles.dropzoneError,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Dropzone */}
        <div
          className={dropzoneClasses}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
        >
          <input
            ref={inputRef}
            type="file"
            className={styles.input}
            accept={acceptString}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            aria-hidden="true"
          />

          {dropzoneContent || (
            <div className={styles.dropzoneContent}>
              <div className={styles.dropzoneIcon}>
                <Upload size={compact ? 20 : 24} />
              </div>
              <p className={styles.dropzonePlaceholder}>{placeholder}</p>
              {!compact && (
                <div className={styles.dropzoneHints}>
                  {accept && (
                    <span className={styles.dropzoneHint}>
                      Accepted: {accept.join(", ")}
                    </span>
                  )}
                  {maxSize && (
                    <span className={styles.dropzoneHint}>
                      Max size: {formatFileSize(maxSize)}
                    </span>
                  )}
                  {maxFiles && (
                    <span className={styles.dropzoneHint}>
                      Max files: {maxFiles}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Helper text or error */}
        {(error || dragError || helperText) && (
          <div
            className={`${styles.helperText} ${error || dragError ? styles.helperTextError : ""}`}
          >
            {error || dragError || helperText}
          </div>
        )}

        {/* File list */}
        {showFileList && files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <li key={file.id} className={styles.fileItem}>
                  <div className={styles.fileIcon}>
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt=""
                        className={styles.filePreview}
                      />
                    ) : (
                      <FileIcon size={20} />
                    )}
                  </div>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <div className={styles.fileStatus}>
                    {file.status === "uploading" && (
                      <>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${file.progress || 0}%` }}
                          />
                        </div>
                        <Loader2 size={16} className={styles.fileStatusIcon} />
                      </>
                    )}
                    {file.status === "completed" && (
                      <CheckCircle
                        size={16}
                        className={styles.fileStatusSuccess}
                      />
                    )}
                    {file.status === "error" && (
                      <AlertCircle
                        size={16}
                        className={styles.fileStatusError}
                      />
                    )}
                  </div>
                  {onFileRemove && (
                    <button
                      type="button"
                      className={styles.fileRemove}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileRemove(file.id);
                      }}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={16} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";
