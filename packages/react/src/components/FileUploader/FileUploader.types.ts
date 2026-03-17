/**
 * FileUploader Component Types
 *
 * Type definitions for the Orion FileUploader section component.
 * A drag & drop file upload zone for SaaS applications.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Uploaded file item
 */
export interface UploadedFile {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * File name
   */
  name: string;

  /**
   * File size in bytes
   */
  size: number;

  /**
   * MIME type
   */
  type: string;

  /**
   * Upload progress (0-100)
   */
  progress?: number;

  /**
   * Upload status
   */
  status: "pending" | "uploading" | "completed" | "error";

  /**
   * Error message if status is 'error'
   */
  error?: string;

  /**
   * Preview URL (for images)
   */
  preview?: string;

  /**
   * Original File object
   */
  file?: File;
}

/**
 * FileUploader section props
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
export interface FileUploaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Accepted file types (MIME types or extensions)
   */
  accept?: string[];

  /**
   * Maximum number of files
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Allow multiple files
   * @default true
   */
  multiple?: boolean;

  /**
   * Callback when files are added
   */
  onFilesAdded?: (files: File[]) => void;

  /**
   * Callback when a file is removed
   */
  onFileRemove?: (fileId: string) => void;

  /**
   * Current uploaded files (controlled)
   */
  files?: UploadedFile[];

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Custom dropzone content
   */
  dropzoneContent?: ReactNode;

  /**
   * Custom placeholder text
   * @default "Drag and drop files here, or click to browse"
   */
  placeholder?: string;

  /**
   * Show file list below dropzone
   * @default true
   */
  showFileList?: boolean;

  /**
   * Compact mode
   * @default false
   */
  compact?: boolean;

  /**
   * Variant style
   * @default "default"
   */
  variant?: "default" | "minimal" | "card";

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;
}
