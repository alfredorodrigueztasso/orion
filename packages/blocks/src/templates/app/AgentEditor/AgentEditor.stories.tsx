import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AgentEditor } from "./AgentEditor";
import type { AgentEditorTab } from "./AgentEditor.types";
import { MultiAgentPanel } from "./MultiAgentPanel";
import { Building2, Star, Sparkles, Zap, Bot } from "lucide-react";
import type { AgentFolderProps } from "../../../sections/AgentFolder";

const meta: Meta<typeof AgentEditor> = {
  title: "Templates/ChatBuilder/AgentEditor",
  component: AgentEditor,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// === IDENTICAL DATA TO AgentWorkspace ===
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
  },
];

const sampleLooseAgents = [
  {
    id: "agent-loose-1",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=loose1",
    title: "Legacy Bot",
    description: "An older bot that hasn't been classified yet",
    timestamp: "Hace 3 meses",
  },
  {
    id: "agent-loose-2",
    avatar: <Bot size={32} />,
    title: "General Purpose Bot",
    description: "A general purpose bot for various tasks",
    timestamp: "Hace 1 mes",
  },
];

// === IDENTICAL navbar to AgentWorkspace Default story ===
function DefaultWrapper() {
  const [messages] = useState([
    {
      id: "1",
      role: "user" as const,
      content: "¿Hola, cómo estás?",
      status: "sent" as const,
    },
    {
      id: "2",
      role: "assistant" as const,
      content:
        "¡Hola! Estoy bien, gracias por preguntar. ¿Cómo puedo ayudarte hoy?",
      status: "sent" as const,
    },
  ]);

  // Tab state with onChange handlers (allows editing)
  const [tabValues, setTabValues] = useState<Record<string, string>>({
    comportamiento: "",
    memoria: "",
    general: "",
  });

  const tabs: AgentEditorTab[] = [
    {
      id: "comportamiento",
      label: "Comportamiento",
      language: "markdown",
      placeholder:
        "# Introduction & Scope\nYou are a virtual assistant designed to support users in this project.",
      value: tabValues.comportamiento,
      onChange: (val) =>
        setTabValues((prev) => ({ ...prev, comportamiento: val })),
    },
    {
      id: "memoria",
      label: "Memoria",
      language: "markdown",
      placeholder:
        "# Memory\nStore and reference important user information...",
      value: tabValues.memoria,
      onChange: (val) => setTabValues((prev) => ({ ...prev, memoria: val })),
    },
    {
      id: "general",
      label: "General",
      language: "markdown",
      placeholder: "# General Settings\nConfigure general behavior...",
      value: tabValues.general,
      onChange: (val) => setTabValues((prev) => ({ ...prev, general: val })),
    },
    {
      id: "multi-agente",
      label: "Multi agente",
      value: `{
  "agent_name": "AgentSoporteIA",
  "version": "1.0",
  "nodes": [
    {
      "id": "recibir_consulta",
      "type": "input",
      "description": "Recibe la consulta inicial del usuario",
      "next": "analizar_intencion"
    },
    {
      "id": "analizar_intencion",
      "type": "processing",
      "description": "Clasifica el tipo de solicitud",
      "next": "clasificar_urgencia"
    },
    {
      "id": "clasificar_urgencia",
      "type": "decision",
      "description": "Evalúa la prioridad del caso",
      "outputs": {
        "alta": "escalar_agente",
        "media": "resolver_directo",
        "baja": "respuesta_automatica"
      }
    },
    {
      "id": "escalar_agente",
      "type": "processing",
      "description": "Deriva al agente especialista",
      "next": "confirmar_escalamiento"
    },
    {
      "id": "resolver_directo",
      "type": "processing",
      "description": "Resuelve con base de conocimiento",
      "next": "verificar_resolucion"
    },
    {
      "id": "respuesta_automatica",
      "type": "processing",
      "description": "Envía respuesta automatizada",
      "next": "verificar_resolucion"
    },
    {
      "id": "confirmar_escalamiento",
      "type": "output",
      "description": "Notifica escalamiento al usuario"
    },
    {
      "id": "verificar_resolucion",
      "type": "decision",
      "description": "Confirma si el problema fue resuelto",
      "outputs": {
        "resuelto": "cerrar_ticket",
        "no_resuelto": "escalar_agente"
      }
    },
    {
      "id": "cerrar_ticket",
      "type": "output",
      "description": "Cierra el ticket de soporte"
    },
    {
      "id": "registrar_feedback",
      "type": "processing",
      "description": "Registra el feedback del usuario",
      "next": "fin_atencion"
    },
    {
      "id": "fin_atencion",
      "type": "output",
      "description": "Finaliza la sesión de atención"
    }
  ]
}`,
      editorSlot: (value, onChange) => (
        <MultiAgentPanel value={value} onChange={onChange} />
      ),
    },
  ];

  return (
    <AgentEditor
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
        onWorkspaceChange: (id: string) =>
          console.log("Workspace changed:", id),
        onWorkspaceSettings: () => console.log("Workspace settings"),
        onWorkspaceInvite: () => console.log("Invite participants"),
        onCreateWorkspace: () => console.log("Create workspace"),
        userName: "John Doe",
        userEmail: "john@example.com",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        onUserMenuClick: () => console.log("User menu"),
      }}
      folders={sampleFolders}
      looseAgents={sampleLooseAgents}
      helpCenters={[
        { id: "hc-1", name: "Centro UVM" },
        { id: "hc-2", name: "Centro Campus Online" },
      ]}
      activeNavNodeId="agent-1-edit"
      onNavNodeClick={(nodeId: string) => console.log("Nav click:", nodeId)}
      title="Editor"
      modelOptions={[
        { value: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5" },
        { value: "claude-sonnet-4-5-20250929", label: "Claude Sonnet 4.5" },
        { value: "claude-opus-4-20250514", label: "Claude Opus 4" },
        { value: "gpt-4.1", label: "GPT-4.1" },
      ]}
      selectedModel="claude-sonnet-4-5-20250929"
      onModelChange={(model: string) => console.log("Model:", model)}
      onNewConversation={() => console.log("New conversation")}
      tabs={tabs}
      onSave={(tabId: string, value: string) => {
        console.log(`📝 Saved ${tabId}:`, value);
      }}
      onCancel={(tabId: string) => {
        console.log(`❌ Cancelled ${tabId}`);
      }}
      messages={messages}
      onSendMessage={(msg: string) => console.log("Message:", msg)}
      previewTitle="Vista previa"
    />
  );
}

