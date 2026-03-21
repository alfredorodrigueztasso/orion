import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "Sections/Marketing/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "products", label: "Products", href: "/products" },
  {
    id: "design-system",
    label: "Design System",
    href: "/products/design-system",
  },
  { id: "components", label: "Components" },
];

export const Default: Story = { args: { items } };

export const CustomSeparator: Story = { args: { items, separator: "›" } };

export const AllVariants: Story = {
  args: { items },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <Breadcrumbs {...args} />
      <Breadcrumbs {...args} separator="›" />
    </div>
  ),
};
