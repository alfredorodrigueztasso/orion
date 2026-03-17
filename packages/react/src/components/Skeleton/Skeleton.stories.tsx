/**
 * Skeleton Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animation: {
      control: "radio",
      options: ["pulse", "wave", "none"],
    },
    width: {
      control: "text",
    },
    height: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

export const TextMultipleLines: Story = {
  args: {
    variant: "text",
    lines: 3,
    width: "100%",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 300,
    height: 200,
  },
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: 300,
    height: 100,
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: "wave",
    width: 200,
    height: 20,
  },
};

export const NoAnimation: Story = {
  args: {
    animation: "none",
    width: 200,
    height: 20,
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: 300,
        padding: "var(--spacing-4)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-control)",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div style={{ marginTop: "var(--spacing-4)" }}>
        <Skeleton variant="text" width="80%" />
        <div style={{ marginTop: "var(--spacing-2)" }}>
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-3)",
          marginTop: "var(--spacing-4)",
        }}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={100} />
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
    >
      <Skeleton variant="circular" width={64} height={64} />
      <div>
        <Skeleton variant="text" width={150} height={24} />
        <div style={{ marginTop: "var(--spacing-2)" }}>
          <Skeleton variant="text" width={200} />
        </div>
      </div>
    </div>
  ),
};

export const TableRowSkeleton: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3)",
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "var(--spacing-4)",
            alignItems: "center",
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="rounded" width={80} height={24} />
        </div>
      ))}
    </div>
  ),
};

export const AnimationComparison: Story = {
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
          Pulse Animation
        </p>
        <Skeleton animation="pulse" width={200} height={20} />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Wave Animation
        </p>
        <Skeleton animation="wave" width={200} height={20} />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          No Animation
        </p>
        <Skeleton animation="none" width={200} height={20} />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-4)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="text" width={120} height={16} />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Text
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="circular" width={48} height={48} />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Circular
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rectangular" width={120} height={80} />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Rectangular
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Skeleton variant="rounded" width={120} height={80} />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Rounded
        </p>
      </div>
    </div>
  ),
};
