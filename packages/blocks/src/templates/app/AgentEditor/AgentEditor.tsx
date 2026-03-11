import React, { useState, useEffect } from "react";
import type { AgentEditorProps, AgentEditorTab } from "./AgentEditor.types";
import { NavTree } from "@orion-ds/react";
import { UserMenu } from "@orion-ds/react";
import { PageHeader } from "@orion-ds/react";
import { CodeEditor } from "@orion-ds/react";
import { Card } from "@orion-ds/react";
import { ToggleGroup } from "@orion-ds/react";
import { Chat } from "@orion-ds/react";
import { Button } from "@orion-ds/react";
import { Popover } from "@orion-ds/react";
import { Avatar } from "@orion-ds/react";
import { Divider } from "@orion-ds/react";
import {
  ChevronDown,
  Plus,
  Users,
  Settings,
  CreditCard,
  LogOut,
  HelpCircle,
  Users2,
  PenLine,
} from "lucide-react";
import styles from "./AgentEditor.module.css";

/**
 * AgentEditor
 *
 * A split-panel template for editing AI agent system prompts with live chat preview.
 * Mirrors the sidebar structure of AgentWorkspace for visual continuity.
 *
 * @example
 * ```tsx
 * <AgentEditor
 *   navbar={{
 *     workspaceName: 'My Workspace',
 *     userName: 'John Doe',
 *   }}
 *   navSections={agentSections}
 *   activeNavNodeId="agent-1-edit"
 *   messages={chatMessages}
 *   onSendMessage={(msg) => console.log(msg)}
 * />
 * ```
 */
