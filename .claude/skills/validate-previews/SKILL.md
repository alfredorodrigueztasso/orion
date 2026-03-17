---
name: validate-previews
description: Valida que Storybook stories y docs-site usen componentes Orion (sin duplicados, sin estilos hardcoded, imports correctos). Scope: archivos .stories.tsx y docs-site únicamente — NO valida tokens ni TypeScript. Para eso usar /audit. Auto-triggers cuando user menciona "validate previews", "check Storybook", "docs-site validation".
allowed-tools: ["Bash", "Read", "Grep", "Glob"]
---

# Validate Previews (Storybook & Docs)

Validates that Storybook stories and docs-site previews use Orion components correctly, preventing duplication and style inconsistencies.

## Scope: Preview Files Only

Validates `.stories.tsx` and docs-site example files **ONLY**.

Does NOT validate:
- Token compliance (use `/audit` for that)
- TypeScript types (use `/audit` for that)
- Component source code (use `/validate-ai-first` for that)

This skill is specific to **how components are used in previews**, not the components themselves.

## What This Checks

1. **No duplicate components** - Previews must use `@orion-ds/react` components, not copies
2. **No hardcoded styles** - Previews must use semantic tokens, not inline styles
3. **No similar components** - Don't recreate components that already exist
4. **Proper imports** - Components imported from `@orion-ds/react`, not local copies
5. **Composition protocol** - If extending components, follow composition rules

**Why this matters**: Prevents UI drift between library and documentation/examples.

## Usage

```bash
/validate-previews
/validate-previews --storybook-only  # Only validate Storybook
/validate-previews --docs-only       # Only validate docs-site
```

## Execution Steps

1. Navigate to Orion root directory
2. **Step 1**: Find all preview files (stories, docs examples)
3. **Step 2**: Check imports - must import from `@orion-ds/react`
4. **Step 3**: Detect duplicate components (similar names/structure)
5. **Step 4**: Check for hardcoded styles (inline styles, style tags)
6. **Step 5**: Validate composition patterns
7. **Step 6**: Report violations with fix suggestions

## Commands

```bash
# Find all Storybook story files
cd "/Users/alfredo/Documents/AI First DS Library" && find packages/react/src -name "*.stories.tsx"

# Find all docs-site example files
cd "/Users/alfredo/Documents/AI First DS Library" && find docs-site -name "*.tsx" -o -name "*.jsx"

# Search for duplicate component patterns
cd "/Users/alfredo/Documents/AI First DS Library" && grep -r "function.*Button\|const.*Button.*=" packages/react/src --include="*.stories.tsx"

# Search for hardcoded styles
cd "/Users/alfredo/Documents/AI First DS Library" && grep -r "style={{" packages/react/src --include="*.stories.tsx"
```

## Auto-Trigger Patterns

This skill auto-triggers when:
- User says "validate previews" or "check Storybook"
- User says "docs-site validation"
- After modifying `.stories.tsx` files
- After modifying docs-site example files
- Before running `/pr-ready` (part of validation workflow)

## Success Output Format

