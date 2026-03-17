"use client";

/**
 * AgentWorkspace Template
 *
 * Main workspace for managing multiple AI agents.
 * Displays agent list with status, creation, editing, and deletion capabilities.
 *
 * @example
 * ```tsx
 * <AgentWorkspace
 *   agents={agents}
 *   selectedAgentId={selectedId}
 *   onSelectAgent={handleSelect}
 *   onCreateAgent={handleCreate}
 *   onDeleteAgent={handleDelete}
 * />
 * ```
 */

import { forwardRef, useCallback } from "react";
import { Card, Button, Badge } from "@orion-ds/react";
import { Plus, Edit2, Trash2, Clock } from "lucide-react";
import type {
  AgentWorkspaceProps,
  WorkspaceAgent,
} from "./AgentWorkspace.types";
import styles from "./AgentWorkspace.module.css";

function getStatusVariant(status: WorkspaceAgent["status"]) {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "info";
    case "error":
      return "error";
    default:
      return "info";
  }
}

function getStatusLabel(status: WorkspaceAgent["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export const AgentWorkspace = forwardRef<HTMLDivElement, AgentWorkspaceProps>(
  (
    {
      title = "Agent Workspace",
      agents = [],
      selectedAgentId,
      onSelectAgent,
      onCreateAgent,
      onDeleteAgent,
      onEditAgent,
      isLoading = false,
      error,
      subtitle,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleDelete = useCallback(
      (agentId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this agent?")) {
          onDeleteAgent?.(agentId);
        }
      },
      [onDeleteAgent],
    );

    const handleEdit = useCallback(
      (agentId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onEditAgent?.(agentId);
      },
      [onEditAgent],
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <Button
            variant="primary"
            icon={<Plus size={20} />}
            onClick={onCreateAgent}
            disabled={isLoading}
          >
            New Agent
          </Button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.grid}>
          {agents.length === 0 ? (
            <Card className={styles.emptyState}>
              <Card.Body className={styles.emptyStateBody}>
                <div className={styles.emptyStateIcon}>📋</div>
                <h3 className={styles.emptyStateTitle}>No agents yet</h3>
                <p className={styles.emptyStateText}>
                  Create your first agent to get started
                </p>
                <Button
                  variant="primary"
                  onClick={onCreateAgent}
                  disabled={isLoading}
                >
                  Create Agent
                </Button>
              </Card.Body>
            </Card>
          ) : (
            agents.map((agent) => (
              <Card
                key={agent.id}
                className={[
                  styles.agentCard,
                  selectedAgentId === agent.id && styles.agentCardSelected,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onSelectAgent?.(agent.id)}
              >
                <Card.Body className={styles.agentCardBody}>
                  <div className={styles.agentHeader}>
                    <div className={styles.agentInfo}>
                      <h3 className={styles.agentName}>{agent.name}</h3>
                      <Badge variant={getStatusVariant(agent.status)} size="sm">
                        {getStatusLabel(agent.status)}
                      </Badge>
                    </div>
                    <div className={styles.agentActions}>
                      <button
                        className={styles.actionButton}
                        onClick={(e) => handleEdit(agent.id, e)}
                        aria-label="Edit agent"
                        title="Edit agent"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className={[
                          styles.actionButton,
                          styles.actionButtonDanger,
                        ].join(" ")}
                        onClick={(e) => handleDelete(agent.id, e)}
                        aria-label="Delete agent"
                        title="Delete agent"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className={styles.agentDescription}>{agent.description}</p>

                  <div className={styles.agentMeta}>
                    <div className={styles.metaItem}>
                      <Clock size={14} />
                      <span className={styles.metaLabel}>
                        Updated{" "}
                        {new Date(agent.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    {agent.usageCount !== undefined && (
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>
                          {agent.usageCount} uses
                        </span>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  },
);

AgentWorkspace.displayName = "AgentWorkspace";
export default AgentWorkspace;
