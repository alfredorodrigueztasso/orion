#!/usr/bin/env node

/**
 * Orion Design System - Component Scaffolding Script
 *
 * Creates a new React component following AI-first patterns with:
 * - TypeScript types (no brand prop, semantic JSDoc)
 * - CSS Modules using semantic tokens
 * - forwardRef pattern with displayName
 * - Vitest + Testing Library test skeleton
 * - Storybook story with autodocs
 * - Barrel export with JSDoc
 *
 * Usage:
 *   node scripts/create-component.js MyComponent
 *   npm run create:component MyComponent
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COMPONENTS_DIR = path.resolve(
  __dirname,
  '..',
  'packages',
  'react',
  'src',
  'components'
);

/**
 * Validates that the name is PascalCase (starts with uppercase, no special chars).
 */
function isPascalCase(name) {
  return /^[A-Z][A-Za-z0-9]+$/.test(name);
}

/**
 * Converts PascalCase to kebab-case for CSS class names.
 *   e.g. "DatePicker" -> "date-picker"
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Converts PascalCase to camelCase for variable names.
 *   e.g. "DatePicker" -> "datePicker"
 */
function toCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// ---------------------------------------------------------------------------
// Template generators
// ---------------------------------------------------------------------------

function generateTypes(name) {
  const camel = toCamelCase(name);
  return `\
/**
 * ${name} Component Types
 *
 * Type definitions for the Orion ${name} component.
 *
 * @module ${name}
 */

import type { HTMLAttributes, ReactNode } from 'react';

/**
 * ${name} visual variants.
 *
 * @semanticGuide
 * - \`default\`: Standard presentation
 * - \`outlined\`: Bordered, transparent background
 *
 * @example
 * \`\`\`tsx
 * <${name} variant="default">Content</${name}>
 * <${name} variant="outlined">Content</${name}>
 * \`\`\`
 */
export type ${name}Variant = 'default' | 'outlined';

/**
 * ${name} component props
 *
 * @example Basic usage
 * \`\`\`tsx
 * <${name} variant="default">
 *   Hello world
 * </${name}>
 * \`\`\`
 */
export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the component.
   *
   * @default 'default'
   */
  variant?: ${name}Variant;

  /**
   * Component content.
   */
  children?: ReactNode;
}
`;
}

function generateComponent(name) {
  const camel = toCamelCase(name);
  return `\
/**
 * ${name} Component
 *
 * A type-safe, accessible ${name.toLowerCase()} component that uses the Orion Design System tokens.
 *
 * @example
 * \`\`\`tsx
 * <${name} variant="default">
 *   Content here
 * </${name}>
 * \`\`\`
 */

import { forwardRef } from 'react';
import type { ${name}Props } from './${name}.types';
import styles from './${name}.module.css';

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  (
    {
      variant = 'default',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.${camel},
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;
}

function generateCSS(name) {
  const camel = toCamelCase(name);
  return `\
/**
 * ${name} Component Styles
 *
 * Uses CSS Modules for scoped styling.
 * All values reference semantic tokens via CSS variables.
 */

/* Base styles */
.${camel} {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Spacing */
  padding: var(--spacing-4);

  /* Typography */
  font-family: var(--font-secondary);
  color: var(--text-primary);

  /* Borders */
  border-radius: var(--radius-control);

  /* Transitions */
  transition: all var(--transition-fast);
}

/* ============================================================================
 * VARIANTS
 * ============================================================================ */

/* Default variant */
.default {
  background: var(--surface-base);
}

/* Outlined variant */
.outlined {
  background: transparent;
  border: 1px solid var(--border-subtle);
}

/* ============================================================================
 * STATES
 * ============================================================================ */

.${camel}:focus-visible {
  outline: 2px solid var(--interactive-primary);
  outline-offset: 2px;
}
`;
}

function generateTest(name) {
  return `\
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders with children', () => {
    render(<${name}>Hello</${name}>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container, rerender } = render(
      <${name} variant="default">Content</${name}>
    );
    expect(container.firstChild).toHaveClass(expect.stringContaining('default'));

    rerender(<${name} variant="outlined">Content</${name}>);
    expect(container.firstChild).toHaveClass(expect.stringContaining('outlined'));
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${name} className="custom-class">Content</${name}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(
      <${name} data-testid="custom-${toKebabCase(name)}" aria-label="Custom">
        Content
      </${name}>
    );
    expect(screen.getByTestId('custom-${toKebabCase(name)}')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom')).toBeInTheDocument();
  });
});
`;
}

function generateStories(name) {
  return `\
