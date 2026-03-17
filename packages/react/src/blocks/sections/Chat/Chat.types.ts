export type ChatMessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp?: Date;
}

export interface ChatConversation {
  id: string;
  title: string;
  updatedAt?: Date;
}

export interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
}

export interface ChatSectionProps {
  /** Messages to display */
  messages?: ChatMessage[];
  /** Available conversations for sidebar */
  conversations?: ChatConversation[];
  /** Currently active conversation id */
  activeConversationId?: string;
  /** Callback when a conversation is selected */
  onConversationSelect?: (id: string) => void;
  /** Callback when a new message is sent */
  onSendMessage?: (content: string) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Optional className */
  className?: string;
}
