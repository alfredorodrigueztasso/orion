/**
 * ChatPageTemplate Types
 *
 * Type definitions for the ChatPageTemplate.
 */

import type { ReactNode } from "react";

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  status?: "sending" | "sent" | "error";
}

export interface ChatPageTemplateProps {
  /** Page title */
  title?: string;

  /** Messages to display */
  messages?: ChatMessage[];

  /** Input placeholder text */
  inputPlaceholder?: string;

  /** Called when message is sent */
  onSendMessage?: (message: string) => void;

  /** Chat participants (for sidebar or header) */
  participants?: ChatParticipant[];

  /** Currently selected participant */
  selectedParticipantId?: string;

  /** Called when participant is selected */
  onSelectParticipant?: (participantId: string) => void;

  /** Loading/typing indicator state */
  isTyping?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
