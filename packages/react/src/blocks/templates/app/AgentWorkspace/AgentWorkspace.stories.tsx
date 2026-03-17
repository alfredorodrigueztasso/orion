import type { Meta, StoryObj } from "@storybook/react";
import { AgentWorkspace } from "./AgentWorkspace";

const meta = {
  title: "Templates/App/AgentWorkspace",
  component: AgentWorkspace,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AgentWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAgents = [
  {
    id: "agent-1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets",
    status: "active" as const,
    lastUpdated: new Date("2024-03-10"),
    usageCount: 1250,
  },
  {
    id: "agent-2",
    name: "Content Moderator",
    description: "Reviews and moderates user-generated content",
    status: "active" as const,
    lastUpdated: new Date("2024-03-09"),
    usageCount: 890,
  },
  {
    id: "agent-3",
    name: "Sales Assistant",
    description: "Assists with sales inquiries and product recommendations",
    status: "inactive" as const,
    lastUpdated: new Date("2024-03-01"),
    usageCount: 450,
  },
  {
    id: "agent-4",
    name: "Data Analyzer",
    description: "Processes and analyzes large datasets",
    status: "error" as const,
    lastUpdated: new Date("2024-02-28"),
    usageCount: 120,
  },
];

export const Default: Story = {
  args: {
    title: "Agent Workspace",
    subtitle: "Manage and monitor your AI agents",
    agents: mockAgents,
    selectedAgentId: "agent-1",
    onSelectAgent: (id) => console.log("Selected agent:", id),
    onCreateAgent: () => console.log("Create new agent"),
    onEditAgent: (id) => console.log("Edit agent:", id),
    onDeleteAgent: (id) => console.log("Delete agent:", id),
  },
};

export const Empty: Story = {
  args: {
    title: "Agent Workspace",
    subtitle: "Manage and monitor your AI agents",
    agents: [],
    onCreateAgent: () => console.log("Create new agent"),
    onSelectAgent: (id) => console.log("Selected agent:", id),
  },
};

export const WithError: Story = {
  args: {
    title: "Agent Workspace",
    agents: mockAgents,
    error: "Failed to load agents. Please try again.",
    onSelectAgent: (id) => console.log("Selected agent:", id),
    onCreateAgent: () => console.log("Create new agent"),
  },
};

export const Loading: Story = {
  args: {
    title: "Agent Workspace",
    agents: [],
    isLoading: true,
    onCreateAgent: () => console.log("Create new agent"),
    onSelectAgent: (id) => console.log("Selected agent:", id),
  },
};
