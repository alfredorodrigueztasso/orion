# @orion-ds/create

Scaffold a new Orion Design System project with zero configuration. Generates a fully working Vite + React + TypeScript app pre-configured with Orion components, tokens, and ThemeProvider.

## Quick Start

```bash
npx @orion-ds/create my-app
cd my-app
npm run dev
```

## Usage

```bash
npx @orion-ds/create <project-name> [options]
```

### Options

| Flag      | Values                               | Default   | Description                                  |
| --------- | ------------------------------------ | --------- | -------------------------------------------- |
| `--brand` | `orion`, `unitec`, `laureate`, `uvm` | `orion`   | Brand preset to configure                    |
| `--mode`  | `display`, `product`, `app`          | `product` | UI mode that determines the starter template |
| `--theme` | `light`, `dark`                      | `light`   | Default theme                                |
| `--help`  |                                      |           | Show help message                            |

### Examples

```bash
# Default: Product mode, Orion brand, light theme
npx @orion-ds/create my-app

# SaaS dashboard with dark theme
npx @orion-ds/create dashboard --brand=orion --mode=product --theme=dark

# Marketing landing page
npx @orion-ds/create landing-page --mode=display

# Mobile-first app
npx @orion-ds/create mobile-app --mode=app
```

## What Gets Generated

The scaffolder creates a complete Vite + React + TypeScript project:

```
my-app/
  package.json          # Dependencies pre-configured
  vite.config.ts        # Vite with React plugin
  tsconfig.json         # Strict TypeScript config
  index.html            # HTML entry point
  public/               # Static assets directory
  src/
    main.tsx            # Entry with ThemeProvider setup
    App.tsx             # Starter app (varies by mode)
    vite-env.d.ts       # Vite type declarations
```

### Mode-Specific Starter Apps

The `--mode` flag determines which starter template is generated:

**Product mode** (default) -- A dashboard layout with:

- Stat cards using Card, Badge, and Lucide icons
- Theme toggle button
- Quick action buttons demonstrating variant usage

**Display mode** -- A marketing hero layout with:

- Large headline and description
- CTA buttons with icon support
- Theme toggle

**App mode** -- A mobile-first layout with:

- Search input field
- Welcome card
- Bottom navigation bar with icon-only buttons
- Touch-friendly sizing

### Pre-Installed Dependencies

The generated project includes:

| Package                | Purpose                         |
| ---------------------- | ------------------------------- |
| `@orion-ds/core`       | Design tokens and CSS variables |
| `@orion-ds/react`      | React component library         |
| `lucide-react`         | Icon library (5000+ icons)      |
| `react` / `react-dom`  | React 19                        |
| `vite`                 | Build tool                      |
| `typescript`           | Type checking                   |
| `@vitejs/plugin-react` | Vite React support              |

### Generated Configuration

**ThemeProvider** is set up in `main.tsx` with your chosen brand and theme:

```tsx
<ThemeProvider defaultTheme="light" defaultBrand="orion">
  <App />
</ThemeProvider>
```

**CSS import** is included automatically:

```tsx
import "@orion-ds/react/styles.css";
```

**Fonts load automatically** via ThemeProvider. No manual Google Fonts setup required.

## After Scaffolding

```bash
cd my-app
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## How It Works

The scaffolder is a zero-dependency Node.js script. It:

1. Parses CLI arguments (no external arg parser needed)
2. Creates the project directory and `src/` and `public/` subdirectories
3. Generates all files from inline templates (no external template files required)
4. Runs `npm install` automatically
5. Prints next steps

If `npm install` fails (e.g., no network), the project is still fully created and you can install manually.

## Development

```bash
# Build the CLI
cd packages/create
npm run build

# Watch mode
npm run dev

# Type check
npm run type-check
```

## License

MIT
