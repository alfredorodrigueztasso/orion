#!/usr/bin/env node

/**
 * Expand Registry Metadata
 *
 * Generates metadata (tags, related_components, common_patterns) for all
 * components and sections in the registry that don't yet have metadata.
 *
 * Preserves existing metadata entries (doesn't overwrite).
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.dirname(__dirname);
const METADATA_FILE = path.join(REPO_ROOT, 'tokens', 'registry-metadata.json');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'registry', 'components');
const SECTIONS_DIR = path.join(REPO_ROOT, 'registry', 'sections');

// Category mappings: PascalCase component name → category
const COMPONENT_CATEGORY = {
  Accordion: 'layout', ActivityFeed: 'data', AgentCard: 'data',
  AlertDialog: 'overlay', Avatar: 'media', Badge: 'feedback',
  Banner: 'feedback', Breadcrumb: 'navigation', Calendar: 'form',
  Carousel: 'media', Chart: 'data', Chat: 'data', Checkbox: 'form',
  Chip: 'form', CodeEditor: 'form', Collapsible: 'layout',
  CollapsibleFolder: 'navigation', Combobox: 'form', Command: 'navigation',
  CommandBar: 'navigation', DataTable: 'data', DatePicker: 'form',
  DetailPanel: 'layout', Divider: 'layout', Drawer: 'overlay',
  Dropdown: 'overlay', EmptyState: 'feedback', ErrorBoundary: 'feedback',
  FileUploader: 'form', FilterBar: 'form', FontLoader: 'layout',
  FormSection: 'form', Icon: 'media', IconGallery: 'media',
  InputOTP: 'form', KanbanBoard: 'data', Link: 'navigation',
  List: 'data', MetricCards: 'data', NavTree: 'navigation',
  Navbar: 'navigation', NotificationCenter: 'feedback', PageHeader: 'layout',
  Pagination: 'navigation', Popover: 'overlay', ProgressBar: 'feedback',
  QuickActions: 'navigation', Radio: 'form', SearchInput: 'form',
  Select: 'form', Sidebar: 'navigation', Skeleton: 'feedback',
  Slider: 'form', Spinner: 'feedback', Stack: 'layout',
  Stepper: 'navigation', Switch: 'form', Table: 'data',
  Textarea: 'form', ThemeController: 'layout', Toast: 'feedback',
  Toggle: 'form', ToggleGroup: 'form', Tooltip: 'feedback',
  UserMenu: 'navigation', WorkspaceSwitcher: 'navigation',
};

// Section name mappings
const SECTION_CATEGORY = {
  ActivityFeedSection: 'data', AgentFolder: 'navigation', AppDownload: 'marketing',
  Blog: 'marketing', Breadcrumbs: 'navigation', CarouselSection: 'media',
  ChatSection: 'data', Comparison: 'marketing', Contact: 'marketing',
  Container: 'layout', CTA: 'marketing', EmptyStateSection: 'feedback',
  FAQ: 'marketing', Features: 'marketing', Footer: 'marketing',
  Gallery: 'media', Hero: 'marketing', LogoCloud: 'marketing',
  Newsletter: 'marketing', Pricing: 'marketing', Section: 'layout',
  SettingsLayout: 'layout', SocialProof: 'marketing', Stats: 'marketing',
  StepperSection: 'navigation', Team: 'marketing', Testimonials: 'marketing',
  Timeline: 'marketing',
};

const CATEGORY_TAGS = {
  form: ['form', 'input', 'interactive', 'validation'],
  feedback: ['feedback', 'status', 'notification', 'alert'],
  layout: ['layout', 'structure', 'container', 'grid'],
  navigation: ['navigation', 'routing', 'menu', 'link'],
  data: ['data', 'display', 'table', 'list', 'visualization'],
  overlay: ['overlay', 'modal', 'popup', 'popover', 'dropdown'],
  media: ['media', 'visual', 'image', 'icon', 'gallery'],
  marketing: ['marketing', 'section', 'hero', 'landing', 'page'],
};

// Related components mapping: component → array of related component names
const RELATED_COMPONENTS_MAP = {
  Button: ['Link', 'Dropdown', 'QuickActions'],
  Card: ['Stack', 'Container', 'DetailPanel'],
  Field: ['Form', 'Combobox', 'Select', 'Checkbox', 'Radio', 'Toggle'],
  Modal: ['AlertDialog', 'Drawer', 'Popover', 'Toast'],
  Alert: ['Banner', 'Toast', 'Notification'],
  Badge: ['Chip', 'Tag'],
  Checkbox: ['Radio', 'Toggle', 'Switch'],
  Avatar: ['UserMenu', 'List'],
  Tabs: ['Pagination', 'Stepper'],
  Stepper: ['Tabs', 'PageHeader'],
  DataTable: ['Pagination', 'FilterBar', 'DataTable'],
  Pagination: ['DataTable', 'List'],
  Navigation: ['Navbar', 'Sidebar', 'NavTree'],
  Breadcrumb: ['Link', 'Navigation'],
  Toast: ['Alert', 'NotificationCenter'],
  Spinner: ['ProgressBar', 'Skeleton'],
  Calendar: ['DatePicker', 'Stepper'],
  Chart: ['DataTable', 'MetricCards'],
};

const RELATED_SECTIONS_MAP = {
  Hero: ['Features', 'CTA', 'Footer'],
  Features: ['Hero', 'Pricing', 'CTA'],
  Pricing: ['Features', 'CTA', 'Comparison'],
  CTA: ['Hero', 'Features', 'Footer'],
  Footer: ['Hero', 'CTA', 'Newsletter'],
};

// Common patterns per category
const COMMON_PATTERNS = {
  form: ['Login form', 'Registration form', 'Inline form', 'Multi-step form'],
  feedback: ['Error message', 'Success state', 'Loading state', 'Status badge'],
  layout: ['Dashboard layout', 'Content container', 'Sidebar layout', 'Grid system'],
  navigation: ['Main navigation', 'Breadcrumbs', 'Menu dropdown', 'Mobile menu'],
  data: ['Data table', 'List view', 'Card grid', 'Data visualization'],
  overlay: ['Modal dialog', 'Dropdown menu', 'Floating panel', 'Popover tooltip'],
  media: ['Icon set', 'Image gallery', 'Avatar display', 'Media carousel'],
  marketing: ['Landing page section', 'Hero banner', 'Feature showcase', 'CTA section'],
};

function kebabToPascal(kebab) {
  return kebab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function generateComponentMetadata(componentName, category) {
  const pascalName = kebabToPascal(componentName);
  const categoryTags = CATEGORY_TAGS[category] || [];
  const nameTags = [componentName.replace(/-/g, ' ')];

  const tags = [...new Set([...categoryTags, ...nameTags])];
  const relatedComponents = RELATED_COMPONENTS_MAP[pascalName] || [];
  const patterns = COMMON_PATTERNS[category] || ['Basic usage', 'Interactive example'];

  return {
    tags,
    related_components: relatedComponents,
    common_patterns: patterns.slice(0, 3),
  };
}

function generateSectionMetadata(sectionName, category) {
  const pascalName = kebabToPascal(sectionName);
  const categoryTags = CATEGORY_TAGS[category] || [];
  const nameTags = [sectionName.replace(/-/g, ' ')];

  const tags = [...new Set([...categoryTags, ...nameTags])];
  const relatedSections = RELATED_SECTIONS_MAP[pascalName] || [];
  const patterns = COMMON_PATTERNS[category] || ['Usage example', 'Customization'];

  return {
    tags,
    related_sections: relatedSections,
    common_patterns: patterns.slice(0, 3),
  };
}

function getComponentsInDirectory(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch (e) {
    return [];
  }
}

function main() {
  console.log('🔄 Expanding registry metadata...\n');

  // Load existing metadata
  let metadata = { components: {}, sections: {} };
  if (fs.existsSync(METADATA_FILE)) {
    try {
      metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
    } catch (e) {
      console.warn('⚠️  Could not parse existing metadata, starting fresh');
    }
  }

  // Get all component and section names
  const componentFiles = getComponentsInDirectory(COMPONENTS_DIR);
  const sectionFiles = getComponentsInDirectory(SECTIONS_DIR);

  let componentCount = 0;
  let sectionCount = 0;

  // Expand component metadata
  for (const componentName of componentFiles) {
    if (metadata.components[componentName]) {
      continue; // Skip existing
    }

    const pascalName = kebabToPascal(componentName);
    const category = COMPONENT_CATEGORY[pascalName] || 'layout';
    metadata.components[componentName] = generateComponentMetadata(componentName, category);
    componentCount++;
  }

  // Expand section metadata
  for (const sectionName of sectionFiles) {
    if (metadata.sections[sectionName]) {
      continue; // Skip existing
    }

    const pascalName = kebabToPascal(sectionName);
    const category = SECTION_CATEGORY[pascalName] || 'layout';
    metadata.sections[sectionName] = generateSectionMetadata(sectionName, category);
    sectionCount++;
  }

  // Write updated metadata
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2) + '\n');

  console.log('✅ Metadata expanded:');
  console.log(`   Components: ${Object.keys(metadata.components).length} / ${componentFiles.length}`);
  console.log(`   Sections: ${Object.keys(metadata.sections).length} / ${sectionFiles.length}`);
  console.log(`   Added: ${componentCount} components, ${sectionCount} sections`);
  console.log(`\n📝 Updated: ${METADATA_FILE}`);
}

main();
