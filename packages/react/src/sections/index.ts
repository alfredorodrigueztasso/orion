/**
 * @orion/react Sections
 *
 * Layout utilities and backward-compatible re-exports of reclassified components.
 *
 * **Important**: Premium sections (Hero, Features, Pricing, Team, etc.) and full-page
 * templates have been moved to `@orion-ds/blocks` v1.0.0 for the premium tier.
 *
 * For marketing and app sections, see `@orion-ds/blocks/sections`.
 *
 * @example
 * ```tsx
 * import {
 *   Container,
 *   Section,
 *   NavTree,
 *   DataTable,
 * } from '@orion/react/sections';
 * ```
 *
 * @packageDocumentation
 */

// ============================================================================
// LAYOUT UTILITIES (Free - Stay in React)
// ============================================================================

export { Container } from "./Container";
export type { ContainerProps, ContainerSize } from "./Container";

export { Section } from "./Section";
export type {
  SectionProps,
  SectionSpacing,
  SectionBackground,
} from "./Section";

// ============================================================================
// WIDGETS (Reclassified as Components in v3.4.0)
// ============================================================================
// Re-exporting widgets from components/ for backward compatibility
// These were previously in sections/ but are now true components

export {
  ActivityFeed,
  Banner,
  CollapsibleFolder,
  CommandBar,
  DataTable,
  DetailPanel,
  FileUploader,
  FilterBar,
  FormSection,
  KanbanBoard,
  MetricCards,
  MetricCard,
  NavTree,
  NotificationCenter,
  PageHeader,
  QuickActions,
  Sidebar,
  UserMenu,
  WorkspaceSwitcher,
} from "../components";
export type {
  ActivityFeedProps,
  ActivityItem,
  ActivityActor,
  ActivityFilter,
  BannerProps,
  BannerVariant,
  CollapsibleFolderProps,
  CommandBarProps,
  CommandItem,
  CommandGroup,
  DataTableProps,
  DataTableColumn,
  DataTableSort,
  DataTablePagination,
  DataTableFilter,
  DataTableBulkAction,
  DataTableRowAction,
  DataTableEmptyState,
  DataTableToolbarProps,
  DataTablePaginationProps,
  DataTableEmptyStateProps,
  DetailPanelProps,
  DetailPanelSize,
  DetailPanelPosition,
  FileUploaderProps,
  UploadedFile,
  FilterBarProps,
  FilterDefinition,
  FilterOption,
  ActiveFilter,
  FormSectionProps,
  FormSectionVariant,
  FormSectionGroupProps,
  FormSectionActionsProps,
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
  KanbanLabel,
  KanbanAssignee,
  KanbanDragResult,
  MetricCardsProps,
  MetricCardProps,
  MetricItem,
  MetricTrend,
  SparklineData,
  MetricCardsColumns,
  MetricCardsVariant,
  NavTreeProps,
  NavTreeNode,
  NavTreeNodeType,
  NavTreeSection,
  NavTreeSectionVariant,
  NavTreeActionConfig,
  NavTreeContextValue,
  NotificationCenterProps,
  NotificationItem,
  PageHeaderProps,
  PageHeaderVariant,
  PageHeaderSize,
  PageHeaderBreadcrumbItem,
  PageHeaderTab,
  QuickActionsProps,
  QuickAction,
  QuickActionsVariant,
  QuickActionsPosition,
  SidebarProps,
  SidebarVariant,
  SidebarItem,
  SidebarSection,
  SidebarItemProps,
  SidebarSectionProps,
  SidebarDividerProps,
  UserMenuProps,
  UserMenuItem,
  UserMenuSection,
  UserInfo,
  WorkspaceSwitcherProps,
  WorkspaceOrg,
  CurrentWorkspaceOrg,
} from "../components";

// ============================================================================
// PREMIUM SECTIONS & TEMPLATES (Moved to @orion-ds/blocks)
// ============================================================================
// Marketing sections: Hero, Features, CTA, Footer, Pricing, Testimonials, Stats, FAQ,
// CarouselSection, Team, Contact, Newsletter, LogoCloud, Blog, Gallery, Timeline,
// Comparison, SocialProof, AppDownload
//
// App/SaaS sections: AgentFolder, SettingsLayout, Breadcrumbs, Stepper, Chat, EmptyState
//
// Full-page templates: LandingPageTemplate, DashboardTemplate, SettingsTemplate, etc.
//
// To use these, install @orion-ds/blocks and import from '@orion-ds/blocks/sections'
// or '@orion-ds/blocks/templates'.
