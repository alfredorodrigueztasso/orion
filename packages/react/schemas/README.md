# Orion React JSON Schemas

This directory contains JSON Schema definitions for `@orion/react` components. These schemas enable AI models to generate valid component code with proper props and usage patterns.

## Purpose

1. **AI Code Generation**: LLMs can use these schemas to understand valid props, types, and usage patterns
2. **Validation**: Schemas can be used to validate generated code before rendering
3. **Documentation**: Each schema includes examples and common prompts

## Available Schemas

### Components

- `Button.schema.json` - Interactive button with variants and states
- `Card.schema.json` - Content container with header/footer support
- `Field.schema.json` - Form input with validation
- `Modal.schema.json` - Dialog overlay

### Sections

- `Hero.schema.json` - Landing page hero section
- `Features.schema.json` - Feature grid section
- `Pricing.schema.json` - Pricing table section
- `Testimonials.schema.json` - Customer testimonials
- `CTA.schema.json` - Call-to-action section
- `Footer.schema.json` - Page footer

## Schema Structure

Each schema includes:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ComponentName",
  "description": "What the component does",
  "properties": {
    "prop1": { "type": "string", "description": "..." },
    "prop2": { "type": "boolean", "default": false }
  },
  "required": [],
  "examples": [{ "description": "...", "code": "..." }],
  "aiPrompts": ["Natural language prompts that would use this component"]
}
```

## Usage with AI Models

### 1. Load Schema Index

```javascript
const schemas = require("@orion/react/schemas/index.json");
```

### 2. Reference in Prompts

```
Use the Button component from @orion/react with these valid props:
- variant: "primary" | "secondary" | "ghost" | "danger"
- size: "sm" | "md" | "lg"
- loading: boolean
- icon: ReactNode (from lucide-react)
```

### 3. Validate Generated Code

```javascript
// Use AJV or similar to validate props against schema
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(buttonSchema);
```

## AI-First Rules

All components follow these rules (enforced by validation):

1. **No data-brand props** - Brand is set globally on `<html>`
2. **No hardcoded colors** - Use CSS variables (`var(--text-primary)`)
3. **No hardcoded fonts** - Use font tokens (`var(--font-secondary)`)
4. **Use Lucide icons** - Import from `lucide-react`
5. **Include aria-labels** - Required on icon-only buttons

## Example Prompts → Code

| Prompt                   | Component                                                           |
| ------------------------ | ------------------------------------------------------------------- |
| "Create a login button"  | `<Button variant="primary">Log In</Button>`                         |
| "Make a search input"    | `<Field type="search" icon={<Search />} placeholder="Search..." />` |
| "Add a pricing section"  | `<Pricing plans={[...]} />`                                         |
| "Create a hero with CTA" | `<Hero headline="..." primaryAction={<Button>...</Button>} />`      |

## Related Files

- `/packages/react/src/components/` - Component source code
- `/packages/react/src/sections/` - Section source code
- `/scripts/validate-components.js` - AI-First validation script
