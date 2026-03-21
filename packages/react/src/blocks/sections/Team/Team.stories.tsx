import type { Meta, StoryObj } from "@storybook/react";
import { Team } from "./Team";

const meta = {
  title: "Sections/Marketing/Team",
  component: Team,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

const members = [
  {
    name: "Sarah",
    role: "Design Lead",
    avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Alex",
    role: "Engineer",
    avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Jordan",
    role: "PM",
    avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
  {
    name: "Casey",
    role: "Advocate",
    avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
  },
];

export const Default: Story = {
  args: { title: "Our Team", description: "Talented people", members },
};

export const TwoColumns: Story = {
  args: { title: "Team", members, columns: 2 },
};

export const ThreeColumns: Story = {
  args: { title: "People", members, columns: 3 },
};

export const AllVariants: Story = {
  args: {
    title: "2 Cols",
    members: members.slice(0, 2),
    columns: 2,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Team {...args} />
      <Team title="3 Cols" members={members} columns={3} />
      <Team title="4 Cols" members={members} columns={4} />
    </div>
  ),
};
