# Chat (Section)

A complete chat section that combines a conversation sidebar with a full chat interface, including message display, input, and typing indicators. Re-exports types from the core Chat component.

## When to Use

| Scenario                                   | Use Chat Section                         |
| ------------------------------------------ | ---------------------------------------- |
| Full chat page layout (sidebar + messages) | ✅ Yes - combines sidebar and chat area  |
| AI assistant with conversation history     | ✅ Yes - manages multiple conversations  |
| Customer support interface                 | ✅ Yes - conversation list + active chat |
| Embedded chat widget (no sidebar)          | ✅ Yes - set hideSidebar={true}          |
| Simple message display only                | ❌ No - use Chat component directly      |

## Props Reference

| Prop                 | Type                                                                  | Default | Description                          |
| -------------------- | --------------------------------------------------------------------- | ------- | ------------------------------------ |
| conversations        | ChatConversation[]                                                    | —       | List of conversations for sidebar    |
| activeConversationId | string                                                                | —       | Currently active conversation ID     |
| messages             | ChatMessage[]                                                         | —       | Messages for the active conversation |
| onSendMessage        | (message, attachments?) => void                                       | —       | Message send callback                |
| onSelectConversation | (id: string) => void                                                  | —       | Conversation select callback         |
| onNewConversation    | () => void                                                            | —       | New conversation callback            |
| onDeleteConversation | (id: string) => void                                                  | —       | Delete conversation callback         |
| isTyping             | boolean                                                               | —       | Whether assistant is typing          |
| isLoading            | boolean                                                               | —       | Whether message is sending           |
| header               | { title?, subtitle?, avatar?, actions? }                              | —       | Chat header configuration            |
| inputConfig          | { placeholder?, allowAttachments?, allowVoiceRecording?, maxLength? } | —       | Input configuration                  |
| hideSidebar          | boolean                                                               | —       | Hide sidebar for full-width chat     |

### ChatConversation

| Prop         | Type   | Description            |
| ------------ | ------ | ---------------------- |
| id           | string | Unique conversation ID |
| title        | string | Conversation title     |
| preview      | string | Last message preview   |
| updatedAt    | Date   | Last update timestamp  |
| messageCount | number | Total messages         |

### ChatMessage

| Prop        | Type                                          | Description                       |
| ----------- | --------------------------------------------- | --------------------------------- |
| id          | string                                        | Unique message ID                 |
| role        | 'user' \| 'assistant' \| 'system'             | Sender role                       |
| content     | string                                        | Message content (Markdown)        |
| timestamp   | Date                                          | Message timestamp                 |
| status      | 'sending' \| 'sent' \| 'error' \| 'streaming' | Delivery status                   |
| attachments | ChatAttachment[]                              | File/image/audio/code attachments |
| isStreaming | boolean                                       | Whether message is streaming      |

## Examples

### Full Chat Section

```tsx
import { Chat } from "@orion-ds/react";

<Chat.Section
  conversations={conversations}
  activeConversationId={activeId}
  messages={messages}
  onSendMessage={handleSend}
  onSelectConversation={setActiveId}
  onNewConversation={handleNewChat}
  isTyping={isAssistantTyping}
  header={{
    title: "AI Assistant",
    subtitle: "Always ready to help",
  }}
  inputConfig={{
    placeholder: "Ask me anything...",
    allowAttachments: true,
  }}
/>;
```

### Without Sidebar

```tsx
<Chat.Section
  messages={messages}
  onSendMessage={handleSend}
  hideSidebar
  header={{ title: "Support Chat" }}
/>
```

## Accessibility

- Sidebar list is keyboard navigable
- Active conversation is announced
- Messages use appropriate ARIA live regions
- Input supports Enter to send, Shift+Enter for newline

## Token Usage

- `--surface-base` — Main background
- `--surface-subtle` — Sidebar background
- `--border-subtle` — Sidebar/chat divider
- `--interactive-primary` — Active conversation highlight
- `--text-primary` — Message and title text
- `--text-secondary` — Conversation preview text
- `--spacing-4` — Section padding
- `--radius-container` — Message bubble radius
