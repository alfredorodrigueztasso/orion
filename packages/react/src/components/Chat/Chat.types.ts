/**
 * Chat Component Types
 *
 * Type definitions for the Orion Chat component - an AI-first chat interface
 * with multimodal support (text, images, audio, files, code).
 */

import type {
  HTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  RefObject,
} from "react";

// ============================================================================
// CORE ENUMS & TYPES
// ============================================================================

/**
 * Message role types
 */
export type ChatRole = "user" | "assistant" | "system";

/**
 * Message delivery status
 */
export type MessageStatus = "sending" | "sent" | "error" | "streaming";

/**
 * Attachment types for multimodal support
 */
export type AttachmentType = "image" | "audio" | "file" | "code";

/**
 * Message reaction types (feedback)
 */
export type MessageReaction = "like" | "dislike";

// ============================================================================
// ATTACHMENT INTERFACES
// ============================================================================

/**
 * Base attachment interface
 */
export interface ChatAttachment {
  /** Unique identifier for the attachment */
  id: string;
  /** Type of attachment */
  type: AttachmentType;
  /** Display name for the attachment */
  name: string;
  /** URL for media files (images, audio, etc.) */
  url?: string;
  /** Content for code blocks */
  content?: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** MIME type of the file */
  mimeType?: string;
  /** File size in bytes */
  size?: number;
  /** Audio duration in seconds */
  duration?: number;
  /** Thumbnail URL for images */
  thumbnail?: string;
}

// ============================================================================
// MESSAGE INTERFACES
// ============================================================================

/**
 * Chat message structure
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Message sender role */
  role: ChatRole;
  /** Message content (supports Markdown) */
  content: string;
  /** Timestamp of the message */
  timestamp?: Date;
  /** Message delivery status */
  status?: MessageStatus;
  /** Attached files, images, audio, or code */
  attachments?: ChatAttachment[];
  /** Whether the message is currently streaming */
  isStreaming?: boolean;
}

/**
 * Conversation for sidebar listing
 */
export interface ChatConversation {
  /** Unique identifier for the conversation */
  id: string;
  /** Conversation title */
  title: string;
  /** Preview of the last message */
  preview?: string;
  /** Last update timestamp */
  updatedAt: Date;
  /** Total number of messages */
  messageCount?: number;
}

// ============================================================================
// VOICE RECORDER STATE
// ============================================================================

/**
 * Voice recorder state interface
 */
export interface VoiceRecorderState {
  /** Whether currently recording */
  isRecording: boolean;
  /** Recording duration in seconds */
  duration: number;
  /** Recorded audio blob */
  audioBlob?: Blob;
  /** Recording error */
  error?: string;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Main Chat container props
 */
export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  /** Chat content (compound components) */
  children?: ReactNode;
}

/**
 * Chat Header props
 */
export interface ChatHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Title displayed in the header */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Avatar or icon to display */
  avatar?: ReactNode;
  /** Actions (buttons, menu) on the right side */
  actions?: ReactNode;
  /** Custom content */
  children?: ReactNode;
}

/**
 * Chat Messages container props
 */
export interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  /** Message content */
  children?: ReactNode;
  /** Reference for scroll control */
  scrollRef?: RefObject<HTMLDivElement>;
  /** Enable auto-scroll to latest message */
  autoScroll?: boolean;
}

/**
 * Individual chat message props
 */
export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Message sender role */
  role: ChatRole;
  /** Message content (supports Markdown) */
  content: string;
  /** Timestamp of the message */
  timestamp?: Date;
  /** Message delivery status */
  status?: MessageStatus;
  /** Attached files, images, audio, or code */
  attachments?: ChatAttachment[];
  /** Custom avatar element */
  avatar?: ReactNode;
  /** Whether to show the avatar (defaults to false) */
  showAvatar?: boolean;
  /** Action buttons (copy, regenerate, etc.) */
  actions?: ReactNode;
  /** Whether the message is streaming */
  isStreaming?: boolean;
  /** Callback when an image attachment is clicked */
  onImageClick?: (attachment: ChatAttachment) => void;
  /** Callback to retry sending a failed message */
  onRetry?: () => void;
  /** Current reaction on this message */
  reaction?: MessageReaction;
  /** Callback when user reacts to a message */
  onReaction?: (reaction: MessageReaction) => void;
  /** Custom content instead of default rendering */
  children?: ReactNode;
}

/**
 * Chat input props
 */
export interface ChatInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onSubmit"
> {
  /** Callback when message is sent */
  onSend?: (message: string, attachments?: File[]) => void;
  /** Allow file attachments (images, files) */
  allowAttachments?: boolean;
  /** Allow voice recording */
  allowVoiceRecording?: boolean;
  /** Allow audio file upload */
  allowAudioUpload?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Accepted file types for upload */
  acceptedFileTypes?: string[];
  /** Whether a message is being sent */
  isLoading?: boolean;
  /** Pending attachments to display */
  pendingAttachments?: File[];
  /** Callback to remove a pending attachment */
  onRemoveAttachment?: (index: number) => void;
}

/**
 * Typing indicator props
 */
export interface ChatTypingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Label text (default: "Assistant is typing") */
  label?: string;
}

