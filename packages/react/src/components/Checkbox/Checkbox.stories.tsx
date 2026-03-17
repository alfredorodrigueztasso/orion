import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Checkbox size",
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state (partially checked)",
    },
    disabled: {
      control: "boolean",
      description: "Disable checkbox",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "I agree",
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Subscribe to newsletter",
    helperText: "We will send you weekly updates",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all",
    indeterminate: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small checkbox",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large checkbox",
    size: "lg",
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div>
        <Checkbox
          label="Toggle me"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Status: {checked ? "Checked ✓" : "Unchecked"}
        </p>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const options = [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" },
      { id: "option4", label: "Option 4" },
    ];

    const handleChange = (id: string, checked: boolean) => {
      setSelected((prev) =>
        checked ? [...prev, id] : prev.filter((item) => item !== id),
      );
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.label}
            checked={selected.includes(option.id)}
            onChange={(e) => handleChange(option.id, e.target.checked)}
          />
        ))}
        <p
          style={{
            marginTop: "var(--spacing-4)",
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

export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "item1", label: "Item 1", checked: false },
      { id: "item2", label: "Item 2", checked: false },
      { id: "item3", label: "Item 3", checked: false },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked) && !allChecked;

    const handleSelectAll = (checked: boolean) => {
      setItems((prev) => prev.map((item) => ({ ...item, checked })));
    };

    const handleItemChange = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item)),
      );
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Checkbox
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        <div
          style={{
            paddingLeft: "var(--spacing-8)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-3)",
          }}
        >
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={(e) => handleItemChange(item.id, e.target.checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
      }}
    >
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="With helper text" helperText="Additional information" />
      <Checkbox label="With error" error="This field is required" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
