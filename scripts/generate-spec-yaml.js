#!/usr/bin/env node

/**
 * Generate spec.yaml for all components that don't have one yet.
 *
 * Usage:
 *   node scripts/generate-spec-yaml.js
 *
 * This script:
 * 1. Reads all components from packages/react/src/components
 * 2. Identifies which ones are missing spec.yaml
 * 3. Extracts props from {Component}.types.ts
 * 4. Generates spec.yaml with AI rules, examples, tokens, and related components
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// CONSTANTS
// ============================================================================

const COMPONENTS_DIR = path.join(__dirname, '../packages/react/src/components');

// Component categories for smart default values
const COMPONENT_CATEGORIES = {
  // Form components
  'Checkbox': 'form',
  'Radio': 'form',
  'Switch': 'form',
  'Toggle': 'form',
  'ToggleGroup': 'form',
  'Slider': 'form',
  'Field': 'form',
  'FileUploader': 'form',
  'InputOTP': 'form',

  // Display components
  'Badge': 'display',
  'Avatar': 'display',
  'Icon': 'display',
  'Divider': 'display',
  'Spinner': 'display',
  'Skeleton': 'display',
  'Chip': 'display',
  'Tag': 'display',

  // Interactive components
  'Tooltip': 'interactive',
  'Popover': 'interactive',
  'Dropdown': 'interactive',
  'Menu': 'interactive',
  'SearchInput': 'interactive',
  'Select': 'interactive',
  'Combobox': 'interactive',
  'Command': 'interactive',
  'CommandBar': 'interactive',

  // Layout components
  'Card': 'layout',
  'Panel': 'layout',
  'Container': 'layout',
  'Stack': 'layout',
  'FormSection': 'layout',
  'DetailPanel': 'layout',

  // Navigation components
  'Navbar': 'navigation',
  'Sidebar': 'navigation',
  'Breadcrumb': 'navigation',
  'Link': 'navigation',
  'NavTree': 'navigation',
  'PageHeader': 'navigation',
  'Pagination': 'navigation',

  // Complex components
  'DataTable': 'complex',
  'List': 'complex',
  'Tabs': 'complex',
  'Accordion': 'complex',
  'Carousel': 'complex',
  'Stepper': 'complex',
  'KanbanBoard': 'complex',
  'Calendar': 'complex',
  'DatePicker': 'complex',
  'Chart': 'complex',

  // Modal/Drawer
  'Modal': 'modal',
  'Drawer': 'modal',
  'AlertDialog': 'modal',

  // Special
  'Toast': 'feedback',
  'Alert': 'feedback',
  'Banner': 'feedback',
  'EmptyState': 'feedback',
  'ErrorBoundary': 'error',
};

// Common UI tokens
const COMMON_TOKENS = {
  colors: [
    '--text-primary',
    '--text-secondary',
    '--surface-base',
    '--surface-subtle',
    '--interactive-primary',
    '--interactive-secondary',
    '--border-default',
  ],
  spacing: ['--spacing-2', '--spacing-4', '--spacing-6', '--spacing-8'],
  radius: ['--radius-control', '--radius-sm', '--radius-container'],
  typography: ['--font-secondary', '--font-size-base'],
  effects: ['--shadow-sm', '--shadow-md'],
};

// Component relationships (smart defaults)
const RELATED_COMPONENTS_MAP = {
  'Button': ['Field', 'Modal', 'Card', 'Stack'],
  'Field': ['Button', 'Form', 'Card', 'Label'],
  'Card': ['Button', 'Modal', 'Badge', 'Stack'],
  'Modal': ['Button', 'Card', 'Icon', 'Divider'],
  'Alert': ['Icon', 'Button', 'Card', 'Toast'],
  'Badge': ['Chip', 'Avatar', 'Tag', 'Stack'],
  'Avatar': ['Badge', 'Card', 'UserMenu', 'Navbar'],
  'Tooltip': ['Icon', 'Button', 'Popover', 'Badge'],
  'Popover': ['Tooltip', 'Dropdown', 'Card', 'Button'],
  'Dropdown': ['Popover', 'Menu', 'Button', 'Icon'],
  'Select': ['Combobox', 'Field', 'Option', 'Button'],
  'Checkbox': ['Radio', 'Toggle', 'Switch', 'Field'],
  'Radio': ['Checkbox', 'Toggle', 'Field', 'Option'],
  'Switch': ['Checkbox', 'Toggle', 'Button', 'Field'],
  'Toast': ['Alert', 'Button', 'Icon', 'Card'],
  'Tabs': ['List', 'Card', 'Icon', 'Button'],
  'Accordion': ['Tabs', 'Collapsible', 'Card', 'Icon'],
  'Navbar': ['Avatar', 'Icon', 'Link', 'Button'],
  'Sidebar': ['NavTree', 'Avatar', 'Icon', 'Divider'],
  'DataTable': ['Pagination', 'Icon', 'Button', 'Field'],
  'Stepper': ['Card', 'Icon', 'Button', 'Divider'],
  'Carousel': ['Icon', 'Button', 'Card', 'Pagination'],
  'Modal': ['Card', 'Button', 'Icon', 'Divider'],
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Parse TypeScript interface from .types.ts file
 */
