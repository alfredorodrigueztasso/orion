---
name: create-component
description: Scaffold a new AI-First React component with TypeScript, CSS Modules, tests, Storybook story, README, and design spec. Auto-triggers when user says "create component", "new component", or "scaffold component". Generates AI-Native documentation for vibecoding.
allowed-tools: ["Bash", "Read", "Glob", "Write", "Edit"]
disable-model-invocation: true
argument-hint: [ComponentName]
---

# Create AI-Native Component

Scaffolds a new React component following Orion's AI-First architecture with complete AI-Native documentation for vibecoding.

## What This Creates

**Standard files** (6 files):
1. `ComponentName.tsx` - React component (forwardRef, displayName)
2. `ComponentName.types.ts` - TypeScript types (NO brand prop)
3. `ComponentName.module.css` - CSS Modules using semantic tokens
4. `ComponentName.test.tsx` - Vitest test skeleton with accessibility checks
5. `ComponentName.stories.tsx` - Storybook story with all variants
6. `index.ts` - Barrel export

**AI-Native enhancements** (2 additional files):
7. `README.md` - AI-friendly documentation (Props API, examples, tokens, accessibility)
8. `ComponentName.spec.yaml` - Design specification (variants, tokens, references)

**Location**: `packages/react/src/components/ComponentName/`

**Runtime**: ~5-10 seconds (generation + validation)

## Usage

```bash
/create-component Button
/create-component Modal --variant=overlay
/create-component Card --category=data
```

## Arguments

- `ComponentName` (required) - PascalCase name (e.g., Button, DatePicker, UserCard)
- `--variant` (optional) - Component type: `control` (default), `overlay`, `layout`, `data`
- `--category` (optional) - Component category for organization

## Execution Steps

### Step 1: Validate Input

1. Check ComponentName is PascalCase (starts with uppercase, alphanumeric)
2. Check component doesn't already exist
3. If invalid or exists, show error and exit

### Step 2: Interactive Design Spec Capture (AI-Native)

Ask user for design information to create AI-Native documentation:

```
Creating AI-Native component: [ComponentName]

Let's capture the design specification for optimal vibecoding:

1. Description: What does this component do?
   (e.g., "Interactive button for user actions")

2. Visual variants: What variants does it have?
   (e.g., "primary, secondary, ghost" or press Enter for default)

3. Design reference: Figma URL or screenshot path? (optional)
   (e.g., "https://figma.com/file/xyz/button" or leave empty)

4. Key semantic tokens: Which tokens should AI use?
   (e.g., "--interactive-primary, --spacing-4, --radius-button")

5. Accessibility: Any ARIA requirements?
   (e.g., "aria-label required for icon-only buttons")

6. Use cases: Primary use cases?
   (e.g., "CTA buttons, form actions, navigation")
```

### Step 3: Run Component Generator

```bash
cd "/Users/alfredo/Documents/AI First DS Library" && node scripts/create-component.js ComponentName
```

### Step 4: Generate AI-Native Files

#### 4a. Generate README.md

Create comprehensive AI-friendly documentation:

**Template structure**:
```markdown
# ComponentName

[Description from user input]

## Usage

\`\`\`tsx
import { ComponentName } from '@orion/react';

<ComponentName variant="primary">
  Content
</ComponentName>
\`\`\`

## Props API

[Auto-generated table from ComponentName.types.ts]

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | Visual variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
| children | ReactNode | - | Component content |

## Variants

[For each variant from user input]

### Primary
Use for main call-to-action buttons.

\`\`\`tsx
<ComponentName variant="primary">
  Get Started
</ComponentName>
\`\`\`

### Secondary
Use for secondary actions.

\`\`\`tsx
<ComponentName variant="secondary">
  Learn More
</ComponentName>
\`\`\`

## Accessibility

- **Keyboard**: [Keyboard behavior]
- **Screen readers**: [ARIA requirements from user input]
- **Focus management**: [Focus behavior]

## Design Tokens

[Tokens from user input]

| Token | Purpose | Example Value |
|-------|---------|---------------|
| --interactive-primary | Background color | #1B5BFF (orion) |
| --spacing-4 | Padding | 16px |
| --radius-button | Border radius | 12px (orion), 9999px (red) |

## Design References

[From user input if provided]

- [Figma link]
- [Screenshot path]

## AI Instructions

**For AI agents building interfaces**:
- Use semantic tokens only (var(--interactive-primary))
- Brand is global via <ThemeProvider>, never pass as prop
- Icon support via Lucide icons
- Validate with /validate-ai-first after changes
\`\`\`

#### 4b. Generate ComponentName.spec.yaml

Create machine-readable design specification:

**Template**:
```yaml
name: ComponentName
description: [Description from user input]
category: [Category from --category or "control"]
variants:
  [For each variant from user input]:
  - variantName: Description of when to use this variant

