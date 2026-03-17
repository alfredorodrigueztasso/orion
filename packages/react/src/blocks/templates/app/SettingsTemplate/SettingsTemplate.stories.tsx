import type { Meta, StoryObj } from "@storybook/react";
import { SettingsTemplate } from "./SettingsTemplate";

const meta = {
  title: "Templates/App/SettingsTemplate",
  component: SettingsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSections = [
  {
    id: "general",
    title: "General",
    description: "Basic application settings",
    content: (
      <div>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <label style={{ display: "block", marginBottom: "var(--spacing-2)" }}>
            Application Name
          </label>
          <input
            type="text"
            placeholder="My App"
            style={{
              width: "100%",
              padding: "var(--spacing-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-control)",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "var(--spacing-2)" }}>
            Default Language
          </label>
          <select
            style={{
              width: "100%",
              padding: "var(--spacing-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-control)",
            }}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    ),
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize look and feel",
    content: (
      <div>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <label style={{ display: "flex", gap: "var(--spacing-2)" }}>
            <input type="checkbox" defaultChecked />
            <span>Dark mode</span>
          </label>
        </div>
        <div>
          <label style={{ display: "flex", gap: "var(--spacing-2)" }}>
            <input type="checkbox" defaultChecked />
            <span>Compact view</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage notification preferences",
    content: (
      <div>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <label style={{ display: "flex", gap: "var(--spacing-2)" }}>
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
        </div>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <label style={{ display: "flex", gap: "var(--spacing-2)" }}>
            <input type="checkbox" defaultChecked />
            <span>Push notifications</span>
          </label>
        </div>
        <div>
          <label style={{ display: "flex", gap: "var(--spacing-2)" }}>
            <input type="checkbox" />
            <span>SMS notifications</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    description: "Control your privacy settings",
    content: (
      <div>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <label style={{ display: "block", marginBottom: "var(--spacing-2)" }}>
            Data Collection
          </label>
          <select
            style={{
              width: "100%",
              padding: "var(--spacing-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-control)",
            }}
          >
            <option>Minimal</option>
            <option>Standard</option>
            <option>Full</option>
          </select>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    title: "Settings",
    sections: mockSections,
    activeSectionId: "general",
    onSelectSection: (id) => console.log("Selected section:", id),
    onSave: () => console.log("Saved"),
    onReset: () => console.log("Reset"),
    hasUnsavedChanges: true,
  },
};

export const NoChanges: Story = {
  args: {
    title: "Settings",
    sections: mockSections,
    activeSectionId: "general",
    onSelectSection: (id) => console.log("Selected section:", id),
    onSave: () => console.log("Saved"),
    onReset: () => console.log("Reset"),
    hasUnsavedChanges: false,
  },
};

export const WithError: Story = {
  args: {
    title: "Settings",
    sections: mockSections,
    error: "Failed to save settings. Please try again.",
    onSave: () => console.log("Saved"),
    onReset: () => console.log("Reset"),
  },
};

export const WithSuccess: Story = {
  args: {
    title: "Settings",
    sections: mockSections,
    successMessage: "Settings saved successfully",
    onSave: () => console.log("Saved"),
    onReset: () => console.log("Reset"),
  },
};

export const Loading: Story = {
  args: {
    title: "Settings",
    sections: mockSections,
    isLoading: true,
    onSave: () => console.log("Saved"),
    onReset: () => console.log("Reset"),
  },
};

export const Empty: Story = {
  args: {
    title: "Settings",
    sections: [],
  },
};
