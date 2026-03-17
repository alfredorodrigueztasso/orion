"use client";

/**
 * @orion-ds/react/rich
 *
 * Heavy component entry point for rich text/content components.
 * This module requires the following peer dependencies:
 *   - react-markdown
 *   - react-syntax-highlighter
 *   - remark-gfm
 *
 * Usage:
 *   npm install react-markdown react-syntax-highlighter remark-gfm
 *   import { Chat } from '@orion-ds/react/rich';
 */

export { Chat } from "./components/Chat";
export type {
  ChatProps,
  ChatInputProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatMessage,
} from "./components/Chat";
