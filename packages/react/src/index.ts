/**
 * @orion/react - Orion Design System React Component Library
 *
 * Type-safe React components built on the Orion Design System tokens.
 *
 * @example
 * ```tsx
 * // Single CSS import includes all tokens and component styles
 * import '@orion-ds/react/styles.css';
 *
 * import { Button, Field, Card, useTheme, ThemeProvider } from '@orion-ds/react';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function MyApp() {
 *   const { theme, toggleTheme } = useTheme();
 *
 *   return (
 *     <Card>
 *       <Card.Header>Welcome</Card.Header>
 *       <Card.Body>
 *         <Field label="Email" type="email" />
 *         <Button onClick={toggleTheme}>
 *           Switch to {theme === 'light' ? 'dark' : 'light'} mode
 *         </Button>
 *       </Card.Body>
 *     </Card>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// CSS marker for style detection (used by ThemeProvider to warn about missing CSS)
import "./styles/marker.css";

// ============================================================================
// COMPONENTS
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

export { Stack } from "./components/Stack";
export type {
  StackProps,
  StackGap,
  StackDirection,
  StackAlign,
  StackJustify,
  StackWrap,
} from "./components/Stack";

export { Box } from "./components/Box";
export type {
  BoxProps,
  SpacingScale,
  SemanticSurface,
  Radius,
} from "./components/Box";

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

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartGradient,
  ChartTooltip,
  ChartLegend,
} from "./components/Chart";
export type {
  ChartConfig,
  ChartConfigItem,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartGradientProps,
} from "./components/Chart";

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

export { Calendar } from "./components/Calendar";
export type {
  CalendarProps,
  CalendarMode,
  CalendarSingleProps,
  CalendarRangeProps,
  CalendarMultipleProps,
  DateRange,
} from "./components/Calendar";

export { DatePicker } from "./components/DatePicker";
export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerPreset,
} from "./components/DatePicker";

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

// Lucide Icons - All icons available from lucide-react
export * from "./utils";

// ============================================================================
// RE-EXPORTS FROM TOKENS
// ============================================================================

// Re-export token types and utilities for convenience
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

// Layout utilities
export { Container, Section } from "./sections";
export type {
  ContainerProps,
  ContainerSize,
  SectionProps,
  SectionSpacing,
  SectionBackground,
} from "./sections";

// ============================================================================
// PREMIUM SECTIONS & TEMPLATES (Consolidated in @orion-ds/react v4.5.0+)
// ============================================================================
// See CLAUDE.md "4a. Using Premium Sections & Templates (Bloques)" for complete docs.
//
// Recommended imports (new architecture):
// import { Hero, Features, CTA, Footer, Pricing } from '@orion-ds/react/blocks';
// import { LandingPageTemplate } from '@orion-ds/react/templates';
//
// Backward compatible (deprecated):
// import { Hero, Features } from '@orion-ds/blocks';

// ============================================================================
// APP/SAAS SECTIONS (Product Mode Optimized)
// ============================================================================

// Note: Widgets (Sidebar, DataTable, etc.) are now exported from WIDGETS section above
// These are kept for backward compatibility via sections/ re-exports

// ============================================================================
// CODE EDITOR (AI Code Interface)
// ============================================================================

export { CodeEditor } from "./components/CodeEditor";
export type { CodeEditorProps } from "./components/CodeEditor";

// ============================================================================
// WIDGETS (Composite UI patterns)
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

export { CollapsibleFolder } from "./components/CollapsibleFolder";
export type {
  CollapsibleFolderProps,
  SortOption,
} from "./components/CollapsibleFolder";

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
// SHOWCASE
// ============================================================================

export { ComponentShowcase } from "./ComponentShowcase";

// ============================================================================
// EXAMPLES (Copy-paste ready templates)
// ============================================================================

export { LandingPageExample } from "./examples";

// Note: Full page templates have been moved to @orion-ds/blocks v1.0.0 for the premium tier.
// To use templates (LandingPageTemplate, DashboardTemplate, etc.), import from '@orion-ds/blocks/templates' instead.
