/**
 * Registry data loader for the MCP server.
 * Reads registry JSON files from the registry/ directory.
 */

import * as fs from "node:fs";
import * as path from "node:path";

export interface RegistryComponent {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  category: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: Array<{ path: string; type: string }>;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    default?: string | boolean | number;
    required?: boolean;
    values?: string[];
  }>;
  subComponents?: Array<{
    name: string;
    description: string;
    props?: Array<{
      name: string;
      type: string;
      description: string;
      required?: boolean;
    }>;
  }>;
  tokens?: string[];
  examples?: Array<{
    title: string;
    description?: string;
    code: string;
  }>;
  accessibility?: {
    role?: string;
    ariaAttributes?: string[];
    keyboardNav?: Array<{ key: string; action: string }>;
    notes?: string[];
  };
  modeAware?: boolean;
  import: string;
  cssImport: string;
}

export interface RegistryIndex {
  name: string;
  version: string;
  description: string;
  homepage: string;
  components: Array<{
    name: string;
    title: string;
    description: string;
    category: string;
    type: string;
  }>;
  totalComponents: number;
  totalSections: number;
  totalTemplates: number;
}

export interface TokenInfo {
  name: string;
  category: string;
  values: Record<string, string>;
  description: string;
}

/**
 * Find the registry directory. Looks in:
 * 1. ORION_REGISTRY_PATH env var
 * 2. Relative to CWD: ./registry/
 * 3. Relative to this package: ../../registry/
 */
function findRegistryDir(): string {
  const envPath = process.env["ORION_REGISTRY_PATH"];
  if (envPath && fs.existsSync(envPath)) return envPath;

  const cwdPath = path.join(process.cwd(), "registry");
  if (fs.existsSync(cwdPath)) return cwdPath;

  // Relative to this file (packages/mcp/src/ -> ../../registry)
  const relativePath = path.resolve(
    import.meta.dirname || ".",
    "..",
    "..",
    "..",
    "registry",
  );
  if (fs.existsSync(relativePath)) return relativePath;

  throw new Error(
    "Cannot find Orion registry. Set ORION_REGISTRY_PATH or run from the Orion root directory.",
  );
}

/**
 * Find the tokens directory.
 */
function findTokensDir(): string {
  const envPath = process.env["ORION_TOKENS_PATH"];
  if (envPath && fs.existsSync(envPath)) return envPath;

  const cwdPath = path.join(process.cwd(), "tokens");
  if (fs.existsSync(cwdPath)) return cwdPath;

  const relativePath = path.resolve(
    import.meta.dirname || ".",
    "..",
    "..",
    "..",
    "tokens",
  );
  if (fs.existsSync(relativePath)) return relativePath;

  throw new Error(
    "Cannot find Orion tokens. Set ORION_TOKENS_PATH or run from the Orion root directory.",
  );
}

let _registryDir: string | null = null;
let _tokensDir: string | null = null;
let _index: RegistryIndex | null = null;
const _components: Map<string, RegistryComponent> = new Map();
const _tokens: Map<string, TokenInfo> = new Map();

function getRegistryDir(): string {
  if (!_registryDir) _registryDir = findRegistryDir();
  return _registryDir;
}

function getTokensDir(): string {
  if (!_tokensDir) _tokensDir = findTokensDir();
  return _tokensDir;
}

export function getRegistryIndex(): RegistryIndex {
  if (_index) return _index;
  const indexPath = path.join(getRegistryDir(), "index.json");
  _index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  return _index!;
}

