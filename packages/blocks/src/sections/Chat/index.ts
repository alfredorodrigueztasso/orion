/**
 * Chat Section - Pre-built chat interface with sidebar.
 *
 * @example
 * ```tsx
 * import { ChatSection } from '@orion-ds/blocks';
 *
 * <ChatSection
 *   conversations={conversations}
 *   activeConversationId={activeId}
 *   messages={messages}
 *   onSendMessage={handleSend}
 *   onSelectConversation={handleSelect}
 * />
 * ```
 */

export { ChatSection } from "./Chat";
export type {
  ChatSectionProps,
  ChatMessage,
  ChatConversation,
  ChatInputProps,
} from "./Chat.types";
