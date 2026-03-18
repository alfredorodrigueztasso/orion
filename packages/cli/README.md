# @orion-ds/cli

> Add Orion Design System components to your project — shadcn-style

Copy individual components, sections, and templates directly into your project. You own the code and can modify it freely.

## Quick Start

```bash
npx @orion-ds/cli init
npx @orion-ds/cli add button card modal
```

## Commands

### `orion init`

Configure your project. Creates `orion.json` and installs dependencies if missing.

```bash
npx @orion-ds/cli init          # Interactive setup
npx @orion-ds/cli init --yes    # Use defaults
```

After init, add this to your entry file:

```tsx
import "@orion-ds/react/styles.css";
```

### `orion add <name...>`

Copy components from the registry into your project. Resolves dependencies automatically.

```bash
npx @orion-ds/cli add button                    # Single component
npx @orion-ds/cli add button card modal          # Multiple components
npx @orion-ds/cli add theme-controller --yes     # Skip confirmation (auto-resolves 6 deps)
npx @orion-ds/cli add hero --type=section        # Add a section
npx @orion-ds/cli add button --overwrite         # Overwrite existing files
npx @orion-ds/cli add button --local             # Use local registry (for Orion devs)
```

**What happens:**

1. Fetches component JSON from the registry
2. Resolves `registryDependencies` recursively (BFS)
3. Asks confirmation if extra dependencies are needed
4. Transforms imports (hooks/contexts -> `@orion-ds/react`, cross-component -> relative)
5. Writes files to your configured directory
6. Installs npm dependencies (e.g., `lucide-react`)

**Output example:**

```
+ button
+ card

Files:
  src/components/orion/button/Button.tsx
  src/components/orion/button/Button.types.ts
  src/components/orion/button/Button.module.css
  src/components/orion/button/index.ts
  src/components/orion/card/Card.tsx
  src/components/orion/card/Card.types.ts
  src/components/orion/card/Card.module.css
  src/components/orion/card/index.ts

Dependencies installed: lucide-react

Done!

Import:
  import { Button } from './components/orion/button'
  import { Card } from './components/orion/card'
```

### `orion list`

Show all 90+ available items, grouped by type and category. Marks installed components.

```bash
npx @orion-ds/cli list                       # All items
npx @orion-ds/cli list --type=component      # Components only (39)
npx @orion-ds/cli list --type=section        # Sections only (41)
npx @orion-ds/cli list --type=template       # Templates only (10)
npx @orion-ds/cli list --local               # Use local registry
```

## Configuration: `orion.json`

Created by `orion init` in your project root:

```json
{
  "$schema": "https://orion-ds.dev/schema/cli-config.json",
  "registryUrl": "https://orion-ds.dev/r",
  "componentDir": "src/components/orion",
  "sectionDir": "src/sections/orion",
  "templateDir": "src/templates/orion",
  "typescript": true,
  "brand": "orion",
  "mode": "product"
}
```

| Field          | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `registryUrl`  | Base URL for the HTTP API (configurable for local dev)          |
| `componentDir` | Where components are copied (kebab-case dirs, PascalCase files) |
| `sectionDir`   | Where sections are copied                                       |
| `templateDir`  | Where templates are copied                                      |
| `typescript`   | Generate TypeScript files                                       |
| `brand`        | Default brand (orion, red, deepblue, orange)                    |
| `mode`         | Default mode (display, product, app)                            |

## How It Works

### CSS Strategy

Components use **CSS Modules** referencing **CSS variables** from `@orion-ds/react`:

```css
/* Button.module.css — works automatically */
.button {
  background: var(--interactive-primary);
}
```

- `@orion-ds/react` installed via `orion init`
- You import `@orion-ds/react/styles.css` once
- Copied `.module.css` files work out of the box

### Import Transforms

When components are copied, imports are rewritten:

| Source import                        | Transformed to           | Reason                         |
| ------------------------------------ | ------------------------ | ------------------------------ |
| `from './Button.types'`              | Unchanged                | Internal file                  |
| `from './Button.module.css'`         | Unchanged                | CSS Module                     |
| `from '../Button'`                   | `from '../button'`       | Cross-component (if installed) |
| `from '../../hooks'`                 | `from '@orion-ds/react'` | Shared hooks                   |
| `from '../../contexts/ThemeContext'` | `from '@orion-ds/react'` | Shared contexts                |
| `from 'react'`                       | Unchanged                | npm package                    |
| `from 'lucide-react'`                | Unchanged                | npm package                    |

### Dependency Resolution

Some components depend on others:

| Component          | Registry Dependencies                     |
| ------------------ | ----------------------------------------- |
| `chat`             | button                                    |
| `theme-controller` | card, switch, radio, button, badge, alert |

When you `orion add theme-controller`, the CLI resolves all 6 dependencies and copies them too.

## npm vs CLI: When to Use Each

| Approach                      | Use when                                              |
| ----------------------------- | ----------------------------------------------------- |
| `npm install @orion-ds/react` | You want stable, versioned components as a dependency |
| `npx @orion-ds/cli add`       | You want to own and customize the source code         |

Both approaches use `@orion-ds/core` for design tokens. You can mix them — use npm for most components and copy specific ones you need to customize.

## Zero Dependencies

The CLI uses only Node.js built-ins (`node:fs`, `node:path`, `node:https`, `node:readline`, `node:child_process`). No third-party dependencies.

## License

MIT
