import type { Meta, StoryObj } from "@storybook/react";
import { ChatPageTemplate } from "./ChatPageTemplate";

const meta = {
  title: "Templates/App/ChatPageTemplate",
  component: ChatPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatPageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Hello! Can you help me with my order?",
    timestamp: new Date(Date.now() - 300000),
    status: "sent" as const,
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "Of course! I'd be happy to help. Can you provide your order number?",
    timestamp: new Date(Date.now() - 250000),
    status: "sent" as const,
  },
  {
    id: "3",
    role: "user" as const,
    content: "My order number is #12345",
    timestamp: new Date(Date.now() - 180000),
    status: "sent" as const,
  },
  {
    id: "4",
    role: "assistant" as const,
    content:
      "Thank you! I found your order. It's currently in transit and should arrive in 2-3 business days.",
    timestamp: new Date(Date.now() - 120000),
    status: "sent" as const,
  },
];

const mockParticipants = [
  {
    id: "user-1",
    name: "Support Agent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
    status: "online" as const,
  },
  {
    id: "user-2",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    status: "online" as const,
  },
];

export const Default: Story = {
  args: {
    title: "Support Chat",
    messages: mockMessages,
    inputPlaceholder: "Type a message...",
    onSendMessage: (msg) => console.log("Message sent:", msg),
    participants: mockParticipants,
    selectedParticipantId: "user-1",
    onSelectParticipant: (id) => console.log("Selected:", id),
  },
};

export const Empty: Story = {
  args: {
    title: "New Chat",
    messages: [],
    inputPlaceholder: "Start typing to begin...",
    onSendMessage: (msg) => console.log("Message sent:", msg),
    participants: mockParticipants,
  },
};

export const WithTypingIndicator: Story = {
  args: {
    title: "Support Chat",
    messages: mockMessages,
    inputPlaceholder: "Type a message...",
    onSendMessage: (msg) => console.log("Message sent:", msg),
    isTyping: true,
    participants: mockParticipants,
  },
};

export const WithError: Story = {
  args: {
    title: "Support Chat",
    messages: mockMessages,
    error: "Connection lost",
    inputPlaceholder: "Type a message...",
    onSendMessage: (msg) => console.log("Message sent:", msg),
    participants: mockParticipants,
  },
};

export const Loading: Story = {
  args: {
    title: "Support Chat",
    messages: [],
    isLoading: true,
    inputPlaceholder: "Type a message...",
    onSendMessage: (msg) => console.log("Message sent:", msg),
    participants: mockParticipants,
  },
};
