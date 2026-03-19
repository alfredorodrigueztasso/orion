/**
 * Info — Display detailed information about a component, section, or template
 */

import type { InfoArgs, RegistryItem, AccessibilityInfo } from "../types.js";
import {
  fetchIndex,
  fetchComponent,
  fetchIndexLocal,
  fetchComponentLocal,
} from "../lib/registry.js";
import { fuzzyMatch } from "../lib/utils.js";
import * as logger from "../lib/logger.js";

export function parseArgs(args: string[]): InfoArgs {
  const name =
    args.find((a) => !a.startsWith("--") && !a.startsWith("-")) ?? "";
  const type = args
    .find((a) => a.startsWith("--type="))
    ?.split("=")[1] as "component" | "section" | "template" | undefined;
  const json = args.includes("--json");
  const examples = args.includes("--examples");
  const props = args.includes("--props");
  const local = args.includes("--local");

  return { name, type, json, examples, props, local };
}

export function formatDefault(val: unknown): string {
  if (val === undefined || val === null) return "—";
  if (val === false) return "false";
  if (val === true) return "true";
  return String(val);
}

export function formatTypeLabel(type: string): string {
  // Convert "registry:component" to "component"
  if (type.startsWith("registry:")) {
    return type.replace("registry:", "");
  }
  return type;
}

export function formatValues(values?: string[]): string {
  if (!values || values.length === 0) return "";
  return values.join(" | ");
}

export function getRelated(item: RegistryItem): string[] {
  return item.related_components ?? item.related_sections ?? [];
}

export function shouldShowAccessibility(item: RegistryItem): boolean {
  const a = item.accessibility;
  if (!a) return false;
  return !!(a.role || a.ariaAttributes?.length || a.keyboardNav?.length || a.notes?.length);
}

function printPropsTable(item: RegistryItem): void {
  if (!item.props || item.props.length === 0) {
    return; // Don't show empty section
  }

  console.log(logger.bold(`Props (${item.props.length}):`));
  for (const prop of item.props) {
    const type = prop.type;
    const defaultVal = formatDefault(prop.default);
    const values = formatValues(prop.values);
    const valuesStr = values ? `  ${values}` : "";

    console.log(`  ${prop.name.padEnd(18)} ${type.padEnd(18)} "${defaultVal}"${valuesStr}`);
    if (prop.description) {
      console.log(`    ${logger.dim(prop.description)}`);
    }
  }
}

function printInfo(item: RegistryItem, _args: InfoArgs): void {
  const typeLabel = formatTypeLabel(item.type);

  // Header
  console.log("");
  console.log(logger.bold(item.title));
  console.log(logger.dim("─".repeat(60)));

  // Metadata
  console.log(`Type:         ${typeLabel}`);
  console.log(`Category:     ${item.category}`);
  if (item.modeAware) {
    console.log(`Mode-aware:   yes`);
  }

  console.log("");

  // Description
  if (item.description) {
    console.log(logger.bold("Description:"));
    console.log(`  ${item.description}`);
    console.log("");
  }

  // Import
  if (item.import) {
    console.log(logger.bold("Import:"));
    console.log(`  ${logger.cyan(item.import)}`);
    console.log("");
  }

  // Props
  printPropsTable(item);
  if (item.props && item.props.length > 0) {
    console.log("");
  }

  // Design Tokens
  if (item.tokens && item.tokens.length > 0) {
    console.log(logger.bold(`Design Tokens (${item.tokens.length}):`));
    for (const token of item.tokens) {
      console.log(`  ${token}`);
    }
    console.log("");
  }

  // Dependencies
  const hasDeps = (item.dependencies?.length ?? 0) > 0 || (item.registryDependencies?.length ?? 0) > 0;
  if (hasDeps) {
    console.log(logger.bold("Dependencies:"));
    if (item.dependencies && item.dependencies.length > 0) {
      console.log(`  npm:    ${item.dependencies.join(", ")}`);
    }
    if (item.registryDependencies && item.registryDependencies.length > 0) {
      console.log(`  orion:  ${item.registryDependencies.join(", ")}`);
    }
    console.log("");
  }

  // Accessibility
  if (shouldShowAccessibility(item)) {
    const a = item.accessibility!;
    console.log(logger.bold("Accessibility:"));
    if (a.role) {
      console.log(`  Role:    ${a.role}`);
    }
    if (a.ariaAttributes && a.ariaAttributes.length > 0) {
      console.log(`  ARIA:    ${a.ariaAttributes.join(", ")}`);
    }
    if (a.keyboardNav && a.keyboardNav.length > 0) {
      console.log(`  Keys:`);
      for (const nav of a.keyboardNav) {
        console.log(`    ${nav.key} → ${nav.action}`);
      }
    }
    if (a.notes && a.notes.length > 0) {
      console.log(`  Notes:`);
      for (const note of a.notes) {
        console.log(`    ${note}`);
      }
    }
    console.log("");
  }

  // Related & Tags
  const related = getRelated(item);
  const hasRelated = related.length > 0 || (item.tags?.length ?? 0) > 0 || (item.common_patterns?.length ?? 0) > 0;
  if (hasRelated) {
    console.log(logger.bold("Related:"));
    if (related.length > 0) {
      console.log(`  components:  ${related.join(", ")}`);
    }
    if (item.common_patterns && item.common_patterns.length > 0) {
      console.log(`  patterns:    ${item.common_patterns.join(", ")}`);
    }
    if (item.tags && item.tags.length > 0) {
      console.log(`  tags:        ${item.tags.join(", ")}`);
    }
    console.log("");
  }

  // Preview URL
  const previewUrl = item.preview?.url ?? `https://orion-ds.dev/library.html#${item.name}`;
  console.log(logger.bold("Preview:"));
  console.log(`  ${logger.cyan(previewUrl)}`);

  console.log(logger.dim("─".repeat(60)));
  console.log(`Install: ${logger.cyan(`orion add ${item.name}`)}`);
}

