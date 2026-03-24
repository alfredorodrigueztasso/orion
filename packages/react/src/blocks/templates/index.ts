/**
 * @orion-ds/react/templates - Full-page templates
 *
 * Pre-built, production-ready page templates for common application layouts.
 * Each template includes TypeScript types, Storybook stories, and CSS modules.
 *
 * @example App Templates
 * ```tsx
 * // Agent management
 * import { AgentEditor, AgentWorkspace } from '@orion-ds/react/templates';
 *
 * // Dashboard & Analytics
 * import { DashboardTemplate } from '@orion-ds/react/templates';
 *
 * // Task Management
 * import { KanbanPageTemplate } from '@orion-ds/react/templates';
 *
 * // Authentication
 * import { LoginTemplate } from '@orion-ds/react/templates';
 *
 * // User Management
 * import { ProfilePageTemplate } from '@orion-ds/react/templates';
 *
 * // Configuration
 * import { SettingsTemplate } from '@orion-ds/react/templates';
 * ```
 */

// App Templates
export { AgentEditor } from "./app/AgentEditor";
export type { AgentEditorProps, Agent } from "./app/AgentEditor";

export { AgentWorkspace } from "./app/AgentWorkspace";
export type { AgentWorkspaceProps, WorkspaceAgent } from "./app/AgentWorkspace";

export { DashboardTemplate } from "./app/DashboardTemplate";
export type {
  DashboardTemplateProps,
  MetricCard,
  ChartData,
  ActivityItem,
} from "./app/DashboardTemplate";

export { KanbanPageTemplate } from "./app/KanbanPageTemplate";
export type {
  KanbanPageTemplateProps,
  KanbanTask,
  KanbanColumn,
} from "./app/KanbanPageTemplate";

export { LoginTemplate } from "./app/LoginTemplate";
export type { LoginTemplateProps } from "./app/LoginTemplate";

export { ProfilePageTemplate } from "./app/ProfilePageTemplate";
export type {
  ProfilePageTemplateProps,
  UserProfile,
} from "./app/ProfilePageTemplate";

export { SettingsTemplate } from "./app/SettingsTemplate";
export type {
  SettingsTemplateProps,
  SettingSection,
} from "./app/SettingsTemplate";