function parseComponentTypes(typesPath) {
  try {
    const content = fs.readFileSync(typesPath, 'utf8');
    const props = {};

    // Extract interface definition
    const interfaceMatch = content.match(/export interface \w+Props[\s\S]*?\{([\s\S]*?)\}/);
    if (!interfaceMatch) {
      return props;
    }

    const interfaceContent = interfaceMatch[1];

    // Split by property declarations
    const propertyLines = interfaceContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));

    let currentProp = null;
    let currentDescription = [];

    for (const line of propertyLines) {
      // Match JSDoc comments
      if (line.includes('/**') || line.includes('/*')) {
        currentDescription = [];
        continue;
      }
      if (line.includes('*/')) {
        continue;
      }
      if (line.trim().startsWith('*')) {
        const desc = line.trim().substring(1).trim();
        if (desc) currentDescription.push(desc);
        continue;
      }

      // Match property declarations (e.g., "label?: string;")
      const propMatch = line.match(/^\s*(\w+)\??\s*:\s*([^;=]+);/);
      if (propMatch) {
        const [, propName, propType] = propMatch;
        props[propName] = {
          type: propType.trim(),
          description: currentDescription.join(' ').trim() || `The ${propName} prop`,
          required: !line.includes('?'),
        };
        currentDescription = [];
      }
    }

    return props;
  } catch (err) {
    return {};
  }
}

/**
 * Get component category
 */
function getCategory(componentName) {
  return COMPONENT_CATEGORIES[componentName] || 'component';
}

/**
 * Get related components
 */
function getRelatedComponents(componentName) {
  if (RELATED_COMPONENTS_MAP[componentName]) {
    return RELATED_COMPONENTS_MAP[componentName];
  }

  // Default relationships based on category
  const category = getCategory(componentName);
  const defaults = {
    form: ['Button', 'Card', 'Field', 'Stack'],
    display: ['Card', 'Badge', 'Stack', 'Icon'],
    interactive: ['Button', 'Card', 'Icon', 'Popover'],
    layout: ['Button', 'Card', 'Icon', 'Divider'],
    navigation: ['Button', 'Icon', 'Link', 'Avatar'],
    complex: ['Card', 'Button', 'Icon', 'Pagination'],
    modal: ['Button', 'Icon', 'Card', 'Divider'],
    feedback: ['Button', 'Icon', 'Card', 'Stack'],
  };

  return defaults[category] || ['Button', 'Card', 'Field', 'Stack'];
}

/**
 * Get relevant tokens for component
 */
