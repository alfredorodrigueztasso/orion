# Chat

An AI-first chat interface with multimodal support for text, images, audio, files, and code blocks. Uses compound components for flexible composition.

## When to Use

| Scenario                        | Use Chat                                    |
| ------------------------------- | ------------------------------------------- |
| AI assistant interfaces         | ✅ Yes - built for AI chat patterns         |
| Customer support chat           | ✅ Yes - supports message status, reactions |
| Multi-modal conversations       | ✅ Yes - images, audio, files, code         |
| Simple comment threads          | ❌ No - use a list or custom layout         |
| Real-time collaborative editing | ❌ No - use CodeEditor instead              |

## Props Reference

### Chat (Root Container)

| Prop      | Type      | Default | Description                                   |
| --------- | --------- | ------- | --------------------------------------------- |
| children  | ReactNode | —       | Compound components (Header, Messages, Input) |
| className | string    | —       | Additional class name                         |

### Chat.Message

| Prop        | Type                                          | Default | Description                            |
| ----------- | --------------------------------------------- | ------- | -------------------------------------- |
| role        | 'user' \| 'assistant' \| 'system'             | —       | Message sender role                    |
| content     | string                                        | —       | Message content (supports Markdown)    |
| timestamp   | Date                                          | —       | Message timestamp                      |
| status      | 'sending' \| 'sent' \| 'error' \| 'streaming' | —       | Delivery status                        |
| attachments | ChatAttachment[]                              | —       | Attached files, images, audio, or code |
| avatar      | ReactNode                                     | —       | Custom avatar element                  |
| showAvatar  | boolean                                       | false   | Whether to show the avatar             |
| isStreaming | boolean                                       | —       | Whether message is currently streaming |
| reaction    | 'like' \| 'dislike'                           | —       | Current reaction                       |
| onReaction  | (reaction) => void                            | —       | Reaction callback                      |
| onRetry     | () => void                                    | —       | Retry callback for failed messages     |
| actions     | ReactNode                                     | —       | Action buttons (copy, regenerate)      |

### Chat.Input

| Prop                | Type                            | Default | Description             |
| ------------------- | ------------------------------- | ------- | ----------------------- |
| onSend              | (message, attachments?) => void | —       | Send callback           |
| allowAttachments    | boolean                         | —       | Enable file attachments |
| allowVoiceRecording | boolean                         | —       | Enable voice recording  |
| disabled            | boolean                         | —       | Disable input           |
| maxLength           | number                          | —       | Max character count     |
| isLoading           | boolean                         | —       | Loading state           |
| placeholder         | string                          | —       | Input placeholder text  |

### Chat.Header

| Prop     | Type      | Default | Description             |
| -------- | --------- | ------- | ----------------------- |
| title    | string    | —       | Header title            |
| subtitle | string    | —       | Subtitle or description |
| avatar   | ReactNode | —       | Avatar or icon          |
| actions  | ReactNode | —       | Action buttons          |

## Examples

### Basic Chat

```tsx
import { Chat } from "@orion-ds/react/rich";

<Chat>
  <Chat.Header title="AI Assistant" subtitle="Online" />
  <Chat.Messages>
    <Chat.Message role="user" content="Hello!" />
    <Chat.Message role="assistant" content="Hi! How can I help?" />
  </Chat.Messages>
  <Chat.Input onSend={handleSend} placeholder="Type a message..." />
</Chat>;
```

### With Attachments and Streaming

```tsx
<Chat>
  <Chat.Messages>
    <Chat.Message
      role="assistant"
      content="Here is the analysis..."
      isStreaming={true}
      attachments={[
        {
          id: "1",
          type: "code",
          name: "result.py",
          content: "print('hello')",
          language: "python",
        },
      ]}
    />
  </Chat.Messages>
  <Chat.Input onSend={handleSend} allowAttachments allowVoiceRecording />
</Chat>
```

## Accessibility

- Messages are announced to screen readers via live regions
- Keyboard navigation between messages
- Input supports Enter to send, Shift+Enter for newline
- File upload has proper labeling

## Token Usage

- `--surface-base` — Chat background
- `--surface-subtle` — Assistant message background
- `--interactive-primary` — User message background
- `--text-primary` — Message text
- `--spacing-4` — Message padding
- `--radius-container` — Message bubble radius
