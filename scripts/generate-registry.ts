#!/usr/bin/env ts-node
/**
 * generate-registry.ts
 *
 * Generates the Orion registry from component .types.ts files and manual metadata.
 * This script reads TypeScript type definitions and produces machine-readable JSON
 * files that power the MCP server, HTTP endpoints, and AI tool integrations.
 *
 * Usage: npx ts-node scripts/generate-registry.ts
 *
 * Output:
 *   registry/components/*.json  — One JSON per component
 *   registry/sections/*.json    — One JSON per section
 *   registry/templates/*.json   — One JSON per template
 *   registry/index.json         — Master index
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// Types
// ============================================================================

interface PropInfo {
  name: string;
  type: string;
  description: string;
  default?: string | boolean | number;
  required?: boolean;
  values?: string[];
}

interface SubComponent {
  name: string;
  description: string;
  props?: PropInfo[];
}

interface Example {
  title: string;
  description?: string;
  code: string;
}

interface AccessibilityInfo {
  role?: string;
  ariaAttributes?: string[];
  keyboardNav?: Array<{ key: string; action: string }>;
  notes?: string[];
}

interface PreviewInfo {
  url: string;
  local: string;
  screenshot?: string;
}

interface RegistryItem {
  $schema: string;
  name: string;
  type: 'registry:component' | 'registry:section' | 'registry:template' | 'registry:hook';
  title: string;
  description: string;
  category: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: Array<{ path: string; type: string }>;
  props?: PropInfo[];
  subComponents?: SubComponent[];
  tokens?: string[];
  examples?: Example[];
  accessibility?: AccessibilityInfo;
  modeAware?: boolean;
  preview?: PreviewInfo;
  import: string;
  cssImport: string;
}

interface RegistryIndex {
  $schema: string;
  name: string;
  version: string;
  description: string;
  homepage: string;
  components: Array<{ name: string; title: string; description: string; category: string; type: string }>;
  totalComponents: number;
  totalSections: number;
  totalTemplates: number;
}

// ============================================================================
// Paths
// ============================================================================

const ROOT = path.resolve(__dirname, '..');
const REACT_SRC = path.join(ROOT, 'packages/react/src');
const BLOCKS_SRC = path.join(ROOT, 'packages/blocks/src');
const COMPONENTS_DIR = path.join(REACT_SRC, 'components');
const SECTIONS_DIR = path.join(BLOCKS_SRC, 'sections');
const TEMPLATES_DIR = path.join(BLOCKS_SRC, 'templates');
const REGISTRY_DIR = path.join(ROOT, 'registry');
const SCHEMA_URL = 'https://orion-ds.dev/schema/registry-item.json';
const CSS_IMPORT = "import '@orion-ds/react/styles.css'";

// ============================================================================
// Parser helpers
// ============================================================================

function parseTypeFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
}

/**
 * Extract props from a TypeScript interface definition.
 * Handles JSDoc comments, optional markers, and default values from @default tags.
 */