function getRelevantTokens(componentName, componentType = 'display') {
  const tokens = [];
  const category = getCategory(componentName);

  // Add color tokens based on category
  if (
    ['form', 'interactive', 'modal', 'feedback'].includes(category) ||
    componentName.includes('Button') ||
    componentName.includes('Field')
  ) {
    tokens.push('--text-primary', '--interactive-primary', '--border-default');
  } else if (['display', 'layout', 'navigation'].includes(category)) {
    tokens.push('--text-primary', '--surface-base', '--surface-subtle');
  }

  // Add spacing and radius for all
  tokens.push('--spacing-4', '--radius-control');

  // Add typography
  tokens.push('--font-secondary');

  // Remove duplicates and limit to 5-6
  return [...new Set(tokens)].slice(0, 6);
}

/**
 * Generate example code based on component type
 */
function generateExamples(componentName, props) {
  const examples = [];
  const category = getCategory(componentName);

  if (category === 'form') {
    examples.push({
      title: 'Basic Usage',
      code: `<${componentName} label="Option" />`,
    });
    if (Object.keys(props).some(p => p.includes('size'))) {
      examples.push({
        title: 'Different Sizes',
        code: `<${componentName} label="Option" size="lg" />`,
      });
    }
  } else if (category === 'display') {
    if (props.variant) {
      examples.push({
        title: 'Primary Variant',
        code: `<${componentName} variant="primary">Content</${componentName}>`,
      });
      examples.push({
        title: 'Secondary Variant',
        code: `<${componentName} variant="secondary">Content</${componentName}>`,
      });
    } else {
      examples.push({
        title: 'Basic Usage',
        code: `<${componentName}>Content</${componentName}>`,
      });
    }
  } else if (category === 'interactive') {
    examples.push({
      title: 'Default State',
      code: `<${componentName} trigger="Click me">Content</${componentName}>`,
    });
    if (Object.keys(props).some(p => p.includes('position'))) {
      examples.push({
        title: 'Custom Position',
        code: `<${componentName} trigger="Click me" position="bottom">Content</${componentName}>`,
      });
    }
  } else if (category === 'modal') {
    examples.push({
      title: 'Default',
      code: `<${componentName} isOpen={open} onClose={handleClose}>
  Content
</${componentName}>`,
    });
  } else if (category === 'layout') {
    examples.push({
      title: 'Basic Layout',
      code: `<${componentName}>
  <h2>Title</h2>
  <p>Content</p>
</${componentName}>`,
    });
  } else {
    examples.push({
      title: 'Basic Usage',
      code: `<${componentName} />`,
    });
  }

  // Ensure we have at least 2 examples
  if (examples.length < 2) {
    examples.push({
      title: 'With Props',
      code: `<${componentName} {...props} />`,
    });
  }

  return examples.slice(0, 3);
}

/**
 * Generate AI rules based on component type
 */
function generateAiRules(componentName) {
  const rules = [
    'Never add brand prop (brand is global via ThemeProvider)',
    'Use semantic color tokens only (var(--text-primary), var(--interactive-primary), etc)',
    'Check data-theme context before styling (light/dark)',
  ];

  const category = getCategory(componentName);

  if (category === 'form') {
    rules.push('Support checked/unchecked states with onChange callback');
    rules.push('Always include accessible labels (visible or aria-label)');
  } else if (category === 'display') {
    rules.push('Use variant prop for visual differentiation, not hardcoded styles');
    rules.push('Support size prop scaling across sm/md/lg');
  } else if (category === 'interactive') {
    rules.push('Position prop controls placement (top/bottom/left/right)');
    rules.push('Manage open/close state with isOpen prop');
  } else if (category === 'modal') {
    rules.push('Trap focus within modal for accessibility');
    rules.push('Support keyboard dismissal (Escape key)');
  } else if (category === 'navigation') {
    rules.push('Use semantic HTML (nav, link, list)');
    rules.push('Support keyboard navigation (Tab, Arrow keys)');
  }

  // Add lucide-react rule if component likely uses icons
  if (
    ['Button', 'Alert', 'Badge', 'Field', 'Popover', 'Dropdown', 'Modal'].some(
      word => componentName.includes(word)
    )
  ) {
    rules.push('Import icons from lucide-react with size={20} for consistency');
  }

  return rules.slice(0, 5);
}

