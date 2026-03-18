# @orion-ds/mcp

Model Context Protocol (MCP) server for the Orion Design System. Exposes the full component registry, token system, and code validation as tools that any MCP-compatible AI assistant can use.

## What It Does

This server gives AI assistants direct access to Orion's component library and design tokens. Instead of relying on training data (which can hallucinate), the assistant queries live registry data to generate correct, token-compliant code.

## Available Tools

The server exposes **9 tools**:

| Tool                | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `list-components`   | List all components, sections, and templates. Filter by `category` or `type`.             |
| `get-component`     | Get full details for a component: props, examples, tokens, accessibility, sub-components. |
| `search-components` | Semantic search across the registry (e.g., "form input" finds Field, Select, Checkbox).   |
| `list-tokens`       | List design tokens by category (surface, text, interactive, spacing, etc.).               |
| `get-token`         | Get a specific token's values per theme and brand.                                        |
| `validate-code`     | Validate a code snippet against Orion's anti-hallucination rules.                         |
| `get-setup-guide`   | Get a framework-specific setup guide (Vite, Next.js, React).                              |
| `list-sections`     | List pre-built sections and page templates.                                               |
| `get-section`       | Get details and code for a section or template.                                           |

## Installation

```bash
npm install @orion-ds/mcp
```

Or run directly with npx:

```bash
npx @orion-ds/mcp
```

## Setup

### Claude Desktop

Add to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

### Claude Code

Add to your project's `.claude.json` or `~/.claude.json`:

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

### Cline (VS Code)

In your Cline MCP settings:

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

### Cursor

In `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "orion": {
      "command": "npx",
      "args": ["@orion-ds/mcp"]
    }
  }
}
```

## Configuration

The server locates registry and token data automatically. Override with environment variables if needed:

| Variable              | Default       | Description                    |
| --------------------- | ------------- | ------------------------------ |
| `ORION_REGISTRY_PATH` | `./registry/` | Path to the registry directory |
| `ORION_TOKENS_PATH`   | `./tokens/`   | Path to the token JSON files   |

The server searches in this order:

1. The environment variable path
2. `./registry/` relative to the current working directory
3. `../../registry/` relative to the package location (monorepo layout)

## Transport

The server uses **stdio transport**, which is the standard for local MCP servers. It communicates over stdin/stdout and works with all MCP-compatible clients.

## Tool Details

### list-components

```
Parameters:
  category? — Filter by category (actions, forms, layout, feedback, navigation, overlays, etc.)
  type?     — Filter by type: registry:component, registry:section, registry:template
```

Returns a grouped listing with counts (e.g., "39 components | 41 sections | 10 templates").

### get-component

```
Parameters:
  name — Component name in kebab-case (e.g., "button", "data-table", "landing-page-template")
```

Returns complete component details including:

- Props table with types, defaults, and descriptions
- Sub-components and their props
- Code examples
- CSS tokens used
- Accessibility info (ARIA roles, keyboard navigation)
- File paths

### search-components

```
Parameters:
  query — Keyword or use case (e.g., "form input", "navigation menu", "dialog popup")
```

Uses keyword matching plus a semantic synonym map. For example, "dialog" matches Modal, Drawer, and Popover. "dashboard" matches DataTable, MetricCards, Sidebar, PageHeader, and FilterBar.

### validate-code

```
Parameters:
  code — TSX or CSS code string to validate
```

Checks for:

- Hardcoded colors (hex, rgb, hsl)
- Hardcoded pixel values
- Hardcoded font families
- `brand` prop on components (must be global)
- `data-brand` on non-html elements
- Wrong prop names (common AI hallucinations like `leftIcon` instead of `icon`)
- Non-existent CSS variables (e.g., `--font-sans` instead of `--font-secondary`)
- Missing CSS imports

Returns a pass/fail result with a score out of 100, errors with line numbers, and fix suggestions.

### get-setup-guide

```
Parameters:
  framework — "vite", "nextjs", or "react"
  brand?    — Brand to configure (default: "orion")
  theme?    — Default theme: "light" or "dark" (default: "light")
```

Returns a step-by-step setup guide with install commands, CSS imports, ThemeProvider setup, and a working example component.

## Development

```bash
# Build
cd packages/mcp
npm run build

# Watch mode
npm run dev

# Type check
npm run type-check
```

## Dependencies

- `@modelcontextprotocol/sdk` -- MCP SDK for server implementation
- `zod` -- Schema validation for tool parameters (bundled with MCP SDK)

## License

MIT
