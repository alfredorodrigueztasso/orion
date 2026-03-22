import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import type {
  CurrentWorkspaceOrg,
  WorkspaceOrg,
} from "./WorkspaceSwitcher.types";

const meta = {
  title: "Components/Navigation/WorkspaceSwitcher",
  component: WorkspaceSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WorkspaceSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

const currentOrg: CurrentWorkspaceOrg = {
  name: "Acme Corp",
  role: "Admin",
  memberCount: 24,
};

const otherOrgs: WorkspaceOrg[] = [
  { name: "Tech Startup", role: "Member" },
  { name: "Design Lab", role: "Viewer" },
  { name: "Marketing Team", role: "Member" },
];

export const Default: Story = {
  args: {
    currentOrg,
    organizations: otherOrgs,
    fullWidth: true,
  },
};

export const Compact: Story = {
  args: {
    currentOrg,
    organizations: otherOrgs,
    fullWidth: false,
  },
};

export const SingleOrganization: Story = {
  args: {
    currentOrg,
    organizations: [],
    fullWidth: true,
  },
};