function printExamples(item: RegistryItem): void {
  if (!item.examples || item.examples.length === 0) {
    logger.warn("No examples available");
    return;
  }

  for (const example of item.examples) {
    console.log(logger.bold(`Example: ${example.title}`));
    console.log("```");
    console.log(example.code);
    console.log("```");
    console.log("");
  }
}

export async function info(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const parsed = parseArgs(args);

  // Guard: name required
  if (!parsed.name) {
    logger.error("Component name required");
    console.log("Usage: orion info <name> [options]");
    console.log("");
    console.log("Options:");
    console.log("  --json          Output raw JSON");
    console.log("  --examples      Show code examples");
    console.log("  --props         Show props table only");
    console.log("  --local         Use local registry");
    console.log("  --type=<type>   Disambiguate by type (component|section|template)");
    process.exit(1);
  }

  // Fetch index
  let index;
  try {
    if (parsed.local) {
      index = fetchIndexLocal(cwd);
    } else {
      index = await fetchIndex("https://orion-ds.dev/r");
    }
  } catch (err) {
    logger.error(`Could not fetch registry: ${(err as Error).message}`);
    process.exit(1);
  }

  // Find component in index
  const indexItem = index.items.find(
    (item) =>
      item.name === parsed.name &&
      (!parsed.type || formatTypeLabel(item.type) === parsed.type)
  );

  if (!indexItem) {
    // Fuzzy match
    const candidates = index.items
      .filter((item) => !parsed.type || formatTypeLabel(item.type) === parsed.type)
      .map((item) => item.name);
    const suggestions = fuzzyMatch(parsed.name, candidates);

    logger.error(`Component not found: ${parsed.name}`);
    if (suggestions.length > 0) {
      console.log("");
      console.log(logger.bold("Did you mean:"));
      for (const sugg of suggestions) {
        console.log(`  orion info ${sugg}`);
      }
    }
    process.exit(1);
  }

  // Fetch component details
  let item: RegistryItem;
  try {
    if (parsed.local) {
      item = fetchComponentLocal(cwd, indexItem.name);
    } else {
      item = await fetchComponent("https://orion-ds.dev/r", indexItem.name);
    }
  } catch (err) {
    logger.error(`Could not fetch component: ${(err as Error).message}`);
    process.exit(1);
  }

  // Output
  if (parsed.json) {
    console.log(JSON.stringify(item, null, 2));
  } else if (parsed.props) {
    printPropsTable(item);
  } else if (parsed.examples) {
    printExamples(item);
  } else {
    printInfo(item, parsed);
  }
}