function extractProps(content: string, interfaceName: string): PropInfo[] {
  const props: PropInfo[] = [];

  // Find the interface block
  const interfaceRegex = new RegExp(
    `export\\s+interface\\s+${interfaceName}[^{]*\\{([\\s\\S]*?)^\\}`,
    'm'
  );
  const match = content.match(interfaceRegex);
  if (!match) return props;

  const body = match[1];

  // Split into prop blocks by finding each prop declaration
  // Pattern: optional JSDoc + property name + optional ? + : + type + ;
  const propRegex = /(\/\*\*[\s\S]*?\*\/\s*)?(['"]?[\w-]+['"]?)\??\s*:\s*([^;]+);/g;
  let propMatch;

  while ((propMatch = propRegex.exec(body)) !== null) {
    const jsdoc = propMatch[1] || '';
    let propName = propMatch[2].replace(/['"]/g, '');
    const propType = propMatch[3].trim();

    // Skip internal/inherited props that aren't interesting
    if (['key', 'ref', 'children'].includes(propName) && !jsdoc.includes('@')) continue;

    // Extract description from JSDoc (first line after /*)
    let description = '';
    const descMatch = jsdoc.match(/\*\s+([^@*\n][^\n]*)/);
    if (descMatch) {
      description = descMatch[1].trim().replace(/^\*\s*/, '');
    }

    // Extract @default value
    let defaultValue: string | boolean | number | undefined;
    const defaultMatch = jsdoc.match(/@default\s+['"]?([^'"\n*]+)['"]?/);
    if (defaultMatch) {
      const raw = defaultMatch[1].trim();
      if (raw === 'true' || raw === 'false') defaultValue = raw === 'true';
      else if (!isNaN(Number(raw))) defaultValue = Number(raw);
      else defaultValue = raw;
    }

    // Check if required (no ? before :)
    const isOptional = body.includes(`${propName}?`);
    const isRequired = !isOptional && !defaultValue;

    // Extract union values
    let values: string[] | undefined;
    const unionMatch = propType.match(/^['"]([^'"]+)['"](\s*\|\s*['"][^'"]+['"])*/);
    if (unionMatch) {
      values = propType
        .split('|')
        .map(v => v.trim().replace(/['"]/g, ''))
        .filter(v => v.length > 0);
    }

    // Also check if type references a type alias with values
    const typeAliasMatch = propType.match(/^(\w+)$/);
    if (typeAliasMatch && !values) {
      const aliasName = typeAliasMatch[1];
      const aliasRegex = new RegExp(`export\\s+type\\s+${aliasName}\\s*=\\s*([^;]+);`);
      const aliasMatch = content.match(aliasRegex);
      if (aliasMatch) {
        const aliasValues = aliasMatch[1]
          .split('|')
          .map(v => v.trim().replace(/['"]/g, ''))
          .filter(v => v.length > 0 && !v.includes('{'));
        if (aliasValues.length > 0 && aliasValues.every(v => /^[\w-]+$/.test(v))) {
          values = aliasValues;
        }
      }
    }

    // Clean up description - remove JSDoc artifacts
    description = description.replace(/^\*\s*/, '').trim();

    const prop: PropInfo = {
      name: propName,
      type: propType,
      description,
    };

    if (defaultValue !== undefined) prop.default = defaultValue;
    if (isRequired) prop.required = true;
    if (values && values.length > 0) prop.values = values;

    props.push(prop);
  }

  return props;
}

/**
 * Extract type alias values (e.g., type ButtonVariant = 'primary' | 'secondary')
 */
function extractTypeValues(content: string, typeName: string): string[] {
  const regex = new RegExp(`export\\s+type\\s+${typeName}\\s*=\\s*([^;]+);`);
  const match = content.match(regex);
  if (!match) return [];

  return match[1]
    .split('|')
    .map(v => v.trim().replace(/['"]/g, ''))
    .filter(v => v.length > 0 && /^[\w-]+$/.test(v));
}

// ============================================================================
// Component metadata (manual enrichment)
// ============================================================================

interface ComponentMeta {
  category: string;
  tokens: string[];
  modeAware: boolean;
  dependencies?: string[];
  registryDependencies?: string[];
  accessibility?: AccessibilityInfo;
  examples: Example[];
  subComponents?: Array<{ name: string; description: string; interfaceName?: string }>;
}

const COMPONENT_META: Record<string, ComponentMeta> = {
  Button: {
    category: 'interactive',
    tokens: ['--interactive-primary', '--interactive-primary-hover', '--interactive-primary-text', '--interactive-secondary', '--radius-control', '--font-secondary'],
    modeAware: true,
    dependencies: ['lucide-react'],
    accessibility: {
      role: 'button',
      ariaAttributes: ['aria-label', 'aria-pressed', 'aria-disabled'],
      keyboardNav: [
        { key: 'Enter', action: 'Activate button' },
        { key: 'Space', action: 'Activate button' },
      ],
      notes: ['Icon-only buttons MUST have aria-label', 'Loading state automatically sets aria-busy'],
    },
    examples: [
      {
        title: 'Primary button',
        code: `<Button variant="primary">Save</Button>`,
      },
      {
        title: 'With icon',
        code: `import { Download } from 'lucide-react';\n\n<Button icon={<Download size={20} />}>Download</Button>`,
      },
      {
        title: 'Icon-only',
        code: `import { Settings } from 'lucide-react';\n\n<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />`,
      },
      {
        title: 'Loading state',
        code: `<Button isLoading>Saving...</Button>`,
      },
      {
        title: 'Full width',
        code: `<Button fullWidth variant="primary">Continue</Button>`,
      },
      {
        title: 'Danger action',
        code: `import { Trash2 } from 'lucide-react';\n\n<Button variant="danger" icon={<Trash2 size={20} />}>Delete</Button>`,
      },
    ],
  },
  Field: {
    category: 'forms',
    tokens: ['--surface-base', '--border-subtle', '--border-interactive', '--text-primary', '--text-secondary', '--radius-control', '--font-secondary'],
    modeAware: true,
    accessibility: {
      role: 'textbox',
      ariaAttributes: ['aria-label', 'aria-describedby', 'aria-invalid', 'aria-required'],
      notes: ['Error message auto-associated via aria-describedby', 'Label required unless aria-label provided'],
    },
    examples: [
      {
        title: 'Basic field',
        code: `<Field label="Email" type="email" placeholder="you@example.com" />`,
      },
      {
        title: 'With error',
        code: `<Field label="Email" type="email" error="Please enter a valid email" />`,
      },
      {
        title: 'With icons',
        code: `import { Mail } from 'lucide-react';\n\n<Field label="Email" type="email" leftIcon={<Mail size={18} />} />`,
      },
      {
        title: 'With helper text',
        code: `<Field label="Password" type="password" helperText="Must be at least 8 characters" />`,
      },
    ],
  },
  Card: {
    category: 'layout',
    tokens: ['--surface-base', '--surface-subtle', '--border-subtle', '--radius-container', '--shadow-md'],
    modeAware: true,
    subComponents: [
      { name: 'Card.Header', description: 'Card header section', interfaceName: 'CardHeaderProps' },
      { name: 'Card.Body', description: 'Card body/content section', interfaceName: 'CardBodyProps' },
      { name: 'Card.Footer', description: 'Card footer section', interfaceName: 'CardFooterProps' },
    ],
    examples: [
      {
        title: 'Basic card',
        code: `<Card>\n  <Card.Header>Title</Card.Header>\n  <Card.Body>Content goes here</Card.Body>\n  <Card.Footer>\n    <Button variant="primary">Save</Button>\n  </Card.Footer>\n</Card>`,
      },
      {
        title: 'Interactive card',
        code: `<Card interactive variant="elevated">\n  <Card.Body>Click me</Card.Body>\n</Card>`,
      },
      {
        title: 'Image card',
        code: `<Card variant="image" imageUrl="/hero.jpg" aspectRatio="16/9">\n  <Card.Body>Overlay content</Card.Body>\n</Card>`,
      },
    ],
  },
  Modal: {
    category: 'overlays',
    tokens: ['--surface-base', '--surface-overlay', '--border-subtle', '--radius-container', '--shadow-xl'],
    modeAware: false,
    subComponents: [
      { name: 'Modal.Header', description: 'Modal header with title', interfaceName: 'ModalHeaderProps' },
      { name: 'Modal.Body', description: 'Modal content area', interfaceName: 'ModalBodyProps' },
      { name: 'Modal.Footer', description: 'Modal footer with actions', interfaceName: 'ModalFooterProps' },
    ],
    accessibility: {
      role: 'dialog',
      ariaAttributes: ['aria-modal', 'aria-labelledby', 'aria-describedby'],
      keyboardNav: [
        { key: 'Escape', action: 'Close modal' },
        { key: 'Tab', action: 'Navigate within modal (focus trap)' },
      ],
      notes: ['Focus is trapped within modal', 'Focus returns to trigger on close'],
    },
    examples: [
      {
        title: 'Basic modal',
        code: `<Modal open={isOpen} onClose={() => setIsOpen(false)}>\n  <Modal.Header>Confirm Action</Modal.Header>\n  <Modal.Body>Are you sure?</Modal.Body>\n  <Modal.Footer>\n    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>\n    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>\n  </Modal.Footer>\n</Modal>`,
      },
      {
        title: 'Large modal',
        code: `<Modal open={isOpen} onClose={handleClose} size="lg">\n  <Modal.Header>Edit Profile</Modal.Header>\n  <Modal.Body>\n    <Field label="Name" />\n    <Field label="Email" type="email" />\n  </Modal.Body>\n</Modal>`,
      },
    ],
  },
  Alert: {
    category: 'feedback',
    tokens: ['--status-info', '--status-success', '--status-warning', '--status-error', '--radius-control'],
    modeAware: false,
    dependencies: ['lucide-react'],
    examples: [
      {
        title: 'Info alert',
        code: `<Alert variant="info" title="Info">This is an informational message.</Alert>`,
      },
      {
        title: 'Error alert',
        code: `<Alert variant="error" title="Error">Something went wrong.</Alert>`,
      },
      {
        title: 'Dismissible alert',
        code: `<Alert variant="success" title="Saved" onDismiss={() => {}}>Changes saved successfully.</Alert>`,
      },
    ],
  },
  Badge: {
    category: 'feedback',
    tokens: ['--surface-brand-soft', '--text-brand', '--status-success', '--status-warning', '--status-error'],
    modeAware: false,
    examples: [
      {
        title: 'Status badges',
        code: `<Badge variant="success">Active</Badge>\n<Badge variant="warning">Pending</Badge>\n<Badge variant="error">Failed</Badge>`,
      },
      {
        title: 'With dot indicator',
        code: `<Badge variant="primary" dot>Online</Badge>`,
      },
    ],
  },
  Avatar: {
    category: 'data-display',
    tokens: ['--surface-layer', '--text-secondary', '--radius-full'],
    modeAware: false,
    examples: [
      {
        title: 'With image',
        code: `<Avatar src="/user.jpg" alt="John Doe" size="md" />`,
      },
      {
        title: 'With initials',
        code: `<Avatar initials="JD" size="lg" />`,
      },
    ],
  },
  Select: {
    category: 'forms',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--radius-control'],
    modeAware: true,
    accessibility: {
      role: 'listbox',
      ariaAttributes: ['aria-label', 'aria-expanded', 'aria-haspopup'],
      keyboardNav: [
        { key: 'Enter/Space', action: 'Open/select' },
        { key: 'ArrowUp/Down', action: 'Navigate options' },
        { key: 'Escape', action: 'Close dropdown' },
      ],
    },
    examples: [
      {
        title: 'Basic select',
        code: `<Select\n  label="Country"\n  options={[\n    { value: 'us', label: 'United States' },\n    { value: 'uk', label: 'United Kingdom' },\n  ]}\n  onChange={(value) => console.log(value)}\n/>`,
      },
    ],
  },
  Switch: {
    category: 'forms',
    tokens: ['--interactive-primary', '--surface-layer', '--radius-full'],
    modeAware: false,
    accessibility: {
      role: 'switch',
      ariaAttributes: ['aria-checked', 'aria-label'],
      keyboardNav: [{ key: 'Space', action: 'Toggle switch' }],
    },
    examples: [
      {
        title: 'Basic switch',
        code: `<Switch label="Enable notifications" checked={enabled} onChange={setEnabled} />`,
      },
    ],
  },
  Checkbox: {
    category: 'forms',
    tokens: ['--interactive-primary', '--border-subtle', '--radius-sm'],
    modeAware: false,
    accessibility: {
      role: 'checkbox',
      ariaAttributes: ['aria-checked', 'aria-label'],
      keyboardNav: [{ key: 'Space', action: 'Toggle checkbox' }],
    },
    examples: [
      {
        title: 'Basic checkbox',
        code: `<Checkbox label="I agree to the terms" checked={agreed} onChange={setAgreed} />`,
      },
    ],
  },
  Radio: {
    category: 'forms',
    tokens: ['--interactive-primary', '--border-subtle'],
    modeAware: false,
    accessibility: {
      role: 'radio',
      ariaAttributes: ['aria-checked'],
      keyboardNav: [{ key: 'ArrowUp/Down', action: 'Navigate options' }],
    },
    examples: [
      {
        title: 'Radio group',
        code: `<Radio name="plan" label="Free" value="free" />\n<Radio name="plan" label="Pro" value="pro" />\n<Radio name="plan" label="Enterprise" value="enterprise" />`,
      },
    ],
  },
  Textarea: {
    category: 'forms',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--radius-control', '--font-secondary'],
    modeAware: true,
    examples: [
      {
        title: 'Basic textarea',
        code: `<Textarea label="Message" placeholder="Type your message..." rows={4} />`,
      },
      {
        title: 'With character count',
        code: `<Textarea label="Bio" maxLength={280} showCount />`,
      },
    ],
  },
  Table: {
    category: 'data-display',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--text-secondary'],
    modeAware: true,
    examples: [
      {
        title: 'Basic table',
        code: `<Table\n  columns={[\n    { key: 'name', header: 'Name' },\n    { key: 'email', header: 'Email' },\n    { key: 'role', header: 'Role' },\n  ]}\n  data={users}\n/>`,
      },
      {
        title: 'Sortable table',
        code: `<Table\n  columns={[\n    { key: 'name', header: 'Name', sortable: true },\n    { key: 'date', header: 'Date', sortable: true },\n  ]}\n  data={items}\n  onSort={(key, dir) => handleSort(key, dir)}\n/>`,
      },
    ],
  },
  Tabs: {
    category: 'navigation',
    tokens: ['--text-secondary', '--text-primary', '--interactive-primary', '--interactive-primary-text', '--surface-layer', '--border-subtle'],
    modeAware: false,
    accessibility: {
      role: 'tablist',
      ariaAttributes: ['aria-selected', 'role="tab"', 'role="tabpanel"'],
      keyboardNav: [
        { key: 'ArrowLeft/Right', action: 'Navigate tabs' },
        { key: 'Home/End', action: 'First/last tab' },
      ],
    },
    examples: [
      {
        title: 'Basic tabs',
        code: `<Tabs\n  items={[\n    { id: 'overview', label: 'Overview', content: <Overview /> },\n    { id: 'details', label: 'Details', content: <Details /> },\n    { id: 'history', label: 'History', content: <History /> },\n  ]}\n/>`,
      },
    ],
  },
  Breadcrumb: {
    category: 'navigation',
    tokens: ['--text-secondary', '--text-primary'],
    modeAware: false,
    accessibility: {
      role: 'navigation',
      ariaAttributes: ['aria-label="Breadcrumb"'],
    },
    examples: [
      {
        title: 'Basic breadcrumb',
        code: `<Breadcrumb\n  items={[\n    { label: 'Home', href: '/' },\n    { label: 'Products', href: '/products' },\n    { label: 'Widget', active: true },\n  ]}\n/>`,
      },
    ],
  },
  Navbar: {
    category: 'navigation',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--text-secondary', '--interactive-primary'],
    modeAware: true,
    subComponents: [
      { name: 'Navbar.Brand', description: 'Logo/brand area' },
      { name: 'Navbar.Nav', description: 'Navigation links container' },
      { name: 'Navbar.Link', description: 'Individual navigation link' },
      { name: 'Navbar.Actions', description: 'Right-side action buttons' },
    ],
    examples: [
      {
        title: 'Basic navbar',
        code: `<Navbar>\n  <Navbar.Brand>Orion</Navbar.Brand>\n  <Navbar.Nav>\n    <Navbar.Link href="/" active>Home</Navbar.Link>\n    <Navbar.Link href="/about">About</Navbar.Link>\n  </Navbar.Nav>\n  <Navbar.Actions>\n    <Button variant="primary" size="sm">Sign In</Button>\n  </Navbar.Actions>\n</Navbar>`,
      },
    ],
  },
  Spinner: {
    category: 'feedback',
    tokens: ['--interactive-primary'],
    modeAware: false,
    accessibility: {
      role: 'status',
      ariaAttributes: ['aria-label="Loading"'],
    },
    examples: [
      {
        title: 'Basic spinner',
        code: `<Spinner size="md" />`,
      },
    ],
  },
  Skeleton: {
    category: 'feedback',
    tokens: ['--surface-layer'],
    modeAware: false,
    examples: [
      {
        title: 'Text skeleton',
        code: `<Skeleton variant="text" width="80%" />\n<Skeleton variant="text" width="60%" />`,
      },
      {
        title: 'Card skeleton',
        code: `<Skeleton variant="rectangular" width="100%" height={200} />\n<Skeleton variant="text" />\n<Skeleton variant="text" width="60%" />`,
      },
    ],
  },
  ProgressBar: {
    category: 'feedback',
    tokens: ['--surface-layer', '--interactive-primary', '--status-success', '--status-warning', '--status-error'],
    modeAware: false,
    accessibility: {
      role: 'progressbar',
      ariaAttributes: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-label'],
    },
    examples: [
      {
        title: 'Basic progress',
        code: `<ProgressBar value={75} />`,
      },
      {
        title: 'With label',
        code: `<ProgressBar value={45} showLabel variant="success" />`,
      },
    ],
  },
  Tooltip: {
    category: 'overlays',
    tokens: ['--surface-layer', '--text-primary', '--radius-sm', '--shadow-md'],
    modeAware: false,
    accessibility: {
      role: 'tooltip',
      ariaAttributes: ['aria-describedby'],
    },
    examples: [
      {
        title: 'Basic tooltip',
        code: `<Tooltip content="This is helpful info">\n  <Button variant="ghost">Hover me</Button>\n</Tooltip>`,
      },
    ],
  },
  Dropdown: {
    category: 'overlays',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--radius-control', '--shadow-lg'],
    modeAware: false,
    accessibility: {
      role: 'menu',
      ariaAttributes: ['aria-haspopup', 'aria-expanded'],
      keyboardNav: [
        { key: 'Enter/Space', action: 'Open/select' },
        { key: 'ArrowUp/Down', action: 'Navigate items' },
        { key: 'Escape', action: 'Close menu' },
      ],
    },
    examples: [
      {
        title: 'Basic dropdown',
        code: `<Dropdown\n  trigger={<Button variant="secondary">Options</Button>}\n  items={[\n    { label: 'Edit', onClick: handleEdit },\n    { label: 'Duplicate', onClick: handleDuplicate },\n    { type: 'separator' },\n    { label: 'Delete', onClick: handleDelete, destructive: true },\n  ]}\n/>`,
      },
    ],
  },
  Drawer: {
    category: 'overlays',
    tokens: ['--surface-base', '--border-subtle', '--radius-container', '--shadow-xl'],
    modeAware: false,
    subComponents: [
      { name: 'Drawer.Header', description: 'Drawer header', interfaceName: 'DrawerHeaderProps' },
      { name: 'Drawer.Body', description: 'Drawer content', interfaceName: 'DrawerBodyProps' },
      { name: 'Drawer.Footer', description: 'Drawer footer', interfaceName: 'DrawerFooterProps' },
    ],
    accessibility: {
      role: 'dialog',
      ariaAttributes: ['aria-modal', 'aria-label'],
      keyboardNav: [
        { key: 'Escape', action: 'Close drawer' },
        { key: 'Tab', action: 'Navigate within drawer (focus trap)' },
      ],
    },
    examples: [
      {
        title: 'Basic drawer',
        code: `<Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right">\n  <Drawer.Header>Settings</Drawer.Header>\n  <Drawer.Body>Content</Drawer.Body>\n</Drawer>`,
      },
    ],
  },
  Popover: {
    category: 'overlays',
    tokens: ['--surface-base', '--border-subtle', '--radius-control', '--shadow-lg'],
    modeAware: false,
    examples: [
      {
        title: 'Basic popover',
        code: `<Popover\n  trigger={<Button variant="ghost">Info</Button>}\n  content={<div>Detailed information here</div>}\n/>`,
      },
    ],
  },
  Accordion: {
    category: 'layout',
    tokens: ['--surface-base', '--border-subtle', '--text-primary'],
    modeAware: false,
    accessibility: {
      ariaAttributes: ['aria-expanded', 'aria-controls'],
      keyboardNav: [
        { key: 'Enter/Space', action: 'Toggle section' },
        { key: 'ArrowUp/Down', action: 'Navigate sections' },
      ],
    },
    examples: [
      {
        title: 'Basic accordion',
        code: `<Accordion\n  items={[\n    { id: '1', title: 'Section 1', content: 'Content 1' },\n    { id: '2', title: 'Section 2', content: 'Content 2' },\n  ]}\n/>`,
      },
    ],
  },
  Divider: {
    category: 'layout',
    tokens: ['--border-subtle'],
    modeAware: false,
    examples: [
      {
        title: 'Horizontal divider',
        code: `<Divider />`,
      },
      {
        title: 'With label',
        code: `<Divider label="OR" />`,
      },
    ],
  },
  Link: {
    category: 'interactive',
    tokens: ['--interactive-primary', '--text-primary'],
    modeAware: false,
    examples: [
      {
        title: 'Basic link',
        code: `<Link href="/about">About Us</Link>`,
      },
      {
        title: 'External link',
        code: `<Link href="https://example.com" external>Visit Site</Link>`,
      },
    ],
  },
  Chip: {
    category: 'interactive',
    tokens: ['--surface-layer', '--text-primary', '--interactive-primary', '--radius-full'],
    modeAware: false,
    examples: [
      {
        title: 'Basic chips',
        code: `<Chip>React</Chip>\n<Chip variant="primary">TypeScript</Chip>\n<Chip removable onRemove={() => {}}>Removable</Chip>`,
      },
    ],
  },
  EmptyState: {
    category: 'feedback',
    tokens: ['--text-secondary', '--surface-subtle'],
    modeAware: false,
    dependencies: ['lucide-react'],
    examples: [
      {
        title: 'Basic empty state',
        code: `import { Inbox } from 'lucide-react';\n\n<EmptyState\n  icon={<Inbox size={48} />}\n  title="No messages"\n  description="You don't have any messages yet."\n  action={<Button>Compose</Button>}\n/>`,
      },
    ],
  },
  Pagination: {
    category: 'navigation',
    tokens: ['--interactive-primary', '--surface-base', '--border-subtle'],
    modeAware: false,
    accessibility: {
      role: 'navigation',
      ariaAttributes: ['aria-label="Pagination"'],
    },
    examples: [
      {
        title: 'Basic pagination',
        code: `<Pagination\n  currentPage={1}\n  totalPages={10}\n  onPageChange={(page) => setPage(page)}\n/>`,
      },
    ],
  },
  SearchInput: {
    category: 'forms',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--radius-control'],
    modeAware: true,
    examples: [
      {
        title: 'Basic search',
        code: `<SearchInput\n  placeholder="Search..."\n  onSearch={(query) => handleSearch(query)}\n/>`,
      },
    ],
  },
  List: {
    category: 'data-display',
    tokens: ['--surface-base', '--border-subtle', '--text-primary'],
    modeAware: false,
    examples: [
      {
        title: 'Basic list',
        code: `<List\n  items={[\n    { id: '1', primary: 'Item 1', secondary: 'Description' },\n    { id: '2', primary: 'Item 2', secondary: 'Description' },\n  ]}\n/>`,
      },
    ],
  },
  Stepper: {
    category: 'navigation',
    tokens: ['--interactive-primary', '--surface-layer', '--text-primary', '--text-secondary'],
    modeAware: false,
    examples: [
      {
        title: 'Basic stepper',
        code: `<Stepper\n  steps={[\n    { label: 'Account', status: 'completed' },\n    { label: 'Profile', status: 'active' },\n    { label: 'Review', status: 'pending' },\n  ]}\n  activeStep={1}\n/>`,
      },
    ],
  },
  Slider: {
    category: 'forms',
    tokens: ['--interactive-primary', '--surface-layer'],
    modeAware: false,
    accessibility: {
      role: 'slider',
      ariaAttributes: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-label'],
      keyboardNav: [
        { key: 'ArrowLeft/Right', action: 'Decrease/increase value' },
      ],
    },
    examples: [
      {
        title: 'Basic slider',
        code: `<Slider min={0} max={100} value={50} onChange={(val) => setValue(val)} />`,
      },
    ],
  },
  Combobox: {
    category: 'forms',
    tokens: ['--surface-base', '--border-subtle', '--text-primary', '--radius-control', '--shadow-lg'],
    modeAware: true,
    accessibility: {
      role: 'combobox',
      ariaAttributes: ['aria-expanded', 'aria-autocomplete', 'aria-activedescendant'],
      keyboardNav: [
        { key: 'ArrowUp/Down', action: 'Navigate options' },
        { key: 'Enter', action: 'Select option' },
        { key: 'Escape', action: 'Close dropdown' },
      ],
    },
    examples: [
      {
        title: 'Basic combobox',
        code: `<Combobox\n  label="Country"\n  options={[\n    { value: 'us', label: 'United States' },\n    { value: 'uk', label: 'United Kingdom' },\n    { value: 'ca', label: 'Canada' },\n  ]}\n  onSelect={(option) => setCountry(option)}\n/>`,
      },
    ],
  },
  Icon: {
    category: 'data-display',
    tokens: [],
    modeAware: false,
    dependencies: ['lucide-react'],
    examples: [
      {
        title: 'Basic icon',
        code: `<Icon name="search" size="md" />`,
      },
    ],
  },
  Chat: {
    category: 'data-display',
    tokens: ['--surface-base', '--surface-subtle', '--border-subtle', '--text-primary', '--text-secondary', '--interactive-primary'],
    modeAware: false,
    registryDependencies: ['button'],
    examples: [
      {
        title: 'Basic chat',
        code: `<Chat>\n  <Chat.Header title="Support" />\n  <Chat.Messages messages={messages} />\n  <Chat.Input onSend={handleSend} />\n</Chat>`,
      },
    ],
  },
  ThemeController: {
    category: 'interactive',
    tokens: [],
    modeAware: false,
    registryDependencies: ['card', 'switch', 'radio', 'button', 'badge', 'alert'],
    examples: [
      {
        title: 'Theme controller',
        code: `<ThemeController />`,
      },
    ],
  },
  Carousel: {
    category: 'data-display',
    tokens: ['--surface-base', '--border-subtle', '--radius-container'],
    modeAware: true,
    examples: [
      {
        title: 'Basic carousel',
        code: `<Carousel\n  items={[\n    { id: '1', image: '/img1.jpg', title: 'Slide 1' },\n    { id: '2', image: '/img2.jpg', title: 'Slide 2' },\n  ]}\n/>`,
      },
    ],
  },
  Toast: {
    category: 'feedback',
    tokens: ['--surface-base', '--border-subtle', '--shadow-lg', '--status-success', '--status-error', '--status-warning', '--status-info'],
    modeAware: false,
    examples: [
      {
        title: 'Toast usage',
        code: `const { addToast } = useToast();\n\naddToast({ title: 'Saved', description: 'Changes saved.', variant: 'success' });`,
      },
    ],
  },
  AgentCard: {
    category: 'data-display',
    tokens: ['--surface-base', '--surface-subtle', '--border-subtle', '--text-primary', '--text-secondary', '--text-tertiary', '--status-success', '--status-error', '--radius-control', '--shadow-sm', '--shadow-lg'],
    modeAware: true,
    dependencies: ['lucide-react'],
    registryDependencies: ['card', 'avatar'],
    accessibility: {
      ariaAttributes: ['aria-label', 'aria-expanded'],
      keyboardNav: [
        { key: 'Enter', action: 'Open agent or activate menu' },
        { key: 'Escape', action: 'Close actions menu' },
      ],
      notes: ['Action menu button must have aria-label', 'Menu automatically closes on outside click', 'Focus trapped within menu when open'],
    },
    examples: [
      {
        title: 'Basic agent card',
        code: `<AgentCard\n  id="agent-1"\n  avatar="https://i.pravatar.cc/150?img=1"\n  title="Customer Support Agent"\n  description="AI-powered assistant for customer support"\n  timestamp="Updated 2 hours ago"\n/>`,
      },
      {
        title: 'With status badge',
        code: `<AgentCard\n  id="agent-2"\n  avatar={<Bot size={32} />}\n  title="Sales Assistant"\n  description="Qualified leads and schedules demos"\n  timestamp="Updated today"\n  status="published"\n/>`,
      },
      {
        title: 'With actions menu',
        code: `<AgentCard\n  id="agent-3"\n  avatar="https://i.pravatar.cc/150?img=3"\n  title="Email Agent"\n  description="Automates email campaigns"\n  timestamp="Updated yesterday"\n  onClick={() => console.log('View details')}\n  onEdit={() => console.log('Edit agent')}\n  onDelete={() => console.log('Delete agent')}\n/>`,
      },
      {
        title: 'Grid layout',
        code: `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-4)' }}>\n  <AgentCard id="1" avatar={<Bot />} title="HR Assistant" description="Answers employee questions" timestamp="Active" status="published" />\n  <AgentCard id="2" avatar={<Sparkles />} title="Research Agent" description="Compiles research reports" timestamp="Active" status="published" />\n  <AgentCard id="3" avatar={<Zap />} title="Code Reviewer" description="Reviews pull requests" timestamp="Active" status="published" />\n</div>`,
      },
    ],
  },
};

// Category overrides for components not in COMPONENT_META (v4.x reorganization)
// Maps component names (PascalCase) to their new categories
const COMPONENT_CATEGORY_OVERRIDES: Record<string, string> = {
  // Forms (7 newcomers)
  Calendar: 'forms',
  DatePicker: 'forms',
  FileUploader: 'forms',
  FormSection: 'forms',
  InputOTP: 'forms',
  CodeEditor: 'forms',
  // Data-display (6 newcomers - Chat, Icon already fixed above)
  ActivityFeed: 'data-display',
  Chart: 'data-display',
  DataTable: 'data-display',
  KanbanBoard: 'data-display',
  MetricCards: 'data-display',
  // Navigation (5 newcomers)
  NavTree: 'navigation',
  PageHeader: 'navigation',
  Sidebar: 'navigation',
  UserMenu: 'navigation',
  WorkspaceSwitcher: 'navigation',
  // Feedback (5 newcomers)
  Banner: 'feedback',
  ErrorBoundary: 'feedback',
  NotificationCenter: 'feedback',
  // Overlays (3 newcomers)
  AlertDialog: 'overlays',
  Command: 'overlays',
  CommandBar: 'overlays',
  // Layout (5 newcomers)
  Collapsible: 'layout',
  CollapsibleFolder: 'layout',
  DetailPanel: 'layout',
  FilterBar: 'layout',
  QuickActions: 'layout',
  // Interactive (6 - Button, Chip, Link, ThemeController already fixed above)
  Toggle: 'interactive',
  ToggleGroup: 'interactive',
  // Internal
  IconGallery: 'internal',
};

// ============================================================================
// Generator
// ============================================================================

function generateComponentRegistry(componentName: string): RegistryItem | null {
  const componentDir = path.join(COMPONENTS_DIR, componentName);
  const typesFile = path.join(componentDir, `${componentName}.types.ts`);

  if (!fs.existsSync(typesFile)) return null;

  const content = parseTypeFile(typesFile);
  if (!content) return null;

  const meta = COMPONENT_META[componentName];
  if (!meta) {
    console.warn(`  ⚠ No metadata for ${componentName}, using defaults`);
  }

  // Extract main props
  const mainPropsInterface = `${componentName}Props`;
  const props = extractProps(content, mainPropsInterface);

  // Build files list
  const files: Array<{ path: string; type: string }> = [];
  const possibleFiles = [
    { suffix: '.tsx', type: 'registry:component' },
    { suffix: '.types.ts', type: 'registry:types' },
    { suffix: '.module.css', type: 'registry:styles' },
    { suffix: '/index.ts', type: 'registry:index' },
  ];
  for (const f of possibleFiles) {
    const check = f.suffix.startsWith('/')
      ? path.join(componentDir, f.suffix.slice(1))
      : path.join(componentDir, `${componentName}${f.suffix}`);
    if (fs.existsSync(check)) {
      files.push({
        path: `packages/react/src/components/${componentName}/${f.suffix.startsWith('/') ? f.suffix.slice(1) : componentName + f.suffix}`,
        type: f.type,
      });
    }
  }

  // Sub-components
  let subComponents: SubComponent[] | undefined;
  if (meta?.subComponents) {
    subComponents = meta.subComponents.map(sc => {
      const scProps = sc.interfaceName ? extractProps(content, sc.interfaceName) : undefined;
      return {
        name: sc.name,
        description: sc.description,
        props: scProps && scProps.length > 0 ? scProps : undefined,
      };
    });
  }

  // Extract description from JSDoc of the types file header or main interface
  let description = '';

  // First try to get the module-level JSDoc description
  const moduleDescRegex = /^\/\*\*\s*\n\s*\*\s+([^@*\n][^\n]*)/;
  const moduleDescMatch = content.match(moduleDescRegex);
  if (moduleDescMatch) {
    description = moduleDescMatch[1].trim().replace(/^\*\s*/, '');
  }

  // If that's just "ComponentName Component Types", look at components.json or meta
  if (!description || description.includes('Component Types') || description.includes('Section Types')) {
    // Use description from components.json-style metadata
    const componentJsonPath = path.join(ROOT, 'tokens/components.json');
    if (fs.existsSync(componentJsonPath)) {
      const compJson = JSON.parse(fs.readFileSync(componentJsonPath, 'utf-8'));
      const kebab = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      if (compJson.components?.[kebab]?.description) {
        description = compJson.components[kebab].description;
      } else if (compJson.components?.[componentName.toLowerCase()]?.description) {
        description = compJson.components[componentName.toLowerCase()].description;
      }
    }
  }

  if (!description || description.includes('Component Types') || description.includes('Section Types')) {
    description = `${componentName} component`;
  }

  // Build the registry item
  const kebabName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const item: RegistryItem = {
    $schema: SCHEMA_URL,
    name: kebabName,
    type: 'registry:component',
    title: componentName,
    description,
    category: meta?.category || COMPONENT_CATEGORY_OVERRIDES[componentName] || 'utilities',
    files,
    props: props.length > 0 ? props : undefined,
    subComponents,
    tokens: meta?.tokens,
    examples: meta?.examples,
    accessibility: meta?.accessibility,
    modeAware: meta?.modeAware || false,
    preview: {
      url: `https://orion-ds.dev/library.html#${kebabName}`,
      local: `/library.html#${kebabName}`,
    },
    import: `import { ${componentName} } from '@orion-ds/react'`,
    cssImport: CSS_IMPORT,
  };

  if (meta?.dependencies) item.dependencies = meta.dependencies;
  if (meta?.registryDependencies) item.registryDependencies = meta.registryDependencies;

  return item;
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('🔧 Generating Orion Registry...\n');

  // Ensure output directories exist
  for (const dir of ['components', 'sections', 'templates']) {
    const outDir = path.join(REGISTRY_DIR, dir);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  }

  // Generate component registries
  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter(d => {
    const stat = fs.statSync(path.join(COMPONENTS_DIR, d));
    return stat.isDirectory();
  });

  const allItems: Array<{ name: string; title: string; description: string; category: string; type: string }> = [];
  let componentCount = 0;

  for (const dir of componentDirs) {
    // Skip internal components
    if (['FontLoader', 'IconGallery'].includes(dir)) continue;

    const item = generateComponentRegistry(dir);
    if (item) {
      const outPath = path.join(REGISTRY_DIR, 'components', `${item.name}.json`);
      fs.writeFileSync(outPath, JSON.stringify(item, null, 2) + '\n');
      console.log(`  ✅ ${item.title} → registry/components/${item.name}.json`);
      allItems.push({
        name: item.name,
        title: item.title,
        description: item.description,
        category: item.category,
        type: item.type,
      });
      componentCount++;
    } else {
      console.log(`  ⏭ ${dir} — skipped (no types file)`);
    }
  }

  // Generate section registries (simplified — uses directory listing)
  const sectionDirs = fs.readdirSync(SECTIONS_DIR).filter(d => {
    const fullPath = path.join(SECTIONS_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  // Collect component names to detect collisions with sections
  const componentNames = new Set(allItems.map(i => i.name));

  let sectionCount = 0;
  for (const dir of sectionDirs) {
    let kebabName = dir.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const typesFile = path.join(SECTIONS_DIR, dir, `${dir}.types.ts`);
    const indexFile = path.join(SECTIONS_DIR, dir, 'index.ts');

    // Avoid name collision with components — add '-section' suffix
    if (componentNames.has(kebabName)) {
      kebabName = `${kebabName}-section`;
    }

    // Check if types file exists
    let description = `${dir} section component`;
    if (fs.existsSync(typesFile)) {
      const content = parseTypeFile(typesFile);
      const descMatch = content.match(/^\s*\/\*\*\s*\n\s*\*\s+([^@*\n][^\n]*)/);
      if (descMatch) {
        const raw = descMatch[1].trim().replace(/^\*\s*/, '');
        if (!raw.includes('Types') && raw.length > 5) {
          description = raw;
        }
      }
    }

    const sectionItem = {
      $schema: SCHEMA_URL,
      name: kebabName,
      type: 'registry:section',
      title: dir,
      description,
      category: 'marketing',
      files: [
        ...(fs.existsSync(path.join(SECTIONS_DIR, dir, `${dir}.tsx`))
          ? [{ path: `packages/react/src/sections/${dir}/${dir}.tsx`, type: 'registry:component' }]
          : []),
        ...(fs.existsSync(typesFile)
          ? [{ path: `packages/react/src/sections/${dir}/${dir}.types.ts`, type: 'registry:types' }]
          : []),
        ...(fs.existsSync(indexFile)
          ? [{ path: `packages/react/src/sections/${dir}/index.ts`, type: 'registry:index' }]
          : []),
      ],
      preview: {
        url: `https://orion-ds.dev/library.html#${kebabName}`,
        local: `/library.html#${kebabName}`,
      },
      import: `import { ${dir} } from '@orion-ds/react'`,
      cssImport: CSS_IMPORT,
    };

    const outPath = path.join(REGISTRY_DIR, 'sections', `${kebabName}.json`);
    fs.writeFileSync(outPath, JSON.stringify(sectionItem, null, 2) + '\n');
    allItems.push({
      name: kebabName,
      title: dir,
      description,
      category: 'marketing',
      type: 'registry:section',
    });
    sectionCount++;
  }
  console.log(`\n  ✅ ${sectionCount} sections generated`);

  // Generate template registries
  const templateCategories = ['marketing', 'app'];
  let templateCount = 0;
  for (const cat of templateCategories) {
    const catDir = path.join(TEMPLATES_DIR, cat);
    if (!fs.existsSync(catDir)) continue;

    const templateDirs = fs.readdirSync(catDir).filter(d => {
      const fullPath = path.join(catDir, d);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const dir of templateDirs) {
      const kebabName = dir.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const templateItem = {
        $schema: SCHEMA_URL,
        name: kebabName,
        type: 'registry:template',
        title: dir.replace(/Template$/, '').replace(/([A-Z])/g, ' $1').trim(),
        description: `${dir.replace(/Template$/, '')} page template`,
        category: cat,
        files: [
          { path: `packages/blocks/src/templates/${cat}/${dir}/${dir}.tsx`, type: 'registry:component' },
        ],
        preview: {
          url: `https://orion-ds.dev/library.html#${kebabName}`,
          local: `/library.html#${kebabName}`,
        },
        import: `import { ${dir} } from '@orion-ds/blocks'`,
        cssImport: CSS_IMPORT,
      };

      const outPath = path.join(REGISTRY_DIR, 'templates', `${kebabName}.json`);
      fs.writeFileSync(outPath, JSON.stringify(templateItem, null, 2) + '\n');
      allItems.push({
        name: kebabName,
        title: templateItem.title,
        description: templateItem.description,
        category: cat,
        type: 'registry:template',
      });
      templateCount++;
    }
  }
  console.log(`  ✅ ${templateCount} templates generated`);

  // Generate master index
  const index: RegistryIndex = {
    $schema: 'https://orion-ds.dev/schema/registry.json',
    name: '@orion-ds/registry',
    version: '1.0.0',
    description: 'Machine-readable registry for Orion Design System — AI-native component discovery and generation',
    homepage: 'https://orion-ds.dev',
    components: allItems.sort((a, b) => a.name.localeCompare(b.name)),
    totalComponents: componentCount,
    totalSections: sectionCount,
    totalTemplates: templateCount,
  };

  fs.writeFileSync(path.join(REGISTRY_DIR, 'index.json'), JSON.stringify(index, null, 2) + '\n');
  console.log(`\n📦 Registry index → registry/index.json`);
  console.log(`\n✅ Registry generation complete!`);
  console.log(`   Components: ${componentCount}`);
  console.log(`   Sections:   ${sectionCount}`);
  console.log(`   Templates:  ${templateCount}`);
  console.log(`   Total:      ${allItems.length}`);
}

main();
