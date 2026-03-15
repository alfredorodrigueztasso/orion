/**
 * AgentWorkspace Stories
 *
 * Storybook stories for the Agent Workspace template.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AgentWorkspace } from "./AgentWorkspace";
import { EmptyState as EmptyStateComponent } from "../../../sections/EmptyState";
import { Button } from "@orion-ds/react";
import type { AgentFolderProps } from "../../../sections/AgentFolder";
import { Bot, Star, Sparkles, Zap, Building2 } from "lucide-react";

const meta: Meta<typeof AgentWorkspace> = {
  title: "Templates/ChatBuilder/AgentWorkspace",
  component: AgentWorkspace,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentWorkspace>;

// Sample folders data
const sampleFolders: AgentFolderProps[] = [
  {
    id: "folder-1",
    title: "Agentes postgrado",
    agentCount: 2,
    agents: [
      {
        id: "agent-1",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=uvm",
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
        description:
          "Coordinates intake, resolution and follow-up across multiple specialized support agents",
        timestamp: "Hace 5 horas",
        isMultiAgent: true,
      },
    ],
    defaultExpanded: true,
    sortOptions: [
      { label: "Más reciente", value: "recent" },
      { label: "Alfabético", value: "alpha" },
    ],
    selectedSort: "recent",
  },
  {
    id: "folder-2",
    title: "Multi agente campus Online",
    agentCount: 4,
    agents: [
      {
        id: "agent-3",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=campus1",
        title: "Campus Assistant",
        description:
          "Orchestrates enrollment, schedule and campus services agents to guide students end to end",
        timestamp: "Hace 1 día",
        isMultiAgent: true,
      },
      {
        id: "agent-4",
        avatar: <Bot size={32} />,
        title: "Student Support",
        description: "Answers common student questions",
        timestamp: "Hace 3 días",
      },
      {
        id: "agent-5",
        avatar: <Sparkles size={32} />,
        title: "Research Helper",
        description:
          "Delegates tasks to search, synthesis and citation agents for comprehensive academic research",
        timestamp: "Hace 1 semana",
        isMultiAgent: true,
      },
      {
        id: "agent-6",
        avatar: <Zap size={32} />,
        title: "Quick FAQ Bot",
        description: "Fast answers to frequently asked questions",
        timestamp: "Hace 2 semanas",
      },
    ],
    defaultExpanded: true,
    sortOptions: [
      { label: "Más reciente", value: "recent" },
      { label: "Alfabético", value: "alpha" },
    ],
    selectedSort: "recent",
  },
  {
    id: "folder-3",
    title: "Archived Agents",
    agentCount: 1,
    agents: [
      {
        id: "agent-7",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=old",
        title: "Legacy Bot",
        description: "Old version, no longer in use",
        timestamp: "Archivado hace 3 meses",
      },
    ],
    defaultExpanded: false,
  },
];

// Loose agents sample data
const sampleLooseAgents = [
  {
    id: "agent-loose-1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=loose1",
    title: "General Purpose Bot",
    description:
      "Unassigned multi-agent that coordinates multiple task-specific agents for any workflow",
    timestamp: "Hace 6 horas",
    isMultiAgent: true,
  },
];

// Helper to create dropHandler for stateful wrappers
function createDropHandler(
  setFolders: React.Dispatch<React.SetStateAction<any>>,
) {
  return (agentId: string, targetFolderId: string) => {
    setFolders((prevFolders: any[]) => {
      let sourceFolder: AgentFolderProps | null = null;
      let agentToMove = null;

      for (const folder of prevFolders) {
        const agent = folder.agents.find((a: any) => a.id === agentId);
        if (agent) {
          sourceFolder = folder;
          agentToMove = agent;
          break;
        }
      }

      if (!sourceFolder || !agentToMove || sourceFolder.id === targetFolderId) {
        return prevFolders;
      }

      return prevFolders.map((folder) => {
        if (folder.id === sourceFolder!.id) {
          return {
            ...folder,
            agents: folder.agents.filter((a: any) => a.id !== agentId),
            agentCount: folder.agents.length - 1,
          };
        }
        if (folder.id === targetFolderId) {
          return {
            ...folder,
            agents: [...folder.agents, agentToMove!],
            agentCount: folder.agents.length + 1,
          };
        }
        return folder;
      });
    });
  };
}

// Wrapper component that manages state for drag & drop
function DefaultWrapper() {
  const [folders, setFolders] = useState(
    sampleFolders.map((folder) => ({
      ...folder,
      agents: folder.agents.map((agent) => ({
        ...agent,
        draggable: true,
      })),
    })),
  );

  const handleDrop = createDropHandler(setFolders);

  return (
    <AgentWorkspace
      navbar={{
        logo: <Building2 size={24} />,
        workspaceName: "Universidad Virtual de México",
        workspaceIcon: <Building2 size={20} />,
        activeWorkspaceId: "uvm",
        workspaceRole: "Propietario",
        workspaceParticipantCount: 32,
        workspaces: [
          {
            id: "uvm",
            name: "Universidad Virtual de México",
            initials: "UVM",
            role: "Propietario",
          },
          {
            id: "campus",
            name: "Campus Online",
            initials: "CO",
            role: "Propietario",
          },
          {
            id: "postgrado",
            name: "Postgrado",
            initials: "PG",
            role: "Editor",
          },
          {
            id: "research",
            name: "Research Team",
            initials: "RT",
            role: "Viewer",
          },
          {
            id: "innovation",
            name: "Innovation Lab",
            initials: "IL",
            role: "Propietario",
          },
          {
            id: "development",
            name: "Development Hub",
            initials: "DH",
            role: "Editor",
          },
          {
            id: "quality",
            name: "Quality Assurance",
            initials: "QA",
            role: "Viewer",
          },
          {
            id: "support",
            name: "Customer Support",
            initials: "CS",
            role: "Propietario",
          },
          {
            id: "analytics",
            name: "Analytics Platform",
            initials: "AP",
            role: "Editor",
          },
        ],
        onWorkspaceChange: (id) => console.log("Workspace changed:", id),
        onWorkspaceSettings: () => console.log("Workspace settings"),
        onWorkspaceInvite: () => console.log("Invite participants"),
        onCreateWorkspace: () => console.log("Create workspace"),
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        userName: "John Doe",
        onUserMenuClick: () => console.log("User menu clicked"),
      }}
      pageHeader={{
        title: "Agentes IA",
        icon: <Sparkles size={28} />,
      }}
      folders={folders.map((folder) => ({
        ...folder,
        agents: folder.agents.map((agent) => ({
          ...agent,
          onClick: () => console.log("Agent clicked:", agent.id),
          onEdit: () => console.log("Edit agent:", agent.id),
          onDelete: () => console.log("Delete agent:", agent.id),
        })),
        onDrop: (agentId, folderId) => handleDrop(agentId, folderId),
        onSortChange: (value) =>
          console.log("Sort changed in folder", folder.id, ":", value),
        onFolderEdit: () => console.log("Rename folder:", folder.id),
        onFolderDelete: () => console.log("Delete folder:", folder.id),
        onFolderInvite: () => console.log("Invite to folder:", folder.id),
      }))}
      looseAgents={sampleLooseAgents}
      helpCenters={[
        { id: "hc-1", name: "Centro UVM" },
        { id: "hc-2", name: "Centro Campus Online" },
      ]}
      onCreateFolder={() => console.log("Create folder")}
      onCreateAgent={(folderId?: string) =>
        console.log("Create agent in:", folderId ?? "root")
      }
      onCreateHelpCenter={() => console.log("Create help center")}
      onEditFolder={(id) => console.log("Edit folder:", id)}
      onDeleteFolder={(id) => console.log("Delete folder:", id)}
      onMoveAgent={(id) => console.log("Move agent:", id)}
      onDeleteAgent={(id) => console.log("Delete agent:", id)}
      onEditHelpCenter={(id) => console.log("Edit help center:", id)}
      onDeleteHelpCenter={(id) => console.log("Delete help center:", id)}
      onNavNodeClick={(nodeId) => console.log("Nav click:", nodeId)}
      onInviteParticipants={() => console.log("Invite participants")}
      onSettings={() => console.log("Settings")}
      enableDragDrop={true}
    />
  );
}

// Default template - shows complete workspace with folders and loose agents
export const Default: Story = {
  render: () => <DefaultWrapper />,
};

// Empty state - shows complete template structure without folders
export const NoAgents: Story = {
  name: "EmptyState",
  args: {
    navbar: {
      logo: <Building2 size={24} />,
      workspaceName: "Universidad Virtual de México",
      workspaces: [
        { id: "uvm", name: "Universidad Virtual de México" },
        { id: "campus", name: "Campus Online" },
      ],
      onWorkspaceChange: (id) => console.log("Workspace changed:", id),
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=empty",
      userName: "Jane Doe",
      onUserMenuClick: () => console.log("User menu clicked"),
    },
    pageHeader: {
      title: "Agentes IA",
      icon: <Sparkles size={28} />,
    },
    folders: [],
    looseAgents: [],
    helpCenters: [
      { id: "hc-1", name: "Centro UVM" },
      { id: "hc-2", name: "Centro Campus Online" },
    ],
    onCreateFolder: () => console.log("Create folder"),
    onCreateAgent: (folderId?: string) =>
      console.log("Create agent in:", folderId ?? "root"),
    onCreateHelpCenter: () => console.log("Create help center"),
    onEditFolder: (id: string) => console.log("Edit folder:", id),
    onDeleteFolder: (id: string) => console.log("Delete folder:", id),
    onMoveAgent: (id: string) => console.log("Move agent:", id),
    onDeleteAgent: (id: string) => console.log("Delete agent:", id),
    onEditHelpCenter: (id: string) => console.log("Edit help center:", id),
    onDeleteHelpCenter: (id: string) => console.log("Delete help center:", id),
    onNavNodeClick: (nodeId: string) => console.log("Nav click:", nodeId),
    emptyState: (
      <EmptyStateComponent
        icon={<Bot size={48} />}
        title="Aún no tienes agentes"
        description="Crea tu primer agente de IA para empezar a automatizar tareas."
        action={<Button variant="primary">Nuevo agente</Button>}
      />
    ),
  },
};

// Without drag & drop
export const NoDragDrop: Story = {
  args: {
    pageHeader: {
      title: "Agentes IA",
      icon: <Sparkles size={28} />,
    },
    folders: sampleFolders.map((folder) => ({
      ...folder,
      agents: folder.agents.map((agent) => ({
        ...agent,
        onClick: () => console.log("Agent clicked:", agent.id),
        onEdit: () => console.log("Edit agent:", agent.id),
        onDelete: () => console.log("Delete agent:", agent.id),
      })),
      onFolderEdit: () => console.log("Rename folder:", folder.id),
      onFolderDelete: () => console.log("Delete folder:", folder.id),
      onFolderInvite: () => console.log("Invite to folder:", folder.id),
    })),
    looseAgents: sampleLooseAgents,
    enableDragDrop: false,
    onCreateFolder: () => console.log("Create folder"),
    onCreateAgent: () => console.log("Create agent"),
  },
};

// With interactive agents (edit/delete actions)
function InteractiveAgentsWrapper() {
  const [folders, setFolders] = useState(
    sampleFolders.map((folder) => ({
      ...folder,
      agents: folder.agents.map((agent) => ({
        ...agent,
        draggable: true,
      })),
    })),
  );

  const handleDrop = createDropHandler(setFolders);

  return (
    <AgentWorkspace
      pageHeader={{
        title: "Agentes IA",
        icon: <Sparkles size={28} />,
      }}
      folders={folders.map((folder) => ({
        ...folder,
        agents: folder.agents.map((agent) => ({
          ...agent,
          onClick: () => console.log("Agent clicked:", agent.id),
          onEdit: () => console.log("Edit agent:", agent.id),
          onDelete: () => console.log("Delete agent:", agent.id),
        })),
        onDrop: (agentId, folderId) => handleDrop(agentId, folderId),
        onFolderEdit: () => console.log("Rename folder:", folder.id),
        onFolderDelete: () => console.log("Delete folder:", folder.id),
        onFolderInvite: () => console.log("Invite to folder:", folder.id),
      }))}
      looseAgents={sampleLooseAgents.map((agent) => ({
        ...agent,
        onClick: () => console.log("Agent clicked:", agent.id),
        onEdit: () => console.log("Edit agent:", agent.id),
        onDelete: () => console.log("Delete agent:", agent.id),
      }))}
      onCreateFolder={() => console.log("Create folder")}
      onCreateAgent={() => console.log("Create agent")}
    />
  );
}

export const InteractiveAgents: Story = {
  render: () => <InteractiveAgentsWrapper />,
};

// Full featured (navbar + all interactions + drag & drop + loose agents)
function FullFeaturedWrapper() {
  const [folders, setFolders] = useState(
    sampleFolders.map((folder) => ({
      ...folder,
      agents: folder.agents.map((agent) => ({
        ...agent,
        draggable: true,
      })),
    })),
  );

  const handleDrop = createDropHandler(setFolders);

  return (
    <AgentWorkspace
      navbar={{
        logo: <Building2 size={24} />,
        workspaceName: "Universidad Virtual de México",
        workspaceIcon: <Building2 size={20} />,
        activeWorkspaceId: "uvm",
        workspaceRole: "Propietario",
        workspaceParticipantCount: 32,
        workspaces: [
          {
            id: "uvm",
            name: "Universidad Virtual de México",
            initials: "UVM",
            role: "Propietario",
          },
          {
            id: "campus",
            name: "Campus Online",
            initials: "CO",
            role: "Propietario",
          },
          {
            id: "postgrado",
            name: "Postgrado",
            initials: "PG",
            role: "Editor",
          },
          {
            id: "research",
            name: "Research Team",
            initials: "RT",
            role: "Viewer",
          },
          {
            id: "innovation",
            name: "Innovation Lab",
            initials: "IL",
            role: "Propietario",
          },
          {
            id: "development",
            name: "Development Hub",
            initials: "DH",
            role: "Editor",
          },
          {
            id: "quality",
            name: "Quality Assurance",
            initials: "QA",
            role: "Viewer",
          },
          {
            id: "support",
            name: "Customer Support",
            initials: "CS",
            role: "Propietario",
          },
          {
            id: "analytics",
            name: "Analytics Platform",
            initials: "AP",
            role: "Editor",
          },
        ],
        onWorkspaceChange: (id) => console.log("Workspace changed:", id),
        onWorkspaceSettings: () => console.log("Workspace settings"),
        onWorkspaceInvite: () => console.log("Invite participants"),
        onCreateWorkspace: () => console.log("Create workspace"),
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        userName: "John Doe",
        onUserMenuClick: () => console.log("User menu clicked"),
      }}
      pageHeader={{
        title: "Agentes IA",
        icon: <Sparkles size={28} />,
      }}
      folders={folders.map((folder) => ({
        ...folder,
        agents: folder.agents.map((agent) => ({
          ...agent,
          onClick: () => console.log("Agent clicked:", agent.id),
          onEdit: () => console.log("Edit agent:", agent.id),
          onDelete: () => console.log("Delete agent:", agent.id),
        })),
        onDrop: (agentId, folderId) => handleDrop(agentId, folderId),
        onSortChange: (value) =>
          console.log("Sort changed in folder", folder.id, ":", value),
        onFolderEdit: () => console.log("Rename folder:", folder.id),
        onFolderDelete: () => console.log("Delete folder:", folder.id),
        onFolderInvite: () => console.log("Invite to folder:", folder.id),
      }))}
      looseAgents={sampleLooseAgents.map((agent) => ({
        ...agent,
        draggable: true,
        onClick: () => console.log("Agent clicked:", agent.id),
        onEdit: () => console.log("Edit agent:", agent.id),
        onDelete: () => console.log("Delete agent:", agent.id),
      }))}
      helpCenters={[
        { id: "hc-1", name: "Centro UVM" },
        { id: "hc-2", name: "Centro Campus Online" },
      ]}
      onCreateFolder={() => console.log("Create folder")}
      onCreateAgent={(folderId?: string) =>
        console.log("Create agent in:", folderId ?? "root")
      }
      onCreateHelpCenter={() => console.log("Create help center")}
      onEditFolder={(id) => console.log("Edit folder:", id)}
      onDeleteFolder={(id) => console.log("Delete folder:", id)}
      onMoveAgent={(id) => console.log("Move agent:", id)}
      onDeleteAgent={(id) => console.log("Delete agent:", id)}
      onEditHelpCenter={(id) => console.log("Edit help center:", id)}
      onDeleteHelpCenter={(id) => console.log("Delete help center:", id)}
      onNavNodeClick={(nodeId) => console.log("Nav click:", nodeId)}
      onInviteParticipants={() => console.log("Invite participants")}
      onSettings={() => console.log("Settings")}
      enableDragDrop={true}
    />
  );
}

export const FullFeatured: Story = {
  render: () => <FullFeaturedWrapper />,
};

// Mobile view (responsive testing)
function MobileWrapper() {
  const [folders, setFolders] = useState(
    sampleFolders.slice(0, 2).map((folder) => ({
      ...folder,
      agents: folder.agents.map((agent) => ({
        ...agent,
        draggable: true,
      })),
    })),
  );

  const handleDrop = createDropHandler(setFolders);

  return (
    <AgentWorkspace
      navbar={{
        logo: <Building2 size={24} />,
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mobile",
      }}
      pageHeader={{
        title: "Agentes IA",
        icon: <Sparkles size={28} />,
      }}
      folders={folders.map((folder) => ({
        ...folder,
        onDrop: (agentId, folderId) => handleDrop(agentId, folderId),
      }))}
      looseAgents={sampleLooseAgents}
      helpCenters={[
        { id: "hc-1", name: "Centro UVM" },
        { id: "hc-2", name: "Centro Campus Online" },
      ]}
      onCreateFolder={() => console.log("Create folder")}
      onCreateAgent={(folderId?: string) =>
        console.log("Create agent in:", folderId ?? "root")
      }
      onCreateHelpCenter={() => console.log("Create help center")}
      onEditFolder={(id) => console.log("Edit folder:", id)}
      onDeleteFolder={(id) => console.log("Delete folder:", id)}
      onMoveAgent={(id) => console.log("Move agent:", id)}
      onDeleteAgent={(id) => console.log("Delete agent:", id)}
      onEditHelpCenter={(id) => console.log("Edit help center:", id)}
      onDeleteHelpCenter={(id) => console.log("Delete help center:", id)}
      onNavNodeClick={(nodeId) => console.log("Nav click:", nodeId)}
    />
  );
}

export const Mobile: Story = {
  render: () => <MobileWrapper />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
