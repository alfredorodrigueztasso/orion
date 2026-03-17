/**
 * AgentEditor Template Types
 *
 * Type definitions for the AgentEditor template.
 */

import type { ReactNode } from "react";

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentEditorProps {
  /** Title of the editor */
  title?: string;

  /** Agent being edited (undefined for new agent) */
  agent?: Agent;

  /** Available models to choose from */
  availableModels?: string[];

  /** Called when user saves the agent */
  onSave?: (agent: Agent) => void;

  /** Called when user cancels editing */
  onCancel?: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
