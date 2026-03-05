#!/usr/bin/env node
/**
 * Orion Design System MCP Server
 *
 * Exposes the Orion component registry, token system, and validation
 * as MCP tools that any AI assistant can use.
 *
 * Usage:
 *   npx @orion-ds/mcp              # stdio transport (for Claude Code, Cursor)
 *   ORION_REGISTRY_PATH=./registry  # Override registry location
 *
 * Claude Code config (~/.claude.json):
 *   {
 *     "mcpServers": {
 *       "orion": {
 *         "command": "npx",
 *         "args": ["@orion-ds/mcp"]
 *       }
 *     }
 *   }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  getRegistryIndex,
  getComponent,
  listComponents,
  searchComponents,
  listTokens,
  getToken,
  getTokenCategories,
} from "./registry-data.js";
import { validateCode } from "./tools/validate.js";

const server = new McpServer({
  name: "orion-design-system",
  version: "1.0.0",
});

// ============================================================================
// Tool: list-components
// ============================================================================
server.tool(
  "list-components",
  "List all available Orion components, sections, and templates. Optionally filter by category or type.",
  {
    category: z
      .string()
      .optional()
      .describe(
        "Filter by category: interactive, forms, layout, feedback, data-display, navigation, overlays, internal, documentation, marketing, app",
      ),
    type: z
      .enum(["registry:component", "registry:section", "registry:template"])
      .optional()
      .describe(
        "Filter by type: component (UI primitives), section (composed blocks), template (full pages)",
      ),
  },
  async ({ category, type }) => {
    const items = listComponents({ category, type });
    const index = getRegistryIndex();

    const grouped: Record<string, typeof items> = {};
    for (const item of items) {
      const cat = item.category || "other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat]!.push(item);
    }

    let text = `# Orion Design System Registry\n\n`;
    text += `**${index.totalComponents} components** | **${index.totalSections} sections** | **${index.totalTemplates} templates**\n\n`;

    for (const [cat, catItems] of Object.entries(grouped)) {
      text += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
      for (const item of catItems) {
        text += `- **${item.title}** (\`${item.name}\`) — ${item.description}\n`;
      }
      text += "\n";
    }

    text += `\n_Use \`get-component\` with a component name for full details (props, examples, tokens)._`;

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: get-component
// ============================================================================
server.tool(
  "get-component",
  "Get complete details of an Orion component: props with types/defaults, code examples, tokens used, accessibility info, and sub-components.",
  {
    name: z
      .string()
      .describe(
        'Component name in kebab-case (e.g., "button", "data-table", "landing-page-template")',
      ),
  },
  async ({ name }) => {
    const component = getComponent(name);

    if (!component) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${name}" not found. Use \`list-components\` to see all available components.`,
          },
        ],
      };
    }

    let text = `# ${component.title}\n\n`;
    text += `**${component.description}**\n\n`;
    text += `- **Type:** ${component.type.replace("registry:", "")}\n`;
    text += `- **Category:** ${component.category}\n`;
    text += `- **Mode-aware:** ${component.modeAware ? "Yes (adapts to display/product/app modes)" : "No"}\n\n`;

    // Import
    text += `## Import\n\n\`\`\`tsx\n${component.cssImport};\n${component.import};\n\`\`\`\n\n`;

    // Props
    if (component.props && component.props.length > 0) {
      text += `## Props\n\n`;
      text += `| Prop | Type | Default | Description |\n`;
      text += `|------|------|---------|-------------|\n`;
      for (const prop of component.props) {
        const typeStr = prop.values
          ? prop.values.map((v) => `'${v}'`).join(" \\| ")
          : prop.type;
        const defStr =
          prop.default !== undefined
            ? `\`${prop.default}\``
            : prop.required
              ? "**required**"
              : "—";
        text += `| \`${prop.name}\` | \`${typeStr}\` | ${defStr} | ${prop.description} |\n`;
      }
      text += "\n";
    }

    // Sub-components
    if (component.subComponents && component.subComponents.length > 0) {
      text += `## Sub-Components\n\n`;
      for (const sub of component.subComponents) {
        text += `### ${sub.name}\n\n${sub.description}\n\n`;
        if (sub.props && sub.props.length > 0) {
          text += `| Prop | Type | Description |\n`;
          text += `|------|------|-------------|\n`;
          for (const p of sub.props) {
            text += `| \`${p.name}\` | \`${p.type}\` | ${p.description} |\n`;
          }
          text += "\n";
        }
      }
    }

    // Examples
    if (component.examples && component.examples.length > 0) {
      text += `## Examples\n\n`;
      for (const ex of component.examples) {
        text += `### ${ex.title}\n\n`;
        if (ex.description) text += `${ex.description}\n\n`;
        text += `\`\`\`tsx\n${ex.code}\n\`\`\`\n\n`;
      }
    }

    // Tokens
    if (component.tokens && component.tokens.length > 0) {
      text += `## CSS Tokens Used\n\n`;
      text +=
        component.tokens.map((t) => `- \`var(${t})\``).join("\n") + "\n\n";
    }

    // Accessibility
    if (component.accessibility) {
      text += `## Accessibility\n\n`;
      const a11y = component.accessibility;
      if (a11y.role) text += `- **Role:** \`${a11y.role}\`\n`;
      if (a11y.ariaAttributes)
        text += `- **ARIA:** ${a11y.ariaAttributes.map((a) => `\`${a}\``).join(", ")}\n`;
      if (a11y.keyboardNav) {
        text += `- **Keyboard:**\n`;
        for (const kn of a11y.keyboardNav) {
          text += `  - \`${kn.key}\` — ${kn.action}\n`;
        }
      }
      if (a11y.notes) {
        text += `- **Notes:**\n`;
        for (const note of a11y.notes) {
          text += `  - ${note}\n`;
        }
      }
      text += "\n";
    }

    // Dependencies
    if (component.dependencies && component.dependencies.length > 0) {
      text += `## Dependencies\n\n`;
      text +=
        component.dependencies.map((d) => `- \`${d}\``).join("\n") + "\n\n";
    }

    // Files
    text += `## Source Files\n\n`;
    text +=
      component.files
        .map((f) => `- \`${f.path}\` (${f.type.replace("registry:", "")})`)
        .join("\n") + "\n";

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: search-components
// ============================================================================
server.tool(
  "search-components",
  'Search Orion components by keyword or use case. Supports semantic matching (e.g., "form input" finds Field, Select, Checkbox).',
  {
    query: z
      .string()
      .describe(
        'Search query: keyword, use case, or description (e.g., "form input", "navigation menu", "data table", "dialog popup")',
      ),
  },
  async ({ query }) => {
    const results = searchComponents(query);

    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No components found for "${query}". Try broader terms or use \`list-components\` to see all available items.`,
          },
        ],
      };
    }

    let text = `# Search results for "${query}"\n\n`;
    text += `Found **${results.length}** items:\n\n`;
    for (const r of results.slice(0, 15)) {
      text += `- **${r.title}** (\`${r.name}\`, ${r.type.replace("registry:", "")}) — ${r.description}\n`;
    }
    if (results.length > 15) {
      text += `\n_...and ${results.length - 15} more. Refine your query for more specific results._\n`;
    }
    text += `\n_Use \`get-component\` with the name for full details._`;

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: list-tokens
// ============================================================================
server.tool(
  "list-tokens",
  "List Orion design tokens by category. Categories: surface, text, interactive, border, status, spacing, radius, shadow, font, color.",
  {
    category: z
      .string()
      .optional()
      .describe(
        'Token category to filter (e.g., "surface", "text", "interactive", "spacing"). Omit for all categories.',
      ),
  },
  async ({ category }) => {
    if (category === undefined) {
      // List categories
      const categories = getTokenCategories();
      let text = `# Orion Token Categories\n\n`;
      for (const cat of categories) {
        const tokens = listTokens(cat);
        text += `- **${cat}** (${tokens.length} tokens)\n`;
      }
      text += `\n_Use \`list-tokens\` with a category for token details, or \`get-token\` for a specific token._`;
      return { content: [{ type: "text", text }] };
    }

    const tokens = listTokens(category);
    if (tokens.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No tokens found for category "${category}". Use \`list-tokens\` without a category to see available categories.`,
          },
        ],
      };
    }

    let text = `# Orion Tokens: ${category}\n\n`;
    text += `| Token | Light | Dark |\n`;
    text += `|-------|-------|------|\n`;
    for (const t of tokens.slice(0, 50)) {
      text += `| \`var(${t.name})\` | ${t.values["light"] || t.values["default"] || "—"} | ${t.values["dark"] || "—"} |\n`;
    }
    if (tokens.length > 50) {
      text += `\n_Showing first 50 of ${tokens.length} tokens._\n`;
    }

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: get-token
// ============================================================================
server.tool(
  "get-token",
  "Get details of a specific Orion design token: values per theme, per brand, description.",
  {
    name: z
      .string()
      .describe(
        'Token name (e.g., "--surface-base", "--interactive-primary", "--spacing-4"). With or without -- prefix.',
      ),
  },
  async ({ name }) => {
    const token = getToken(name);

    if (!token) {
      return {
        content: [
          {
            type: "text",
            text: `Token "${name}" not found. Use \`list-tokens\` to browse available tokens.\n\nCommon tokens:\n- --surface-base, --surface-subtle, --surface-layer\n- --text-primary, --text-secondary, --text-brand\n- --interactive-primary, --interactive-primary-hover\n- --spacing-1 through --spacing-32\n- --radius-sm, --radius-control, --radius-container`,
          },
        ],
      };
    }

    let text = `# Token: ${token.name}\n\n`;
    text += `- **Category:** ${token.category}\n`;
    text += `- **CSS Usage:** \`var(${token.name})\`\n\n`;
    text += `## Values\n\n`;
    for (const [theme, value] of Object.entries(token.values)) {
      text += `- **${theme}:** \`${value}\`\n`;
    }

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: validate-code
// ============================================================================
server.tool(
  "validate-code",
  "Validate a code snippet against Orion Design System rules. Checks for hardcoded colors, wrong prop names, missing imports, brand prop violations, and more.",
  {
    code: z.string().describe("The TSX/CSS code to validate"),
  },
  async ({ code }) => {
    const result = validateCode(code);

    let text = `# Validation Result\n\n`;
    text += `**${result.valid ? "PASS" : "FAIL"}** — Score: ${result.score}/100\n\n`;

    if (result.errors.length > 0) {
      text += `## Errors (${result.errors.length})\n\n`;
      for (const err of result.errors) {
        text += `- **[${err.rule}]**${err.line ? ` Line ${err.line}:` : ""} ${err.message}\n`;
        text += `  → Fix: ${err.suggestion}\n`;
      }
      text += "\n";
    }

    if (result.warnings.length > 0) {
      text += `## Warnings (${result.warnings.length})\n\n`;
      for (const warn of result.warnings) {
        text += `- **[${warn.rule}]** ${warn.message}\n`;
        text += `  → ${warn.suggestion}\n`;
      }
      text += "\n";
    }

    if (result.suggestions.length > 0) {
      text += `## Suggestions\n\n`;
      for (const s of result.suggestions) {
        text += `- ${s}\n`;
      }
    }

    if (result.valid && result.errors.length === 0) {
      text += `\nCode follows Orion Design System rules. No issues detected.`;
    }

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: get-setup-guide
// ============================================================================
server.tool(
  "get-setup-guide",
  "Get a setup guide for using Orion in a new project. Supports Vite, Next.js, and general React.",
  {
    framework: z.enum(["vite", "nextjs", "react"]).describe("Target framework"),
    brand: z
      .string()
      .optional()
      .describe(
        "Brand to configure (orion, unitec, laureate, uvm). Default: orion",
      ),
    theme: z
      .enum(["light", "dark"])
      .optional()
      .describe("Default theme. Default: light"),
  },
  async ({ framework, brand = "orion", theme = "light" }) => {
    let text = `# Orion Setup Guide — ${framework.charAt(0).toUpperCase() + framework.slice(1)}\n\n`;

    // Install
    text += `## 1. Install Dependencies\n\n`;
    text += `\`\`\`bash\nnpm install @orion-ds/react lucide-react\n\`\`\`\n\n`;

    // CSS Import
    text += `## 2. Import Styles\n\n`;
    if (framework === "nextjs") {
      text += `In \`app/layout.tsx\` (App Router) or \`pages/_app.tsx\` (Pages Router):\n\n`;
      text += `\`\`\`tsx\nimport '@orion-ds/react/styles.css';\n\`\`\`\n\n`;
    } else {
      text += `In your entry file (\`main.tsx\` or \`App.tsx\`):\n\n`;
      text += `\`\`\`tsx\nimport '@orion-ds/react/styles.css';\n\`\`\`\n\n`;
    }

    // ThemeProvider
    text += `## 3. Wrap with ThemeProvider\n\n`;
    text += `\`\`\`tsx\nimport { ThemeProvider } from '@orion-ds/react';\nimport '@orion-ds/react/styles.css';\n\n`;
    text += `export default function App() {\n  return (\n    <ThemeProvider defaultTheme="${theme}" defaultBrand="${brand}">\n      <YourApp />\n    </ThemeProvider>\n  );\n}\n\`\`\`\n\n`;

    // Example component
    text += `## 4. Use Components\n\n`;
    text += `\`\`\`tsx\nimport { Button, Field, Card } from '@orion-ds/react';\nimport { Search } from 'lucide-react';\n\nfunction MyForm() {\n  return (\n    <Card>\n      <Card.Header>Sign Up</Card.Header>\n      <Card.Body>\n        <Field label="Email" type="email" placeholder="you@example.com" />\n        <Field label="Password" type="password" />\n        <Button variant="primary" fullWidth>Create Account</Button>\n      </Card.Body>\n    </Card>\n  );\n}\n\`\`\`\n\n`;

    // Key rules
    text += `## Key Rules\n\n`;
    text += `- **Brand is GLOBAL** — set via ThemeProvider, never as a component prop\n`;
    text += `- **Fonts load automatically** — ThemeProvider handles Google Fonts\n`;
    text += `- **Icons** — use \`lucide-react\` (5000+ icons). Import directly: \`import { Search } from 'lucide-react'\`\n`;
    text += `- **CSS variables** — all styling uses semantic tokens. Never hardcode colors or pixels.\n`;
    text += `- **Mode-aware** — components adapt to display/product/app modes via \`data-mode\` attribute\n`;

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: list-sections
// ============================================================================
server.tool(
  "list-sections",
  "List pre-built Orion sections (composed UI blocks like Hero, Pricing, DataTable, Sidebar) for building pages quickly.",
  {},
  async () => {
    const sections = listComponents({ type: "registry:section" });
    const templates = listComponents({ type: "registry:template" });

    let text = `# Orion Pre-built Sections & Templates\n\n`;

    text += `## Sections (${sections.length})\n\n`;
    text += `Composed UI blocks you can assemble into pages:\n\n`;

    // Group by likely category
    const marketing = sections.filter((s) =>
      [
        "hero",
        "cta",
        "features",
        "pricing",
        "testimonials",
        "faq",
        "footer",
        "newsletter",
        "logo-cloud",
        "team",
        "contact",
        "blog",
        "gallery",
        "timeline",
        "comparison",
        "banner",
        "social-proof",
        "app-download",
        "stats",
        "carousel-section",
      ].includes(s.name),
    );
    const app = sections.filter((s) => !marketing.includes(s));

    if (marketing.length > 0) {
      text += `### Marketing / Landing Page\n\n`;
      for (const s of marketing) {
        text += `- **${s.title}** (\`${s.name}\`) — ${s.description}\n`;
      }
      text += "\n";
    }

    if (app.length > 0) {
      text += `### App / Dashboard\n\n`;
      for (const s of app) {
        text += `- **${s.title}** (\`${s.name}\`) — ${s.description}\n`;
      }
      text += "\n";
    }

    text += `## Templates (${templates.length})\n\n`;
    text += `Full page compositions:\n\n`;
    for (const t of templates) {
      text += `- **${t.title}** (\`${t.name}\`) — ${t.description}\n`;
    }

    text += `\n_Use \`get-component\` with the section/template name for full details and code._`;

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Tool: get-section
// ============================================================================
server.tool(
  "get-section",
  "Get details and code for an Orion section or template.",
  {
    name: z
      .string()
      .describe(
        'Section or template name in kebab-case (e.g., "hero", "data-table", "landing-page-template")',
      ),
  },
  async ({ name }) => {
    // Delegate to get-component since they share the same data model
    const component = getComponent(name);

    if (!component) {
      return {
        content: [
          {
            type: "text",
            text: `Section "${name}" not found. Use \`list-sections\` to see available sections.`,
          },
        ],
      };
    }

    let text = `# ${component.title}\n\n`;
    text += `**${component.description}**\n\n`;
    text += `- **Type:** ${component.type.replace("registry:", "")}\n`;
    text += `- **Category:** ${component.category}\n\n`;

    text += `## Import\n\n\`\`\`tsx\n${component.cssImport};\n${component.import};\n\`\`\`\n\n`;

    if (component.props && component.props.length > 0) {
      text += `## Props\n\n`;
      text += `| Prop | Type | Default | Description |\n`;
      text += `|------|------|---------|-------------|\n`;
      for (const prop of component.props) {
        const typeStr = prop.values
          ? prop.values.map((v) => `'${v}'`).join(" | ")
          : prop.type;
        const defStr =
          prop.default !== undefined
            ? `\`${prop.default}\``
            : prop.required
              ? "**required**"
              : "—";
        text += `| \`${prop.name}\` | \`${typeStr}\` | ${defStr} | ${prop.description} |\n`;
      }
      text += "\n";
    }

    if (component.examples && component.examples.length > 0) {
      text += `## Examples\n\n`;
      for (const ex of component.examples) {
        text += `### ${ex.title}\n\n\`\`\`tsx\n${ex.code}\n\`\`\`\n\n`;
      }
    }

    text += `## Files\n\n`;
    text += component.files.map((f) => `- \`${f.path}\``).join("\n") + "\n";

    return { content: [{ type: "text", text }] };
  },
);

// ============================================================================
// Start server
// ============================================================================
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Failed to start Orion MCP server:", error);
  process.exit(1);
});
