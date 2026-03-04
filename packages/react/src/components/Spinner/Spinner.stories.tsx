import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Spinner size",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "neutral", "inverse"],
      description: "Spinner color variant",
    },
    showLabel: {
      control: "boolean",
      description: "Show loading label below spinner",
    },
    label: {
      control: "text",
      description: "Loading label text (for accessibility)",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
};

export const CustomLabel: Story = {
  args: {
    label: "Loading data...",
    showLabel: true,
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    showLabel: true,
    label: "Loading...",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    showLabel: true,
    label: "Processing...",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    showLabel: true,
    label: "Please wait...",
  },
};

export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-8)" }}
    >
      <div style={{ textAlign: "center" }}>
        <Spinner size="xs" />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          XS
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="sm" />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          SM
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="md" />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          MD
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="lg" />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          LG
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="xl" />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          XL
        </p>
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-4)", flexWrap: "wrap" }}>
      <Button variant="primary" isLoading>
        Primary Loading
      </Button>
      <Button variant="secondary" isLoading>
        Secondary Loading
      </Button>
      <Button variant="ghost" isLoading>
        Ghost Loading
      </Button>
      <Button variant="danger" isLoading>
        Danger Loading
      </Button>
    </div>
  ),
};

export const InverseVariant: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--spacing-8)",
        background: "var(--interactive-primary)",
        borderRadius: "var(--radius-control)",
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-4)",
      }}
    >
      <Spinner size="md" variant="inverse" />
      <span
        style={{
          color: "var(--interactive-primary-text)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        Loading on dark background...
      </span>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
        textAlign: "center",
      }}
    >
      <Spinner size="lg" showLabel label="Loading your data..." />
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div
      style={{
        width: "100vw",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <Spinner size="xl" showLabel label="Loading application..." />
    </div>
  ),
};

export const MultipleStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <Spinner size="sm" />
        <span>Saving changes...</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <Spinner size="sm" variant="secondary" />
        <span>Processing payment...</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <Spinner size="sm" variant="secondary" />
        <span>Uploading file...</span>
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    size: "lg",
    variant: "primary",
    showLabel: true,
    label: "Please wait...",
    className: "custom-spinner",
    style: {
      padding: "var(--spacing-8)",
      borderRadius: "var(--radius-control)",
      background: "var(--surface-subtle)",
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-12)" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner variant="primary" size="lg" />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Primary
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner variant="secondary" size="lg" />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Secondary
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner variant="secondary" size="lg" />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Neutral
        </p>
      </div>
    </div>
  ),
};