import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: '${name} visual style',
    },
  },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: '${name} content',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: '${name} outlined content',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
      <${name} variant="default">Default</${name}>
      <${name} variant="outlined">Outlined</${name}>
    </div>
  ),
};
`;
}

function generateIndex(name) {
  return `\
/**
 * ${name} Component - Orion Design System.
 *
 * @example
 * \`\`\`tsx
 * import { ${name} } from '@orion-ds/react';
 *
 * <${name} variant="default">Content</${name}>
 * \`\`\`
 */
export { ${name} } from './${name}';
export type { ${name}Props, ${name}Variant } from './${name}.types';
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);

  // --- Help flag -----------------------------------------------------------
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Orion Design System - Component Scaffolding

Usage:
  node scripts/create-component.js <ComponentName>
  npm run create:component <ComponentName>

Arguments:
  ComponentName   PascalCase name (e.g. DatePicker, Accordion, Tooltip)

Options:
  --help, -h      Show this help message

Examples:
  node scripts/create-component.js Accordion
  node scripts/create-component.js DatePicker
  node scripts/create-component.js Tooltip
`);
    process.exit(0);
  }

  const name = args[0];

  // --- Validate PascalCase -------------------------------------------------
  if (!isPascalCase(name)) {
    console.error(
      `\nError: "${name}" is not valid PascalCase.\n` +
        'Component names must start with an uppercase letter and contain only\n' +
        'letters and digits (e.g. DatePicker, Accordion, Tooltip).\n'
    );
    process.exit(1);
  }

  // --- Check for existing component ----------------------------------------
  const componentDir = path.join(COMPONENTS_DIR, name);

  if (fs.existsSync(componentDir)) {
    console.error(
      `\nError: Component "${name}" already exists at:\n  ${componentDir}\n\n` +
        'To avoid accidental overwrites, please remove the directory first\n' +
        'if you want to recreate this component.\n'
    );
    process.exit(1);
  }

  // --- Create directory ----------------------------------------------------
  fs.mkdirSync(componentDir, { recursive: true });

  // --- Write files ---------------------------------------------------------
  const files = [
    { filename: `${name}.types.ts`, content: generateTypes(name) },
    { filename: `${name}.tsx`, content: generateComponent(name) },
    { filename: `${name}.module.css`, content: generateCSS(name) },
    { filename: `${name}.test.tsx`, content: generateTest(name) },
    { filename: `${name}.stories.tsx`, content: generateStories(name) },
    { filename: 'index.ts', content: generateIndex(name) },
  ];

  for (const file of files) {
    const filePath = path.join(componentDir, file.filename);
    fs.writeFileSync(filePath, file.content, 'utf-8');
  }

  // --- Print summary -------------------------------------------------------
  const kebab = toKebabCase(name);

  console.log(`
Component "${name}" created successfully!

  ${componentDir}/
    ${name}.tsx              Component implementation
    ${name}.types.ts         TypeScript type definitions
    ${name}.module.css       CSS Module (semantic tokens)
    ${name}.test.tsx         Test skeleton (Vitest)
    ${name}.stories.tsx      Storybook story
    index.ts                 Barrel exports

Next steps:

  1. Edit the types in ${name}.types.ts to define your component's API
  2. Implement the component logic in ${name}.tsx
  3. Style with semantic tokens in ${name}.module.css
  4. Add the component to the package barrel export:

     // packages/react/src/components/index.ts
     export { ${name} } from './${name}';
     export type { ${name}Props, ${name}Variant } from './${name}';

  5. Run validation:
     npm run type-check
     node scripts/validate-components.js

  6. Run tests:
     npx vitest packages/react/src/components/${name}/

  Remember:
    - All styling must use semantic tokens (var(--surface-base), etc.)
    - Never add a "brand" prop to components (brand is global)
    - Use forwardRef for all components
    - Include JSDoc with @example tags for AI discoverability
`);
}

main();
