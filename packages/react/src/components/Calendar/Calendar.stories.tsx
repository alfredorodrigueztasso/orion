/**
 * Calendar Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { addDays } from "date-fns";
import { Calendar } from "./Calendar";
import type { DateRange } from "./Calendar.types";

const meta = {
  title: "Components/Overlays/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
      description: "Selection mode",
    },
    weekStartsOn: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6],
      description: "Day the week starts on (0=Sun, 1=Mon)",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar selected={date} onSelect={setDate} />;
  },
};

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return <Calendar mode="range" selected={range} onSelect={setRange} />;
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ]);

    return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
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
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-13)",
            color: "var(--text-secondary)",
          }}
        >
          Only dates within the next 14 days are selectable
        </span>
        <Calendar
          selected={date}
          onSelect={setDate}
          min={today}
          max={addDays(today, 14)}
        />
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    // Disable weekends
    const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-size-13)",
            color: "var(--text-secondary)",
          }}
        >
          Weekends are disabled
        </span>
        <Calendar selected={date} onSelect={setDate} disabled={isWeekend} />
      </div>
    );
  },
};

export const MondayStart: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar selected={date} onSelect={setDate} weekStartsOn={1} />;
  },
};

export const HideOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar selected={date} onSelect={setDate} showOutsideDays={false} />
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <Calendar onSelect={(date) => console.log("Selected:", date)} />
  ),
};
