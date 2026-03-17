import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta = {
  title: "Sections/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <div
    style={{
      background: "var(--surface-subtle)",
      padding: "var(--spacing-8)",
      borderRadius: "var(--radius-container)",
    }}
  >
    <p>
      This is content inside a container. The container controls the maximum
      width and horizontal centering of the content.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    children: content,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: content,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: content,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: content,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: content,
  },
};

export const FullWidth: Story = {
  args: {
    size: "full",
    children: content,
  },
};

export const WithPadding: Story = {
  args: {
    padded: true,
    children: content,
  },
};

export const NoPadding: Story = {
  args: {
    padded: false,
    children: content,
  },
};

export const Centered: Story = {
  args: {
    centered: true,
    size: "sm",
    children: (
      <div style={{ textAlign: "center" }}>
        <h2>Centered Content</h2>
        <p>This container is centered with a small max-width.</p>
      </div>
    ),
  },
};

export const NotCentered: Story = {
  args: {
    centered: false,
    size: "sm",
    children: (
      <div>
        <h2>Left-Aligned Container</h2>
        <p>This container is not centered.</p>
      </div>
    ),
  },
};
