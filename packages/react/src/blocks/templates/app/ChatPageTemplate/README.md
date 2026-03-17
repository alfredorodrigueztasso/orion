# ChatPageTemplate (Template)

Full-featured chat interface with message history, participants sidebar, typing indicators, and message input with action buttons. Designed for both direct and group messaging scenarios.

## When to Use

| Scenario | Use ChatPageTemplate |
|----------|-------------------|
| Chat application interface | ✅ Yes - complete message UI |
| Real-time messaging | ✅ Yes - supports typing indicators |
| Customer support chat | ✅ Yes - with participant selection |
| One-on-one messaging | ✅ Yes - simplified for direct chat |
| Group chat interface | ✅ Yes - shows all participants |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Chat" | Chat window title |
| messages | ChatMessage[] | [] | Array of messages to display |
| inputPlaceholder | string | "Type a message..." | Input field placeholder |
| onSendMessage | (message: string) => void | — | Message send callback |
| participants | ChatParticipant[] | [] | List of chat participants |
| selectedParticipantId | string | — | Currently selected participant |
| onSelectParticipant | (id: string) => void | — | Participant selection callback |
| isTyping | boolean | false | Show typing indicator |
| isLoading | boolean | false | Disable input during load |
| error | string | — | Error message |
| className | string | — | Custom CSS class |

### ChatMessage Interface

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique message ID |
| role | "user" \| "assistant" | Message sender |
| content | string | Message text |
| timestamp | Date | Message time |
| status | "sending" \| "sent" \| "error" | Delivery status |

### ChatParticipant Interface

| Property | Type | Description |
|----------|------|-------------|
| id | string | Participant ID |
| name | string | Display name |
| avatar | string | Avatar image URL (optional) |
| status | "online" \| "offline" | Online status |

## Key Features

- **Message display** — Chronological list with timestamps
- **Typing indicator** — Animated dots during composition
- **Message status** — Sending, sent, error indicators
- **Auto-scroll** — Smooth scroll to latest message
- **Participants sidebar** — Optional participant list with status
- **Input area** — Textarea with file/emoji buttons
- **Enter-to-send** — Keyboard shortcut (Shift+Enter for newline)
- **Empty state** — Guidance when no messages

## Usage Example

```tsx
import { ChatPageTemplate } from "@orion-ds/react";

const [messages, setMessages] = useState([]);

<ChatPageTemplate
  title="Support Chat"
  messages={messages}
  onSendMessage={(text) => {
    setMessages([...messages, {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      status: "sent",
    }]);
  }}
  participants={[
    { id: "1", name: "Support Agent", status: "online" },
  ]}
  isTyping={false}
/>
```

## Component Composition

Built with:
- `Button` — Send action with icon
- Lucide Icons — Send, Paperclip, Smile icons
- Custom message bubbles — Styled for user/assistant roles
- Typing indicator animation — Three-dot sequence
- Textarea — Auto-expanding message input

## Accessibility

- Messages are structured semantically
- Send button has aria-label
- File and emoji buttons have aria-labels
- Keyboard support (Enter to send)
- Message timestamps are readable
- Typing indicator is announced

## Token Usage

- `--surface-base` — Chat background
- `--surface-layer` — Message bubbles
- `--text-primary` — Message content
- `--text-secondary` — Timestamps
- `--interactive-primary` — Send button
- `--border-subtle` — Dividers
- `--spacing-3` — Message padding
- `--radius-control` — Bubble corners
