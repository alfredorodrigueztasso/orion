/**
 * Components Index
 *
 * Internal export file for component imports within the package.
 */

// Icons
export { Icon } from "./Icon";
export type { IconProps, IconSize, IconColor } from "./Icon";

// Actions
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

// Forms
export { Field } from "./Field";
export type { FieldProps } from "./Field";

export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select";

export { Switch } from "./Switch";
export type { SwitchProps, SwitchSize } from "./Switch";

export { Toggle } from "./Toggle";
export type { ToggleProps, ToggleVariant, ToggleSize } from "./Toggle";

export { ToggleGroup } from "./ToggleGroup";
export type {
  ToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupType,
  ToggleGroupVariant,
  ToggleGroupSize,
} from "./ToggleGroup";

export { InputOTP } from "./InputOTP";
export type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
  InputOTPType,
  InputOTPSize,
} from "./InputOTP";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps, CheckboxSize } from "./Checkbox";

export { Radio } from "./Radio";
export type { RadioProps, RadioSize } from "./Radio";

export { Textarea } from "./Textarea";
export type { TextareaProps, TextareaSize, TextareaResize } from "./Textarea";

export { CodeEditor } from "./CodeEditor";
export type { CodeEditorProps } from "./CodeEditor";

export { Slider } from "./Slider";
export type { SliderProps, SliderSize } from "./Slider";

export { Combobox } from "./Combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxGroup,
  ComboboxSize,
} from "./Combobox";

export { SearchInput } from "./SearchInput";
export type { SearchInputProps, SearchInputSize } from "./SearchInput";

// Layout
export { Divider } from "./Divider";
export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
} from "./Divider";

export { Accordion } from "./Accordion";
export type {
  AccordionProps,
  AccordionItem,
  AccordionVariant,
  AccordionItemProps,
} from "./Accordion";

export { Collapsible } from "./Collapsible";
export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./Collapsible";

export { Stepper } from "./Stepper";
export type {
  StepperProps,
  StepItem,
  StepStatus,
  StepperOrientation,
  StepperSize,
} from "./Stepper";

export { Stack } from "./Stack";
export type {
  StackProps,
  StackGap,
  StackDirection,
  StackAlign,
  StackJustify,
  StackWrap,
} from "./Stack";

// Data Display
export { Card } from "./Card";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardVariant,
} from "./Card";

export { AgentCard } from "./AgentCard";
export type { AgentCardProps, AgentStatus } from "./AgentCard";

export { Avatar } from "./Avatar";
export type { AvatarProps, AvatarSize } from "./Avatar";

export { Table } from "./Table";
export type {
  TableProps,
  TableColumn,
  TableSize,
  SortDirection,
} from "./Table";

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartGradient,
  ChartTooltip,
  ChartLegend,
} from "./Chart";
export type {
  ChartConfig,
  ChartConfigItem,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartGradientProps,
} from "./Chart";

export { List } from "./List";
export type { ListProps, ListItem, ListSize, ListVariant } from "./List";

export { Chip } from "./Chip";
export type { ChipProps, ChipVariant, ChipSize } from "./Chip";

export { Badge } from "./Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./Badge";

export { Pagination } from "./Pagination";
export type { PaginationProps, PaginationSize } from "./Pagination";

// Feedback
export { Alert } from "./Alert";
export type { AlertProps, AlertVariant } from "./Alert";

export { Spinner } from "./Spinner";
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from "./Spinner";

export { ProgressBar } from "./ProgressBar";
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarVariant,
} from "./ProgressBar";

export { Tooltip } from "./Tooltip";
export type { TooltipProps, TooltipPlacement } from "./Tooltip";

export { Skeleton } from "./Skeleton";
export type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonAnimation,
} from "./Skeleton";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps, EmptyStateSize } from "./EmptyState";

// Navigation
export { Tabs } from "./Tabs";
export type { TabsProps, TabItem } from "./Tabs";

export { Breadcrumb } from "./Breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbSeparator,
} from "./Breadcrumb";

export { Navbar } from "./Navbar";
export type {
  NavbarProps,
  NavbarBrandProps,
  NavbarNavProps,
  NavbarLinkProps,
  NavbarActionsProps,
  NavbarHeight,
  NavbarVariant,
} from "./Navbar";

export { Link } from "./Link";
export type { LinkProps, LinkVariant, LinkSize } from "./Link";

// Overlays
export { Modal } from "./Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from "./Modal";

export { Drawer } from "./Drawer";
export type {
  DrawerProps,
  DrawerPlacement,
  DrawerSize,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from "./Drawer";

export { Popover } from "./Popover";
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from "./Popover";

export { Dropdown } from "./Dropdown";
export type {
  DropdownProps,
  DropdownItem,
  DropdownGroup,
  DropdownPlacement,
} from "./Dropdown";

export { ToastProvider, useToast } from "./Toast";
export type {
  Toast,
  ToastOptions,
  ToastVariant,
  ToastPosition,
  ToastProviderProps,
  ToastContextValue,
} from "./Toast";

export { AlertDialog } from "./AlertDialog";
export type {
  AlertDialogProps,
  AlertDialogVariant,
  AlertDialogIconProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionsProps,
} from "./AlertDialog";

export { Command } from "./Command";
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
} from "./Command";

