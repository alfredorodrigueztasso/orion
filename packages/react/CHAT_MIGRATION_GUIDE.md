# Chat Component — Deprecation & Migration Guide

> ⚠️ **Deprecated in v5.1.13** — Chat will be removed in **v5.2.0 (April 2026)**.

## Timeline

| Version | Date     | Status                             |
| ------- | -------- | ---------------------------------- |
| v5.1.13 | Mar 2026 | Deprecated — console warning added |
| v5.2.0  | Apr 2026 | **Removed entirely**               |

## Why Deprecated?

Orion focuses on **primitives-first** components (Button, Card, Input, Modal, Field).
Chat is a specialized component — better handled by dedicated libraries or built
custom with Orion's primitives.

## Alternatives

### Option 1: Use a Specialized Library

```bash
npm install react-chat-elements
```

Drop-in replacement with similar API. Maintained by dedicated team.

Other options: `react-chat-ui`, Vercel AI SDK (`ai` package).

### Option 2: Build Custom with Orion Primitives

Full control + Orion token system + stays up-to-date:

```tsx
import { Button, Card, Input, Modal } from "@orion-ds/react";

function ChatMessage({ role, content }) {
  return (
    <div className={role === "user" ? "user-msg" : "assistant-msg"}>
      <Card>{content}</Card>
    </div>
  );
}

function ChatInterface() {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="input-area">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
```

### Option 3: Keep Using Until v5.2.0

Chat continues to work in all v5.x releases. No breaking changes until April 2026.
Import stays as-is: `import { Chat } from '@orion-ds/react/rich'`

## Questions?

Open a discussion on GitHub or check `CLAUDE.md` for alternatives.
