import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  LayoutGrid,
  Columns3,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { ToggleGroup } from "./ToggleGroup";

const meta = {
  title: "Components/Forms/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection mode",
    },
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
    disabled: {
      control: "boolean",
      description: "Disable all items",
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {
  args: {
    type: "single",
    defaultValue: "center",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeft size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenter size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRight size={20} />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
    defaultValue: ["bold"],
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <Bold size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <Italic size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <Underline size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="strikethrough" aria-label="Strikethrough">
        <Strikethrough size={20} />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const OutlineVariant: Story = {
  args: {
    type: "single",
    variant: "outline",
    defaultValue: "grid",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="list" aria-label="List view">
        <List size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="grid" aria-label="Grid view">
        <LayoutGrid size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="columns" aria-label="Columns view">
        <Columns3 size={20} />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const WithTextLabels: Story = {
  args: {
    type: "single",
    variant: "outline",
    defaultValue: "monthly",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="monthly">Monthly</ToggleGroup.Item>
      <ToggleGroup.Item value="yearly">Yearly</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: {
    type: "single",
    disabled: true,
    defaultValue: "center",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="left" aria-label="Align left">
        <AlignLeft size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align center">
        <AlignCenter size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align right">
        <AlignRight size={20} />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const DisabledItem: Story = {
  args: { type: "single" as const },
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroup.Item value="left" aria-label="Left">
        <AlignLeft size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Center" disabled>
        <AlignCenter size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Right">
        <AlignRight size={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="justify" aria-label="Justify">
        <AlignJustify size={20} />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Controlled: Story = {
  args: { type: "single" as const },
  render: () => {
    const [value, setValue] = useState<string | string[]>("system");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <ToggleGroup
          type="single"
          variant="outline"
          value={value}
          onValueChange={setValue}
        >
          <ToggleGroup.Item value="light">
            <Sun size={18} /> Light
          </ToggleGroup.Item>
          <ToggleGroup.Item value="dark">
            <Moon size={18} /> Dark
          </ToggleGroup.Item>
          <ToggleGroup.Item value="system">
            <Monitor size={18} /> System
          </ToggleGroup.Item>
        </ToggleGroup>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Theme: {String(value)}
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  args: { type: "single" as const },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
        alignItems: "flex-start",
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
          Small
        </p>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroup.Item value="left" aria-label="Left">
            <AlignLeft size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" aria-label="Center">
            <AlignCenter size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" aria-label="Right">
            <AlignRight size={16} />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
          }}
        >
          Medium
        </p>
        <ToggleGroup type="single" size="md" defaultValue="center">
          <ToggleGroup.Item value="left" aria-label="Left">
            <AlignLeft size={20} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" aria-label="Center">
            <AlignCenter size={20} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" aria-label="Right">
            <AlignRight size={20} />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
          }}
        >
          Large
        </p>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroup.Item value="left" aria-label="Left">
            <AlignLeft size={24} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" aria-label="Center">
            <AlignCenter size={24} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" aria-label="Right">
            <AlignRight size={24} />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    </div>
  ),
};

export const TextFormattingToolbar: Story = {
  args: { type: "single" as const },
  render: () => {
    const [formatting, setFormatting] = useState<string | string[]>([]);
    const [alignment, setAlignment] = useState<string | string[]>("left");

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-4)",
          padding: "var(--spacing-3)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <ToggleGroup
          type="multiple"
          size="sm"
          value={formatting}
          onValueChange={setFormatting}
        >
          <ToggleGroup.Item value="bold" aria-label="Bold">
            <Bold size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="italic" aria-label="Italic">
            <Italic size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="underline" aria-label="Underline">
            <Underline size={16} />
          </ToggleGroup.Item>
        </ToggleGroup>
        <div
          style={{
            width: "1px",
            height: "24px",
            background: "var(--border-subtle)",
          }}
        />
        <ToggleGroup
          type="single"
          size="sm"
          value={alignment}
          onValueChange={setAlignment}
        >
          <ToggleGroup.Item value="left" aria-label="Align left">
            <AlignLeft size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" aria-label="Align center">
            <AlignCenter size={16} />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" aria-label="Align right">
            <AlignRight size={16} />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    );
  },
};
