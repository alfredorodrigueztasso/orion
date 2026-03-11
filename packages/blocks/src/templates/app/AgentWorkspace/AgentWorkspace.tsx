/**
 * AgentWorkspace
 *
 * Full page template for managing AI agents organized in collapsible folders and ungrouped agents.
 * Supports native HTML5 drag & drop between folders with rich visual feedback, sorting, and folder management.
 *
 * ## Drag & Drop System
 * Uses a hybrid approach combining:
 * - **@dnd-kit/core**: Provides DragOverlay for visual ghost card while dragging
 * - **Native HTML5 DnD**: AgentFolder implements native onDragOver/onDrop for responsive feedback
 *
 * ## Features
 * - **Drop target visual feedback**: Folders highlight when dragging agents over them
 * - **Dynamic insertion indicators**: Blue line shows exact drop position within folder
 * - **Real-time state updates**: Agents move between folders with state synchronization
 * - **Automatic cleanup**: Visual states reset after drop or when leaving folder
 * - **Workspace management**: Dropdown selector for switching between workspaces
 * - **Folder sorting**: Per-folder sort options
 * - **Loose agents**: Agents not assigned to any folder
 *
 * ## State Management
 * Parent component should implement:
 * - `onDrop` handler for each folder to move agents: `(agentId, targetFolderId, insertionIndex?) => void`
 * - State management for folders and their agents
 * - Optional: workspace switching, folder CRUD operations
 *
 * @example
 * ```tsx
 * const [folders, setFolders] = useState(initialFolders);
 *
 * const handleDrop = (agentId: string, targetFolderId: string, index?: number) => {
 *   setFolders(prev => {
 *     // Find source folder containing agent
 *     // Remove agent from source, add to target at specified index
 *     // Update agentCount in both folders
 *   });
 * };
 *
 * <AgentWorkspace
 *   navbar={{
 *     logo: <img src="/logo.svg" alt="Logo" />,
 *     workspaceName: 'My Workspace',
 *     userAvatar: '/avatar.jpg',
 *     userName: 'John Doe'
 *   }}
 *   pageHeader={{
 *     title: 'AI Agents',
 *     icon: <Bot size={24} />
 *   }}
 *   folders={folders.map(folder => ({
 *     ...folder,
 *     onDrop: (agentId, folderId, index) => handleDrop(agentId, folderId, index)
 *   }))}
 *   looseAgents={agentsWithoutFolder}
 *   enableDragDrop={true}
 * />
 * ```
 */

import React, { useState, useMemo } from "react";
import type { AgentWorkspaceProps, DragEndEvent } from "./AgentWorkspace.types";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { NavTree } from "@orion-ds/react";
import { UserMenu } from "@orion-ds/react";
import { PageHeader } from "@orion-ds/react";
import { AgentFolder } from "../../../sections/AgentFolder";
import { AgentCard } from "@orion-ds/react";
import { Button } from "@orion-ds/react";
import { Popover } from "@orion-ds/react";
import { Avatar } from "@orion-ds/react";
import { Divider } from "@orion-ds/react";
import {
  FolderPlus,
  Plus,
  ChevronDown,
  Sparkles,
  Settings,
  Users,
  Bot,
  FolderOpen,
  BookOpen,
  Users2,
  MessageCircle,
  Target,
  Edit2,
  BarChart3,
  MessageSquare,
  Database,
  Plug,
  Megaphone,
  CreditCard,
  LogOut,
  HelpCircle,
} from "lucide-react";
import type { NavTreeSection, NavTreeNode } from "@orion-ds/react";
import type { NavTreeActionConfig } from "@orion-ds/react";
import styles from "./AgentWorkspace.module.css";

