'use client';

/**
 * Preview Modules for Orion Design System
 *
 * Live preview examples of Orion components and sections.
 * Used by docs-site/components/ComponentPreview.tsx and SectionPreview.tsx.
 *
 * Rules:
 * - Import components from @orion-ds/react only
 * - No relative imports
 * - No hardcoded colors - use CSS variables only
 * - No brand props (brand is global via ThemeProvider)
 * - Inline styles use var(--spacing-*), var(--radius-*), var(--font-size-*)
 */

import React from 'react';
import {
  Button,
  Card,
  Badge,
  Alert,
  Field,
  Modal,
  Tabs,
  Avatar,
  Spinner,
  ProgressBar,
  Checkbox,
  Radio,
  Select,
  Tooltip,
  Switch,
  Sidebar,
  Navbar,
  Table,
  Pagination,
  Dropdown,
  Breadcrumb,
  Divider,
  Skeleton,
  Drawer,
  Popover,
  List,
  Accordion,
  Stepper,
  FormSection,
  PageHeader,
  EmptyState,
  Banner,
} from '@orion-ds/react';

// ============================================================
// TIER 1: Core UI Components (15 items)
// ============================================================

const ButtonPreviews = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="primary" disabled>
      Disabled
    </Button>
  </div>
);

const CardPreviews = () => (
  <Card>
    <div style={{ padding: 'var(--spacing-4)' }}>
      <h3 style={{ margin: '0 0 var(--spacing-3) 0', fontSize: 'var(--font-size-lg)' }}>Card Title</h3>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)' }}>
        This is a card component with default styling. It uses semantic tokens for all visual properties.
      </p>
    </div>
  </Card>
);

const BadgePreviews = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">Danger</Badge>
  </div>
);

const AlertPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
    <Alert variant="info">
      <p>This is an informational alert message.</p>
    </Alert>
    <Alert variant="success">
      <p>This is a success alert message.</p>
    </Alert>
    <Alert variant="warning">
      <p>This is a warning alert message.</p>
    </Alert>
    <Alert variant="danger">
      <p>This is a danger alert message.</p>
    </Alert>
  </div>
);

const FieldPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-4)', maxWidth: '400px' }}>
    <Field type="text" placeholder="Text input" />
    <Field type="email" placeholder="Email input" />
    <Field type="password" placeholder="Password input" />
    <Field as="textarea" placeholder="Textarea input" />
  </div>
);

const ModalPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Modal preview — renders in a portal. See Storybook for interactive demo.
  </div>
);

const TabsPreviews = () => (
  <Tabs
    tabs={[
      { id: 'tab1', label: 'Tab 1', content: 'Content of tab 1' },
      { id: 'tab2', label: 'Tab 2', content: 'Content of tab 2' },
      { id: 'tab3', label: 'Tab 3', content: 'Content of tab 3' },
    ]}
    defaultTab="tab1"
  />
);

const AvatarPreviews = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
    <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
    <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
    <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" />
  </div>
);

const SpinnerPreviews = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </div>
);

const ProgressBarPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-4)', maxWidth: '400px' }}>
    <div>
      <p style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-sm)' }}>25%</p>
      <ProgressBar value={25} />
    </div>
    <div>
      <p style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-sm)' }}>50%</p>
      <ProgressBar value={50} />
    </div>
    <div>
      <p style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-sm)' }}>100%</p>
      <ProgressBar value={100} />
    </div>
  </div>
);

const CheckboxPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
    <Checkbox label="Unchecked" defaultChecked={false} />
    <Checkbox label="Checked" defaultChecked={true} />
    <Checkbox label="Disabled" disabled />
  </div>
);

const RadioPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
    <Radio name="demo" label="Option 1" value="1" defaultChecked />
    <Radio name="demo" label="Option 2" value="2" />
    <Radio name="demo" label="Option 3" value="3" />
  </div>
);

const SelectPreviews = () => (
  <Select placeholder="Choose an option">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
);

const TooltipPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)' }}>
    <Tooltip content="This is a tooltip message">
      <Button>Hover me</Button>
    </Tooltip>
  </div>
);

const SwitchPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
    <Switch label="Toggle off" defaultChecked={false} />
    <Switch label="Toggle on" defaultChecked={true} />
    <Switch label="Disabled" disabled />
  </div>
);

// ============================================================
// TIER 2: Layout & Data Components (20 items)
// ============================================================

const SidebarPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Sidebar preview — renders as navigation. See Storybook for interactive demo.
  </div>
);

const NavbarPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Navbar preview — renders as header navigation. See Storybook for interactive demo.
  </div>
);

const TablePreviews = () => (
  <Table
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' },
    ]}
    data={[
      { name: 'Alice', email: 'alice@example.com', status: 'Active' },
      { name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
      { name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
    ]}
  />
);

const PaginationPreviews = () => (
  <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
);

const DropdownPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Dropdown preview — interactive menu. See Storybook for demo.
  </div>
);

const BreadcrumbPreviews = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Electronics', href: '#' },
      { label: 'Laptop', current: true },
    ]}
  />
);

const DividerPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Section 1</p>
    <Divider />
    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Section 2</p>
  </div>
);

const SkeletonPreviews = () => (
  <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
    <Skeleton width="80%" height="40px" />
  </div>
);

const DrawerPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Drawer preview — slides in from side. See Storybook for demo.
  </div>
);

const PopoverPreviews = () => (
  <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
    Popover preview — floating content. See Storybook for demo.
  </div>
);

const ListPreviews = () => (
  <List
    items={[
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ]}
  />
);

const AccordionPreviews = () => (
  <Accordion
    items={[
      { id: '1', title: 'Section 1', content: 'Content of section 1' },
      { id: '2', title: 'Section 2', content: 'Content of section 2' },
      { id: '3', title: 'Section 3', content: 'Content of section 3' },
    ]}
  />
);

const StepperPreviews = () => (
  <Stepper
    steps={[
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'active' },
      { label: 'Step 3', status: 'pending' },
    ]}
  />
);

const FormSectionPreviews = () => (
  <FormSection title="Account Settings">
    <Field type="text" placeholder="Full Name" />
    <Field type="email" placeholder="Email Address" />
  </FormSection>
);

const PageHeaderPreviews = () => (
  <PageHeader title="Page Title" subtitle="This is a page subtitle" />
);

const MetricCardsPreviews = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
    <Card>
      <div style={{ padding: 'var(--spacing-4)' }}>
        <p style={{ margin: '0 0 var(--spacing-2) 0', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Metric 1
        </p>
        <p style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>1,234</p>
      </div>
    </Card>
    <Card>
      <div style={{ padding: 'var(--spacing-4)' }}>
        <p style={{ margin: '0 0 var(--spacing-2) 0', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Metric 2
        </p>
        <p style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>5,678</p>
      </div>
    </Card>
  </div>
);

const EmptyStatePreviews = () => (
  <EmptyState title="No items found" description="Create your first item to get started" />
);

const BannerPreviews = () => (
  <Banner variant="info">
    <p>This is a banner notification message.</p>
  </Banner>
);

// ============================================================
// Export Preview Modules
// ============================================================

export interface PreviewModule {
  title: string;
  render: React.ComponentType;
}

export const previewModules: Record<string, PreviewModule[]> = {
  // Tier 1: Core UI Components
  button: [{ title: 'Variants', render: ButtonPreviews }],
  card: [{ title: 'Basic Card', render: CardPreviews }],
  badge: [{ title: 'Variants', render: BadgePreviews }],
  alert: [{ title: 'Variants', render: AlertPreviews }],
  field: [{ title: 'Input Types', render: FieldPreviews }],
  modal: [{ title: 'Modal', render: ModalPreviews }],
  tabs: [{ title: 'Tabbed Content', render: TabsPreviews }],
  avatar: [{ title: 'Avatar Images', render: AvatarPreviews }],
  spinner: [{ title: 'Sizes', render: SpinnerPreviews }],
  'progress-bar': [{ title: 'Progress States', render: ProgressBarPreviews }],
  checkbox: [{ title: 'States', render: CheckboxPreviews }],
  radio: [{ title: 'Options', render: RadioPreviews }],
  select: [{ title: 'Dropdown Select', render: SelectPreviews }],
  tooltip: [{ title: 'Tooltip Hover', render: TooltipPreviews }],
  switch: [{ title: 'Toggle States', render: SwitchPreviews }],

  // Tier 2: Layout & Data Components
  sidebar: [{ title: 'Navigation Sidebar', render: SidebarPreviews }],
  navbar: [{ title: 'Top Navigation', render: NavbarPreviews }],
  table: [{ title: 'Data Table', render: TablePreviews }],
  'data-table': [{ title: 'Advanced Data Table', render: TablePreviews }],
  pagination: [{ title: 'Page Navigation', render: PaginationPreviews }],
  dropdown: [{ title: 'Dropdown Menu', render: DropdownPreviews }],
  breadcrumb: [{ title: 'Breadcrumb Trail', render: BreadcrumbPreviews }],
  divider: [{ title: 'Content Divider', render: DividerPreviews }],
  skeleton: [{ title: 'Loading States', render: SkeletonPreviews }],
  drawer: [{ title: 'Side Drawer', render: DrawerPreviews }],
  popover: [{ title: 'Floating Popover', render: PopoverPreviews }],
  list: [{ title: 'Vertical List', render: ListPreviews }],
  accordion: [{ title: 'Expandable Sections', render: AccordionPreviews }],
  stepper: [{ title: 'Step Progression', render: StepperPreviews }],
  'form-section': [{ title: 'Form Layout', render: FormSectionPreviews }],
  'page-header': [{ title: 'Page Title & Subtitle', render: PageHeaderPreviews }],
  'metric-cards': [{ title: 'Data Cards', render: MetricCardsPreviews }],
  'empty-state': [{ title: 'Empty State', render: EmptyStatePreviews }],
  banner: [{ title: 'Banner Notification', render: BannerPreviews }],
};
