/**
 * Chat Component Shared Utilities
 *
 * Centralized helper functions used across multiple Chat sub-components.
 */

/**
 * Format a byte count into a human-readable file size string.
 * Used by ChatInput, ChatFileUpload, and ChatAttachment.
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Format seconds into mm:ss display string.
 * Used by ChatAudioPlayer and ChatVoiceRecorder.
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