/**
 * Code block props
 */
export interface ChatCodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Code content */
  code: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show copy button */
  showCopyButton?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: string;
}

/**
 * Markdown renderer props
 */
export interface ChatMarkdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Markdown content to render */
  content: string;
}

// ============================================================================
// ATTACHMENT COMPONENT PROPS
// ============================================================================

/**
 * Image preview props
 */
export interface ChatImagePreviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Thumbnail URL (optional, uses src if not provided) */
  thumbnail?: string;
  /** Callback when image is clicked */
  onClick?: () => void;
  /** Enable lightbox on click */
  enableLightbox?: boolean;
}

/**
 * Audio player props
 */
export interface ChatAudioPlayerProps extends HTMLAttributes<HTMLDivElement> {
  /** Audio source URL */
  src: string;
  /** Duration in seconds (optional, auto-detected if not provided) */
  duration?: number;
  /** Audio title/name */
  title?: string;
}

/**
 * Voice recorder props
 */
export interface ChatVoiceRecorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Callback when recording is complete */
  onRecordingComplete?: (blob: Blob) => void;
  /** Callback when recording is cancelled */
  onCancel?: () => void;
  /** Maximum recording duration in seconds */
  maxDuration?: number;
}

/**
 * File upload zone props
 */
export interface ChatFileUploadProps extends HTMLAttributes<HTMLDivElement> {
  /** Callback when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** Accepted file types */
  accept?: string[];
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Custom upload button content */
  children?: ReactNode;
}

/**
 * Attachment preview props (unified)
 */
export interface ChatAttachmentPreviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Attachment data */
  attachment: ChatAttachment;
  /** Show remove button */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
  /** Callback when attachment is clicked */
  onClick?: () => void;
}

// ============================================================================
// SIDEBAR PROPS
// ============================================================================

/**
 * Chat sidebar props
 */
export interface ChatSidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** List of conversations */
  conversations?: ChatConversation[];
  /** Currently active conversation ID */
  activeConversationId?: string;
  /** Callback when a conversation is selected */
  onSelectConversation?: (id: string) => void;
  /** Callback when new conversation is created */
  onNewConversation?: () => void;
  /** Callback when a conversation is deleted */
  onDeleteConversation?: (id: string) => void;
  /** Callback when search query changes */
  onSearch?: (query: string) => void;
  /** Custom header content */
  header?: ReactNode;
  /** Custom footer content */
  footer?: ReactNode;
  /** Whether sidebar is collapsed (mobile) */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
}

// ============================================================================
// SECTION & TEMPLATE PROPS
// ============================================================================

/**
 * ChatSection props (sidebar + chat)
 */
export interface ChatSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** List of conversations for sidebar */
  conversations?: ChatConversation[];
  /** Currently active conversation ID */
  activeConversationId?: string;
  /** Messages for the active conversation */
  messages?: ChatMessage[];
  /** Callback when a message is sent */
  onSendMessage?: (message: string, attachments?: File[]) => void;
  /** Callback when a conversation is selected */
  onSelectConversation?: (id: string) => void;
  /** Callback when new conversation is created */
  onNewConversation?: () => void;
  /** Callback when a conversation is deleted */
  onDeleteConversation?: (id: string) => void;
  /** Whether assistant is typing */
  isTyping?: boolean;
  /** Whether message is being sent */
  isLoading?: boolean;
  /** Chat header configuration */
  header?: {
    title?: string;
    subtitle?: string;
    avatar?: ReactNode;
    actions?: ReactNode;
  };
  /** Input configuration */
  inputConfig?: {
    placeholder?: string;
    allowAttachments?: boolean;
    allowVoiceRecording?: boolean;
    maxLength?: number;
  };
  /** Hide sidebar (full-width chat) */
  hideSidebar?: boolean;
}

/**
 * ChatPageTemplate props (full page layout)
 */
export interface ChatPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  // Sidebar props
  /** List of conversations */
  conversations?: ChatConversation[];
  /** Currently active conversation ID */
  activeConversationId?: string;
  /** Callback when a conversation is selected */
  onSelectConversation?: (id: string) => void;
  /** Callback when new conversation is created */
  onNewConversation?: () => void;
  /** Callback when a conversation is deleted */
  onDeleteConversation?: (id: string) => void;

  // Chat props
  /** Messages for the active conversation */
  messages?: ChatMessage[];
  /** Callback when a message is sent */
  onSendMessage?: (message: string, attachments?: File[]) => void;
  /** Whether assistant is typing */
  isTyping?: boolean;
  /** Whether message is being sent */
  isLoading?: boolean;

  // Header props
  /** User information for header */
  user?: {
    name: string;
    avatar?: string;
  };
  /** Callback when user logs out */
  onLogout?: () => void;

  // Customization
  /** Custom logo element */
  logo?: ReactNode;
  /** Chat input configuration */
  inputConfig?: ChatSectionProps["inputConfig"];
}

// ============================================================================
// LIGHTBOX PROPS
// ============================================================================

/**
 * Image lightbox props
 */
export interface ChatLightboxProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether lightbox is open */
  isOpen: boolean;
  /** Callback when lightbox is closed */
  onClose: () => void;
}