/**
 * Default - Visually identical family to AgentWorkspace
 * Same navbar, same NavTree sections, same styling
 * Shows split editor (Comportamiento tab) + live chat preview
 */
export const Default: Story = {
  render: () => <DefaultWrapper />,
  parameters: {
    // Disable autodocs for this story to prevent hanging during docs generation
    docs: { disable: true },
  },
};

/**
 * Empty - No messages
 */
export const Empty: Story = {
  render: () => (
    <AgentEditor
      navbar={{
        logo: <Building2 size={24} />,
        workspaceName: "Universidad Virtual de México",
        workspaces: [{ id: "uvm", name: "UVM", initials: "UVM" }],
        userName: "John Doe",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      }}
      folders={sampleFolders}
      looseAgents={sampleLooseAgents}
      activeNavNodeId="agent-1-edit"
      title="Editor"
      messages={[]}
      tabs={[]}
    />
  ),
  parameters: {
    docs: { disable: true },
  },
};

/**
 * With Typing Indicator
 */
export const WithTypingIndicator: Story = {
  render: () => (
    <AgentEditor
      navbar={{
        logo: <Building2 size={24} />,
        workspaceName: "Universidad Virtual de México",
        workspaces: [{ id: "uvm", name: "UVM", initials: "UVM" }],
        userName: "John Doe",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      }}
      folders={sampleFolders}
      looseAgents={sampleLooseAgents}
      activeNavNodeId="agent-1-edit"
      title="Editor"
      messages={[
        {
          id: "1",
          role: "user" as const,
          content: "Hola",
          status: "sent" as const,
        },
      ]}
      isTyping={true}
      tabs={[]}
    />
  ),
  parameters: {
    docs: { disable: true },
  },
};