export function getComponent(name: string): RegistryComponent | null {
  if (_components.has(name)) return _components.get(name)!;

  // Try components, then sections, then templates
  for (const subdir of ["components", "sections", "templates"]) {
    const filePath = path.join(getRegistryDir(), subdir, `${name}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      _components.set(name, data);
      return data;
    }
  }
  return null;
}

export function listComponents(filter?: {
  category?: string;
  type?: string;
}): Array<{
  name: string;
  title: string;
  description: string;
  category: string;
  type: string;
}> {
  const index = getRegistryIndex();
  let items = index.components;

  if (filter?.category) {
    items = items.filter((c) => c.category === filter.category);
  }
  if (filter?.type) {
    items = items.filter((c) => c.type === filter.type);
  }

  return items;
}

export function searchComponents(query: string): Array<{
  name: string;
  title: string;
  description: string;
  category: string;
  type: string;
  score: number;
}> {
  const index = getRegistryIndex();
  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/);

  return index.components
    .map((c) => {
      let score = 0;

      for (const term of terms) {
        if (c.name.toLowerCase() === term) score += 10;
        else if (c.title.toLowerCase() === term) score += 10;
        else if (c.name.toLowerCase().includes(term)) score += 5;
        else if (c.title.toLowerCase().includes(term)) score += 5;
        else if (c.description.toLowerCase().includes(term)) score += 3;
        else if (c.category.toLowerCase().includes(term)) score += 2;
      }

      // Semantic matching for common queries
      const semanticMap: Record<string, string[]> = {
        form: [
          "field",
          "select",
          "checkbox",
          "radio",
          "switch",
          "textarea",
          "slider",
          "combobox",
          "search-input",
        ],
        input: [
          "field",
          "select",
          "textarea",
          "search-input",
          "combobox",
          "slider",
        ],
        dialog: ["modal", "drawer", "popover"],
        popup: ["modal", "drawer", "popover", "dropdown", "tooltip"],
        menu: ["dropdown", "navbar", "sidebar", "tabs"],
        navigation: [
          "navbar",
          "sidebar",
          "tabs",
          "breadcrumb",
          "pagination",
          "stepper",
        ],
        loading: ["spinner", "skeleton", "progress-bar"],
        notification: ["toast", "alert", "badge"],
        data: ["table", "data-table", "list", "stat-card", "metric-cards"],
        layout: ["card", "accordion", "divider", "container", "section"],
        text: ["link", "badge", "chip"],
        chat: ["chat"],
        ai: ["chat", "command-bar"],
        marketing: [
          "hero",
          "cta",
          "features",
          "pricing",
          "testimonials",
          "faq",
        ],
        dashboard: [
          "data-table",
          "metric-cards",
          "sidebar",
          "page-header",
          "filter-bar",
        ],
      };

      for (const term of terms) {
        const synonyms = semanticMap[term];
        if (synonyms && synonyms.includes(c.name)) {
          score += 7;
        }
      }

      return { ...c, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function loadTokens(): Map<string, TokenInfo> {
  if (_tokens.size > 0) return _tokens;

  try {
    const tokensDir = getTokensDir();

    // Load light theme tokens
    const lightPath = path.join(tokensDir, "light.json");
    const darkPath = path.join(tokensDir, "dark.json");
    const primaryPath = path.join(tokensDir, "primary.json");

    if (fs.existsSync(lightPath) && fs.existsSync(darkPath)) {
      const light = JSON.parse(fs.readFileSync(lightPath, "utf-8"));
      const dark = JSON.parse(fs.readFileSync(darkPath, "utf-8"));

      // Build token map from semantic tokens
      function walkTokens(
        obj: Record<string, unknown>,
        prefix: string,
        category: string,
      ): void {
        for (const [key, value] of Object.entries(obj)) {
          const tokenName = prefix ? `${prefix}-${key}` : key;
          if (typeof value === "string") {
            const existing = _tokens.get(tokenName);
            if (existing) {
              existing.values["dark"] = value;
            } else {
              _tokens.set(tokenName, {
                name: `--${tokenName}`,
                category,
                values: { light: value },
                description: `Semantic token: ${tokenName}`,
              });
            }
          } else if (typeof value === "object" && value !== null) {
            walkTokens(
              value as Record<string, unknown>,
              tokenName,
              category || key,
            );
          }
        }
      }

      // Start from 'semantic' key if it exists, otherwise walk whole object
      const lightSemantic =
        (light as Record<string, unknown>)["semantic"] ?? light;
      walkTokens(lightSemantic as Record<string, unknown>, "", "semantic");
      // Walk dark to add dark values
      function walkDark(obj: Record<string, unknown>, prefix: string): void {
        for (const [key, value] of Object.entries(obj)) {
          const tokenName = prefix ? `${prefix}-${key}` : key;
          if (typeof value === "string") {
            const existing = _tokens.get(tokenName);
            if (existing) {
              existing.values["dark"] = value;
            }
          } else if (typeof value === "object" && value !== null) {
            walkDark(value as Record<string, unknown>, tokenName);
          }
        }
      }
      const darkSemantic =
        (dark as Record<string, unknown>)["semantic"] ?? dark;
      walkDark(darkSemantic as Record<string, unknown>, "");
    }

    // Load primitives
    if (fs.existsSync(primaryPath)) {
      const primary = JSON.parse(fs.readFileSync(primaryPath, "utf-8"));
      function walkPrimitives(
        obj: Record<string, unknown>,
        prefix: string,
      ): void {
        for (const [key, value] of Object.entries(obj)) {
          const tokenName = prefix ? `${prefix}-${key}` : key;
          if (typeof value === "string") {
            _tokens.set(tokenName, {
              name: `--${tokenName}`,
              category: "primitive",
              values: { default: value },
              description: `Primitive token: ${tokenName}`,
            });
          } else if (typeof value === "object" && value !== null) {
            walkPrimitives(value as Record<string, unknown>, tokenName);
          }
        }
      }
      walkPrimitives(primary, "");
    }
  } catch {
    // Tokens loading is optional, server works without it
  }

  return _tokens;
}

export function getToken(name: string): TokenInfo | null {
  const tokens = loadTokens();
  // Try with and without -- prefix
  const cleanName = name.replace(/^--/, "");
  // Direct lookup
  if (tokens.has(cleanName)) return tokens.get(cleanName)!;
  // Try partial match (e.g., "surface-base" matches key "surface-base")
  for (const [key, value] of tokens) {
    if (key === cleanName || key.endsWith(`-${cleanName}`)) {
      return value;
    }
  }
  // Try prefix match — "interactive-primary" should find "interactive-primary-default", etc.
  const prefixMatches: TokenInfo[] = [];
  for (const [key, value] of tokens) {
    if (key.startsWith(cleanName + "-") || key === cleanName) {
      prefixMatches.push(value);
    }
  }
  if (prefixMatches.length > 0) {
    // Return a composite token showing all sub-tokens
    const composite: TokenInfo = {
      name: `--${cleanName}`,
      category: prefixMatches[0]!.category,
      values: {},
      description: `Token group: ${cleanName} (${prefixMatches.length} sub-tokens)`,
    };
    for (const t of prefixMatches) {
      for (const [theme, val] of Object.entries(t.values)) {
        composite.values[`${t.name} [${theme}]`] = val;
      }
    }
    return composite;
  }
  return null;
}

export function listTokens(category?: string): TokenInfo[] {
  const tokens = loadTokens();
  const all = Array.from(tokens.values());
  if (category) {
    return all.filter((t) => t.category === category);
  }
  return all;
}

export function getTokenCategories(): string[] {
  const tokens = loadTokens();
  const categories = new Set<string>();
  for (const t of tokens.values()) {
    if (t.category) categories.add(t.category);
  }
  return Array.from(categories).sort();
}
