/**
 * Combobox Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { User, Code, Briefcase, Globe } from "lucide-react";
import { Combobox } from "./Combobox";
import { Avatar } from "../Avatar";

const meta: Meta<typeof Combobox> = {
  title: "Components/Forms/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", padding: "var(--spacing-5)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
];

const countryOptions = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
];

// Interactive wrapper
const InteractiveCombobox = (
  props: Partial<React.ComponentProps<typeof Combobox>>,
) => {
  const [value, setValue] = useState<string | null>(props.value ?? null);

  return (
    <Combobox
      options={frameworkOptions}
      value={value}
      onChange={(v) => setValue(v)}
      placeholder="Select a framework..."
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <InteractiveCombobox />,
};

export const WithLabel: Story = {
  render: () => <InteractiveCombobox label="Framework" />,
};

export const WithHelperText: Story = {
  render: () => (
    <InteractiveCombobox
      label="Framework"
      helperText="Choose your preferred JavaScript framework"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <InteractiveCombobox label="Framework" error="Please select a framework" />
  ),
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Combobox
        options={countryOptions}
        value={value}
        onChange={(v) => setValue(v)}
        label="Country"
        placeholder="Select a country..."
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      { value: "dev", label: "Developer", icon: <Code size={18} /> },
      { value: "design", label: "Designer", icon: <User size={18} /> },
      { value: "pm", label: "Product Manager", icon: <Briefcase size={18} /> },
      { value: "marketing", label: "Marketing", icon: <Globe size={18} /> },
    ];

    return (
      <Combobox
        options={options}
        value={value}
        onChange={(v) => setValue(v)}
        label="Role"
        placeholder="Select your role..."
      />
    );
  },
};

export const WithAvatars: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      {
        value: "alice",
        label: "Alice Cooper",
        description: "alice@example.com",
        icon: <Avatar initials="AC" size="xs" />,
      },
      {
        value: "bob",
        label: "Bob Martin",
        description: "bob@example.com",
        icon: <Avatar initials="BM" size="xs" />,
      },
      {
        value: "carol",
        label: "Carol White",
        description: "carol@example.com",
        icon: <Avatar initials="CW" size="xs" />,
      },
    ];

    return (
      <Combobox
        options={options}
        value={value}
        onChange={(v) => setValue(v)}
        label="Assignee"
        placeholder="Select a person..."
      />
    );
  },
};

export const Loading: Story = {
  render: () => <InteractiveCombobox loading />,
};

export const NotClearable: Story = {
  render: () => <InteractiveCombobox clearable={false} />,
};

export const MinimumCharacters: Story = {
  render: () => (
    <InteractiveCombobox
      minChars={2}
      helperText="Type at least 2 characters to see options"
    />
  ),
};

export const CustomEmptyState: Story = {
  render: () => (
    <InteractiveCombobox emptyText="No frameworks match your search. Try something else!" />
  ),
};

export const SmallSize: Story = {
  render: () => <InteractiveCombobox size="sm" label="Framework" />,
};

export const LargeSize: Story = {
  render: () => <InteractiveCombobox size="lg" label="Framework" />,
};

export const FullWidth: Story = {
  render: () => <InteractiveCombobox fullWidth label="Framework" />,
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    options: frameworkOptions,
    value: "react",
    disabled: true,
    label: "Framework",
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular (Coming soon)", disabled: true },
      { value: "svelte", label: "Svelte (Coming soon)", disabled: true },
    ];

    return (
      <Combobox
        options={options}
        value={value}
        onChange={(v) => setValue(v)}
        label="Framework"
        placeholder="Select a framework..."
      />
    );
  },
};

export const PreSelected: Story = {
  render: () => <InteractiveCombobox value="react" />,
};

export const AllSizes: Story = {
  render: () => {
    const [value1, setValue1] = useState<string | null>(null);
    const [value2, setValue2] = useState<string | null>(null);
    const [value3, setValue3] = useState<string | null>(null);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
      >
        <Combobox
          options={frameworkOptions}
          value={value1}
          onChange={(v) => setValue1(v)}
          size="sm"
          label="Small"
          placeholder="Select..."
        />
        <Combobox
          options={frameworkOptions}
          value={value2}
          onChange={(v) => setValue2(v)}
          size="md"
          label="Medium"
          placeholder="Select..."
        />
        <Combobox
          options={frameworkOptions}
          value={value3}
          onChange={(v) => setValue3(v)}
          size="lg"
          label="Large"
          placeholder="Select..."
        />
      </div>
    );
  },
};

export const AsyncSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<typeof frameworkOptions>([]);

    const handleInputChange = (input: string) => {
      if (input.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        const filtered = frameworkOptions.filter((opt) =>
          opt.label.toLowerCase().includes(input.toLowerCase()),
        );
        setOptions(filtered);
        setLoading(false);
      }, 500);
    };

    return (
      <Combobox
        options={options}
        value={value}
        onChange={(v) => setValue(v)}
        onInputChange={handleInputChange}
        loading={loading}
        label="Framework"
        placeholder="Search frameworks..."
        helperText="Type to search (simulated API)"
        minChars={2}
      />
    );
  },
};
