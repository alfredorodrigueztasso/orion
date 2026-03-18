import type { Meta, StoryObj } from "@storybook/react";
import { CollapsibleFolder } from "./CollapsibleFolder";

const meta = {
  title: "Components/Layout/CollapsibleFolder",
  component: CollapsibleFolder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CollapsibleFolder>;

export default meta;
type Story = StoryObj<typeof meta>;

interface SampleItem {
  id: string;
  name: string;
  draggable?: boolean;
}

const sampleItems: SampleItem[] = [
  { id: "1", name: "Document.pdf", draggable: true },
  { id: "2", name: "Presentation.pptx", draggable: true },
  { id: "3", name: "Data.xlsx", draggable: true },
];

export const Default: Story = {
  args: {
    id: "folder-1",
    title: "Documents",
    itemCount: 3,
    items: sampleItems as any[],
    itemLabel: "Document",
    itemLabelPlural: "Documents",
    emptyText: "No documents in this folder",
    renderItem: (item: any) => <div className="p-2">{item.name}</div>,
  },
};

export const Empty: Story = {
  args: {
    id: "folder-2",
    title: "Empty Folder",
    itemCount: 0,
    items: [],
    itemLabel: "Item",
    itemLabelPlural: "Items",
    emptyText: "This folder is empty",
    renderItem: () => null,
  },
};

export const Collapsed: Story = {
  args: {
    id: "folder-3",
    title: "Projects",
    itemCount: 5,
    items: sampleItems as any[],
    itemLabel: "Project",
    itemLabelPlural: "Projects",
    defaultExpanded: false,
    renderItem: (item: any) => <div className="p-2">{item.name}</div>,
  },
};
