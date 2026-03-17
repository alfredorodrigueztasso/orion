import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "brand",
        "inverse",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// VARIANT STORIES (Individual Variants)
// ============================================================================

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "Brand",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    children: "Inverse",
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

// ============================================================================
// SIZE STORIES (Size Variants)
// ============================================================================

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "var(--spacing-3)", alignItems: "center" }}
    >
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// ============================================================================
// COMBINATION STORIES (Multiple Variants & Features)
// ============================================================================

export const WithNumbers: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
      <Badge variant="error">99+</Badge>
      <Badge variant="info">12</Badge>
      <Badge variant="success">✓</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="error" dot>
        Offline
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="info" dot>
        Processing
      </Badge>
      <Badge variant="brand" dot>
        New
      </Badge>
      <Badge variant="secondary" dot>
        Draft
      </Badge>
      <Badge variant="primary" dot>
        Primary
      </Badge>
      <Badge variant="secondary" dot>
        Secondary
      </Badge>
      <Badge variant="inverse" dot>
        Inverse
      </Badge>
    </div>
  ),
};

export const AllVariantsWithInverse: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="brand">Brand</Badge>
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "var(--spacing-2) var(--spacing-3)",
          borderRadius: "var(--radius-full)",
        }}
      >
        <Badge variant="inverse">Inverse</Badge>
      </div>
    </div>
  ),
};
