import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import type { SelectOption } from "./Select.types";
import { useState } from "react";

const meta = {
  title: "Components/Forms/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: SelectOption[] = [
  { value: "mx", label: "Mexico" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
];

const sizes: SelectOption[] = [
  { value: "xs", label: "Extra Small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

export const Default: Story = {
  args: {
    label: "Country",
    options: countries,
    placeholder: "Select your country",
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("mx");
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: "Size",
    options: sizes,
    placeholder: "Choose a size",
    required: true,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Shipping Country",
    options: countries,
    helperText: "Select the country for shipping",
    placeholder: "Choose a country",
  },
};

export const WithError: Story = {
  args: {
    label: "Payment Method",
    options: [
      { value: "card", label: "Credit Card" },
      { value: "paypal", label: "PayPal" },
      { value: "bank", label: "Bank Transfer" },
    ],
    error: "Please select a payment method",
  },
};

export const Disabled: Story = {
  args: {
    label: "Account Type",
    options: [
      { value: "free", label: "Free" },
      { value: "premium", label: "Premium" },
      { value: "enterprise", label: "Enterprise" },
    ],
    value: "premium",
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: "Size",
    size: "sm",
    options: sizes,
    placeholder: "Small select",
  },
};

export const Medium: Story = {
  args: {
    label: "Size",
    size: "md",
    options: sizes,
    placeholder: "Medium select (default)",
  },
};

export const Large: Story = {
  args: {
    label: "Size",
    size: "lg",
    options: sizes,
    placeholder: "Large select",
  },
};

export const MultipleSelects: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        maxWidth: "400px",
      }}
    >
      <Select
        label="Country"
        options={countries}
        placeholder="Select your country"
        required
      />
      <Select
        label="T-Shirt Size"
        options={sizes}
        placeholder="Choose your size"
        helperText="Refer to our size guide if unsure"
      />
      <Select
        label="Shipping Speed"
        options={[
          { value: "standard", label: "Standard (5-7 days)" },
          { value: "express", label: "Express (2-3 days)" },
          { value: "overnight", label: "Overnight" },
        ]}
        placeholder="Select shipping option"
      />
    </div>
  ),
};