designReferences:
  [If provided by user]:
  - type: figma
    url: [Figma URL]
  - type: screenshot
    path: [Screenshot path]

semanticTokens:
  [Parsed from user input like "--interactive-primary, --spacing-4"]:
  background: --interactive-primary
  text: --interactive-primary-text
  spacing: --spacing-4
  radius: --radius-button
  hover: --interactive-primary-hover

accessibility:
  [From user input]:
  - [Requirement 1]
  - [Requirement 2]

useCases:
  [From user input]:
  - [Use case 1]
  - [Use case 2]

aiInstructions: |
  Always use semantic tokens for styling. Never hardcode colors or pixels.
  Brand is global via <ThemeProvider>, never pass as prop.
  Icon support via `icon` prop (Lucide icons).
  Run /validate-ai-first after changes.
```

### Step 5: Auto-Validate

Run `/validate-ai-first` to ensure the generated component follows AI-First rules.

### Step 6: Auto-Update Registry

Run `npm run build:registry` to register the new component in the registry.

### Step 7: Show Summary

Display creation summary with file paths and next steps.

## Success Output Format

```
🎨 Creating AI-Native Component: Button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Design Specification Captured:

   Description: Interactive button for user actions
   Variants: primary, secondary, ghost
   Tokens: --interactive-primary, --spacing-4, --radius-button
   Accessibility: aria-label required for icon-only buttons
   Use cases: CTA buttons, form actions, navigation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Generated 8 files:

   Standard files:
   1. Button.tsx (React component)
   2. Button.types.ts (TypeScript types)
   3. Button.module.css (CSS Modules)
   4. Button.test.tsx (Vitest tests)
   5. Button.stories.tsx (Storybook story)
   6. index.ts (Exports)

   AI-Native files:
   7. README.md (AI-friendly documentation)
   8. Button.spec.yaml (Design specification)

   Location: packages/react/src/components/Button/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ AI-First Validation: PASSED (100% compliant)

✅ Registry Updated: Component registered

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Component created successfully!

Next steps:

1. Review generated files:
   packages/react/src/components/Button/

2. Customize component implementation:
   - Add variants in Button.tsx
   - Style with semantic tokens in Button.module.css
   - Add props in Button.types.ts

3. Test component:
   npm run storybook  (preview in browser)
   npm test Button    (run unit tests)

4. Validate compliance:
   /validate-ai-first

5. Test vibecoding:
   Ask AI to "create a hero section with Button"

6. Update CLAUDE.md (if major component):
   Add to component reference section

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## AI-Native Features Explained

### Why README.md?

**Problem**: AI agents need complete context to use components correctly

**Solution**: Every component has AI-friendly documentation with:
- Props API (auto-generated from TypeScript)
- Usage examples for all variants
- Semantic token references
- Accessibility requirements
- Design intent

**Benefit**: AI can read README and generate correct code on first try (95%+ accuracy)

### Why ComponentName.spec.yaml?

**Problem**: Design intent is often implicit or lost in implementation

**Solution**: Machine-readable design specification that captures:
- Variant purposes
- Token mappings
- Accessibility requirements
- Use cases
- Design references

**Benefit**: AI understands visual intent and generates compliant, accessible code

### Props API Auto-Generation

