import type { Meta, StoryObj } from "@storybook/react";
import { InboxIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Sections/Marketing/EmptyState",
  component: EmptyState,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <InboxIcon size={48} />,
    title: "No messages",
    description: "You're all caught up!",
  },
};

export const WithAction: Story = {
  args: {
    icon: <SearchIcon size={48} />,
    title: "No results",
    description: "Try adjusting your search",
    action: <Button variant="secondary">Clear</Button>,
  },
};

export const AllVariants: Story = {
  args: {
    icon: <InboxIcon size={48} />,
    title: "No items",
    description: "Nothing yet",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <EmptyState {...args} />
      <EmptyState
        icon={<SearchIcon size={48} />}
        title="No results"
        description="Try again"
        action={<Button>Reset</Button>}
      />
    </div>
  ),
};
