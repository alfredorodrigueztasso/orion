/**
 * SearchInput Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/Forms/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

// Interactive wrapper that accepts Storybook args
const InteractiveSearchInput = (
  args: Partial<React.ComponentProps<typeof SearchInput>>,
) => {
  const [value, setValue] = useState("");

  return (
    <SearchInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: "Search...",
    size: "md",
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const WithValue: Story = {
  args: {
    placeholder: "Search...",
    size: "md",
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

const WithSearchButtonComponent = () => {
  const [value, setValue] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
      }}
    >
      <SearchInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        onSearch={(v) => setLastSearch(v)}
        placeholder="Search and press Enter or click button..."
        showSearchButton
      />
      {lastSearch && (
        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--text-secondary)",
          }}
        >
          Last search: "{lastSearch}"
        </p>
      )}
    </div>
  );
};

export const WithSearchButton: Story = {
  render: () => <WithSearchButtonComponent />,
};

export const SmallSize: Story = {
  args: {
    placeholder: "Search...",
    size: "sm",
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const LargeSize: Story = {
  args: {
    placeholder: "Search...",
    size: "lg",
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const ExtraLargeSize: Story = {
  args: {
    placeholder: "Search...",
    size: "xl",
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: "500px" }}>
      <InteractiveSearchInput {...args} />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    placeholder: "Search...",
    size: "md",
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <InteractiveSearchInput {...args} />
    </div>
  ),
};

const LoadingComponent = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SearchInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
      onSearch={handleSearch}
      placeholder="Type and press Enter..."
      loading={loading}
    />
  );
};

export const Loading: Story = {
  render: () => <LoadingComponent />,
};

export const NoClearButton: Story = {
  args: {
    placeholder: "Search...",
    size: "md",
    showClear: false,
  },
  render: (args) => <InteractiveSearchInput {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: "Search disabled",
    disabled: true,
  },
};

export const AllSizes: Story = {
  args: {
    placeholder: "Search...",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        alignItems: "flex-start",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-base)",
          }}
        >
          Small
        </p>
        <InteractiveSearchInput {...args} size="sm" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-base)",
          }}
        >
          Medium (Default)
        </p>
        <InteractiveSearchInput {...args} size="md" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-base)",
          }}
        >
          Large
        </p>
        <InteractiveSearchInput {...args} size="lg" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-base)",
          }}
        >
          Extra Large
        </p>
        <InteractiveSearchInput {...args} size="xl" />
      </div>
    </div>
  ),
};

const SearchWithResultsComponent = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];

  const handleSearch = (query: string) => {
    setLoading(true);
    setTimeout(() => {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ width: "300px" }}>
      <SearchInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value) {
            handleSearch(e.target.value);
          } else {
            setResults([]);
          }
        }}
        onClear={() => {
          setValue("");
          setResults([]);
        }}
        placeholder="Search fruits..."
        loading={loading}
        fullWidth
      />
      {results.length > 0 && (
        <div
          style={{
            marginTop: "var(--spacing-2)",
            padding: "var(--spacing-2)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {results.map((item) => (
            <div
              key={item}
              style={{
                padding: "var(--spacing-2)",
                cursor: "pointer",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SearchWithResults: Story = {
  render: () => <SearchWithResultsComponent />,
};