```
🔍 Preview Validation (Storybook & Docs)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Import Validation
   All components imported from @orion-ds/react ✓

   Files checked: 52 story files, 18 docs examples

✅ No Duplicate Components
   No duplicate/similar components detected ✓

✅ No Hardcoded Styles
   All previews use semantic tokens ✓

✅ Composition Protocol
   Components follow composition rules ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 ALL PREVIEWS VALID!

   Storybook: 52 stories validated
   Docs-site: 18 examples validated

   No duplicate components
   No style violations
   Proper Orion component usage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🔍 Preview Validation (Storybook & Docs)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Import Validation FAILED

   3 files import duplicate components:

   1. Hero.stories.tsx:5
      import { CustomButton } from './CustomButton';

      ❌ Don't create CustomButton - use Orion Button

      Fix:
      import { Button } from '@orion-ds/react';

   2. Pricing.stories.tsx:12
      const PriceCard = ({ children }) => (
        <div className="card">...</div>
      );

      ❌ Don't recreate Card - use Orion Card

      Fix:
      import { Card } from '@orion-ds/react';

   3. FAQ.stories.tsx:8
      import { Accordion } from '../Accordion';

      ❌ Don't import from local path - use package

      Fix:
      import { Accordion } from '@orion-ds/react';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Hardcoded Styles FAILED

   2 files with hardcoded styles:

   1. Dashboard.stories.tsx:45
      <div style={{ padding: '24px', background: '#f5f5f5' }}>

      ❌ Don't hardcode styles

      Fix:
      <div style={{
        padding: 'var(--spacing-6)',
        background: 'var(--surface-subtle)'
      }}>

   2. Chart.stories.tsx:67
      <style>{`
        .custom-chart { color: #1B5BFF; }
      `}</style>

      ❌ Don't use style tags

      Fix: Use CSS Modules with semantic tokens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  PREVIEWS INVALID

   5 violations found
   Fix issues above before merging

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Validation Rules

### Rule 1: Use Orion Components (No Duplicates)

**❌ Wrong - Creating duplicate component**:
```tsx
// Hero.stories.tsx
const CustomButton = ({ children }) => (
  <button className="custom-btn">{children}</button>
);

export const HeroExample = () => (
  <div>
    <h1>Welcome</h1>
    <CustomButton>Get Started</CustomButton>
  </div>
);
```

**✅ Correct - Using Orion component**:
```tsx
// Hero.stories.tsx
import { Button } from '@orion-ds/react';

export const HeroExample = () => (
  <div>
    <h1>Welcome</h1>
    <Button variant="primary">Get Started</Button>
  </div>
);
```

### Rule 2: No Hardcoded Styles

**❌ Wrong - Hardcoded inline styles**:
```tsx
<div style={{
  padding: '24px',
  background: '#f5f5f5',
  borderRadius: '12px'
}}>
  Content
</div>
```

**✅ Correct - Using semantic tokens**:
```tsx
<div style={{
  padding: 'var(--spacing-6)',
  background: 'var(--surface-subtle)',
  borderRadius: 'var(--radius-container)'
}}>
  Content
</div>
```

### Rule 3: Import from Package (Not Local Paths)

**❌ Wrong - Local import**:
```tsx
import { Button } from '../Button';
import { Card } from '../../components/Card';
```

**✅ Correct - Package import**:
```tsx
import { Button, Card } from '@orion-ds/react';
```

### Rule 4: Composition Over Duplication

**❌ Wrong - Recreating similar component**:
```tsx
const PricingCard = ({ title, price, features }) => (
  <div className="pricing-card">
    <h3>{title}</h3>
    <div className="price">{price}</div>
    <ul>
      {features.map(f => <li>{f}</li>)}
    </ul>
  </div>
);
```

**✅ Correct - Composing Orion components**:
```tsx
import { Card } from '@orion-ds/react';

const PricingCard = ({ title, price, features }) => (
  <Card>
    <Card.Header>
      <h3>{title}</h3>
    </Card.Header>
    <Card.Body>
      <div className="price">{price}</div>
      <ul>
        {features.map(f => <li>{f}</li>)}
      </ul>
    </Card.Body>
  </Card>
);
```

### Rule 5: No Style Tags in Stories

**❌ Wrong - Style tags in story**:
```tsx
export const Example = () => (
  <>
    <style>{`
      .custom-button { background: #1B5BFF; }
    `}</style>
    <button className="custom-button">Click</button>
  </>
);
```

**✅ Correct - Use Orion components or CSS Modules**:
```tsx
import { Button } from '@orion-ds/react';

export const Example = () => (
  <Button variant="primary">Click</Button>
);
```

## Component Composition Protocol

When you need custom behavior, **compose** Orion components instead of duplicating:

### Pattern 1: Wrapper Components

```tsx
import { Button } from '@orion-ds/react';

// ✅ Wrap Orion component for specific use case
export const SubmitButton = ({ loading, ...props }) => (
  <Button
    variant="primary"
    disabled={loading}
    icon={loading ? <Spinner /> : undefined}
    {...props}
  />
);
```

### Pattern 2: Layout Compositions

```tsx
import { Card, Button } from '@orion-ds/react';

// ✅ Compose multiple Orion components
export const ProductCard = ({ product }) => (
  <Card>
    <Card.Header>
      <img src={product.image} alt={product.name} />
    </Card.Header>
    <Card.Body>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </Card.Body>
    <Card.Footer>
      <Button variant="primary">Buy Now</Button>
    </Card.Footer>
  </Card>
);
```

### Pattern 3: Extending with Slots

```tsx
import { Modal } from '@orion-ds/react';

// ✅ Extend Orion component with custom content
export const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
  <Modal open={true}>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm}>Confirm</Button>
    </Modal.Footer>
  </Modal>
);
```

## Detection Patterns

The skill searches for these anti-patterns:

### Pattern 1: Duplicate Component Names
```bash
# Search for component definitions with Orion names
grep -r "function.*Button\|const.*Button.*=" --include="*.stories.tsx"
grep -r "function.*Card\|const.*Card.*=" --include="*.stories.tsx"
```

### Pattern 2: Hardcoded Colors
```bash
# Search for hex colors in stories
grep -r "#[0-9A-Fa-f]{6}\|#[0-9A-Fa-f]{3}" --include="*.stories.tsx"
```

### Pattern 3: Hardcoded Pixels
```bash
# Search for hardcoded pixels (except 0px, 1px, 9999px)
grep -r "[2-9][0-9]*px\|[0-9]{3,}px" --include="*.stories.tsx"
```

### Pattern 4: Style Tags
```bash
# Search for style tags
grep -r "<style>" --include="*.stories.tsx"
```

### Pattern 5: Local Imports
```bash
# Search for relative imports of components
grep -r "import.*from ['\"]\.\./" --include="*.stories.tsx"
```

## Integration with Other Skills

**Runs as part of**:
- `/pr-ready` - Validates previews before PR
- `/audit` - Could be added to full system audit

**Run manually**:
- After creating new stories
- After modifying docs examples
- Before releasing

**Complements**:
- `/validate-ai-first` - Validates library components
- `/validate-previews` - Validates preview/example usage

## Allowed Exceptions

Some inline styles are acceptable:

### Exception 1: Dynamic Values
```tsx
// ✅ OK - Dynamic value
<div style={{ width: `${progress}%` }} />
```

### Exception 2: Position/Transform
```tsx
// ✅ OK - Relative positioning
<div style={{ position: 'relative', top: 0, left: 0 }} />
```

### Exception 3: Demo/Visualization
```tsx
// ✅ OK - Data visualization in chart stories
<div style={{ height: `${dataValue}px` }} />
```

**When exceptions are needed**, add comment explaining why:
```tsx
// Demo visualization - dynamic height based on data
<div style={{ height: `${value}px` }} />
```

## Creating New Composite Components

If you genuinely need a new component not in Orion:

### Step 1: Check if it exists
```bash
# Search Orion components
ls packages/react/src/components/
```

### Step 2: Check if you can compose
Can you build it from existing components?
- Hero = Card + Button + Typography
- Pricing = Card + Badge + Button
- FAQ = Accordion + Card

### Step 3: If truly new, follow protocol

**Create in sections** (not main components):
```
packages/react/src/sections/MyNewSection/
├── MyNewSection.tsx
├── MyNewSection.types.ts
├── MyNewSection.module.css  # Use semantic tokens
└── index.ts
```

**Import Orion components**:
```tsx
import { Card, Button, Badge } from '@orion-ds/react';
```

**Use semantic tokens**:
```css
.myNewSection {
  padding: var(--spacing-8);
  background: var(--surface-base);
  border-radius: var(--radius-container);
}
```

### Step 4: Run validation
```bash
/validate-previews
/validate-ai-first
```

## Common Mistakes & Fixes

### Mistake 1: "It's just a small example"

**Problem**: Creating simple component copy for examples

**Why wrong**: Creates drift, others copy the pattern

**Fix**: Always use Orion components, even in small examples

### Mistake 2: "Orion component doesn't have this variant"

**Problem**: Creating new component instead of proposing variant

**Fix**:
1. Compose existing components
2. Or propose new variant via `/create-component`

### Mistake 3: "I need custom styling"

**Problem**: Adding inline styles or style tags

**Fix**:
1. Use CSS Modules with semantic tokens
2. Or use Orion component props (variant, size, etc.)

### Mistake 4: "Import path is too long"

**Problem**: Using local imports for convenience

**Fix**: Always import from `@orion-ds/react`, even if verbose

## Exit Codes

- **Exit code 0** = All previews valid
- **Exit code 1** = Violations found (duplicates, hardcoded styles, bad imports)

## References

- Component composition: `COMPONENT_COMPOSITION.md` (to be created)
- AI-First rules: `CLAUDE.md` (Anti-Hallucination Rules section)
- Orion components: `packages/react/src/components/index.ts`
- Sections: `packages/react/src/sections/`
