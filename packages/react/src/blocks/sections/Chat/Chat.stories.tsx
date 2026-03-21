import type { Meta, StoryObj } from "@storybook/react";
import { ChatSection as Chat } from "./Chat";

const meta = {
  title: "Sections/Marketing/Chat",
  component: Chat,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

const messages = [
  { id: "1", role: "user" as const, content: "Hello! How can I use Orion?" },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "Orion is an AI-first design system with full component library support.",
  },
  { id: "3", role: "user" as const, content: "What are the main features?" },
  {
    id: "4",
    role: "assistant" as const,
    content:
      "Key features: components, design tokens, theming, and accessibility.",
  },
];

export const Default: Story = { args: { messages } };

export const WithConversations: Story = {
  args: {
    messages,
    conversations: [
      { id: "conv-1", title: "Conversation 1", updatedAt: new Date() },
      { id: "conv-2", title: "Conversation 2", updatedAt: new Date() },
    ],
    activeConversationId: "conv-1",
  },
};

export const AllVariants: Story = {
  args: { messages },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Chat {...args} />
      <Chat
        {...args}
        conversations={[
          { id: "conv-1", title: "Conversation 1", updatedAt: new Date() },
          { id: "conv-2", title: "Conversation 2", updatedAt: new Date() },
        ]}
        activeConversationId="conv-1"
      />
    </div>
  ),
};
