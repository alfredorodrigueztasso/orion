import type { Meta, StoryObj } from "@storybook/react";
import { Blog } from "./Blog";

const meta = {
  title: "Sections/Marketing/Blog",
  component: Blog,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Blog>;

export default meta;
type Story = StoryObj<typeof meta>;

const blogPosts = [
  {
    id: "1",
    title: "Getting Started with Orion",
    excerpt:
      "Learn how to set up and use the Orion design system in your projects",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    date: "Mar 15, 2026",
    readTime: 5,
  },
  {
    id: "2",
    title: "Designing for Dark Mode",
    excerpt: "Best practices for creating beautiful dark mode experiences",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    author: {
      name: "Alex Jordan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    date: "Mar 12, 2026",
    readTime: 8,
  },
];

export const Default: Story = {
  args: {
    title: "Latest Articles",
    description: "Insights from the team",
    articles: blogPosts,
  },
};

export const Grid: Story = {
  args: {
    title: "Featured Posts",
    articles: blogPosts,
    layout: "grid",
    columns: 3,
  },
};

export const List: Story = {
  args: { title: "All Articles", articles: blogPosts, layout: "list" },
};

export const AllVariants: Story = {
  args: { title: "Grid", articles: blogPosts, layout: "grid", columns: 3 },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Blog {...args} />
      <Blog {...args} layout="list" />
    </div>
  ),
};