/**
 * Generate spec.yaml content
 */
function generateSpecYaml(componentName, componentPath) {
  const typesPath = path.join(componentPath, `${componentName}.types.ts`);
  const props = parseComponentTypes(typesPath);

  // If no props found, generate minimal defaults
  const propsObj = Object.keys(props).length > 0 ? props : getDefaultProps(componentName);

  // Build props section
  const propsSection = Object.entries(propsObj).map(([name, prop]) => {
    return `  ${name}:\n    type: "${prop.type}"\n    description: "${prop.description}"\n    required: ${prop.required === true ? 'true' : 'false'}`;
  });

  const examples = generateExamples(componentName, propsObj);
  const aiRules = generateAiRules(componentName);
  const tokens = getRelevantTokens(componentName);
  const relatedComponents = getRelatedComponents(componentName);

  const yaml = `name: ${componentName}
title: "${componentName}"
description: "${getComponentDescription(componentName)}"
category: "${getCategory(componentName)}"

props:
${propsSection.join('\n')}

ai_rules:
${aiRules.map(rule => `  - "${rule}"`).join('\n')}

examples:
${examples.map(ex => `  - title: "${ex.title}"\n    code: |\n      ${ex.code.split('\n').join('\n      ')}`).join('\n')}

tokens:
${tokens.map(token => `  - "${token}"`).join('\n')}

related_components: [${relatedComponents.map(c => `"${c}"`).join(', ')}]
`;

  return yaml;
}

/**
 * Get default props for component if types file not readable
 */
function getDefaultProps(componentName) {
  const defaults = {
    disabled: { type: 'boolean', description: 'Disables the component', required: false },
    className: { type: 'string', description: 'Additional CSS classes', required: false },
    children: { type: 'ReactNode', description: 'Component content', required: false },
  };

  const category = getCategory(componentName);

  if (category === 'form') {
    return {
      ...defaults,
      label: { type: 'string', description: 'Field label', required: false },
      checked: { type: 'boolean', description: 'Checked state', required: false },
      onChange: { type: 'function', description: 'Change handler', required: false },
    };
  }

  if (category === 'display') {
    return {
      ...defaults,
      variant: { type: 'string', description: 'Visual variant', required: false },
      size: { type: 'string', description: 'Component size', required: false },
    };
  }

  if (category === 'interactive') {
    return {
      ...defaults,
      trigger: { type: 'string|ReactNode', description: 'Trigger element', required: false },
      content: { type: 'string|ReactNode', description: 'Popover content', required: false },
      position: { type: 'string', description: 'Position (top|bottom|left|right)', required: false },
    };
  }

  if (category === 'modal') {
    return {
      ...defaults,
      isOpen: { type: 'boolean', description: 'Modal visibility', required: true },
      onClose: { type: 'function', description: 'Close handler', required: true },
      title: { type: 'string', description: 'Modal title', required: false },
    };
  }

  return defaults;
}

/**
 * Get component description
 */
