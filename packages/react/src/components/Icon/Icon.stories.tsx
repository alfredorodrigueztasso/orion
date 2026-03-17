import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import {
  Search,
  Download,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Heart,
  Bell,
  User,
  Mail,
} from "lucide-react";

const meta = {
  title: "Components/Icons/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
      description: "Lucide icon component",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Icon size (token or pixel value)",
    },
    color: {
      control: "select",
      options: [
        "current",
        "primary",
        "secondary",
        "tertiary",
        "brand",
        "success",
        "warning",
        "error",
        "info",
        "inverse",
      ],
      description: "Icon color variant",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 4, step: 0.5 },
      description: "Stroke width (Lucide default: 2)",
    },
    decorative: {
      control: "boolean",
      description: "Hide icon from screen readers",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (muted appearance)",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default icon
export const Default: Story = {
  args: {
    icon: Search,
    size: "md",
    color: "current",
    decorative: true,
  },
};

// Sizes
export const SizeXS: Story = {
  args: {
    icon: Star,
    size: "xs",
    decorative: true,
  },
};

export const SizeSM: Story = {
  args: {
    icon: Star,
    size: "sm",
    decorative: true,
  },
};

export const SizeMD: Story = {
  args: {
    icon: Star,
    size: "md",
    decorative: true,
  },
};

export const SizeLG: Story = {
  args: {
    icon: Star,
    size: "lg",
    decorative: true,
  },
};

export const SizeXL: Story = {
  args: {
    icon: Star,
    size: "xl",
    decorative: true,
  },
};

export const CustomPixelSize: Story = {
  args: {
    icon: Star,
    size: 48,
    decorative: true,
  },
};

// Colors
export const ColorPrimary: Story = {
  args: {
    icon: Bell,
    size: "lg",
    color: "primary",
    decorative: true,
  },
};

export const ColorSecondary: Story = {
  args: {
    icon: Bell,
    size: "lg",
    color: "secondary",
    decorative: true,
  },
};

export const ColorBrand: Story = {
  args: {
    icon: Heart,
    size: "lg",
    color: "brand",
    decorative: true,
  },
};

export const ColorSuccess: Story = {
  args: {
    icon: CheckCircle,
    size: "lg",
    color: "success",
    label: "Success",
  },
};

export const ColorWarning: Story = {
  args: {
    icon: AlertCircle,
    size: "lg",
    color: "warning",
    label: "Warning",
  },
};

export const ColorError: Story = {
  args: {
    icon: XCircle,
    size: "lg",
    color: "error",
    label: "Error",
  },
};

export const ColorInfo: Story = {
  args: {
    icon: Info,
    size: "lg",
    color: "info",
    label: "Information",
  },
};

// States
export const Disabled: Story = {
  args: {
    icon: Settings,
    size: "lg",
    disabled: true,
    decorative: true,
  },
};

// Accessibility
export const SemanticIcon: Story = {
  args: {
    icon: AlertCircle,
    size: "lg",
    color: "error",
    label: "Error occurred",
    decorative: false,
  },
};

export const DecorativeIcon: Story = {
  args: {
    icon: Download,
    size: "md",
    decorative: true,
  },
};

// Stroke Width
export const ThinStroke: Story = {
  args: {
    icon: Star,
    size: "xl",
    strokeWidth: 1,
    decorative: true,
  },
};

export const ThickStroke: Story = {
  args: {
    icon: Star,
    size: "xl",
    strokeWidth: 3,
    decorative: true,
  },
};

// All Sizes Comparison
export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
    >
      <Icon icon={Star} size="xs" decorative />
      <Icon icon={Star} size="sm" decorative />
      <Icon icon={Star} size="md" decorative />
      <Icon icon={Star} size="lg" decorative />
      <Icon icon={Star} size="xl" decorative />
    </div>
  ),
  args: {
    icon: Star,
  },
};

// Status Icons
export const StatusIcons: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
    >
      <Icon icon={CheckCircle} size="lg" color="success" label="Success" />
      <Icon icon={AlertCircle} size="lg" color="warning" label="Warning" />
      <Icon icon={XCircle} size="lg" color="error" label="Error" />
      <Icon icon={Info} size="lg" color="info" label="Info" />
    </div>
  ),
  args: {
    icon: CheckCircle,
  },
};

// Common Icons
export const CommonIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-4)",
        flexWrap: "wrap",
      }}
    >
      <Icon icon={Search} size="md" decorative />
      <Icon icon={Download} size="md" decorative />
      <Icon icon={Settings} size="md" decorative />
      <Icon icon={User} size="md" decorative />
      <Icon icon={Mail} size="md" decorative />
      <Icon icon={Bell} size="md" decorative />
      <Icon icon={Heart} size="md" decorative />
      <Icon icon={Star} size="md" decorative />
    </div>
  ),
  args: {
    icon: Search,
  },
};

export const AllVariants: Story = {
  args: { icon: Star },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-6)",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Icon icon={Star} size="lg" color="current" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Current
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={Star} size="lg" color="primary" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Primary
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={Star} size="lg" color="secondary" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Secondary
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={Star} size="lg" color="tertiary" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Tertiary
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={Star} size="lg" color="brand" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Brand
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={CheckCircle} size="lg" color="success" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Success
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={AlertCircle} size="lg" color="warning" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Warning
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={XCircle} size="lg" color="error" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Error
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon icon={Info} size="lg" color="info" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          Info
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          background: "var(--interactive-primary)",
          borderRadius: "var(--radius-sm)",
          padding: "var(--spacing-2)",
        }}
      >
        <Icon icon={Star} size="lg" color="inverse" decorative />
        <p
          style={{
            marginTop: "var(--spacing-2)",
            fontSize: "var(--font-size-12)",
            color: "var(--interactive-primary-text)",
          }}
        >
          Inverse
        </p>
      </div>
    </div>
  ),
};
