# @orion-ds/cli

> Add Orion Design System components to your project — shadcn-style

Copy individual components, sections, and templates directly into your project. You own the code and can modify it freely.

## Quick Start

### Create a New Project (Recommended)

```bash
npx @orion-ds/cli create my-app
cd my-app
npm run dev
```

### Add Components to Existing Project

```bash
npx @orion-ds/cli init
npx @orion-ds/cli add button card modal
```

## Commands

### `orion create <project-name>`

Scaffold a new React/Next.js/Vite project with Orion pre-configured.

```bash
npx @orion-ds/cli create my-app                    # React + Vite template (default)
npx @orion-ds/cli create my-app --template=nextjs-app  # Next.js 15
npx @orion-ds/cli create my-app --template=vite-app    # Lightweight Vite
```

**Options:**

| Option                   | Description                                             | Default               |
| ------------------------ | ------------------------------------------------------- | --------------------- |
| `--template=<name>`      | Project template: `react-app`, `vite-app`, `nextjs-app` | `react-app`           |
| `--package-manager=<pm>` | Force package manager: `npm`, `pnpm`, `yarn`, `bun`     | Auto-detect           |
| `--brand=<name>`         | Brand: `orion`, `red`, `deepblue`, `orange`             | `orion`               |
| `--mode=<name>`          | Mode: `display`, `product`, `app`                       | `product`             |
| `--no-install`           | Skip npm install                                        | (install by default)  |
| `--no-git`               | Skip git initialization                                 | (git init by default) |
| `--overwrite`            | Overwrite existing directory                            | (fail if exists)      |

**What you get:**

- ✅ TypeScript configured
- ✅ Vite or Next.js 15 build
- ✅ @orion-ds/react pre-installed
- ✅ Orion CSS variables (theme, brand, mode)
- ✅ ThemeProvider wrapped at root
- ✅ Testing setup (Vitest, Playwright, Jest)
- ✅ Linting & formatting (ESLint, Prettier)
- ✅ Storybook configured (react-app only)
- ✅ orion.json ready to use
- ✅ Git repo initialized
- ✅ Sample components and pages

**Templates:**

1. **`react-app`** (default) — Full-featured React + Vite
   - Testing: Vitest + Playwright
   - Documentation: Storybook
   - Best for: Production React apps

2. **`vite-app`** — Lightweight Vite + React
   - Minimal dependencies
   - Fast dev server
   - Best for: Simple projects, demos

3. **`nextjs-app`** — Next.js 15 with App Router
   - Server components
   - Built-in optimization
   - Best for: Full-stack apps, SSR

**Examples:**

```bash
# React app with red brand
npx @orion-ds/cli create my-app --brand=red

# Next.js with pnpm
npx @orion-ds/cli create my-app --template=nextjs-app --package-manager=pnpm

# Quick scaffolding without install
npx @orion-ds/cli create my-app --no-install
cd my-app && npm install
```

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

Copy components, sections, or templates from the registry into your project. Resolves dependencies automatically.

**Basic usage:**

```bash
npx @orion-ds/cli add button                    # Single component
npx @orion-ds/cli add button card modal          # Multiple components
npx @orion-ds/cli add theme-controller --yes     # Skip confirmation (auto-resolves 6 deps)
```

**Filter by type, category, or tag:**

```bash
npx @orion-ds/cli add hero --type=section        # Add a section
npx @orion-ds/cli add --category=forms --yes     # Add all form components (8 items)
npx @orion-ds/cli add --tag=marketing --yes      # Add all marketing-tagged items
```

**Preview and options:**

```bash
npx @orion-ds/cli add button --dry-run           # Preview files without writing
npx @orion-ds/cli add chart --no-install         # Copy files, skip npm install
npx @orion-ds/cli add button --overwrite         # Overwrite existing files
npx @orion-ds/cli add button --local             # Use local registry (for Orion devs)
```

**Options:**

| Option              | Description                                             | Default              |
| ------------------- | ------------------------------------------------------- | -------------------- |
| `--type=<type>`     | Filter by type: `component`, `section`, `template`      | (no filter)          |
| `--category=<name>` | Add all items in category (e.g., `forms`, `navigation`) | (no filter)          |
| `--tag=<name>`      | Add all items with tag (e.g., `marketing`, `pro`)       | (no filter)          |
| `--dry-run`         | Preview files without writing to disk                   | (disabled)           |
| `--no-install`      | Copy files but skip npm dependency install              | (install by default) |
| `--yes` / `-y`      | Skip all confirmation prompts                           | (prompt by default)  |
| `--overwrite`       | Overwrite existing files                                | (skip existing)      |
| `--local`           | Use local registry (for Orion contributors)             | (use HTTP registry)  |

