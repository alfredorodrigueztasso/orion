"use client";

/**
 * @orion-ds/react/client
 *
 * Client-only entry point for use in Next.js App Router and other frameworks
 * with React Server Components (RSC). This module is marked with the 'use client'
 * directive and excludes heavy optional dependencies.
 *
 * Heavy components (Chart, Calendar, DatePicker, CodeEditor, CollapsibleFolder, Chat)
 * have been moved to separate entry points to reduce bundle size:
 *   - import { Chart, ChartContainer } from '@orion-ds/react/chart'
 *   - import { Calendar, DatePicker } from '@orion-ds/react/calendar'
 *   - import { CodeEditor } from '@orion-ds/react/editor'
 *   - import { CollapsibleFolder } from '@orion-ds/react/dnd'
 *   - import { Chat } from '@orion-ds/react/rich'
 *
 * Usage:
 *   import { ThemeProvider, Button, useTheme } from '@orion-ds/react/client';
 *   import '@orion-ds/react/styles.css';
 *
 * In Server Components, you can import types only:
 *   import type { ButtonProps } from '@orion-ds/react/client';
 *
 * Note: When importing from this path, the 'use client' directive propagates
 * to all modules transitively imported. This ensures the entire dependency
 * tree is understood by your framework as a client-side boundary.
 */

// ============================================================================
// COMPONENTS (Light - No Optional Heavy Dependencies)
// ============================================================================

// Icons
export { Icon } from "./components/Icon";
export type { IconProps, IconSize, IconColor } from "./components/Icon";

// Actions
export { Button } from "./components/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/Button";

// Forms
export { Field } from "./components/Field";
export type { FieldProps } from "./components/Field";

export { Select } from "./components/Select";
export type { SelectProps, SelectOption } from "./components/Select";

export { Switch } from "./components/Switch";
export type { SwitchProps, SwitchSize } from "./components/Switch";

export { Toggle } from "./components/Toggle";
export type {
  ToggleProps,
  ToggleVariant,
  ToggleSize,
} from "./components/Toggle";

export { ToggleGroup } from "./components/ToggleGroup";
export type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupType,
  ToggleGroupVariant,
  ToggleGroupSize,
} from "./components/ToggleGroup";

export { InputOTP } from "./components/InputOTP";
export type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
  InputOTPType,
  InputOTPSize,
} from "./components/InputOTP";

export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps, CheckboxSize } from "./components/Checkbox";

export { Radio } from "./components/Radio";
export type { RadioProps, RadioSize } from "./components/Radio";

export { Textarea } from "./components/Textarea";
export type {
  TextareaProps,
  TextareaSize,
  TextareaResize,
} from "./components/Textarea";

export { Slider } from "./components/Slider";
export type { SliderProps, SliderSize } from "./components/Slider";

export { Combobox } from "./components/Combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxGroup,
  ComboboxSize,
} from "./components/Combobox";

export { SearchInput } from "./components/SearchInput";
export type {
  SearchInputProps,
  SearchInputSize,
} from "./components/SearchInput";

// Layout
export { Divider } from "./components/Divider";
export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
} from "./components/Divider";

export { Accordion } from "./components/Accordion";
export type {
  AccordionProps,
  AccordionItem,
  AccordionVariant,
  AccordionItemProps,
} from "./components/Accordion";

export { Collapsible } from "./components/Collapsible";
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./components/Collapsible";

export { Stepper } from "./components/Stepper";
export type {
  StepperProps,
  StepItem,
  StepStatus,
  StepperOrientation,
  StepperSize,
} from "./components/Stepper";

// Data Display
export { Card } from "./components/Card";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardVariant,
} from "./components/Card";

export { AgentCard } from "./components/AgentCard";
export type { AgentCardProps, AgentStatus } from "./components/AgentCard";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarSize } from "./components/Avatar";

export { Carousel, CarouselCard } from "./components/Carousel";
export type {
  CarouselProps,
  CarouselCardProps,
  CarouselItem,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
  CarouselOverlay,
  CarouselAlign,
} from "./components/Carousel";

export { Table } from "./components/Table";
export type {
  TableProps,
  TableColumn,
  TableSize,
  SortDirection,
} from "./components/Table";

// NOTE: Chart (with recharts dependency) is in @orion-ds/react/chart

export { List } from "./components/List";
export type {
  ListProps,
  ListItem,
  ListSize,
  ListVariant,
} from "./components/List";

export { Chip } from "./components/Chip";
export type { ChipProps, ChipVariant, ChipSize } from "./components/Chip";

export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./components/Badge";

export { Pagination } from "./components/Pagination";
export type { PaginationProps, PaginationSize } from "./components/Pagination";

// Feedback
export { Alert } from "./components/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert";

