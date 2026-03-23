"use client";

/**
 * Chat Component
 *
 * A flexible compound component for building AI chat interfaces.
 * Supports multimodal content including text, images, audio, files, and code.
 *
 * @example
 * ```tsx
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

import React from "react";
import type { ChatProps } from "./Chat.types";
import {
  ChatMessage,
  ChatMessages,
  ChatInput,
  ChatHeader,
  ChatTypingIndicator,
  ChatCodeBlock,
  ChatMarkdown,
  ChatImagePreview,
  ChatAudioPlayer,
  ChatVoiceRecorder,
  ChatFileUpload,
  ChatAttachment,
  ChatSidebar,
} from "./components";
import styles from "./Chat.module.css";

// Main Chat container
const ChatRoot: React.FC<ChatProps> = ({ children, className, ...rest }) => {
  React.useEffect(() => {
    console.warn(
      "[DEPRECATED] Chat component will be removed in @orion-ds/react v5.2.0 (April 2026).\n" +
        'Chat is not aligned with Orion\'s "primitives-first" philosophy.\n' +
        "Alternatives:\n" +
        "  - react-chat-elements (drop-in replacement)\n" +
        "  - Build custom Chat with Orion primitives (Button, Card, Input, Modal)\n" +
        "Migration guide: See CHAT_MIGRATION_GUIDE.md or GitHub discussions.\n" +
        "Timeline: v5.1.13 (now) → v5.2.0 removed (April 2026)",
    );
  }, []);

  return (
    <div
      className={[styles.chat, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Chat interface"
      {...rest}
    >
      {children}
    </div>
  );
};

ChatRoot.displayName = "Chat";

// Type for the compound component
type ChatComponent = React.FC<ChatProps> & {
  Header: typeof ChatHeader;
  Messages: typeof ChatMessages;
  Message: typeof ChatMessage;
  Input: typeof ChatInput;
  TypingIndicator: typeof ChatTypingIndicator;
  CodeBlock: typeof ChatCodeBlock;
  Markdown: typeof ChatMarkdown;
  ImagePreview: typeof ChatImagePreview;
  AudioPlayer: typeof ChatAudioPlayer;
  VoiceRecorder: typeof ChatVoiceRecorder;
  FileUpload: typeof ChatFileUpload;
  Attachment: typeof ChatAttachment;
  Sidebar: typeof ChatSidebar;
};

// Attach sub-components
export const Chat = ChatRoot as ChatComponent;
Chat.Header = ChatHeader;
Chat.Messages = ChatMessages;
Chat.Message = ChatMessage;
Chat.Input = ChatInput;
Chat.TypingIndicator = ChatTypingIndicator;
Chat.CodeBlock = ChatCodeBlock;
Chat.Markdown = ChatMarkdown;
Chat.ImagePreview = ChatImagePreview;
Chat.AudioPlayer = ChatAudioPlayer;
Chat.VoiceRecorder = ChatVoiceRecorder;
Chat.FileUpload = ChatFileUpload;
Chat.Attachment = ChatAttachment;
Chat.Sidebar = ChatSidebar;

// Sub-component display names
Chat.Header.displayName = "Chat.Header";
Chat.Messages.displayName = "Chat.Messages";
Chat.Message.displayName = "Chat.Message";
Chat.Input.displayName = "Chat.Input";
Chat.TypingIndicator.displayName = "Chat.TypingIndicator";
Chat.CodeBlock.displayName = "Chat.CodeBlock";
Chat.Markdown.displayName = "Chat.Markdown";
Chat.ImagePreview.displayName = "Chat.ImagePreview";
Chat.AudioPlayer.displayName = "Chat.AudioPlayer";
Chat.VoiceRecorder.displayName = "Chat.VoiceRecorder";
Chat.FileUpload.displayName = "Chat.FileUpload";
Chat.Attachment.displayName = "Chat.Attachment";
Chat.Sidebar.displayName = "Chat.Sidebar";
