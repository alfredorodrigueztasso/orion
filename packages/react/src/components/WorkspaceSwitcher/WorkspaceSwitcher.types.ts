import type { HTMLAttributes } from "react";

export interface WorkspaceOrg {
  /** Organization display name */
  name: string;
  /** User's role in this organization */
  role: string;
}

export interface CurrentWorkspaceOrg extends WorkspaceOrg {
  /** Number of members */
  memberCount: number;
}

export interface WorkspaceSwitcherProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** The currently active organization */
  currentOrg: CurrentWorkspaceOrg;
  /** List of other organizations to switch to */
  organizations: WorkspaceOrg[];
  /** Called when Settings button is clicked */
  onSettings?: () => void;
  /** Called when Participants button is clicked */
  onParticipants?: () => void;
  /** Called when "Nueva organización" button is clicked */
  onCreateOrganization?: () => void;
  /** Called when user clicks another organization to switch to */
  onOrgChange?: (orgName: string) => void;
  /**
   * Whether the trigger stretches to full width.
   * @default true
   */
  fullWidth?: boolean;
}
