/**
 * AgentCard Component Stories
 *
 * Storybook stories for the AgentCard component.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { AgentCard } from "./AgentCard";
import { Bot, Sparkles } from "lucide-react";

const meta: Meta<typeof AgentCard> = {
  title: "Components/Data Display/AgentCard",
  component: AgentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isMultiAgent: {
      control: "boolean",
      description:
        'Shows a "Multi" badge. Only multi-agents display a badge; single agents show nothing.',
    },
    draggable: {
      control: "boolean",
      description: "Enables HTML5 drag & drop with grab cursor",
    },
    isDragging: {
      control: "boolean",
      description: "Dragging state — dims card and applies scale(0.98)",
    },
    onClick: { action: "clicked" },
    onEdit: { action: "edit" },
    onDelete: { action: "delete" },
  },
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

// Basic agent card — no badge
export const Default: Story = {
  args: {
    id: "agent-1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent1",
    title: "Customer Support Agent",
    description:
      "Handles customer inquiries, support tickets, and common questions with intelligent responses.",
    timestamp: "Updated 2 hours ago",
  },
};

// Multi-agent card — shows "Multi" badge
export const MultiAgent: Story = {
  args: {
    id: "agent-multi",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agentmulti",
    title: "Orchestration Agent",
    description:
      "Coordinates multiple specialized agents to handle complex workflows end to end.",
    timestamp: "Updated 1 hour ago",
    isMultiAgent: true,
  },
};

// With icon avatar instead of image
export const WithIconAvatar: Story = {
  args: {
    id: "agent-5",
    avatar: <Bot size={32} />,
    title: "AI Assistant",
    description: "General purpose AI assistant for various tasks",
    timestamp: "Updated 1 hour ago",
  },
};

// Interactive with actions menu
export const WithActions: Story = {
  args: {
    id: "agent-7",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent7",
    title: "Editable Agent",
    description: "This agent card has edit and delete actions in the menu",
    timestamp: "Updated 3 hours ago",
    onClick: () => console.log("Card clicked"),
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
};

// Draggable
export const Draggable: Story = {
  args: {
    id: "agent-8",
    avatar: <Sparkles size={32} />,
    title: "Draggable Agent",
    description: "This agent card can be dragged and dropped",
    timestamp: "Updated 1 day ago",
    draggable: true,
  },
};

// Long description (2-line ellipsis test)
export const LongDescription: Story = {
  args: {
    id: "agent-9",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent9",
    title: "Research Agent",
    description:
      "This is a very long description that should be truncated after two lines. It contains lots of text to demonstrate the ellipsis behavior when content exceeds the maximum allowed lines. The text should be cut off with an ellipsis (...) after the second line.",
    timestamp: "Updated 4 hours ago",
  },
};

// No description — space is still reserved to keep uniform height
export const NoDescription: Story = {
  args: {
    id: "agent-nodesc",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=nodesc",
    title: "Minimal Agent",
    timestamp: "Updated today",
  },
};

// Grid layout — verifies all cards are the same height regardless of description length
export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "var(--spacing-4)",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <AgentCard
        id="grid-1"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=grid1"
        title="Customer Support Agent"
        description="Handles customer inquiries and support tickets with intelligent responses"
        timestamp="Updated 2 hours ago"
        onClick={() => console.log("Agent 1 clicked")}
        onEdit={() => console.log("Edit Agent 1")}
        onDelete={() => console.log("Delete Agent 1")}
      />
      <AgentCard
        id="grid-2"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=grid2"
        title="Sales Assistant"
        description="Short description."
        timestamp="Updated 5 hours ago"
        onClick={() => console.log("Agent 2 clicked")}
        onEdit={() => console.log("Edit Agent 2")}
        onDelete={() => console.log("Delete Agent 2")}
      />
      <AgentCard
        id="grid-3"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=grid3"
        title="Marketing Analyst"
        timestamp="Updated 1 day ago"
        onClick={() => console.log("Agent 3 clicked")}
        onEdit={() => console.log("Edit Agent 3")}
        onDelete={() => console.log("Delete Agent 3")}
      />
      <AgentCard
        id="grid-4"
        avatar={<Bot size={32} />}
        title="AI Research Orchestrator"
        description="Coordinates multiple research agents to synthesize information from diverse sources and produce comprehensive reports"
        timestamp="Updated 3 hours ago"
        isMultiAgent
        onClick={() => console.log("Agent 4 clicked")}
        onEdit={() => console.log("Edit Agent 4")}
        onDelete={() => console.log("Delete Agent 4")}
      />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

// Dragging state
export const DraggingState: Story = {
  args: {
    id: "agent-10",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent10",
    title: "Dragging Agent",
    description: "This card is in the dragging state",
    timestamp: "Just now",
    draggable: true,
    isDragging: true,
  },
};
