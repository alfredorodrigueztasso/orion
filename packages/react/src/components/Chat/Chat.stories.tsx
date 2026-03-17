import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useCallback, useEffect } from "react";
import { Chat } from "./Chat";
import { useStreamingText } from "./hooks/useStreamingText";
import { Button } from "../Button";
import {
  MoreVertical,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import type {
  ChatMessage,
  ChatConversation,
  ChatAttachment,
} from "./Chat.types";

const meta: Meta<typeof Chat> = {
  title: "Components/Chat/Chat",
  component: Chat,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "600px", maxWidth: "900px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample messages for stories
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Hello! Can you help me understand how React hooks work?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "sent",
  },
  {
    id: "2",
    role: "assistant",
    content: `Of course! React hooks are functions that let you "hook into" React state and lifecycle features from function components. Here are the most commonly used hooks:

1. **useState** - Adds state to functional components
2. **useEffect** - Performs side effects (data fetching, subscriptions)
3. **useContext** - Subscribes to React context
4. **useRef** - Creates a mutable reference that persists across renders
5. **useMemo** - Memoizes expensive calculations
6. **useCallback** - Memoizes callback functions

Would you like me to explain any of these in more detail?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    status: "sent",
  },
  {
    id: "3",
    role: "user",
    content: "Yes, can you show me an example of useState?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    status: "sent",
  },
  {
    id: "4",
    role: "assistant",
    content: `Here's a simple example of \`useState\`:

\`\`\`tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

Key points:
- \`useState(0)\` initializes state with value \`0\`
- Returns array: \`[currentValue, setterFunction]\`
- Calling \`setCount\` triggers a re-render with new value

The state persists between re-renders, unlike regular variables.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    status: "sent",
  },
];

// Sample conversations for sidebar stories
const sampleConversations: ChatConversation[] = [
  {
    id: "1",
    title: "React Hooks Discussion",
    preview: "Here's a simple example of useState...",
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    messageCount: 4,
  },
  {
    id: "2",
    title: "TypeScript Generics",
    preview: "Generics allow you to write flexible...",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
    messageCount: 8,
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    preview: "Grid is perfect for 2D layouts...",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 3,
  },
  {
    id: "4",
    title: "Node.js Best Practices",
    preview: "Always use async/await for cleaner...",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    messageCount: 12,
  },
];

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="AI Assistant" subtitle="Online" />
      <Chat.Messages>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: "var(--spacing-4)",
            color: "var(--text-tertiary)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "var(--radius-full)",
              background: "var(--surface-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--font-size-24)",
            }}
          >
            ✨
          </div>
          <div>
            <h3
              style={{
                fontSize: "var(--font-size-20)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--text-primary)",
                marginBottom: "var(--spacing-2)",
              }}
            >
              How can I help you today?
            </h3>
            <p style={{ fontSize: "var(--font-size-14)" }}>
              Start a conversation by typing a message below.
            </p>
          </div>
        </div>
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
};

export const WithMessages: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="AI Assistant" />
      <Chat.Messages>
        {sampleMessages.map((msg) => (
          <Chat.Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
};

export const WithTypingIndicator: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="AI Assistant" />
      <Chat.Messages>
        <Chat.Message role="user" content="What is the meaning of life?" />
        <Chat.TypingIndicator />
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." disabled />
    </Chat>
  ),
};

// Helper: a message that streams in progressively
const StreamingAssistantMessage: React.FC<{
  text: string;
  onComplete?: () => void;
}> = ({ text, onComplete }) => {
  const { displayText, isComplete } = useStreamingText(text);

  useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete, onComplete]);

  return (
    <Chat.Message
      role="assistant"
      content={displayText}
      isStreaming={!isComplete}
    />
  );
};

export const StreamingMessage: Story = {
  render: function StreamingDemo() {
    const fullText =
      "Quantum computing uses quantum mechanics principles to process information. Unlike classical computers that use bits (0 or 1), quantum computers use qubits which can be in multiple states simultaneously through a property called superposition. This allows quantum computers to explore many solutions at once, making them incredibly powerful for certain types of problems like cryptography, drug discovery, and optimization.";

    return (
      <Chat>
        <Chat.Header title="AI Assistant" />
        <Chat.Messages>
          <Chat.Message
            role="user"
            content="Explain quantum computing in simple terms."
          />
          <StreamingAssistantMessage text={fullText} />
        </Chat.Messages>
        <Chat.Input placeholder="Type a message..." disabled />
      </Chat>
    );
  },
};

// ============================================================================
// MESSAGE VARIATIONS
// ============================================================================

export const MessageStates: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="Message States" />
      <Chat.Messages>
        <Chat.Message
          role="user"
          content="This message was sent successfully."
          status="sent"
          timestamp={new Date()}
        />
        <Chat.Message
          role="user"
          content="This message is being sent..."
          status="sending"
        />
        <Chat.Message
          role="user"
          content="This message failed to send."
          status="error"
        />
        <Chat.Message
          role="system"
          content="System notification: Connection restored."
        />
        <Chat.Message
          role="assistant"
          content="Assistant response with actions."
          actions={
            <>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<Copy size={16} />}
                aria-label="Copy"
              />
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<RefreshCw size={16} />}
                aria-label="Regenerate"
              />
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<ThumbsUp size={16} />}
                aria-label="Good response"
              />
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<ThumbsDown size={16} />}
                aria-label="Bad response"
              />
            </>
          }
        />
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
};

export const CodeBlocks: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="Code Examples" />
      <Chat.Messages>
        <Chat.Message
          role="user"
          content="Show me a Python function to calculate factorial."
        />
        <Chat.Message
          role="assistant"
          content={`Here's a Python function to calculate factorial:

\`\`\`python
def factorial(n):
    """Calculate factorial of n recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Example usage
print(factorial(5))  # Output: 120
\`\`\`

And here's an iterative version:

\`\`\`python
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
\`\`\`

Both approaches work, but the iterative version is more memory-efficient for large numbers.`}
        />
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
};