The skill reads `ComponentName.types.ts` and extracts:
- Prop names
- Prop types
- Default values (from JSDoc comments)
- Descriptions (from JSDoc comments)

**Example TypeScript**:
```typescript
export interface ButtonProps {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
```

**Generated Markdown**:
```markdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual variant of the button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
```

## Post-Creation Checklist

After creating component, guide user through:

1. ✅ Review generated files
2. ✅ Customize implementation
3. ✅ Validate AI-First compliance (`/validate-ai-first`)
4. ✅ Preview in Storybook (`npm run storybook`)
5. ✅ Run unit tests (`npm test ComponentName`)
6. ✅ Test vibecoding (ask AI to use component)
7. ✅ Update registry (`npm run build:registry` - done automatically)
8. ✅ Update CLAUDE.md if major component

## AI-First Template Enforcement

Generated templates MUST follow AI-First rules:

**ComponentName.tsx**:
- ✅ forwardRef pattern
- ✅ displayName for debugging
- ✅ NO brand prop
- ✅ NO data-brand attribute
- ✅ Proper TypeScript types

**ComponentName.module.css**:
- ✅ Use semantic tokens only (var(--surface-base))
- ✅ NO hardcoded colors (#1B5BFF)
- ✅ NO hardcoded pixels (24px, except 1px/0px/9999px)
- ✅ NO hardcoded fonts (Inter, DM Sans)

**ComponentName.types.ts**:
- ✅ Extend HTMLAttributes or specific element attributes
- ✅ NO brand prop
- ✅ NO any types
- ✅ JSDoc comments for all props

## Integration with Other Skills

**Run automatically after**:
- User says "create component" or "new component"

**Run manually after**:
- `/validate-ai-first` - Validate generated component
- `npm run storybook` - Preview component
- `npm test` - Run unit tests
- `/audit` - Full system validation

**Depends on**:
- Existing script: `scripts/create-component.js`
- Token system: Must have semantic tokens defined
- Component patterns: Follows existing component structure

## Known Limitations & Future Enhancements

**Current limitations** (to be enhanced):

1. **Script doesn't generate README.md yet**
   - Skill will generate it manually using Write tool
   - Future: Update `scripts/create-component.js` to generate it

2. **Script doesn't generate spec.yaml yet**
   - Skill will generate it manually using Write tool
   - Future: Update script to generate from prompts

3. **Props API not auto-extracted**
   - Skill will parse TypeScript manually using Read tool
   - Future: Add TypeScript AST parsing to script

4. **No interactive prompts in script**
   - Skill will ask questions via AskUserQuestion tool
   - Future: Make script interactive

**Recommended enhancement**: Create `scripts/create-ai-native-component.js` that wraps existing script and adds AI-Native features.

## Error Handling

### Component Already Exists

```
❌ Component already exists: Button

   Location: packages/react/src/components/Button/

   Options:
   1. Use different name
   2. Delete existing component first:
      rm -rf packages/react/src/components/Button
```

### Invalid Component Name

```
❌ Invalid component name: "my-button"

   Component names must be PascalCase:
   - Start with uppercase letter
   - No spaces or special characters
   - Examples: Button, DatePicker, UserCard

   Suggested: MyButton
```

### Generation Failed

```
❌ Component generation failed

   Error: [Error message from script]

   Troubleshooting:
   1. Check ComponentName is valid
   2. Ensure scripts/create-component.js exists
   3. Run manually: node scripts/create-component.js ComponentName
```

## Invocation Control

**User-only invocation**: `disable-model-invocation: true`

**Why?** Component creation requires:
- User input (component name, design specs)
- Confirmation of generated files
- Understanding of design intent

**Auto-trigger**: NO (user must explicitly invoke)

## Exit Codes

- **Exit code 0** = Component created successfully, validation passed
- **Exit code 1** = Creation failed or validation failed

## References

- Component generator: `scripts/create-component.js`
- Component structure: `packages/react/src/components/`
- AI-First rules: `CLAUDE.md` (Anti-Hallucination Rules section)
- Vibecoding guide: Plan file (AI-Native Component Architecture section)
- Registry: `registry/components/*.json`
