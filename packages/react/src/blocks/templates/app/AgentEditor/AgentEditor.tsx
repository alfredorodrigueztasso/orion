"use client";

/**
 * AgentEditor Template
 *
 * Configuration editor for AI agents with form fields and save/cancel actions.
 * Provides a complete interface for creating and editing agent configurations.
 *
 * @example
 * ```tsx
 * <AgentEditor
 *   title="Create New Agent"
 *   availableModels={["gpt-4", "gpt-3.5-turbo"]}
 *   onSave={handleSave}
 *   onCancel={handleCancel}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Card, Button, Field } from "@orion-ds/react";
import type { AgentEditorProps, Agent } from "./AgentEditor.types";
import styles from "./AgentEditor.module.css";

export const AgentEditor = forwardRef<HTMLDivElement, AgentEditorProps>(
  (
    {
      title = "Edit Agent",
      agent,
      availableModels = ["gpt-4", "gpt-3.5-turbo", "claude-3-opus"],
      onSave,
      onCancel,
      isLoading = false,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<Agent>(
      agent || {
        id: "",
        name: "",
        description: "",
        model: availableModels[0] || "gpt-4",
        systemPrompt: "",
        temperature: 0.7,
        maxTokens: 2000,
      },
    );

    const handleInputChange = useCallback(
      (field: keyof Agent, value: unknown) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      },
      [],
    );

    const handleSave = useCallback(() => {
      if (!formData.name.trim()) {
        return;
      }
      onSave?.(formData);
    }, [formData, onSave]);

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <Card>
          <Card.Header>
            <h2 className={styles.title}>{title}</h2>
          </Card.Header>

          <Card.Body className={styles.body}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
              <Field
                label="Agent Name"
                type="text"
                placeholder="e.g., Customer Support Bot"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <Field
                label="Description"
                placeholder="Brief description of the agent's purpose"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                disabled={isLoading}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="model" className={styles.label}>
                  Model
                </label>
                <select
                  id="model"
                  className={styles.select}
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  disabled={isLoading}
                >
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <Field
                  label="Temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) =>
                    handleInputChange("temperature", parseFloat(e.target.value))
                  }
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <Field
                label="Max Tokens"
                type="number"
                min="1"
                max="32000"
                value={formData.maxTokens}
                onChange={(e) =>
                  handleInputChange("maxTokens", parseInt(e.target.value, 10))
                }
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="system-prompt" className={styles.label}>
                System Prompt
              </label>
              <textarea
                id="system-prompt"
                className={styles.textarea}
                placeholder="Define the agent's behavior and instructions"
                value={formData.systemPrompt}
                onChange={(e) =>
                  handleInputChange("systemPrompt", e.target.value)
                }
                disabled={isLoading}
                rows={6}
              />
            </div>
          </Card.Body>

          <Card.Footer className={styles.footer}>
            <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
              disabled={!formData.name.trim()}
            >
              Save Agent
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  },
);

AgentEditor.displayName = "AgentEditor";
export default AgentEditor;
