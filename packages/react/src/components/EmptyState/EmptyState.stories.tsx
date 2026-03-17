/**
 * EmptyState Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";
import {
  Inbox,
  Search,
  FileText,
  Users,
  ShoppingCart,
  FolderOpen,
  Bell,
  MessageSquare,
} from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
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
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description:
      "Try adjusting your search or filter to find what you're looking for.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Inbox size={48} strokeWidth={1.5} />,
    title: "Your inbox is empty",
    description: "When you receive messages, they'll appear here.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <FileText size={48} strokeWidth={1.5} />,
    title: "No documents",
    description: "Get started by creating your first document.",
    action: <Button>Create Document</Button>,
  },
};

export const WithTwoActions: Story = {
  args: {
    icon: <Users size={48} strokeWidth={1.5} />,
    title: "No team members",
    description: "Invite people to collaborate on your project.",
    action: <Button>Invite Members</Button>,
    secondaryAction: <Button variant="secondary">Learn More</Button>,
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    icon: <Search size={32} strokeWidth={1.5} />,
    title: "No results",
    description: "Try a different search term.",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    icon: <ShoppingCart size={64} strokeWidth={1.5} />,
    title: "Your cart is empty",
    description:
      "Looks like you haven't added any items to your cart yet. Start shopping to fill it up!",
    action: <Button size="lg">Browse Products</Button>,
  },
};

export const SearchResults: Story = {
  args: {
    icon: <Search size={48} strokeWidth={1.5} />,
    title: "No results found",
    description:
      'We couldn\'t find anything matching "quantum computing". Try different keywords.',
    action: <Button variant="secondary">Clear Search</Button>,
  },
};

export const EmptyFolder: Story = {
  args: {
    icon: <FolderOpen size={48} strokeWidth={1.5} />,
    title: "This folder is empty",
    description: "Drag and drop files here, or click to upload.",
    action: <Button>Upload Files</Button>,
  },
};

export const NoNotifications: Story = {
  args: {
    icon: <Bell size={48} strokeWidth={1.5} />,
    title: "You're all caught up!",
    description: "No new notifications at this time.",
  },
};

export const NoConversations: Story = {
  args: {
    icon: <MessageSquare size={48} strokeWidth={1.5} />,
    title: "Start a conversation",
    description: "Send a message to begin chatting with your contacts.",
    action: <Button>New Message</Button>,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-12)",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Small</h3>
        <EmptyState
          size="sm"
          icon={<Inbox size={32} strokeWidth={1.5} />}
          title="No messages"
          description="Your inbox is empty."
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Medium (Default)</h3>
        <EmptyState
          size="md"
          icon={<Inbox size={48} strokeWidth={1.5} />}
          title="No messages"
          description="Your inbox is empty."
          action={<Button>Compose</Button>}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Large</h3>
        <EmptyState
          size="lg"
          icon={<Inbox size={64} strokeWidth={1.5} />}
          title="No messages"
          description="When you receive messages from your contacts, they'll appear here in your inbox."
          action={<Button size="lg">Compose Message</Button>}
        />
      </div>
    </div>
  ),
};