export const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({
  navbar,
  pageHeader,
  folders = [],
  looseAgents,
  helpCenters,
  onCreateFolder,
  onCreateAgent,
  onCreateHelpCenter,
  onEditFolder,
  onDeleteFolder,
  onMoveAgent,
  onDeleteAgent,
  onEditHelpCenter,
  onDeleteHelpCenter,
  onInviteParticipants,
  onSettings,
  onNavNodeClick,
  activeNavNodeId: controlledActiveNavNodeId,
  sidebarWidth = 260,
  visibleSections,
  emptyState,
  enableDragDrop = true,
  className,
  ...rest
}) => {
  // State for sidebar navigation
  const [activeNavNodeId, setActiveNavNodeId] = useState<string | undefined>(
    controlledActiveNavNodeId,
  );

  // Drag & drop state
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [completedFolderId, setCompletedFolderId] = useState<string | null>(
    null,
  );

  // Helper function to get agent sub-pages (7 pages)
  const agentSubPages = (agentId: string) => [
    {
      id: `${agentId}-edit`,
      type: "page" as const,
      label: "Editar",
      icon: <Edit2 size={14} />,
    },
    {
      id: `${agentId}-metrics`,
      type: "page" as const,
      label: "Métricas",
      icon: <BarChart3 size={14} />,
    },
    {
      id: `${agentId}-conversations`,
      type: "page" as const,
      label: "Conversaciones",
      icon: <MessageSquare size={14} />,
    },
    {
      id: `${agentId}-datasources`,
      type: "page" as const,
      label: "Fuentes de datos",
      icon: <Database size={14} />,
    },
    {
      id: `${agentId}-integrations`,
      type: "page" as const,
      label: "Integraciones",
      icon: <Plug size={14} />,
    },
    {
      id: `${agentId}-campaigns`,
      type: "page" as const,
      label: "Campañas",
      icon: <Megaphone size={14} />,
    },
    {
      id: `${agentId}-settings`,
      type: "page" as const,
      label: "Configuración",
      icon: <Settings size={14} />,
    },
  ];

  // Build NavTree sections (Agentes IA, Centro de Ayuda, Comunidad)
  const navTreeSections = useMemo(() => {
    const sections: NavTreeSection[] = [];

    // Section: "Agentes IA" — folders + loose agents
    const agentNodes = [
      ...folders.map((folder) => ({
        id: folder.id,
        type: "folder" as const,
        label: folder.title,
        icon: <FolderOpen size={16} />,
        children: folder.agents.map((agent) => ({
          id: agent.id,
          type: "folder" as const,
          label: agent.title || "Agente sin nombre",
          icon:
            typeof agent.avatar === "string" ? (
              <Avatar
                size="xs"
                src={agent.avatar}
                initials={agent.title?.slice(0, 2).toUpperCase()}
              />
            ) : (
              <Avatar
                size="xs"
                icon={agent.avatar}
                initials={agent.title?.slice(0, 2).toUpperCase()}
              />
            ),
          children: agentSubPages(agent.id),
        })),
      })),
      ...(looseAgents ?? []).map((agent) => ({
        id: agent.id,
        type: "folder" as const,
        label: agent.title || "Agente sin nombre",
        icon:
          typeof agent.avatar === "string" ? (
            <Avatar
              size="xs"
              src={agent.avatar}
              initials={agent.title?.slice(0, 2).toUpperCase()}
            />
          ) : (
            <Avatar
              size="xs"
              icon={agent.avatar}
              initials={agent.title?.slice(0, 2).toUpperCase()}
            />
          ),
        children: agentSubPages(agent.id),
      })),
    ];
    // Calculate badge for agents section
    const agentsBadge =
      folders.reduce((acc, f) => acc + f.agents.length, 0) +
      (looseAgents?.length ?? 0);

    sections.push({
      id: "agents",
      title: "Agentes IA",
      icon: <Sparkles size={16} />,
      badge: agentsBadge,
      nodes: agentNodes,
      defaultExpanded: true,
    });

    // Section: "Centro de Ayuda" — only if helpCenters exist
    if (helpCenters && helpCenters.length > 0) {
      sections.push({
        id: "help-centers",
        title: "Centro de Ayuda",
        icon: <BookOpen size={16} />,
        badge: helpCenters.length,
        nodes: helpCenters.map((hc) => ({
          id: hc.id,
          type: "page" as const,
          label: hc.name,
          icon: hc.icon ?? <BookOpen size={14} />,
        })),
      });
    }

    // Section: "Comunidad" — fixed nodes
    sections.push({
      id: "community",
      title: "Comunidad",
      icon: <Users2 size={16} />,
      badge: 3,
      nodes: [
        {
          id: "community-contacts",
          type: "page" as const,
          label: "Contactos",
          icon: <Users2 size={14} />,
        },
        {
          id: "community-conversations",
          type: "page" as const,
          label: "Conversaciones",
          icon: <MessageCircle size={14} />,
        },
        {
          id: "community-segments",
          type: "page" as const,
          label: "Segmentos",
          icon: <Target size={14} />,
        },
      ],
    });

    return sections;
  }, [folders, looseAgents, helpCenters]);

  // Filter sections by visibleSections
  const sectionsToShow = useMemo(() => {
    if (!visibleSections) return navTreeSections;
    return navTreeSections.filter((s) => visibleSections.includes(s.id));
  }, [navTreeSections, visibleSections]);

  // Build NavTree actions
  const navTreeActions: NavTreeActionConfig = useMemo(
    () => ({
      onAdd: (parentId: string | null, sectionId: string) => {
        if (sectionId === "agents" && parentId === null) {
          onCreateFolder?.();
        } else if (sectionId === "agents" && parentId !== null) {
          onCreateAgent?.(parentId);
        } else if (sectionId === "help-centers") {
          onCreateHelpCenter?.();
        }
      },
      getCustomActions: (node: NavTreeNode) => {
        // Detect node type
        const isFolder = folders.some((f) => f.id === node.id);
        const isAgent =
          !isFolder &&
          (folders.some((f) => f.agents.some((a) => a.id === node.id)) ||
            looseAgents?.some((a) => a.id === node.id));
        const isHelpCenter = helpCenters?.some((hc) => hc.id === node.id);

        if (isFolder) {
          return [
            {
              id: "edit",
              label: "Editar",
              onClick: () => onEditFolder?.(node.id),
            },
            {
              id: "delete",
              label: "Eliminar",
              variant: "danger" as const,
              onClick: () => onDeleteFolder?.(node.id),
            },
          ];
        }
        if (isAgent) {
          return [
            {
              id: "move",
              label: "Mover a carpeta",
              onClick: () => onMoveAgent?.(node.id),
            },
            {
              id: "delete",
              label: "Eliminar",
              variant: "danger" as const,
              onClick: () => onDeleteAgent?.(node.id),
            },
          ];
        }
        if (isHelpCenter) {
          return [
            {
              id: "edit",
              label: "Editar",
              onClick: () => onEditHelpCenter?.(node.id),
            },
            {
              id: "delete",
              label: "Eliminar",
              variant: "danger" as const,
              onClick: () => onDeleteHelpCenter?.(node.id),
            },
          ];
        }
        return [];
      },
    }),
    [
      folders,
      looseAgents,
      helpCenters,
      onCreateFolder,
      onCreateAgent,
      onCreateHelpCenter,
      onEditFolder,
      onDeleteFolder,
      onMoveAgent,
      onDeleteAgent,
      onEditHelpCenter,
      onDeleteHelpCenter,
    ],
  );

  // Drag & drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
  );

  // Find the active agent being dragged
  const activeAgent = folders
    ?.flatMap((folder) => folder.agents)
    .find((agent) => agent.id === activeId);

  // Handle drag start
  const handleDragStart = (event: { active: { id: string | number } }) => {
    setActiveId(String(event.active.id));
  };

  // Handle drag over (to show drop target visual)
  const handleDragOver = (event: { over: { id: string | number } | null }) => {
    setOverId(event.over ? String(event.over.id) : null);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setOverId(null);
      return;
    }

    const agentId = String(active.id);
    const targetFolderId = String(over.id);

    // Find the folder that contains this agent
    const sourceFolder = folders?.find((folder) =>
      folder.agents.some((agent) => agent.id === agentId),
    );

    // Find the target folder
    const targetFolder = folders?.find(
      (folder) => folder.id === targetFolderId,
    );

    // If dropping into a different folder, set visual feedback
    // The actual drop handler is managed by AgentFolder's native onDrop with insertion index
    if (sourceFolder && targetFolder && sourceFolder.id !== targetFolder.id) {
      // Set completed feedback
      setCompletedFolderId(targetFolderId);
      setTimeout(() => setCompletedFolderId(null), 600);
    }

    setActiveId(null);
    setOverId(null);
  };

  // Build page header actions with create buttons
  const headerActions = (
    <div className={styles.headerActions}>
      {onCreateFolder && (
        <div className={styles.hideOnMobile}>
          <Button
            variant="secondary"
            icon={<FolderPlus size={20} />}
            onClick={onCreateFolder}
          >
            Nueva carpeta
          </Button>
        </div>
      )}
      {onCreateAgent && (
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => onCreateAgent()}
        >
          Nuevo agente
        </Button>
      )}
      {pageHeader?.actions}
    </div>
  );

  const classNames = [styles.template, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...rest}>
      {/* Sidebar */}
      <NavTree
        width={sidebarWidth}
        sections={sectionsToShow}
        activeNodeId={activeNavNodeId}
        persistKey="agent-workspace-nav"
        actions={navTreeActions}
        onNodeClick={(node) => {
          setActiveNavNodeId(node.id);
          onNavNodeClick?.(node.id);
        }}
        header={
          navbar?.workspaces && navbar.workspaces.length > 0 ? (
            <div className={styles.sidebarHeader}>
              <Popover
                trigger={
                  <button className={styles.workspaceButton}>
                    {(navbar.workspaceAvatar ||
                      navbar.workspaceIcon ||
                      navbar.workspaceInitials) && (
                      <Avatar
                        size="xs"
                        src={navbar.workspaceAvatar}
                        icon={navbar.workspaceIcon}
                        initials={navbar.workspaceInitials}
                      />
                    )}
                    <span className={styles.workspaceName}>
                      {navbar.workspaceName || "Workspace"}
                    </span>
                    <ChevronDown size={16} />
                  </button>
                }
                content={
                  <div className={styles.workspacePanel}>
                    {/* Header: workspace count */}
                    {navbar.workspaces.length > 0 && (
                      <div className={styles.workspacePanelCount}>
                        {navbar.workspaces.length} Organizaciones
                      </div>
                    )}

                    {/* Active workspace section */}
                    <div className={styles.workspacePanelActive}>
                      <Avatar
                        size="lg"
                        src={navbar.workspaceAvatar}
                        icon={navbar.workspaceIcon}
                        initials={navbar.workspaceInitials}
                      />
                      <div className={styles.workspacePanelInfo}>
                        <div className={styles.workspacePanelName}>
                          {navbar.workspaceName || "Workspace"}
                        </div>
                        {navbar.workspaceRole && (
                          <div className={styles.workspacePanelMeta}>
                            {navbar.workspaceRole}
                          </div>
                        )}
                        {navbar.workspaceParticipantCount !== undefined && (
                          <div className={styles.workspacePanelMeta}>
                            {navbar.workspaceParticipantCount} participantes
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    {(navbar.onWorkspaceSettings ||
                      navbar.onWorkspaceInvite) && (
                      <div className={styles.workspacePanelActions}>
                        {navbar.onWorkspaceSettings && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Settings size={16} />}
                            onClick={navbar.onWorkspaceSettings}
                          >
                            Configuración
                          </Button>
                        )}
                        {navbar.onWorkspaceInvite && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Users size={16} />}
                            onClick={navbar.onWorkspaceInvite}
                          >
                            Participantes
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Divider and list of other workspaces */}
                    {navbar.workspaces.length > 1 && (
                      <>
                        <div className={styles.workspacePanelDivider}>
                          <Divider />
                        </div>

                        <div className={styles.workspacePanelList}>
                          {navbar.workspaces
                            .filter(
                              (ws) =>
                                !navbar.activeWorkspaceId ||
                                ws.id !== navbar.activeWorkspaceId,
                            )
                            .map((workspace) => (
                              <div
                                key={workspace.id}
                                className={styles.workspaceListItem}
                                onClick={() =>
                                  navbar.onWorkspaceChange?.(workspace.id)
                                }
                              >
                                <Avatar
                                  size="xs"
                                  src={workspace.avatar}
                                  icon={workspace.icon}
                                  initials={workspace.initials}
                                />
                                <div className={styles.workspaceListItemInfo}>
                                  <div className={styles.workspaceListItemName}>
                                    {workspace.name}
                                  </div>
                                  {workspace.role && (
                                    <div
                                      className={styles.workspaceListItemRole}
                                    >
                                      {workspace.role}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {/* Footer: create workspace */}
                    <div className={styles.workspacePanelFooter}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Plus size={16} />}
                        onClick={navbar.onCreateWorkspace}
                      >
                        Nueva organización
                      </Button>
                    </div>
                  </div>
                }
                placement="bottom-start"
                showArrow={false}
              />
            </div>
          ) : null
        }
        footer={
          <div className={styles.sidebarFooter}>
            <UserMenu
              user={{
                name: navbar?.userName ?? "Usuario",
                email: navbar?.userEmail,
                avatar: navbar?.userAvatar,
                role: navbar?.workspaceRole,
                status: "online",
              }}
              sections={[
                {
                  id: "account",
                  label: "Mi Cuenta",
                  items: [
                    {
                      id: "profile",
                      label: "Mi Perfil",
                      icon: <Users2 size={16} />,
                    },
                    {
                      id: "preferences",
                      label: "Preferencias",
                      icon: <Settings size={16} />,
                    },
                  ],
                },
                {
                  id: "workspace",
                  label: "Espacio de Trabajo",
                  items: [
                    {
                      id: "workspace-settings",
                      label: "Configuración",
                      icon: <Settings size={16} />,
                    },
                    {
                      id: "invite",
                      label: "Invitar miembros",
                      icon: <Users2 size={16} />,
                    },
                  ],
                },
                {
                  id: "billing",
                  label: "Suscripción",
                  items: [
                    {
                      id: "subscription",
                      label: "Plan actual",
                      icon: <CreditCard size={16} />,
                    },
                    {
                      id: "billing-history",
                      label: "Historial de pagos",
                      icon: <CreditCard size={16} />,
                    },
                  ],
                },
                {
                  id: "support",
                  items: [
                    {
                      id: "help",
                      label: "Ayuda y soporte",
                      icon: <HelpCircle size={16} />,
                    },
                    {
                      id: "logout",
                      label: "Cerrar sesión",
                      icon: <LogOut size={16} />,
                      danger: true,
                      onClick: navbar?.onUserMenuClick,
                    },
                  ],
                },
              ]}
              align="start"
              placement="top"
              showHeader={true}
            />
          </div>
        }
      />

      {/* Main Content */}
      <main className={styles.content}>
        {/* Page Header */}
        <PageHeader
          title={
            <div className={styles.titleWithIcon}>
              <span className={styles.titleIcon}>
                {pageHeader?.icon || <Sparkles size={28} />}
              </span>
              <span>{pageHeader?.title || "Agentes IA"}</span>
            </div>
          }
          actions={headerActions}
          bordered={false}
          variant="transparent"
          className={styles.pageHeaderInContent}
        />

        {folders.length === 0 && (!looseAgents || looseAgents.length === 0) ? (
          // Empty state
          <div className={styles.emptyState}>
            {emptyState || (
              <>
                <Bot size={64} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No hay carpetas todavía</h3>
                <p className={styles.emptyDescription}>
                  Crea tu primera carpeta para organizar tus agentes de IA
                </p>
                {onCreateFolder && (
                  <Button
                    variant="primary"
                    icon={<FolderPlus size={20} />}
                    onClick={onCreateFolder}
                  >
                    Crear primera carpeta
                  </Button>
                )}
              </>
            )}
          </div>
        ) : enableDragDrop ? (
          // Drag & drop enabled
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className={styles.folders}>
              {folders.map((folder) => (
                <AgentFolder
                  key={folder.id}
                  {...folder}
                  isDropTarget={overId === folder.id}
                  isDropCompleted={completedFolderId === folder.id}
                  onDrop={(agentId, targetFolderId, insertionIndex) => {
                    // Call the parent handler to move the agent
                    folder.onDrop?.(agentId, targetFolderId, insertionIndex);
                  }}
                  agents={folder.agents.map((agent) => ({
                    ...agent,
                    draggable: true,
                    isDragging: agent.id === activeId,
                    availableFolders: folders
                      ?.filter((f) => f.id !== folder.id)
                      .map((f) => ({ id: f.id, title: f.title })),
                    onMoveToFolder: (targetFolderId: string) => {
                      const targetFolder = folders?.find(
                        (f) => f.id === targetFolderId,
                      );
                      targetFolder?.onDrop?.(agent.id, targetFolderId);
                    },
                  }))}
                />
              ))}
            </div>

            {/* Drag overlay (ghost card being dragged) */}
            <DragOverlay dropAnimation={{ duration: 150, easing: "ease-out" }}>
              {activeId && activeAgent ? (
                <div style={{ transform: "rotate(2deg)", cursor: "grabbing" }}>
                  <AgentCard {...activeAgent} isDragging />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          // No drag & drop
          <div className={styles.folders}>
            {folders.map((folder) => (
              <AgentFolder
                key={folder.id}
                {...folder}
                agents={folder.agents.map((agent) => ({
                  ...agent,
                  availableFolders: folders
                    ?.filter((f) => f.id !== folder.id)
                    .map((f) => ({ id: f.id, title: f.title })),
                  onMoveToFolder: (targetFolderId: string) => {
                    const targetFolder = folders?.find(
                      (f) => f.id === targetFolderId,
                    );
                    targetFolder?.onDrop?.(agent.id, targetFolderId);
                  },
                }))}
              />
            ))}
          </div>
        )}

        {/* Loose agents (agents without folder) */}
        {looseAgents && looseAgents.length > 0 && (
          <div className={styles.looseAgentsSection}>
            <Divider label="Sin carpeta" spacing="lg" />
            <div className={styles.looseAgentsGrid}>
              {looseAgents.map((agent) => (
                <div
                  key={agent.id}
                  draggable={enableDragDrop && agent.draggable}
                >
                  <AgentCard
                    {...agent}
                    availableFolders={folders?.map((f) => ({
                      id: f.id,
                      title: f.title,
                    }))}
                    onMoveToFolder={(targetFolderId: string) => {
                      const targetFolder = folders?.find(
                        (f) => f.id === targetFolderId,
                      );
                      targetFolder?.onDrop?.(agent.id, targetFolderId);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

AgentWorkspace.displayName = "AgentWorkspace";
