import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta = {
  title: "Sections/Marketing/Timeline",
  component: Timeline,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const events = [
  { id: "1", date: "Mar 2024", title: "Launch", description: "Public release" },
  { id: "2", date: "Jun 2024", title: "v2.0", description: "Major update" },
  { id: "3", date: "Sep 2024", title: "Growth", description: "10K users" },
  { id: "4", date: "Mar 2025", title: "TypeScript", description: "Full TS support" },
];

export const Default: Story = { args: { title: "Journey", events } };

export const Compact: Story = { args: { title: "Timeline", events: events.slice(0, 2), compact: true } };

export const Vertical: Story = { args: { title: "Milestones", events, orientation: "vertical" } };

export const AllVariants: Story = {
  args: {
    title: "Standard",
    events,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Timeline {...args} />
      <Timeline title="Compact" events={events.slice(0, 2)} compact={true} />
      <Timeline title="Vertical" events={events} orientation="vertical" />
    </div>
  ),
};