export const AgentEditor: React.FC<AgentEditorProps> = ({
  // Sidebar
  navbar,
  navSections,
  activeNavNodeId: controlledActiveNavNodeId,
  onNavNodeClick,
  sidebarWidth = 260,

  // In-content header
  title = "Editor",
  modelOptions = [],
  selectedModel,
  onModelChange,
  onNewConversation,

  // Editor panel
  tabs: customTabs,
  activeTab: controlledActiveTab,
  onTabChange,
  onSave,
  onCancel,
  leftPanelWidth = "60%",

  // Chat preview
  previewTitle = "Vista previa",
  messages = [],
  onSendMessage,
  isTyping = false,
  isLoading = false,
  chatInputConfig,
  emptyPreviewState,

  className,
  ...rest
}) => {
  // Sidebar state
  const [activeNavNodeId, setActiveNavNodeId] = useState<string | undefined>(
    controlledActiveNavNodeId,
  );

  // Default tabs
  const defaultTabs: AgentEditorTab[] = [
    {
      id: "comportamiento",
      label: "Comportamiento",
      language: "markdown",
      placeholder:
        "# Introduction & Scope\nYou are a virtual assistant designed to support users in this project.",
      value: "",
    },
    {
      id: "memoria",
      label: "Memoria",
      language: "markdown",
      placeholder:
        "# Memory\nStore and reference important user information...",
      value: "",
    },
    {
      id: "general",
      label: "General",
      language: "markdown",
      placeholder: "# General Settings\nConfigure general behavior...",
      value: "",
    },
  ];

  const tabs = customTabs || defaultTabs;

  // Determine active tab
  const [localActiveTab, setLocalActiveTab] = useState<string>(
    controlledActiveTab || tabs[0]?.id || "comportamiento",
  );

  const activeTab = controlledActiveTab || localActiveTab;

  // Dirty tracking: edited values per tab
  const [editedValues, setEditedValues] = useState<Record<string, string>>(
    () => {
      const map: Record<string, string> = {};
      tabs.forEach((t) => {
        map[t.id] = t.value ?? "";
      });
      return map;
    },
  );

  // Track which tabs have unsaved changes
  const [dirtyTabs, setDirtyTabs] = useState<Set<string>>(new Set());

  const handleTabChange = (newTabId: string) => {
    setLocalActiveTab(newTabId);
    onTabChange?.(newTabId);
  };

  // Sync editedValues when tab values change externally (only for clean tabs)
  useEffect(() => {
    setEditedValues((prev) => {
      const next = { ...prev };
      tabs.forEach((t) => {
        if (!dirtyTabs.has(t.id)) {
          next[t.id] = t.value ?? "";
        }
      });
      return next;
    });
  }, [tabs]);

  // Handle editor value changes with dirty tracking
  const handleEditorChange = (val: string) => {
    const activeTabDef = tabs.find((t) => t.id === activeTab);
    setEditedValues((prev) => ({ ...prev, [activeTab]: val }));

    const original = activeTabDef?.value ?? "";
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      val !== original ? next.add(activeTab) : next.delete(activeTab);
      return next;
    });

    // Propagate to tab's onChange if it exists
    activeTabDef?.onChange?.(val);
  };

  // Save current tab's changes
  const handleSave = () => {
    const activeTabDef = tabs.find((t) => t.id === activeTab);
    const value = editedValues[activeTab] ?? "";
    activeTabDef?.onSave?.(value);
    onSave?.(activeTab, value);
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      next.delete(activeTab);
      return next;
    });
  };

  // Cancel current tab's changes
  const handleCancel = () => {
    const activeTabDef = tabs.find((t) => t.id === activeTab);
    setEditedValues((prev) => ({
      ...prev,
      [activeTab]: activeTabDef?.value ?? "",
    }));
    setDirtyTabs((prev) => {
      const next = new Set(prev);
      next.delete(activeTab);
      return next;
    });
    activeTabDef?.onCancel?.();
    onCancel?.(activeTab);
  };

  // Find the active tab definition
  const activeTabDef = tabs.find((t) => t.id === activeTab);

  // Handle nav node click
  const handleNavNodeClick = (nodeId: string) => {
    setActiveNavNodeId(nodeId);
    onNavNodeClick?.(nodeId);
  };

  // Build workspace switcher header (same pattern as AgentWorkspace)
  const sidebarHeader =
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
              {navbar.workspaces.length > 0 && (
                <div className={styles.workspacePanelCount}>
                  {navbar.workspaces.length} Organizaciones
                </div>
              )}

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

              {(navbar.onWorkspaceSettings || navbar.onWorkspaceInvite) && (
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
                              <div className={styles.workspaceListItemRole}>
                                {workspace.role}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}

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
    ) : null;

  // Build sidebar footer (UserMenu)
  const sidebarFooter = (
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
              { id: "profile", label: "Mi Perfil", icon: <Users2 size={16} /> },
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
  );

  const templateClasses = [styles.template, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={templateClasses} {...rest}>
      {/* Sidebar with NavTree */}
      <NavTree
        width={sidebarWidth}
        sections={navSections || []}
        activeNodeId={activeNavNodeId}
        persistKey="agent-editor-nav"
        onNodeClick={(node) => handleNavNodeClick(node.id)}
        header={sidebarHeader}
        footer={sidebarFooter}
      />

      {/* Main content */}
      <main className={styles.content}>
        {/* Page Header - matches AgentWorkspace style */}
        <PageHeader
          title={
            <div className={styles.titleWithIcon}>
              <span className={styles.titleIcon}>
                <PenLine size={28} />
              </span>
              <span>{title}</span>
            </div>
          }
          actions={
            <div className={styles.headerActions}>
              {modelOptions.length > 0 && (
                <Popover
                  trigger={
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<ChevronDown size={16} />}
                      iconRight={<ChevronDown size={16} />}
                    >
                      {selectedModel
                        ? modelOptions.find(
                            (opt) => opt.value === selectedModel,
                          )?.label || "Select model..."
                        : "Select model..."}
                    </Button>
                  }
                  content={
                    <div className={styles.modelPanel}>
                      {modelOptions.map((option) => (
                        <div
                          key={option.value}
                          className={styles.modelItem}
                          onClick={() => {
                            onModelChange?.(option.value);
                          }}
                          role="option"
                          aria-selected={selectedModel === option.value}
                        >
                          <span className={styles.modelItemLabel}>
                            {option.label}
                          </span>
                          {selectedModel === option.value && (
                            <span className={styles.modelItemCheck}>✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  }
                  placement="bottom-start"
                  showArrow={false}
                  offset={4}
                  closeOnClickOutside
                />
              )}
              {onNewConversation && (
                <Button
                  variant="primary"
                  size="md"
                  icon={<Plus size={20} />}
                  onClick={onNewConversation}
                >
                  Nueva conversación
                </Button>
              )}
            </div>
          }
          bordered={false}
          variant="transparent"
          className={styles.pageHeaderInContent}
        />

        {/* Split area: left editor + right chat */}
        <div className={styles.splitArea}>
          {/* Left panel: editor */}
          <div
            className={styles.editorPanel}
            style={{ flex: `0 0 ${leftPanelWidth}` }}
          >
            <Card variant="base" className={styles.panelCard}>
              {/* Editor tab selector */}
              <div className={styles.tabsBar}>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="md"
                  value={activeTab}
                  onValueChange={(val) => handleTabChange(val as string)}
                >
                  {tabs.map((tab) => (
                    <ToggleGroup.Item key={tab.id} value={tab.id}>
                      {tab.label}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup>
              </div>

              {/* Editor content */}
              <div className={styles.editorContent}>
                {activeTabDef?.editorSlot ? (
                  activeTabDef.editorSlot(
                    editedValues[activeTab] ?? activeTabDef?.value ?? "",
                    handleEditorChange,
                  )
                ) : (
                  <CodeEditor
                    className={styles.codeEditorFull}
                    value={editedValues[activeTab] ?? activeTabDef?.value ?? ""}
                    onChange={handleEditorChange}
                    language={activeTabDef?.language}
                    placeholder={activeTabDef?.placeholder}
                    readOnly={activeTabDef?.readOnly}
                    showLineNumbers
                    aria-label={`${activeTabDef?.label} editor`}
                  />
                )}
              </div>

              {/* Footer bar with Save/Cancel buttons (shown when tab has unsaved changes) */}
              {dirtyTabs.has(activeTab) && (
                <div className={styles.editorFooter}>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Guardar
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right panel: chat preview */}
          <div className={styles.previewPanel}>
            <Card variant="base" className={styles.panelCard}>
              <Chat className={styles.chat}>
                <Chat.Header
                  title={previewTitle}
                  actions={
                    onNewConversation ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Plus size={16} />}
                        onClick={onNewConversation}
                      >
                        Nueva
                      </Button>
                    ) : undefined
                  }
                />

                <Chat.Messages autoScroll>
                  {messages.length === 0 && !isTyping
                    ? emptyPreviewState || (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          No messages yet
                        </div>
                      )
                    : messages.map((message) => (
                        <Chat.Message
                          key={message.id}
                          role={message.role}
                          content={message.content}
                          status={message.status}
                          attachments={message.attachments}
                          isStreaming={message.isStreaming}
                        />
                      ))}
                  {isTyping && <Chat.TypingIndicator />}
                </Chat.Messages>

                <Chat.Input
                  onSend={onSendMessage}
                  isLoading={isLoading}
                  placeholder={
                    chatInputConfig?.placeholder || "Type your message here..."
                  }
                  allowAttachments={chatInputConfig?.allowAttachments ?? true}
                  allowVoiceRecording={
                    chatInputConfig?.allowVoiceRecording ?? false
                  }
                />
              </Chat>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

AgentEditor.displayName = "AgentEditor";
