import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Components/Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement",
    },
    delay: {
      control: "number",
      description: "Delay before showing (ms)",
    },
    disabled: {
      control: "boolean",
      description: "Disable tooltip",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Hover me
      </button>
    ),
  },
};

export const TopPlacement: Story = {
  args: {
    content: "Tooltip on top",
    placement: "top",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Top
      </button>
    ),
  },
};

export const RightPlacement: Story = {
  args: {
    content: "Tooltip on right",
    placement: "right",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Right
      </button>
    ),
  },
};

export const BottomPlacement: Story = {
  args: {
    content: "Tooltip on bottom",
    placement: "bottom",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Bottom
      </button>
    ),
  },
};

export const LeftPlacement: Story = {
  args: {
    content: "Tooltip on left",
    placement: "left",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Left
      </button>
    ),
  },
};

export const Disabled: Story = {
  args: {
    content: "This tooltip is disabled",
    disabled: true,
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-layer)",
          cursor: "not-allowed",
        }}
      >
        Disabled
      </button>
    ),
  },
};

export const CustomDelay: Story = {
  args: {
    content: "Tooltip with 1 second delay",
    delay: 1000,
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Slow tooltip
      </button>
    ),
  },
};

export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip message that provides more detailed information about the button",
    children: (
      <button
        style={{
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        Long tooltip
      </button>
    ),
  },
};

export const WithIconButton: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
      <Tooltip content="Information">
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-base)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--font-size-18)",
          }}
          aria-label="Info"
        >
          ℹ️
        </button>
      </Tooltip>
      <Tooltip content="Settings">
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-base)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--font-size-18)",
          }}
          aria-label="Settings"
        >
          ⚙️
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-base)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--font-size-18)",
          }}
          aria-label="Delete"
        >
          🗑️
        </button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "var(--spacing-12)",
        padding: "var(--spacing-16)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip content="Top placement" placement="top">
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              cursor: "pointer",
            }}
          >
            Top
          </button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip content="Right placement" placement="right">
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              cursor: "pointer",
            }}
          >
            Right
          </button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip content="Bottom placement" placement="bottom">
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              cursor: "pointer",
            }}
          >
            Bottom
          </button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip content="Left placement" placement="left">
          <button
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              cursor: "pointer",
            }}
          >
            Left
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const InForm: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div
      style={{
        width: "400px",
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-base)",
      }}
    >
      <h3
        style={{
          margin: "0 0 var(--spacing-6) 0",
          fontSize: "var(--font-size-18)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        User Registration
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
      >
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              marginBottom: "var(--spacing-2)",
              fontSize: "var(--font-size-14)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Username
            <Tooltip
              content="Username must be unique and contain only letters and numbers"
              placement="right"
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "var(--interactive-primary)",
                  color: "var(--interactive-primary-text)",
                  fontSize: "var(--font-size-12)",
                  cursor: "help",
                }}
              >
                ?
              </span>
            </Tooltip>
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              fontSize: "var(--font-size-14)",
            }}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              marginBottom: "var(--spacing-2)",
              fontSize: "var(--font-size-14)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Password
            <Tooltip
              content="Password must be at least 8 characters with uppercase, lowercase, and numbers"
              placement="right"
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "var(--interactive-primary)",
                  color: "var(--interactive-primary-text)",
                  fontSize: "var(--font-size-12)",
                  cursor: "help",
                }}
              >
                ?
              </span>
            </Tooltip>
          </label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              fontSize: "var(--font-size-14)",
            }}
            placeholder="Enter password"
          />
        </div>
      </div>
    </div>
  ),
};

export const ActionButtons: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
      <Tooltip content="Save changes" placement="top">
        <button
          style={{
            padding: "var(--spacing-3) var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--status-success)",
            color: "var(--surface-base)",
            cursor: "pointer",
            fontSize: "var(--font-size-14)",
          }}
        >
          Save
        </button>
      </Tooltip>
      <Tooltip content="Cancel and discard changes" placement="top">
        <button
          style={{
            padding: "var(--spacing-3) var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-base)",
            cursor: "pointer",
            fontSize: "var(--font-size-14)",
          }}
        >
          Cancel
        </button>
      </Tooltip>
      <Tooltip content="Delete permanently (cannot be undone)" placement="top">
        <button
          style={{
            padding: "var(--spacing-3) var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--status-error)",
            color: "var(--surface-base)",
            cursor: "pointer",
            fontSize: "var(--font-size-14)",
          }}
        >
          Delete
        </button>
      </Tooltip>
    </div>
  ),
};

export const Toolbar: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-1)",
        padding: "var(--spacing-2)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-base)",
      }}
    >
      {[
        { icon: "B", label: "Bold" },
        { icon: "I", label: "Italic" },
        { icon: "U", label: "Underline" },
        { icon: "≡", label: "Align left" },
        { icon: "☰", label: "Align center" },
        { icon: "🔗", label: "Insert link" },
        { icon: "📷", label: "Insert image" },
      ].map((tool) => (
        <Tooltip key={tool.label} content={tool.label} placement="bottom">
          <button
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--font-size-16)",
              fontWeight: tool.icon.match(/[BIU]/)
                ? "var(--font-weight-bold)"
                : "normal",
              fontStyle: tool.icon === "I" ? "italic" : "normal",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface-layer)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {tool.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const DataPoints: Story = {
  args: { content: "Tooltip", children: <span>Hover</span> },
  render: () => (
    <div
      style={{
        width: "500px",
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-base)",
      }}
    >
      <h3
        style={{
          margin: "0 0 var(--spacing-6) 0",
          fontSize: "var(--font-size-18)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        Performance Metrics
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--spacing-4)",
        }}
      >
        <Tooltip content="Total revenue for the current month" placement="top">
          <div
            style={{
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              textAlign: "center",
              cursor: "help",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-24)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              $45.2K
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
                marginTop: "var(--spacing-1)",
              }}
            >
              Revenue
            </div>
          </div>
        </Tooltip>
        <Tooltip content="Active users in the last 30 days" placement="top">
          <div
            style={{
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              textAlign: "center",
              cursor: "help",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-24)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              1,234
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
                marginTop: "var(--spacing-1)",
              }}
            >
              Users
            </div>
          </div>
        </Tooltip>
        <Tooltip content="Total number of completed orders" placement="top">
          <div
            style={{
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              textAlign: "center",
              cursor: "help",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-24)",
                fontWeight: "var(--font-weight-bold)",
              }}
            >
              567
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
                marginTop: "var(--spacing-1)",
              }}
            >
              Orders
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
};
