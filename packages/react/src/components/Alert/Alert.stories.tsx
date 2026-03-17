import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error", "inverse"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// VARIANT STORIES (Individual Variants)
// ============================================================================

export const Info: Story = {
  args: {
    variant: "info",
    children: "This is an informational message for the user.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Your action was completed successfully!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Please review this warning before proceeding.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "An error occurred. Please try again.",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    children: "Inverse alert for dark backgrounds",
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
// COMBINATION STORIES
// ============================================================================

export const WithTitle: Story = {
  render: () => (
    <Alert variant="info">
      <strong style={{ display: "block", marginBottom: "var(--spacing-2)" }}>
        Important Information
      </strong>
      Please read this carefully before continuing.
    </Alert>
  ),
};

export const LongMessage: Story = {
  args: {
    variant: "warning",
    children:
      "This is a longer alert message that contains more detailed information. It might span multiple lines and should remain readable and well-formatted regardless of the content length. Make sure to provide enough context for users to understand the situation.",
  },
};

export const AllVariantsWithInverse: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        maxWidth: "600px",
      }}
    >
      <Alert variant="info">This is an informational alert</Alert>
      <Alert variant="success">This is a success alert</Alert>
      <Alert variant="warning">This is a warning alert</Alert>
      <Alert variant="error">This is an error alert</Alert>
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "var(--spacing-3)",
          borderRadius: "var(--radius-control)",
        }}
      >
        <Alert variant="inverse">Inverse alert for dark background</Alert>
      </div>
    </div>
  ),
};
