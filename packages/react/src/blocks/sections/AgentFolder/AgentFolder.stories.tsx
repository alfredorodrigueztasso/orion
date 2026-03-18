/**
 * AgentFolder Section Stories
 *
 * Storybook stories for the AgentFolder section.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { AgentFolder } from "./AgentFolder";
import type { AgentCardProps } from "@orion-ds/react";
import { Bot, Sparkles, Star, Zap } from "lucide-react";

const meta: Meta<typeof AgentFolder> = {
  title: "Sections/App/AgentFolder",
  component: AgentFolder,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentFolder>;

// Sample agents data
const sampleAgents: AgentCardProps[] = [
  {
    id: "agent-1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent1",
    title: "UVM Agent",
    description: "Agent for Universidad Virtual de México",
    timestamp: "Hace 2 horas",
  },
  {
    id: "agent-2",
    avatar: (
      <Star
        size={32}
        fill="var(--status-warning)"
        color="var(--status-warning)"
      />
    ),
    title: "Premium Support",
    description: "Premium customer support agent",
    timestamp: "Hace 5 horas",
  },
];

const manyAgents: AgentCardProps[] = [
  {
    id: "agent-3",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=agent3",
    title: "Campus Online Agent",
    description: "Multi-agent system for online campus",
    timestamp: "Hace 1 día",
  },
  {
    id: "agent-4",
    avatar: <Bot size={32} />,
    title: "Student Support",
    description: "Helps students with common questions",
    timestamp: "Hace 3 días",
  },
  {
    id: "agent-5",
    avatar: <Sparkles size={32} />,
    title: "Research Assistant",
    description: "AI assistant for academic research",
    timestamp: "Hace 1 semana",
  },
  {
    id: "agent-6",
    avatar: <Zap size={32} />,
    title: "Quick Answers Bot",
    description: "Fast responses to common queries",
    timestamp: "Hace 2 semanas",
  },
];

const sortOptions = [
  { label: "Más reciente", value: "recent" },
  { label: "Alfabético", value: "alpha" },
  { label: "Por estado", value: "status" },
];

// Basic folder
export const Default: Story = {
  args: {
    id: "folder-1",
    title: "Agentes postgrado",
    agentCount: 2,
    agents: sampleAgents,
    defaultExpanded: true,
  },
};

// With sort options
export const WithSorting: Story = {
  args: {
    id: "folder-2",
    title: "Multi agente campus Online",
    agentCount: 4,
    agents: manyAgents.slice(0, 4),
    defaultExpanded: true,
    sortOptions: sortOptions,
    selectedSort: "recent",
    onSortChange: (value) => console.log("Sort changed:", value),
  },
};

// With folder actions
export const WithActions: Story = {
  args: {
    id: "folder-3",
    title: "Research Agents",
    agentCount: 3,
    agents: manyAgents.slice(0, 3),
    defaultExpanded: true,
    sortOptions: sortOptions,
    selectedSort: "recent",
    onSortChange: (value) => console.log("Sort changed:", value),
    onFolderEdit: () => console.log("Edit folder"),
    onFolderDelete: () => console.log("Delete folder"),
  },
};

// Collapsed state
export const Collapsed: Story = {
  args: {
    id: "folder-4",
    title: "Archived Agents",
    agentCount: 2,
    agents: sampleAgents,
    defaultExpanded: false,
  },
};

// Empty folder
export const Empty: Story = {
  args: {
    id: "folder-5",
    title: "New Folder",
    agentCount: 0,
    agents: [],
    defaultExpanded: true,
  },
};

// Drop target (active)
export const DropTarget: Story = {
  args: {
    id: "folder-6",
    title: "Drop Zone Active",
    agentCount: 2,
    agents: sampleAgents,
    defaultExpanded: true,
    isDropTarget: true,
  },
};

// Many agents (grid demonstration)
export const ManyAgents: Story = {
  args: {
    id: "folder-7",
    title: "All Agents Collection",
    agentCount: 6,
    agents: manyAgents,
    defaultExpanded: true,
    sortOptions: sortOptions,
    selectedSort: "recent",
  },
};

// Draggable agents
export const DraggableAgents: Story = {
  args: {
    id: "folder-8",
    title: "Draggable Agents",
    agentCount: 4,
    agents: manyAgents.slice(0, 4).map((agent) => ({
      ...agent,
      draggable: true,
    })),
    defaultExpanded: true,
    onDrop: (agentId, folderId) =>
      console.log("Agent dropped:", agentId, "into folder:", folderId),
  },
};

// Multiple folders example
export const MultipleFolders: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
      }}
    >
      <AgentFolder
        id="folder-a"
        title="Agentes postgrado"
        agentCount={2}
        agents={sampleAgents}
        defaultExpanded={true}
        sortOptions={sortOptions}
        selectedSort="recent"
      />
      <AgentFolder
        id="folder-b"
        title="Multi agente campus Online"
        agentCount={4}
        agents={manyAgents.slice(0, 4)}
        defaultExpanded={true}
        sortOptions={sortOptions}
        selectedSort="recent"
      />
      <AgentFolder
        id="folder-c"
        title="Archived Projects"
        agentCount={2}
        agents={manyAgents.slice(4, 6)}
        defaultExpanded={false}
      />
    </div>
  ),
};

// Interactive with agents having actions
export const WithAgentActions: Story = {
  args: {
    id: "folder-9",
    title: "Editable Agents",
    agentCount: 3,
    agents: manyAgents.slice(0, 3).map((agent) => ({
      ...agent,
      onClick: () => console.log("Agent clicked:", agent.id),
      onEdit: () => console.log("Edit agent:", agent.id),
      onDelete: () => console.log("Delete agent:", agent.id),
    })),
    defaultExpanded: true,
  },
};
