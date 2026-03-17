import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import {
  Search,
  Download,
  ChevronDown,
  Check,
  Trash2,
  Plus,
  Settings,
  Heart,
  ExternalLink,
  Menu,
} from "lucide-react";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
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
        "secondaryInverse",
        "ghost",
        "ghostInverse",
        "danger",
        "inverse",
      ],
      description: "Button visual style",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    fullWidth: {
      control: "boolean",
      description: "Make button full width",
    },
    disabled: {
      control: "boolean",
      description: "Disable button",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

export const Inverse: Story = {
  args: {
    variant: "inverse",
    children: "Inverse Button",
  },
};

export const SecondaryInverse: Story = {
  args: {
    variant: "secondaryInverse",
    children: "Secondary Inverse Button",
  },
};

export const GhostInverse: Story = {
  args: {
    variant: "ghostInverse",
    children: "Ghost Inverse Button",
  },
};

// Inverse on colored background - combine with regular secondary/ghost for supporting actions
export const InverseOnColoredBackground: Story = {
  render: () => (
    <div
      style={{
        background: "var(--interactive-primary)",
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-container)",
        display: "flex",
        gap: "var(--spacing-4)",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
        style={{ color: "white", margin: 0, fontFamily: "var(--font-primary)" }}
      >
        Summer Sale - 50% Off
      </h3>
      <p style={{ color: "white", margin: 0 }}>
        Limited time offer on all products
      </p>
      <div
        style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}
      >
        <Button variant="inverse">Shop Now</Button>
        <Button variant="secondaryInverse">Learn More</Button>
        <Button variant="ghostInverse">Skip</Button>
      </div>
    </div>
  ),
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-4)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Lucide Icons - Left side
export const LucideIconsLeft: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
      <Button icon={<Search size={20} />}>Search</Button>
      <Button icon={<Download size={20} />} variant="secondary">
        Download
      </Button>
      <Button icon={<Plus size={20} />} variant="ghost">
        Add
      </Button>
      <Button icon={<Settings size={20} />} variant="ghost">
        Settings
      </Button>
    </div>
  ),
};

// Lucide Icons - Right side
export const LucideIconsRight: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
      <Button iconRight={<ChevronDown size={20} />}>Dropdown</Button>
      <Button iconRight={<ExternalLink size={20} />} variant="secondary">
        External
      </Button>
      <Button iconRight={<Check size={20} />} variant="ghost">
        Confirm
      </Button>
    </div>
  ),
};

// Lucide Icons - Icon only
export const LucideIconsOnly: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
      <Button iconOnly icon={<Search size={20} />} aria-label="Search" />
      <Button
        iconOnly
        icon={<Heart size={20} />}
        variant="secondary"
        aria-label="Like"
      />
      <Button
        iconOnly
        icon={<Trash2 size={20} />}
        variant="danger"
        aria-label="Delete"
      />
      <Button
        iconOnly
        icon={<Settings size={20} />}
        variant="ghost"
        aria-label="Settings"
      />
    </div>
  ),
};

// Lucide Icons - Both sides
export const LucideIconsBoth: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
      <Button icon={<Menu size={20} />} iconRight={<ChevronDown size={20} />}>
        Menu Options
      </Button>
      <Button
        icon={<Download size={20} />}
        iconRight={<ExternalLink size={20} />}
      >
        Download File
      </Button>
    </div>
  ),
};

// Lucide Icons - Loading with icon
export const LucideWithLoading: Story = {
  args: {
    icon: <Download size={20} />,
    children: "Downloading...",
    isLoading: true,
  },
};

// Loading states for all variants
export const LoadingAllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-4)", flexWrap: "wrap" }}>
      <Button variant="primary" isLoading>
        Primary
      </Button>
      <Button variant="secondary" isLoading>
        Secondary
      </Button>
      <Button variant="secondaryInverse" isLoading>
        Sec. Inverse
      </Button>
      <Button variant="ghost" isLoading>
        Ghost
      </Button>
      <Button variant="ghostInverse" isLoading>
        Ghost Inv.
      </Button>
      <Button variant="danger" isLoading>
        Danger
      </Button>
      <Button variant="inverse" isLoading>
        Inverse
      </Button>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-4)", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryInverse">Secondary Inverse</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghostInverse">Ghost Inverse</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="inverse">Inverse</Button>
    </div>
  ),
};

// Design reference — 4-quadrant grid matching the design spec
export const DesignReference: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--spacing-05)",
        width: "800px",
      }}
    >
      {/* Light */}
      <div
        style={{
          background: "var(--color-neutral-0)",
          padding: "var(--spacing-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
        data-theme="light"
      >
        <span
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Light
        </span>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-3)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Dark */}
      <div
        style={{
          background: "var(--surface-base)",
          padding: "var(--spacing-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
        data-theme="dark"
      >
        <span
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Dark
        </span>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-3)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Inverse Light */}
      <div
        style={{
          background: "var(--interactive-primary)",
          padding: "var(--spacing-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
        data-theme="light"
      >
        <span
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "var(--font-size-14)",
            color: "var(--interactive-primary-text)",
          }}
        >
          Inverse Light
        </span>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-3)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="inverse">Primary</Button>
          <Button variant="secondaryInverse">Secondary</Button>
          <Button variant="ghostInverse">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Inverse Dark */}
      <div
        style={{
          background: "var(--interactive-primary)",
          padding: "var(--spacing-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
        data-theme="dark"
      >
        <span
          style={{
            fontFamily: "var(--font-secondary)",
            fontSize: "var(--font-size-14)",
            color: "var(--interactive-primary-text)",
          }}
        >
          Inverse Dark
        </span>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-3)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button variant="inverse">Primary</Button>
          <Button variant="secondaryInverse">Secondary</Button>
          <Button variant="ghostInverse">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

// Showcase inverse variants on dark/colored backgrounds
export const InverseVariantsOnDarkBackgrounds: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      {/* Dark Photo Background */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1557683316-973673baf926?w=800") center/cover',
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-container)",
          display: "flex",
          gap: "var(--spacing-4)",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "white",
            margin: 0,
            fontFamily: "var(--font-primary)",
          }}
        >
          On Dark Photo Background
        </h3>
        <div
          style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}
        >
          <Button variant="inverse">Get Started</Button>
          <Button variant="secondaryInverse">Learn More</Button>
          <Button variant="ghostInverse">Skip</Button>
        </div>
      </div>

      {/* Colored Brand Background */}
      <div
        style={{
          background: "var(--interactive-primary)",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-container)",
          display: "flex",
          gap: "var(--spacing-4)",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "white",
            margin: 0,
            fontFamily: "var(--font-primary)",
          }}
        >
          On Brand Color Background
        </h3>
        <div
          style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}
        >
          <Button variant="inverse">Shop Now</Button>
          <Button variant="secondaryInverse">Learn More</Button>
          <Button variant="ghostInverse">Maybe Later</Button>
        </div>
      </div>

      {/* Gradient Background */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600))",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-container)",
          display: "flex",
          gap: "var(--spacing-4)",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color: "white",
            margin: 0,
            fontFamily: "var(--font-primary)",
          }}
        >
          On Gradient Background
        </h3>
        <div
          style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}
        >
          <Button variant="inverse">Join Now</Button>
          <Button variant="secondaryInverse">Preview</Button>
          <Button variant="ghostInverse">Not Now</Button>
        </div>
      </div>
    </div>
  ),
};