function getComponentDescription(componentName) {
  const descriptions = {
    'Accordion': 'Expandable content sections',
    'ActivityFeed': 'Timeline of user activities',
    'AgentCard': 'Card for displaying AI agents',
    'Avatar': 'User profile image or initials',
    'Badge': 'Small status indicator',
    'Banner': 'Full-width notification bar',
    'Breadcrumb': 'Navigation breadcrumb trail',
    'Calendar': 'Date selection calendar',
    'Carousel': 'Rotating content slider',
    'Chart': 'Data visualization component',
    'Chat': 'Messaging interface',
    'Checkbox': 'Checkbox input control',
    'Chip': 'Compact label or tag',
    'CodeEditor': 'Syntax-highlighted code input',
    'Collapsible': 'Expandable/collapsible content',
    'CollapsibleFolder': 'Folder tree with collapsible items',
    'Combobox': 'Searchable select dropdown',
    'Command': 'Command palette interface',
    'CommandBar': 'Top command bar for actions',
    'DataTable': 'Tabular data display',
    'DatePicker': 'Interactive date selection',
    'DetailPanel': 'Side panel for detailed information',
    'Divider': 'Visual separator',
    'Drawer': 'Slide-out panel',
    'Dropdown': 'Dropdown menu',
    'EmptyState': 'Empty state placeholder',
    'ErrorBoundary': 'Error boundary wrapper',
    'FileUploader': 'File upload input',
    'FilterBar': 'Data filtering controls',
    'FontLoader': 'Font loading utility',
    'FormSection': 'Form section container',
    'Icon': 'Icon display',
    'IconGallery': 'Gallery of available icons',
    'InputOTP': 'One-time password input',
    'KanbanBoard': 'Kanban task board',
    'Link': 'Navigation link',
    'List': 'Vertical list of items',
    'MetricCards': 'Cards displaying metrics',
    'Modal': 'Dialog modal',
    'NavTree': 'Navigation tree structure',
    'Navbar': 'Top navigation bar',
    'NotificationCenter': 'Notification hub',
    'PageHeader': 'Page header with title and actions',
    'Pagination': 'Page navigation controls',
    'Popover': 'Floating popover panel',
    'ProgressBar': 'Progress indicator',
    'QuickActions': 'Quick action buttons',
    'Radio': 'Radio button control',
    'SearchInput': 'Search input field',
    'Select': 'Dropdown select',
    'Sidebar': 'Side navigation panel',
    'Skeleton': 'Loading skeleton',
    'Slider': 'Range slider input',
    'Spinner': 'Loading spinner',
    'Stack': 'Flexible layout stack',
    'Stepper': 'Step-by-step process indicator',
    'Switch': 'Toggle switch control',
    'Table': 'Data table',
    'Tabs': 'Tabbed content interface',
    'Textarea': 'Multi-line text input',
    'ThemeController': 'Theme switching controller',
    'Toast': 'Toast notification',
    'Toggle': 'Toggle button',
    'ToggleGroup': 'Group of toggle buttons',
    'Tooltip': 'Tooltip popover',
    'UserMenu': 'User account menu',
    'WorkspaceSwitcher': 'Workspace selection dropdown',
  };

  return descriptions[componentName] || `The ${componentName} component`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('📋 Generating spec.yaml files...\n');

  // Get all components
  const allComponents = fs
    .readdirSync(COMPONENTS_DIR)
    .filter(name => {
      const stat = fs.statSync(path.join(COMPONENTS_DIR, name));
      return stat.isDirectory() && name !== 'index.ts' && !name.startsWith('.');
    });

  // Filter out components that already have spec.yaml
  const existingSpecs = new Set(
    execSync('find packages/react/src/components -name "spec.yaml"', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
    })
      .split('\n')
      .filter(Boolean)
      .map(p => path.basename(path.dirname(p)))
  );

  const componentsToProcess = allComponents.filter(name => !existingSpecs.has(name));

  console.log(`Total components: ${allComponents.length}`);
  console.log(`Existing spec.yaml: ${existingSpecs.size}`);
  console.log(`To process: ${componentsToProcess.length}\n`);

  let created = 0;
  let skipped = 0;
  const errors = [];

  for (const componentName of componentsToProcess) {
    const componentPath = path.join(COMPONENTS_DIR, componentName);

    try {
      // Generate spec.yaml
      const specYaml = generateSpecYaml(componentName, componentPath);

      // Write file
      const specPath = path.join(componentPath, 'spec.yaml');
      fs.writeFileSync(specPath, specYaml, 'utf8');

      console.log(`✅ ${componentName}`);
      created++;
    } catch (err) {
      console.error(`❌ ${componentName}: ${err.message}`);
      errors.push({ component: componentName, error: err.message });
      skipped++;
    }
  }

  console.log(`\n✨ Summary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total: ${created + skipped}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors:`);
    errors.forEach(({ component, error }) => {
      console.log(`  - ${component}: ${error}`);
    });
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
