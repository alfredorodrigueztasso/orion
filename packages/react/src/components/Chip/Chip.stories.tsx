/**
 * Chip Component Stories
 *
 * Note: ESLint rules disabled for render() functions with hooks (valid Storybook pattern)
 */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { Check, Star, AlertCircle, X } from "lucide-react";

const meta: Meta<typeof Chip> = {
  title: "Components/Data Display/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "error",
        "info",
        "inverse",
      ],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "Default Chip",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "var(--spacing-2)", alignItems: "center" }}
    >
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
      <Chip icon={<Check size={14} />} variant="success">
        Completed
      </Chip>
      <Chip icon={<Star size={14} />} variant="warning">
        Featured
      </Chip>
      <Chip icon={<AlertCircle size={14} />} variant="error">
        Error
      </Chip>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [chips, setChips] = useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Node.js",
    ]);

    const removeChip = (chip: string) => {
      setChips(chips.filter((c) => c !== chip));
    };

    return (
      <div
        style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}
      >
        {chips.map((chip) => (
          <Chip key={chip} onRemove={() => removeChip(chip)}>
            {chip}
          </Chip>
        ))}
        {chips.length === 0 && (
          <span style={{ color: "var(--text-tertiary)" }}>No chips left!</span>
        )}
      </div>
    );
  },
};

export const Clickable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    const options = ["Option A", "Option B", "Option C"];

    return (
      <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
        {options.map((option) => (
          <Chip
            key={option}
            clickable
            selected={selected === option}
            onClick={() => setSelected(option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    };

    const tags = ["JavaScript", "Python", "Go", "Rust", "Java"];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <div
          style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag}
              variant="primary"
              clickable
              selected={selected.includes(tag)}
              onClick={() => toggleSelect(tag)}
            >
              {tag}
            </Chip>
          ))}
        </div>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Selected: {selected.length > 0 ? selected.join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
      <Chip disabled>Disabled</Chip>
      <Chip disabled onRemove={() => {}}>
        Disabled Removable
      </Chip>
      <Chip disabled onClick={() => {}}>
        Disabled Clickable
      </Chip>
    </div>
  ),
};

export const StatusTags: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span style={{ width: "80px", fontSize: "var(--font-size-14)" }}>
          Order 1:
        </span>
        <Chip variant="success" size="sm" icon={<Check size={12} />}>
          Delivered
        </Chip>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span style={{ width: "80px", fontSize: "var(--font-size-14)" }}>
          Order 2:
        </span>
        <Chip variant="warning" size="sm">
          In Transit
        </Chip>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span style={{ width: "80px", fontSize: "var(--font-size-14)" }}>
          Order 3:
        </span>
        <Chip variant="error" size="sm" icon={<X size={12} />}>
          Cancelled
        </Chip>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span style={{ width: "80px", fontSize: "var(--font-size-14)" }}>
          Order 4:
        </span>
        <Chip variant="info" size="sm">
          Processing
        </Chip>
      </div>
    </div>
  ),
};

export const FilterChips: Story = {
  render: () => {
    const [filters, setFilters] = useState<string[]>([
      "Price: $0-$100",
      "Brand: Nike",
    ]);

    const removeFilter = (filter: string) => {
      setFilters(filters.filter((f) => f !== filter));
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-3)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Active Filters:
        </p>
        <div
          style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}
        >
          {filters.map((filter) => (
            <Chip key={filter} onRemove={() => removeFilter(filter)} size="sm">
              {filter}
            </Chip>
          ))}
          {filters.length > 0 && (
            <Chip
              variant="error"
              size="sm"
              clickable
              onClick={() => setFilters([])}
            >
              Clear All
            </Chip>
          )}
        </div>
      </div>
    );
  },
};

export const AllVariantsWithInverse: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
      <Chip variant="info">Info</Chip>
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "var(--spacing-2)",
          borderRadius: "var(--radius-full)",
        }}
      >
        <Chip variant="inverse">Inverse</Chip>
      </div>
    </div>
  ),
};
