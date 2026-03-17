/**
 * DatePicker Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { subDays, addDays } from "date-fns";
import { DatePicker } from "./DatePicker";
import type { DateRange } from "../Calendar/Calendar.types";

const meta = {
  title: "Components/Overlays/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range"],
      description: "Selection mode",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the trigger",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <DatePicker
        selected={date}
        onSelect={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <DatePicker selected={date} onSelect={setDate} />;
  },
};

export const RangeMode: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);

    return (
      <DatePicker
        mode="range"
        selected={range}
        onSelect={setRange}
        placeholder="Select date range"
      />
    );
  },
};

export const RangeWithValue: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: subDays(new Date(), 7),
      to: new Date(),
    });

    return <DatePicker mode="range" selected={range} onSelect={setRange} />;
  },
};

export const WithPresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const today = new Date();

    return (
      <DatePicker
        mode="range"
        selected={range}
        onSelect={setRange}
        placeholder="Select date range"
        presets={[
          { label: "Today", value: { from: today, to: today } },
          {
            label: "Last 7 days",
            value: { from: subDays(today, 7), to: today },
          },
          {
            label: "Last 30 days",
            value: { from: subDays(today, 30), to: today },
          },
          {
            label: "Last 90 days",
            value: { from: subDays(today, 90), to: today },
          },
        ]}
      />
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-2)",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-13)",
            color: "var(--text-secondary)",
          }}
        >
          Only dates within the next 30 days
        </span>
        <DatePicker
          selected={date}
          onSelect={setDate}
          min={today}
          max={addDays(today, 30)}
          placeholder="Select a date"
        />
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker selected={date} onSelect={setDate} format="dd/MM/yyyy" />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker selected={new Date()} onSelect={() => {}} disabled />
  ),
};
