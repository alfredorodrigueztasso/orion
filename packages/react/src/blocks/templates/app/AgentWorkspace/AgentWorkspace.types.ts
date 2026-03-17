/**
 * AgentWorkspace Template Types
 *
 * Type definitions for the AgentWorkspace template.
 */

import type { ReactNode } from "react";

export interface WorkspaceAgent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "error";
  lastUpdated: Date;
  usageCount?: number;
}

export interface AgentWorkspaceProps {
  /** Title of the workspace */
  title?: string;

  /** List of agents */
  agents?: WorkspaceAgent[];

  /** Currently selected agent */
  selectedAgentId?: string;

  /** Called when agent is selected */
  onSelectAgent?: (agentId: string) => void;

  /** Called when creating new agent */
  onCreateAgent?: () => void;

  /** Called when deleting agent */
  onDeleteAgent?: (agentId: string) => void;

  /** Called when editing agent */
  onEditAgent?: (agentId: string) => void;

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Subtitle or description */
  subtitle?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
