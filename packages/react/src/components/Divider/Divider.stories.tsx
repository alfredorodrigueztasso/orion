/**
 * Divider Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Layout/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "radio",
      options: ["solid", "dashed", "dotted"],
    },
    spacing: {
      control: "radio",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center", height: "100px" }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
};

export const Dotted: Story = {
  args: {
    variant: "dotted",
  },
};

export const WithLabel: Story = {
  args: {
    label: "OR",
  },
};

export const WithLabelContinue: Story = {
  args: {
    label: "Continue with",
  },
};

export const Spacings: Story = {
  render: () => (
    <div>
      <p>No spacing</p>
      <Divider spacing="none" />
      <p>Small spacing</p>
      <Divider spacing="sm" />
      <p>Medium spacing (default)</p>
      <Divider spacing="md" />
      <p>Large spacing</p>
      <Divider spacing="lg" />
      <p>End</p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Solid
        </p>
        <Divider variant="solid" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Dashed
        </p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Dotted
        </p>
        <Divider variant="dotted" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          With Label
        </p>
        <Divider label="OR" />
      </div>
    </div>
  ),
};
