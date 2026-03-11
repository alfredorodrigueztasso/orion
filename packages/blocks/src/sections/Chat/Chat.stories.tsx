import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { ChatSection } from "./ChatSection";
import type { ChatMessage, ChatConversation } from "@orion-ds/react";

const meta = {
  title: "Sections/Chat/ChatSection",
  component: ChatSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
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
  {
    id: "5",
    title: "Database Design",
    preview: "Normalization helps reduce redundancy...",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    messageCount: 6,
  },
];

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
4. **useRef** - Creates a mutable reference
5. **useMemo** - Memoizes expensive calculations

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
    content: `Here's a simple example:

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

The \`useState(0)\` initializes state with value \`0\` and returns \`[currentValue, setterFunction]\`.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    status: "sent",
  },
];

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    conversations: sampleConversations,
    activeConversationId: "1",
    messages: sampleMessages,
    header: {
      title: "AI Assistant",
      subtitle: "Online",
    },
  },
  render: function DefaultStory(args) {
    const [activeId, setActiveId] = useState(args.activeConversationId);
    const [messages, setMessages] = useState<ChatMessage[]>(
      args.messages ?? [],
    );
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = useCallback((content: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
        status: "sent",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Phase 1: Thinking state
      setIsTyping(true);

      setTimeout(() => {
        // Phase 2: Streaming response
        setIsTyping(false);

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Thanks for your message! I'm here to help.\n\nThis is a simulated streaming response. In a real application, the message content would come from your AI backend. The **progressive text reveal** and **streaming cursor** are handled automatically by the template.",
          timestamp: new Date(),
          isStreaming: true,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 1200);
    }, []);

    return (
      <div style={{ height: "100vh" }}>
        <ChatSection
          {...args}
          activeConversationId={activeId}
          messages={messages}
          onSendMessage={handleSend}
          onSelectConversation={setActiveId}
          onNewConversation={() => alert("New conversation")}
          onDeleteConversation={(id) => alert(`Delete ${id}`)}
          isTyping={isTyping}
        />
      </div>
    );
  },
};

export const WithoutSidebar: Story = {
  args: {
    messages: sampleMessages,
    hideSidebar: true,
    header: {
      title: "Quick Chat",
      subtitle: "No sidebar mode",
    },
  },
  render: (args) => (
    <div style={{ height: "600px", maxWidth: "800px", margin: "0 auto" }}>
      <ChatSection {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    conversations: [],
    messages: [],
    header: {
      title: "New Chat",
    },
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <ChatSection
        {...args}
        onNewConversation={() => alert("Creating new conversation...")}
      />
    </div>
  ),
};

export const WithCustomInputConfig: Story = {
  args: {
    conversations: sampleConversations.slice(0, 2),
    activeConversationId: "1",
    messages: sampleMessages.slice(0, 2),
    header: {
      title: "Custom Input",
    },
    inputConfig: {
      placeholder: "Ask me anything about coding...",
      allowAttachments: true,
      allowVoiceRecording: true,
      maxLength: 1000,
    },
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <ChatSection {...args} />
    </div>
  ),
};

export const MobileView: Story = {
  args: {
    conversations: sampleConversations,
    activeConversationId: "1",
    messages: sampleMessages,
    header: {
      title: "Mobile Chat",
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <ChatSection {...args} />
    </div>
  ),
};

export const DarkMode: Story = {
  args: {
    conversations: sampleConversations,
    activeConversationId: "1",
    messages: sampleMessages,
    header: {
      title: "Dark Mode Chat",
    },
  },
  render: (args) => (
    <div
      data-theme="dark"
      style={{ height: "100vh", background: "var(--surface-base)" }}
    >
      <ChatSection {...args} />
    </div>
  ),
};
