import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Bold,
  Italic,
  Star,
  Pin,
  Mic,
  MicOff,
  Eye,
  EyeOff,
  Bookmark,
} from "lucide-react";
import { Toggle } from "./Toggle";

const meta = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Toggle size",
    },
    pressed: {
      control: "boolean",
      description: "Pressed state (controlled)",
    },
    disabled: {
      control: "boolean",
      description: "Disable toggle",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Bold size={20} />,
    "aria-label": "Toggle bold",
  },
};

export const WithText: Story = {
  args: {
    children: "Bold",
  },
};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: <Star size={20} />,
    "aria-label": "Toggle star",
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: "outline",
    children: <Bookmark size={20} />,
    "aria-label": "Toggle bookmark",
  },
};

export const OutlinePressed: Story = {
  args: {
    variant: "outline",
    defaultPressed: true,
    children: <Pin size={20} />,
    "aria-label": "Toggle pin",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Bold size={20} />,
    "aria-label": "Toggle bold",
  },
};

export const DisabledPressed: Story = {
  args: {
    disabled: true,
    defaultPressed: true,
    children: <Bold size={20} />,
    "aria-label": "Toggle bold",
  },
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <Toggle
          pressed={pressed}
          onPressedChange={setPressed}
          aria-label="Toggle mute"
        >
          {pressed ? <MicOff size={20} /> : <Mic size={20} />}
        </Toggle>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Microphone: {pressed ? "Muted" : "Active"}
        </p>
      </div>
    );
  },
};

export const VisibilityToggle: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-3)",
        }}
      >
        <Toggle
          variant="outline"
          pressed={visible}
          onPressedChange={setVisible}
          aria-label="Toggle visibility"
        >
          {visible ? <Eye size={20} /> : <EyeOff size={20} />}
        </Toggle>
        <span
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          {visible ? "Visible" : "Hidden"}
        </span>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
    >
      <Toggle size="sm" aria-label="Small">
        <Bold size={16} />
      </Toggle>
      <Toggle size="md" aria-label="Medium">
        <Bold size={20} />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold size={24} />
      </Toggle>
    </div>
  ),
};

export const AllVariantsAndStates: Story = {
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
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
          }}
        >
          Default variant
        </p>
        <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
          <Toggle aria-label="Unpressed">
            <Italic size={20} />
          </Toggle>
          <Toggle defaultPressed aria-label="Pressed">
            <Italic size={20} />
          </Toggle>
          <Toggle disabled aria-label="Disabled">
            <Italic size={20} />
          </Toggle>
          <Toggle disabled defaultPressed aria-label="Disabled pressed">
            <Italic size={20} />
          </Toggle>
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
          }}
        >
          Outline variant
        </p>
        <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
          <Toggle variant="outline" aria-label="Unpressed">
            <Italic size={20} />
          </Toggle>
          <Toggle variant="outline" defaultPressed aria-label="Pressed">
            <Italic size={20} />
          </Toggle>
          <Toggle variant="outline" disabled aria-label="Disabled">
            <Italic size={20} />
          </Toggle>
          <Toggle
            variant="outline"
            disabled
            defaultPressed
            aria-label="Disabled pressed"
          >
            <Italic size={20} />
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

export const WithTextAndIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
      <Toggle defaultPressed aria-label="Bold">
        <Bold size={18} /> Bold
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic size={18} /> Italic
      </Toggle>
    </div>
  ),
};
