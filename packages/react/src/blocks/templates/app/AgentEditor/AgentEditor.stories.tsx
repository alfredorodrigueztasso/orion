import type { Meta, StoryObj } from "@storybook/react";
import { AgentEditor } from "./AgentEditor";

const meta = {
  title: "Templates/App/AgentEditor",
  component: AgentEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AgentEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    title: "Create New Agent",
    availableModels: ["gpt-4", "gpt-3.5-turbo", "claude-3-opus"],
    onSave: (agent) => console.log("Saved agent:", agent),
    onCancel: () => console.log("Cancelled"),
  },
};

export const Edit: Story = {
  args: {
    title: "Edit Agent",
    agent: {
      id: "agent-1",
      name: "Customer Support Bot",
      description: "Handles customer inquiries and support tickets",
      model: "gpt-4",
      systemPrompt:
        "You are a helpful customer support assistant. Be polite, professional, and aim to resolve issues quickly.",
      temperature: 0.7,
      maxTokens: 2000,
    },
    availableModels: ["gpt-4", "gpt-3.5-turbo", "claude-3-opus"],
    onSave: (agent) => console.log("Updated agent:", agent),
    onCancel: () => console.log("Cancelled"),
  },
};

export const WithError: Story = {
  args: {
    title: "Edit Agent",
    error: "Failed to save agent. Please try again.",
    availableModels: ["gpt-4", "gpt-3.5-turbo"],
    onSave: (agent) => console.log("Saved agent:", agent),
    onCancel: () => console.log("Cancelled"),
  },
};

export const Loading: Story = {
  args: {
    title: "Create New Agent",
    isLoading: true,
    availableModels: ["gpt-4", "gpt-3.5-turbo"],
    onSave: (agent) => console.log("Saved agent:", agent),
    onCancel: () => console.log("Cancelled"),
  },
};
