import type { Meta, StoryObj } from "@storybook/react";
import { ThemeController } from "./ThemeController";
import { ThemeProvider } from "@orion-ds/react";

const meta: Meta<typeof ThemeController> = {
  title: "Components/Utilities/ThemeController",
  component: ThemeController,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    showThemeToggle: {
      control: "boolean",
      description: "Show theme toggle section",
    },
    showBrandSelector: {
      control: "boolean",
      description: "Show brand selector section",
    },
    showSummary: {
      control: "boolean",
      description: "Show current settings summary",
    },
    compact: {
      control: "boolean",
      description: "Use compact horizontal layout",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: "700px" }}>
      <ThemeController {...args} />
    </div>
  ),
};

export const ThemeToggleOnly: Story = {
  args: {
    showThemeToggle: true,
    showBrandSelector: false,
    showSummary: false,
  },
  render: (args) => (
    <div style={{ width: "700px" }}>
      <ThemeController {...args} />
    </div>
  ),
};

export const BrandSelectorOnly: Story = {
  args: {
    showThemeToggle: false,
    showBrandSelector: true,
    showSummary: false,
  },
  render: (args) => (
    <div style={{ width: "700px" }}>
      <ThemeController {...args} />
    </div>
  ),
};

export const WithoutSummary: Story = {
  args: {
    showThemeToggle: true,
    showBrandSelector: true,
    showSummary: false,
  },
  render: (args) => (
    <div style={{ width: "700px" }}>
      <ThemeController {...args} />
    </div>
  ),
};

export const CompactMode: Story = {
  args: {
    compact: true,
  },
  render: (args) => (
    <div
      style={{
        width: "100%",
        padding: "var(--spacing-4)",
        background: "var(--surface-base)",
      }}
    >
      <ThemeController {...args} />
    </div>
  ),
};

export const CompactThemeOnly: Story = {
  args: {
    compact: true,
    showThemeToggle: true,
    showBrandSelector: false,
  },
  render: (args) => (
    <div
      style={{ padding: "var(--spacing-4)", background: "var(--surface-base)" }}
    >
      <ThemeController {...args} />
    </div>
  ),
};

export const CompactBrandsOnly: Story = {
  args: {
    compact: true,
    showThemeToggle: false,
    showBrandSelector: true,
  },
  render: (args) => (
    <div
      style={{ padding: "var(--spacing-4)", background: "var(--surface-base)" }}
    >
      <ThemeController {...args} />
    </div>
  ),
};

export const WithCallbacks: Story = {
  args: {
    onThemeChange: (theme: string) => console.log("Theme changed to:", theme),
    onBrandChange: (brand: string) => console.log("Brand changed to:", brand),
  },
  render: (args) => (
    <div style={{ width: "700px" }}>
      <p
        style={{
          marginBottom: "var(--spacing-4)",
          fontSize: "var(--font-size-14)",
          color: "var(--text-secondary)",
        }}
      >
        Open the console to see callbacks in action
      </p>
      <ThemeController {...args} />
    </div>
  ),
};