**What happens:**

1. Validates component/section/template names (or filters by category/tag)
2. Checks if items are already installed (skips unless `--overwrite`)
3. Shows fuzzy suggestions if name is misspelled (e.g., "botton" → "button, banner, badge?")
4. Asks confirmation for dependencies and bulk adds (unless `--yes`)
5. Fetches component JSON from registry
6. Resolves `registryDependencies` recursively (BFS)
7. Transforms imports (hooks/contexts -> `@orion-ds/react`, cross-component -> relative)
8. Writes files to configured directory (or previews with `--dry-run`)
9. Installs npm dependencies (unless `--no-install`)

**Example outputs:**

Single component:

```
Files:
  src/components/orion/button/Button.tsx
  src/components/orion/button/Button.types.ts
  src/components/orion/button/Button.module.css
  src/components/orion/button/index.ts

Done!

Import:
  import { Button } from './components/orion/button'

Preview:
  https://orion-ds.dev/library.html#button
```

Dry-run preview:

```
DRY RUN — These files would be created:
  src/components/orion/theme-controller/ThemeController.tsx (new)
  src/components/orion/card/Card.tsx (new)
  src/components/orion/switch/Switch.tsx (new)

Run without --dry-run to install these files.
```

Category bulk add:

```
8 items will be added:
  field — Text input field
  checkbox — Checkbox control
  radio — Radio button
  select — Select dropdown
  combobox — Searchable select
  slider — Range slider
  textarea — Multi-line text input
  switch — Toggle switch

Proceed? (y/N)
```

### `orion build`

Optimize copied components for production. Analyzes CSS, tree-shakes unused tokens, minifies output, and generates bundle analysis reports.

```bash
orion build                                  # Basic build with default settings
orion build --analyze                        # Generate build analysis report (JSON)
orion build --no-tree-shake-tokens          # Keep all tokens (for debugging)
orion build --watch                          # Watch for changes and rebuild
orion build --output-dir=dist/orion          # Custom output directory
orion build --analyze --verbose              # Detailed logging + analysis
```

**What it does:**

1. **Analyzes** all `.module.css` files in your component directory
2. **Identifies** which CSS tokens are actually used
3. **Tree-shakes** unused `:root` variables (60-80% reduction)
4. **Minifies** CSS (remove comments, whitespace)
5. **Generates** optimized artifacts in `.orion-build/`

**Output artifacts:**

```
.orion-build/
├── index.css              # Optimized, minified CSS (5-15 KB)
├── variables.css          # Used tokens only (1-3 KB)
└── build-analysis.json    # (with --analyze flag)
```

**Options:**

| Option                   | Description                      | Default        |
| ------------------------ | -------------------------------- | -------------- |
| `--analyze`              | Generate JSON analysis report    | (disabled)     |
| `--no-minify`            | Skip CSS minification            | (enabled)      |
| `--no-tree-shake-tokens` | Keep all tokens                  | (enabled)      |
| `--watch`                | Watch for changes and rebuild    | (disabled)     |
| `--stats-only`           | Show stats without writing files | (disabled)     |
| `--verbose`              | Detailed logging                 | (disabled)     |
| `--output-dir=<path>`    | Output directory                 | `.orion-build` |

**Example workflow:**

