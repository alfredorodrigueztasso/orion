/**
 * ChatPageTemplate Types
 *
 * Type definitions for the ChatPageTemplate component.
 */

import type { HTMLAttributes, ReactNode } from "react";
import type { ChatMessage, ChatConversation } from "@orion-ds/react";

export interface User {
  name: string;
  avatar?: string;
}

export interface InputConfig {
  placeholder?: string;
  allowAttachments?: boolean;
  allowVoiceRecording?: boolean;
  maxLength?: number;
}

export interface ChatPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * List of conversations in the sidebar
   */
  conversations?: ChatConversation[];

  /**
   * Currently active conversation ID
   */
  activeConversationId?: string;

  /**
   * Messages to display
   */
  messages?: ChatMessage[];

  /**
   * Called when user selects a conversation
   */
  onSelectConversation?: (id: string) => void;

  /**
   * Called when user creates a new conversation
   */
  onNewConversation?: () => void;

  /**
   * Called when user deletes a conversation
   */
  onDeleteConversation?: (id: string) => void;

  /**
   * Called when user sends a message
   */
  onSendMessage?: (message: string, attachments?: File[]) => void;

  /**
   * User information for header menu
   */
  user?: User;

  /**
   * Called when user logs out
   */
  onLogout?: () => void;

  /**
   * Whether the chat is currently typing
   */
  isTyping?: boolean;

  /**
   * Whether the chat is loading
   */
  isLoading?: boolean;

  /**
   * Logo/branding element
   */
  logo?: ReactNode;

  /**
   * Chat input configuration
   */
  inputConfig?: InputConfig;
}

export { ChatMessage };