export const MarkdownFormatting: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="Markdown Support" />
      <Chat.Messages>
        <Chat.Message
          role="assistant"
          content={`# Markdown Formatting Demo

This message demonstrates **bold text**, *italic text*, and ~~strikethrough~~.

## Lists

Unordered list:
- Item one
- Item two
- Item three

Ordered list:
1. First item
2. Second item
3. Third item

## Links and Code

Visit [Anthropic](https://anthropic.com) for more info.

Inline \`code\` looks like this.

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Full support |
| Code blocks | ✅ | Syntax highlighting |
| Tables | ✅ | GFM style |

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

---

That's all the formatting!`}
        />
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
};

// ============================================================================
// ATTACHMENTS
// ============================================================================

const messageWithImageAttachment: ChatMessage = {
  id: "1",
  role: "user",
  content: "Can you analyze this image for me?",
  attachments: [
    {
      id: "img1",
      type: "image",
      name: "screenshot.png",
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200",
    },
  ],
};

const messageWithMultipleAttachments: ChatMessage = {
  id: "2",
  role: "user",
  content: "Here are the files you requested:",
  attachments: [
    {
      id: "img1",
      type: "image",
      name: "chart.png",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    },
    {
      id: "file1",
      type: "file",
      name: "report.pdf",
      size: 2400000,
      mimeType: "application/pdf",
    },
    {
      id: "audio1",
      type: "audio",
      name: "recording.mp3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: 180,
    },
  ],
};

export const WithAttachments: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="Attachments Demo" />
      <Chat.Messages>
        <Chat.Message
          role="user"
          content={messageWithImageAttachment.content}
          attachments={messageWithImageAttachment.attachments}
        />
        <Chat.Message
          role="assistant"
          content="I can see the image. It appears to be a code editor showing some programming work. The syntax highlighting suggests it might be JavaScript or TypeScript code."
        />
        <Chat.Message
          role="user"
          content={messageWithMultipleAttachments.content}
          attachments={messageWithMultipleAttachments.attachments}
        />
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." allowAttachments />
    </Chat>
  ),
};

