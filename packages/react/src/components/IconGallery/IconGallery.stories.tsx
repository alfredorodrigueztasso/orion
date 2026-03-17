import type { Meta, StoryObj } from "@storybook/react";
import { IconGallery } from "./IconGallery";

const meta: Meta<typeof IconGallery> = {
  title: "Documentation/Icon Browser",
  component: IconGallery,
  parameters: {
    layout: "fullscreen",
    // Hide controls panel - this is a utility page, not a configurable component
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          "Browse and search 5000+ Lucide icons. Click any icon to copy the import code.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Single story - the complete icon browser page
export const Browse: Story = {};