export const InSidebar: Story = {
  render: () => (
    <div style={{ display: "flex", height: "600px", gap: "var(--spacing-4)" }}>
      <div
        style={{
          width: "300px",
          padding: "var(--spacing-4)",
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Settings
        </h3>
        <div style={{ marginBottom: "var(--spacing-4)" }}>
          <ThemeController compact showThemeToggle showBrandSelector />
        </div>
        <nav>
          <div
            style={{
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              marginBottom: "var(--spacing-2)",
              cursor: "pointer",
            }}
          >
            Profile
          </div>
          <div
            style={{
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              marginBottom: "var(--spacing-2)",
              cursor: "pointer",
            }}
          >
            Security
          </div>
          <div
            style={{
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
            }}
          >
            Notifications
          </div>
        </nav>
      </div>
      <div
        style={{
          flex: 1,
          padding: "var(--spacing-6)",
          background: "var(--surface-base)",
          borderRadius: "var(--radius-control)",
        }}
      >
        <h2
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Main Content
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          The theme controller is embedded in the sidebar for easy access.
        </p>
      </div>
    </div>
  ),
};

export const InNavbar: Story = {
  render: () => (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--spacing-4) var(--spacing-6)",
          background: "var(--surface-base)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            fontSize: "var(--font-size-20)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          MyApp
        </div>
        <nav
          style={{
            display: "flex",
            gap: "var(--spacing-6)",
            fontSize: "var(--font-size-14)",
          }}
        >
          <span style={{ cursor: "pointer" }}>Home</span>
          <span style={{ cursor: "pointer" }}>About</span>
          <span style={{ cursor: "pointer" }}>Contact</span>
        </nav>
        <ThemeController compact showThemeToggle />
      </div>
      <div style={{ padding: "var(--spacing-8)" }}>
        <h2
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Page Content
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Theme toggle is integrated into the navbar for quick access.
        </p>
      </div>
    </div>
  ),
};

export const SettingsPanel: Story = {
  render: () => (
    <div
      style={{
        width: "800px",
        padding: "var(--spacing-8)",
        background: "var(--surface-base)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ marginBottom: "var(--spacing-8)" }}>
        <h2
          style={{
            margin: "0 0 var(--spacing-2) 0",
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          App Settings
        </h2>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Customize your experience
        </p>
      </div>

      <div style={{ marginBottom: "var(--spacing-8)" }}>
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Appearance
        </h3>
        <ThemeController />
      </div>

      <div>
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Other Settings
        </h3>
        <div
          style={{
            padding: "var(--spacing-4)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Additional settings would go here...
        </div>
      </div>
    </div>
  ),
};

export const FloatingControl: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        width: "600px",
        height: "400px",
        background: "var(--surface-subtle)",
        borderRadius: "var(--radius-control)",
        padding: "var(--spacing-8)",
      }}
    >
      <h2
        style={{
          margin: "0 0 var(--spacing-4) 0",
          fontSize: "var(--font-size-24)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        Page Content
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "var(--spacing-4)",
        }}
      >
        The theme controller floats in the bottom-right corner for easy access.
      </p>
      <p style={{ color: "var(--text-secondary)" }}>
        This is useful for demo pages or documentation sites where you want
        users to quickly change themes without navigating away.
      </p>

      <div
        style={{
          position: "absolute",
          bottom: "var(--spacing-4)",
          right: "var(--spacing-4)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: "var(--radius-control)",
        }}
      >
        <ThemeController compact />
      </div>
    </div>
  ),
};

export const MinimalControl: Story = {
  render: () => (
    <div
      style={{ padding: "var(--spacing-8)", background: "var(--surface-base)" }}
    >
      <div style={{ marginBottom: "var(--spacing-8)" }}>
        <h2
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Article Title
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-4)",
            marginBottom: "var(--spacing-4)",
          }}
        >
          <span
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--text-secondary)",
            }}
          >
            Published on Jan 23, 2024
          </span>
          <ThemeController
            compact
            showThemeToggle
            showBrandSelector={false}
            showSummary={false}
          />
        </div>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  ),
};

export const DemoShowcase: Story = {
  render: () => (
    <div style={{ width: "900px" }}>
      <div style={{ marginBottom: "var(--spacing-8)", textAlign: "center" }}>
        <h1
          style={{
            margin: "0 0 var(--spacing-2) 0",
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Orion Design System
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-size-18)",
            color: "var(--text-secondary)",
          }}
        >
          Try different themes and brands in real-time
        </p>
      </div>

      <ThemeController />

      <div
        style={{
          marginTop: "var(--spacing-8)",
          padding: "var(--spacing-8)",
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-control)",
        }}
      >
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-20)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Sample Components
        </h3>
        <div
          style={{ display: "flex", gap: "var(--spacing-4)", flexWrap: "wrap" }}
        >
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-control)",
              border: "none",
              background: "var(--interactive-primary)",
              color: "var(--interactive-primary-text)",
              cursor: "pointer",
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-control)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            Secondary Button
          </button>
          <div
            style={{
              padding: "var(--spacing-1) var(--spacing-3)",
              borderRadius: "var(--radius-control)",
              background: "var(--interactive-primary)",
              color: "white",
              fontSize: "var(--font-size-14)",
            }}
          >
            Badge
          </div>
        </div>
      </div>
    </div>
  ),
};