```bash
# Add some components
npx @orion-ds/cli add button card modal

# Optimize for production
orion build --analyze

# Result:
# ✓ Analyzed 3 components
# ✓ Tree-shaking removed 205 unused tokens (71% reduction)
# ✓ CSS minification saved 2.1 KB
#
# 📊 Build Summary
#    Original:  28.5 KB
#    Final:     5.8 KB
#    Reduction: 77%
#
# 📁 Import in your app:
#    import './.orion-build/index.css'

# Or use analysis to optimize further
cat .orion-build/build-analysis.json
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

### `orion info <name>`

Inspect detailed information about any component, section, or template without installing it. Shows props, design tokens, dependencies, accessibility details, and examples.

**Basic usage:**

```bash
npx @orion-ds/cli info button                    # Full info for Button component
npx @orion-ds/cli info hero --type=section       # Full info for Hero section
npx @orion-ds/cli info landing --type=template   # Full info for Landing template
```

**Output modes:**

```bash
npx @orion-ds/cli info button --json             # Raw JSON output (for scripting)
npx @orion-ds/cli info button --props            # Props table only
npx @orion-ds/cli info button --examples         # Code examples only
npx @orion-ds/cli info button --local            # Use local registry
```

**Options:**

| Option          | Description                                        | Default             |
| --------------- | -------------------------------------------------- | ------------------- |
| `--json`        | Output raw JSON for scripting/piping               | (human-readable)    |
| `--props`       | Show props table only                              | (show full info)    |
| `--examples`    | Show code examples only                            | (show full info)    |
| `--type=<type>` | Filter by type: `component`, `section`, `template` | (auto-detect)       |
| `--local`       | Use local registry (for Orion developers)          | (use HTTP registry) |

**Example output:**

```
Button
────────────────────────────────────────────────────
Type:         component
Category:     actions
Mode-aware:   yes

Description:
  Primary interactive element for triggering actions

Import:
  import { Button } from '@orion-ds/react'

Props (5):
  variant            ButtonVariant  "primary"  primary | secondary | ghost | danger
  size               ButtonSize     "md"       sm | md | lg
  disabled           boolean        false
  loading            boolean        false
  icon               ReactNode      —

Design Tokens (6):
  --interactive-primary
  --interactive-primary-hover
  --radius-control

Dependencies:
  npm:    lucide-react

Accessibility:
  Role:    button
  ARIA:    aria-label, aria-pressed
  Keys:
    Enter → Activate button

Related:
  components:  Field, Modal, Card
  tags:        action, interaction, cta

Preview:
  https://orion-ds.dev/library.html#button

────────────────────────────────────────────────────
Install: orion add button
```

**Fuzzy matching:**

If you misspell a name, the CLI suggests alternatives:

```bash
$ npx @orion-ds/cli info buton
error: Component not found: buton

Did you mean:
  orion info button
  orion info banner
  orion info badge
```

### `orion doctor`

Check your project health and diagnose common issues. Validates configuration, dependencies, CSS imports, and registry connectivity.

**Basic usage:**

```bash
npx @orion-ds/cli doctor          # Run all checks
npx @orion-ds/cli doctor --json   # Output JSON for CI/CD
npx @orion-ds/cli doctor --verbose # Show detailed info per check
```

**What it checks (6 health checks):**

| Check                | Validates                             | Fix                                       |
| -------------------- | ------------------------------------- | ----------------------------------------- |
| `orion.json`         | Project is initialized                | `orion init`                              |
| `Config fields`      | Required fields and valid values      | Edit `orion.json`                         |
| `@orion-ds/react`    | Package installed and correct version | `npm install @orion-ds/react`             |
| `CSS import`         | Styles loaded in entry file           | Add `import '@orion-ds/react/styles.css'` |
| `Output directories` | Component/section/template dirs exist | `orion add button`                        |
| `Registry`           | HTTP API is reachable                 | Check network / change `registryUrl`      |

**Example output:**

```
Orion Doctor — Project Health Check
──────────────────────────────────────────────────────

  ✓  orion.json         Found at ./orion.json
  ✓  Config fields      All required fields present
  ✓  @orion-ds/react    v4.8.0 installed
  ✗  CSS import         Not found in entry files
  ⚠  Output dirs        componentDir not created yet
  ✓  Registry           https://orion-ds.dev/r (145ms)

──────────────────────────────────────────────────────
1 error, 1 warning

Issues:
  ✗  CSS import — Add to your entry file:
       import '@orion-ds/react/styles.css'

  ⚠  Output dirs — Run orion add to create directories:
       orion add button
```

**Options:**

| Option      | Description                            | Default           |
| ----------- | -------------------------------------- | ----------------- |
| `--json`    | Output JSON for scripting/CI pipelines | (human-readable)  |
| `--verbose` | Show detailed check information        | (standard output) |

**Exit codes** (useful for CI/CD):

- `0` — All checks passed
- `1` — One or more errors detected (you should fix these)

**CI/CD example:**

```bash
# Validate project before building
orion doctor && npm run build

# Or check only, don't fail:
orion doctor --json | jq '.summary'
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