export { Spinner } from "./components/Spinner";
export type {
  SpinnerProps,
  SpinnerSize,
  SpinnerVariant,
} from "./components/Spinner";

export { ProgressBar } from "./components/ProgressBar";
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarVariant,
} from "./components/ProgressBar";

export { Tooltip } from "./components/Tooltip";
export type { TooltipProps, TooltipPlacement } from "./components/Tooltip";

export { Skeleton } from "./components/Skeleton";
export type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonAnimation,
} from "./components/Skeleton";

export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps, EmptyStateSize } from "./components/EmptyState";

// Navigation
export { Tabs } from "./components/Tabs";
export type { TabsProps, TabItem } from "./components/Tabs";

export { Breadcrumb } from "./components/Breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbSeparator,
} from "./components/Breadcrumb";

export { Navbar } from "./components/Navbar";
export type {
  NavbarProps,
  NavbarBrandProps,
  NavbarNavProps,
  NavbarLinkProps,
  NavbarActionsProps,
  NavbarHeight,
  NavbarVariant,
} from "./components/Navbar";

export { Link } from "./components/Link";
export type { LinkProps, LinkVariant, LinkSize } from "./components/Link";

// Overlays
export { Modal } from "./components/Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from "./components/Modal";

export { Drawer } from "./components/Drawer";
export type {
  DrawerProps,
  DrawerPlacement,
  DrawerSize,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from "./components/Drawer";

export { Popover } from "./components/Popover";
export type {
  PopoverProps,
  PopoverPlacement,
  PopoverTrigger,
} from "./components/Popover";

export { Dropdown } from "./components/Dropdown";
export type {
  DropdownProps,
  DropdownItem,
  DropdownGroup,
  DropdownPlacement,
} from "./components/Dropdown";

export { ToastProvider, useToast } from "./components/Toast";
export type {
  Toast,
  ToastOptions,
  ToastVariant,
  ToastPosition,
  ToastProviderProps,
  ToastContextValue,
} from "./components/Toast";

export { AlertDialog } from "./components/AlertDialog";
export type {
  AlertDialogProps,
  AlertDialogVariant,
  AlertDialogIconProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionsProps,
} from "./components/AlertDialog";

export { Command } from "./components/Command";
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from "./components/Command";

// NOTE: Calendar and DatePicker (with date-fns dependency) are in @orion-ds/react/calendar

// Utilities
export { ThemeController } from "./components/ThemeController";
export type { ThemeControllerProps } from "./components/ThemeController";

export { FontLoader } from "./components/FontLoader";
export type { FontLoaderProps } from "./components/FontLoader";

export { IconGallery } from "./components/IconGallery";
export type { IconGalleryProps } from "./components/IconGallery";

export { ErrorBoundary } from "./components/ErrorBoundary";
export type { ErrorBoundaryProps } from "./components/ErrorBoundary";

// ============================================================================
// HOOKS
// ============================================================================

// Theme
export { useTheme } from "./hooks";
export type { UseThemeOptions, UseThemeReturn } from "./hooks";

// Media queries & responsive
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from "./hooks";

// Event handlers
export { useClickOutside, useClickOutsideMultiple } from "./hooks";

// State management
export { useDisclosure } from "./hooks";
export type { UseDisclosureOptions, UseDisclosureReturn } from "./hooks";

// Debouncing
export { useDebounce, useDebouncedCallback } from "./hooks";
export type { UseDebouncedCallbackOptions } from "./hooks";

// Storage
export { useLocalStorage, useSessionStorage } from "./hooks";
export type { UseLocalStorageOptions } from "./hooks";

// Clipboard
export { useCopyToClipboard, useCopy } from "./hooks";
export type {
  UseCopyToClipboardOptions,
  UseCopyToClipboardReturn,
} from "./hooks";

// Keyboard
export { useKeyboard, useKeyboardShortcuts } from "./hooks";
export type {
  KeyModifiers,
  UseKeyboardOptions,
  KeyboardShortcuts,
} from "./hooks";

// ============================================================================
// CONTEXTS
// ============================================================================

export { ThemeProvider, useThemeContext } from "./contexts";
export type { ThemeProviderProps } from "./contexts";

// ============================================================================
// UTILITIES
// ============================================================================

export * from "./utils";

// ============================================================================
// RE-EXPORTS FROM TOKENS
// ============================================================================

export type { Theme, Brand } from "./tokens/types";
export {
  spacing,
  primitives,
  getToken,
  getSemanticToken,
  getBrand,
} from "./tokens";

// ============================================================================
// SECTIONS (Pre-built UI Blocks)
// ============================================================================

export { Container, Section } from "./sections";
export type {
  ContainerProps,
  ContainerSize,
  SectionProps,
  SectionSpacing,
  SectionBackground,
} from "./sections";

// ============================================================================
// WIDGETS (Composite UI patterns) - Excludes heavy components
// ============================================================================

export { ActivityFeed } from "./components/ActivityFeed";
export type {
  ActivityFeedProps,
  ActivityItem,
  ActivityActor,
  ActivityFilter,
} from "./components/ActivityFeed";

export { Banner } from "./components/Banner";
export type { BannerProps, BannerVariant } from "./components/Banner";

// NOTE: CollapsibleFolder (with @dnd-kit dependencies) is in @orion-ds/react/dnd

export { CommandBar } from "./components/CommandBar";
export type {
  CommandBarProps,
  CommandItem,
  CommandGroup,
} from "./components/CommandBar";

export { DataTable } from "./components/DataTable";
export type {
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
} from "./components/DataTable";

export { DetailPanel } from "./components/DetailPanel";
export type {
  DetailPanelProps,
  DetailPanelSize,
  DetailPanelPosition,
} from "./components/DetailPanel";

export { FileUploader } from "./components/FileUploader";
export type {
  FileUploaderProps,
  UploadedFile,
} from "./components/FileUploader";

export { FilterBar } from "./components/FilterBar";
export type {
  FilterBarProps,
  FilterDefinition,
  FilterOption,
  ActiveFilter,
} from "./components/FilterBar";

export { FormSection } from "./components/FormSection";
export type {
  FormSectionProps,
  FormSectionVariant,
  FormSectionGroupProps,
  FormSectionActionsProps,
} from "./components/FormSection";

export { KanbanBoard } from "./components/KanbanBoard";
export type {
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
  KanbanLabel,
  KanbanAssignee,
  KanbanDragResult,
} from "./components/KanbanBoard";

export { MetricCards, MetricCard } from "./components/MetricCards";
export type {
  MetricCardsProps,
  MetricCardProps,
  MetricItem,
  MetricTrend,
  SparklineData,
  MetricCardsColumns,
  MetricCardsVariant,
} from "./components/MetricCards";

export { NavTree } from "./components/NavTree";
export type {
  NavTreeProps,
  NavTreeNode,
  NavTreeNodeType,
  NavTreeSection,
  NavTreeSectionVariant,
  NavTreeActionConfig,
  NavTreeContextValue,
} from "./components/NavTree";

export { NotificationCenter } from "./components/NotificationCenter";
export type {
  NotificationCenterProps,
  NotificationItem,
} from "./components/NotificationCenter";

export { PageHeader } from "./components/PageHeader";
export type {
  PageHeaderProps,
  PageHeaderVariant,
  PageHeaderSize,
  BreadcrumbItem as PageHeaderBreadcrumbItem,
  PageHeaderTab,
} from "./components/PageHeader";

export { QuickActions } from "./components/QuickActions";
export type {
  QuickActionsProps,
  QuickAction,
  QuickActionsVariant,
  QuickActionsPosition,
} from "./components/QuickActions";

export { Sidebar } from "./components/Sidebar";
export type {
  SidebarProps,
  SidebarVariant,
  SidebarItem,
  SidebarSection,
  SidebarItemProps,
  SidebarSectionProps,
  SidebarDividerProps,
} from "./components/Sidebar";

export { UserMenu } from "./components/UserMenu";
export type {
  UserMenuProps,
  UserMenuItem,
  UserMenuSection,
  UserInfo,
} from "./components/UserMenu";

export { WorkspaceSwitcher } from "./components/WorkspaceSwitcher";
export type {
  WorkspaceSwitcherProps,
  WorkspaceOrg,
  CurrentWorkspaceOrg,
} from "./components/WorkspaceSwitcher";

// ============================================================================
// SHOWCASE & EXAMPLES
// ============================================================================

export { ComponentShowcase } from "./ComponentShowcase";
export { LandingPageExample } from "./examples";

// ============================================================================
// NOTE: Heavy Components (Require Optional Peer Dependencies)
// ============================================================================

// The following components require optional peer dependencies and are
// exported from separate entry points to keep the default bundle light:
//
// - Chart, ChartContainer, etc.  →  @orion-ds/react/chart  (requires recharts)
// - Calendar, DatePicker         →  @orion-ds/react/calendar  (requires date-fns)
// - CodeEditor                   →  @orion-ds/react/editor  (requires react-syntax-highlighter)
// - CollapsibleFolder            →  @orion-ds/react/dnd  (requires @dnd-kit/core, etc.)
// - Chat (all components)        →  @orion-ds/react/rich  (requires react-markdown, etc.)
//
// This approach ensures that:
// 1. Apps using only basic components don't fail if heavy deps aren't installed
// 2. Tree-shaking works effectively
// 3. Users can opt-in to heavy components when needed
