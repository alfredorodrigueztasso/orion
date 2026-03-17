import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Switch size",
    },
    disabled: {
      control: "boolean",
      description: "Disable switch",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Checked: Story = {
  args: {
    label: "Enabled by default",
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Dark mode",
    helperText: "Use dark theme across the app",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and on",
    disabled: true,
    defaultChecked: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small switch",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large switch",
    size: "lg",
  },
};

export const Interactive: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);

    return (
      <div>
        <Switch
          label="Toggle me"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Status: {enabled ? "ON ✓" : "OFF"}
        </p>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      darkMode: false,
      analytics: true,
    });

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div
        style={{
          width: "320px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Settings
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <Switch
            label="Enable notifications"
            helperText="Receive email notifications"
            checked={settings.notifications}
            onChange={(e) => updateSetting("notifications", e.target.checked)}
          />
          <Switch
            label="Auto-save"
            helperText="Automatically save changes"
            checked={settings.autoSave}
            onChange={(e) => updateSetting("autoSave", e.target.checked)}
          />
          <Switch
            label="Dark mode"
            helperText="Use dark theme"
            checked={settings.darkMode}
            onChange={(e) => updateSetting("darkMode", e.target.checked)}
          />
          <Switch
            label="Analytics"
            helperText="Share usage data"
            checked={settings.analytics}
            onChange={(e) => updateSetting("analytics", e.target.checked)}
          />
        </div>
      </div>
    );
  },
};

export const FeatureToggles: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      experimental: false,
      betaFeatures: false,
      advancedMode: false,
    });

    return (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Feature Flags
        </h3>
        <p
          style={{
            marginBottom: "var(--spacing-8)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Enable experimental features
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <Switch
            label="Experimental Features"
            helperText="Try new features before release"
            checked={features.experimental}
            onChange={(e) =>
              setFeatures((prev) => ({
                ...prev,
                experimental: e.target.checked,
              }))
            }
          />
          <Switch
            label="Beta Features"
            helperText="Access beta functionality"
            checked={features.betaFeatures}
            onChange={(e) =>
              setFeatures((prev) => ({
                ...prev,
                betaFeatures: e.target.checked,
              }))
            }
          />
          <Switch
            label="Advanced Mode"
            helperText="Show advanced options"
            checked={features.advancedMode}
            onChange={(e) =>
              setFeatures((prev) => ({
                ...prev,
                advancedMode: e.target.checked,
              }))
            }
          />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch (default)" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <Switch label="Off (default)" />
      <Switch label="On" defaultChecked />
      <Switch label="With helper text" helperText="Additional information" />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const CompactLayout: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
      }}
    >
      <Switch label="Compact option 1" size="sm" />
      <Switch label="Compact option 2" size="sm" />
      <Switch label="Compact option 3" size="sm" />
      <Switch label="Compact option 4" size="sm" />
    </div>
  ),
};

export const InlineWithContent: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "var(--spacing-6)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "var(--font-weight-medium)",
            marginBottom: "var(--spacing-1)",
          }}
        >
          Push Notifications
        </div>
        <div
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Receive notifications on your device
        </div>
      </div>
      <Switch label="" />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    label: "Custom styled switch",
    helperText: "This switch has custom styling",
    className: "custom-switch",
  },
};