export const CodeAttachment: Story = {
  render: () => {
    const codeAttachment: ChatAttachment = {
      id: "code1",
      type: "code",
      name: "example.ts",
      content: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}`,
      language: "typescript",
    };

    return (
      <Chat>
        <Chat.Header title="Code Attachment" />
        <Chat.Messages>
          <Chat.Message
            role="assistant"
            content="Here's the TypeScript code you requested:"
            attachments={[codeAttachment]}
          />
        </Chat.Messages>
        <Chat.Input placeholder="Type a message..." />
      </Chat>
    );
  },
};

// ============================================================================
// INTERACTIVE DEMO
// ============================================================================

export const Interactive: Story = {
  render: function InteractiveChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const [streamingText, setStreamingText] = useState<string | null>(null);
    const [streamingId, setStreamingId] = useState<string | null>(null);

    const handleStreamComplete = useCallback(() => {
      setMessages((prev) => {
        if (!streamingText || !streamingId) return prev;
        return [
          ...prev,
          {
            id: streamingId,
            role: "assistant" as const,
            content: streamingText,
            timestamp: new Date(),
          },
        ];
      });
      setStreamingText(null);
      setStreamingId(null);
    }, [streamingText, streamingId]);

    const handleSend = useCallback((content: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
        status: "sent",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Phase 1: Thinking (no content yet)
      setIsThinking(true);

      const responses: string[] = [
        "That's an interesting question! Let me think about it. There are several perspectives to consider here, and I want to make sure I give you a thorough answer that covers the key points.",
        "I understand what you're asking. Here's my perspective on this topic. The key insight is that complex problems often have elegant solutions when you break them down into smaller, manageable pieces.",
        "Great point! Here are some thoughts on that. First, it's important to understand the underlying principles. Then we can explore how they apply to your specific situation.",
        "Thanks for sharing that with me. I'd be happy to help! Let me walk you through the approach step by step so we can find the best solution together.",
      ];
      const randomIndex = Math.floor(Math.random() * responses.length);
      const responseText = responses[randomIndex] || "I'm here to help!";
      const id = (Date.now() + 1).toString();

      // Phase 2: Streaming (after thinking delay)
      setTimeout(() => {
        setIsThinking(false);
        setStreamingId(id);
        setStreamingText(responseText);
      }, 1200);
    }, []);

    const isBusy = isThinking || streamingText !== null;

    return (
      <Chat>
        <Chat.Header
          title="Interactive Chat"
          subtitle="Try sending a message!"
          actions={
            <Button
              variant="ghost"
              iconOnly
              icon={<MoreVertical size={20} />}
              aria-label="More options"
            />
          }
        />
        <Chat.Messages>
          {messages.map((msg) => (
            <Chat.Message
              key={msg.id}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
              status={msg.status}
            />
          ))}
          {isThinking && <Chat.TypingIndicator />}
          {streamingText && (
            <StreamingAssistantMessage
              key={streamingId}
              text={streamingText}
              onComplete={handleStreamComplete}
            />
          )}
        </Chat.Messages>
        <Chat.Input
          onSend={handleSend}
          placeholder="Type your message..."
          disabled={isBusy}
          allowAttachments
          allowVoiceRecording
        />
      </Chat>
    );
  },
};

// ============================================================================
// INPUT VARIATIONS
// ============================================================================

export const InputVariations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: "var(--spacing-2)",
            color: "var(--text-secondary)",
          }}
        >
          Default Input
        </h4>
        <Chat.Input placeholder="Type a message..." />
      </div>

      <div>
        <h4
          style={{
            marginBottom: "var(--spacing-2)",
            color: "var(--text-secondary)",
          }}
        >
          With All Features
        </h4>
        <Chat.Input
          placeholder="Type a message..."
          allowAttachments
          allowVoiceRecording
        />
      </div>

      <div>
        <h4
          style={{
            marginBottom: "var(--spacing-2)",
            color: "var(--text-secondary)",
          }}
        >
          Disabled
        </h4>
        <Chat.Input placeholder="Input is disabled..." disabled />
      </div>

      <div>
        <h4
          style={{
            marginBottom: "var(--spacing-2)",
            color: "var(--text-secondary)",
          }}
        >
          Loading State
        </h4>
        <Chat.Input placeholder="Sending..." isLoading />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================================================
// SIDEBAR
// ============================================================================

export const WithSidebar: Story = {
  render: function ChatWithSidebar() {
    const [activeId, setActiveId] = useState("1");

    return (
      <div
        style={{
          display: "flex",
          height: "600px",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-container)",
          overflow: "hidden",
        }}
      >
        <Chat.Sidebar
          conversations={sampleConversations}
          activeConversationId={activeId}
          onSelectConversation={setActiveId}
          onNewConversation={() => alert("New conversation")}
          onDeleteConversation={(id) => alert(`Delete conversation ${id}`)}
        />
        <div style={{ flex: 1 }}>
          <Chat>
            <Chat.Header
              title={
                sampleConversations.find((c) => c.id === activeId)?.title ||
                "Chat"
              }
            />
            <Chat.Messages>
              {sampleMessages.map((msg) => (
                <Chat.Message
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
            </Chat.Messages>
            <Chat.Input placeholder="Type a message..." />
          </Chat>
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ height: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================================================
// INDIVIDUAL COMPONENTS
// ============================================================================

export const TypingIndicator: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        padding: "var(--spacing-4)",
      }}
    >
      <Chat.TypingIndicator />
      <Chat.TypingIndicator label="Claude is thinking..." />
      <Chat.TypingIndicator label="Generating response..." />
    </div>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          background: "var(--surface-subtle)",
          padding: "var(--spacing-4)",
          borderRadius: "var(--radius-container)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CodeBlockStandalone: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
      }}
    >
      <Chat.CodeBlock
        code={`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}
        language="typescript"
      />

      <Chat.CodeBlock
        code={`SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;`}
        language="sql"
        showLineNumbers
      />

      <Chat.CodeBlock
        code={`{
  "name": "@orion-ds/react",
  "version": "2.0.1",
  "dependencies": {
    "react": "^19.0.0"
  }
}`}
        language="json"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export const AudioPlayer: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        maxWidth: "400px",
      }}
    >
      <Chat.AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="Voice message"
      />
      <Chat.AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        title="Audio note"
        duration={240}
      />
    </div>
  ),
};

export const FileUploadZone: Story = {
  render: () => (
    <Chat.FileUpload
      onFilesSelected={(files) => {
        alert(
          `Selected ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`,
        );
      }}
      accept={["image/*", "audio/*", ".pdf"]}
      multiple
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================================================
// DARK MODE / THEMING
// ============================================================================

export const DarkMode: Story = {
  render: () => (
    <Chat>
      <Chat.Header title="Dark Mode Chat" subtitle="System theme: Dark" />
      <Chat.Messages>
        {sampleMessages.slice(0, 2).map((msg) => (
          <Chat.Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
      </Chat.Messages>
      <Chat.Input placeholder="Type a message..." />
    </Chat>
  ),
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{
          height: "500px",
          background: "var(--surface-base)",
          borderRadius: "var(--radius-container)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
