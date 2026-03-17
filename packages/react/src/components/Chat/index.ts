/**
 * Chat Component - AI-first chat interface with multimodal support.
 *
 * @example
 * ```tsx
 * import { Chat } from '@orion-ds/react';
 *
 * <Chat>
 *   <Chat.Header title="AI Assistant" />
 *   <Chat.Messages>
 *     {messages.map(msg => (
 *       <Chat.Message
 *         key={msg.id}
 *         role={msg.role}
 *         content={msg.content}
 *       />
 *     ))}
 *     {isTyping && <Chat.TypingIndicator />}
 *   </Chat.Messages>
 *   <Chat.Input onSend={handleSend} />
 * </Chat>
 * ```
 */

export { Chat } from "./Chat";

// Types
export type {
  // Core types
  ChatRole,
  MessageStatus,
  AttachmentType,
  MessageReaction,
  ChatAttachment,
  ChatMessage,
  ChatConversation,
  VoiceRecorderState,
  // Component props
  ChatProps,
  ChatHeaderProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatInputProps,
  ChatTypingIndicatorProps,
  ChatCodeBlockProps,
  ChatMarkdownProps,
  // Attachment props
  ChatImagePreviewProps,
  ChatAudioPlayerProps,
  ChatVoiceRecorderProps,
  ChatFileUploadProps,
  ChatAttachmentPreviewProps,
  // Sidebar props
  ChatSidebarProps,
  // Section & Template props
  ChatSectionProps,
  ChatPageTemplateProps,
  // Lightbox
  ChatLightboxProps,
} from "./Chat.types";

// Hooks
export {
  useAutoScroll,
  useVoiceRecorder,
  useChatInput,
  useStreamingText,
} from "./hooks";

export type {
  UseAutoScrollOptions,
  UseAutoScrollReturn,
  UseVoiceRecorderOptions,
  UseVoiceRecorderReturn,
  UseChatInputOptions,
  UseChatInputReturn,
  UseStreamingTextOptions,
  UseStreamingTextReturn,
} from "./hooks";