export { Calendar } from "./Calendar";
export type {
  CalendarProps,
  CalendarMode,
  CalendarSingleProps,
  CalendarRangeProps,
  CalendarMultipleProps,
  DateRange,
} from "./Calendar";

export { DatePicker } from "./DatePicker";
export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerPreset,
} from "./DatePicker";

// Utilities
export { ThemeController } from "./ThemeController";
export type { ThemeControllerProps } from "./ThemeController";

export { FontLoader } from "./FontLoader";
export type { FontLoaderProps } from "./FontLoader";

export { IconGallery } from "./IconGallery";
export type { IconGalleryProps } from "./IconGallery";

export { ErrorBoundary } from "./ErrorBoundary";
export type { ErrorBoundaryProps } from "./ErrorBoundary";

// Chat (AI Chat Interface)
export { Chat } from "./Chat";
export type {
  ChatRole,
  MessageStatus,
  AttachmentType,
  ChatAttachment,
  ChatMessage,
  ChatConversation,
  VoiceRecorderState,
  ChatProps,
  ChatHeaderProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatInputProps,
  ChatTypingIndicatorProps,
  ChatCodeBlockProps,
  ChatMarkdownProps,
  ChatImagePreviewProps,
  ChatAudioPlayerProps,
  ChatVoiceRecorderProps,
  ChatFileUploadProps,
  ChatAttachmentPreviewProps,
  ChatSidebarProps,
  ChatSectionProps,
  ChatPageTemplateProps,
  ChatLightboxProps,
} from "./Chat";
export { useAutoScroll, useVoiceRecorder, useChatInput } from "./Chat";

// Widgets (Composite UI patterns reclassified from sections)
export { ActivityFeed } from "./ActivityFeed";
export type {
  ActivityFeedProps,
  ActivityItem,
  ActivityActor,
  ActivityFilter,
} from "./ActivityFeed";

export { Banner } from "./Banner";
export type { BannerProps, BannerVariant } from "./Banner";

export { CollapsibleFolder } from "./CollapsibleFolder";
export type { CollapsibleFolderProps, SortOption } from "./CollapsibleFolder";

export { CommandBar } from "./CommandBar";
export type { CommandBarProps, CommandItem, CommandGroup } from "./CommandBar";

export { DataTable } from "./DataTable";
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
} from "./DataTable";

export { DetailPanel } from "./DetailPanel";
export type {
  DetailPanelProps,
  DetailPanelSize,
  DetailPanelPosition,
} from "./DetailPanel";

export { FileUploader } from "./FileUploader";
export type { FileUploaderProps, UploadedFile } from "./FileUploader";

export { FilterBar } from "./FilterBar";
export type {
  FilterBarProps,
  FilterDefinition,
  FilterOption,
  ActiveFilter,
} from "./FilterBar";

export { FormSection } from "./FormSection";
export type {
  FormSectionProps,
  FormSectionVariant,
  FormSectionGroupProps,
  FormSectionActionsProps,
} from "./FormSection";

export { KanbanBoard } from "./KanbanBoard";
export type {
  KanbanBoardProps,
  KanbanColumn,
  KanbanCard,
  KanbanLabel,
  KanbanAssignee,
  KanbanDragResult,
} from "./KanbanBoard";

export { MetricCards, MetricCard } from "./MetricCards";
export type {
  MetricCardsProps,
  MetricCardProps,
  MetricItem,
  MetricTrend,
  SparklineData,
  MetricCardsColumns,
  MetricCardsVariant,
} from "./MetricCards";

export { NavTree } from "./NavTree";
export type {
  NavTreeProps,
  NavTreeNode,
  NavTreeNodeType,
  NavTreeSection,
  NavTreeSectionVariant,
  NavTreeActionConfig,
  NavTreeContextValue,
} from "./NavTree";

export { NotificationCenter } from "./NotificationCenter";
export type {
  NotificationCenterProps,
  NotificationItem,
} from "./NotificationCenter";

export { PageHeader } from "./PageHeader";
export type {
  PageHeaderProps,
  PageHeaderVariant,
  PageHeaderSize,
  BreadcrumbItem as PageHeaderBreadcrumbItem,
  PageHeaderTab,
} from "./PageHeader";

export { QuickActions } from "./QuickActions";
export type {
  QuickActionsProps,
  QuickAction,
  QuickActionsVariant,
  QuickActionsPosition,
} from "./QuickActions";

export { Sidebar } from "./Sidebar";
export type {
  SidebarProps,
  SidebarVariant,
  SidebarItem,
  SidebarSection,
  SidebarItemProps,
  SidebarSectionProps,
  SidebarDividerProps,
} from "./Sidebar";

export { UserMenu } from "./UserMenu";
export type {
  UserMenuProps,
  UserMenuItem,
  UserMenuSection,
  UserInfo,
} from "./UserMenu";

export { WorkspaceSwitcher } from "./WorkspaceSwitcher";
export type {
  WorkspaceSwitcherProps,
  WorkspaceOrg,
  CurrentWorkspaceOrg,
} from "./WorkspaceSwitcher";

// Media
export { Carousel, CarouselCard } from "./Carousel";
export type {
  CarouselProps,
  CarouselItem,
  CarouselCardProps,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
  CarouselOverlay,
  CarouselAlign,
  CarouselNavigationProps,
} from "./Carousel";
