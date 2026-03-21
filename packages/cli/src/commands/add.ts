/**
 * orion add <name...> — Copy components from the registry to the project
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { loadConfig } from "../lib/config.js";
import {
  fetchIndex,
  fetchComponent,
  fetchIndexLocal,
  fetchComponentLocal,
} from "../lib/registry.js";
import { resolveAll } from "../lib/resolver.js";
import { writeComponents } from "../lib/writer.js";
import { installDeps } from "../lib/package-manager.js";
import { getTargetDir } from "../lib/config.js";
import * as logger from "../lib/logger.js";
import {
  confirm,
  fuzzyMatch,
  filterByCategory,
  filterByTag,
  filterByType,
  getPreviewUrl,
} from "../lib/utils.js";
import type { AddArgs, RegistryIndex, RegistryItem } from "../types.js";

function parseArgs(args: string[]): AddArgs {
  const names = args.filter((a) => !a.startsWith("--") && !a.startsWith("-"));
  const type = args.find((a) => a.startsWith("--type="))?.split("=")[1] as
    | "component"
    | "section"
    | "template"
    | undefined;
  const category = args.find((a) => a.startsWith("--category="))?.split("=")[1];
  const tag = args.find((a) => a.startsWith("--tag="))?.split("=")[1];
  const dryRun = args.includes("--dry-run");
  const yes = args.includes("--yes") || args.includes("-y");
  const overwrite = args.includes("--overwrite");
  const local = args.includes("--local");
  const noInstall = args.includes("--no-install");

  return {
    names,
    type,
    category,
    tag,
    dryRun,
    yes,
    overwrite,
    local,
    noInstall,
  };
}

function isInstalled(
  cwd: string,
  config: any,
  itemNames: string[],
): Set<string> {
  const installed = new Set<string>();
  for (const name of itemNames) {
    // Check all possible directories (component, section, template)
    const dirs = [config.componentDir, config.sectionDir, config.templateDir];
    for (const dir of dirs) {
      const itemPath = path.join(cwd, dir, name);
      if (fs.existsSync(itemPath)) {
        installed.add(name);
        break;
      }
    }
  }
  return installed;
}

export async function add(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const parsed = parseArgs(args);

  // Validate input
  if (parsed.names.length === 0 && !parsed.category && !parsed.tag) {
    logger.error(
      "No components specified. Usage: orion add <name...> [options]",
    );
    logger.info("  Examples:");
    logger.info("    orion add button card");
    logger.info("    orion add --category=forms");
    logger.info("    orion add --tag=marketing");
    logger.info('  Run "orion list" to see available components.');
    process.exit(1);
  }

  // Load config
  let config;
  try {
    config = loadConfig(cwd);
  } catch {
    logger.error('Could not find orion.json. Run "orion init" first.');
    process.exit(1);
  }

  // Fetch index
  let index: RegistryIndex;
  try {
    if (parsed.local) {
      index = fetchIndexLocal(cwd);
    } else {
      index = await fetchIndex(config.registryUrl);
    }
  } catch (err) {
    logger.error(`Could not fetch registry index: ${(err as Error).message}`);
    process.exit(1);
  }

  // Determine items to add
  let itemsToAdd = index.items;

  // Filter by type if specified
  if (parsed.type) {
    itemsToAdd = filterByType(itemsToAdd, parsed.type);
  }

  // Filter by category if specified
  if (parsed.category) {
    itemsToAdd = filterByCategory(itemsToAdd, parsed.category);
    if (itemsToAdd.length === 0) {
      logger.error(`No items found in category: ${parsed.category}`);
      process.exit(1);
    }
  }

  // Filter by tag if specified
  if (parsed.tag) {
    itemsToAdd = filterByTag(itemsToAdd, parsed.tag);
    if (itemsToAdd.length === 0) {
      logger.error(`No items found with tag: ${parsed.tag}`);
      process.exit(1);
    }
  }

  // If specific names provided, validate and filter
  let finalNames: string[] = [];
  if (parsed.names.length > 0) {
    const allNames = index.items.map((i) => i.name);
    const invalid = parsed.names.filter((n) => !allNames.includes(n));

    if (invalid.length > 0) {
      logger.error(`Unknown items: ${invalid.join(", ")}`);

      // Provide fuzzy suggestions
      for (const name of invalid) {
        const suggestions = fuzzyMatch(name, allNames);
        if (suggestions.length > 0) {
          logger.info(`  Did you mean: ${suggestions.join(", ")}?`);
        }
      }
      process.exit(1);
    }

    finalNames = parsed.names;
    itemsToAdd = itemsToAdd.filter((i) => parsed.names.includes(i.name));
  } else {
    finalNames = itemsToAdd.map((i) => i.name);
  }

  // Check for already-installed items (unless --overwrite)
  const installedItems = isInstalled(cwd, config, finalNames);
  if (installedItems.size > 0 && !parsed.overwrite) {
    logger.warn(
      `Already installed: ${Array.from(installedItems).join(", ")} (use --overwrite to replace)`,
    );
    finalNames = finalNames.filter((n) => !installedItems.has(n));

    if (finalNames.length === 0) {
      logger.info("No new items to install.");
      return;
    }

    itemsToAdd = itemsToAdd.filter((i) => finalNames.includes(i.name));
  }

  // Show confirmation for category/tag bulk adds
  if ((parsed.category || parsed.tag) && !parsed.yes) {
    logger.info("");
    logger.info(`${itemsToAdd.length} items will be added:`);
    for (const item of itemsToAdd) {
      logger.info(`  ${logger.cyan(item.name)} — ${item.description}`);
    }
    const ok = await confirm("\nProceed?");
    if (!ok) {
      logger.info("Aborted.");
      return;
    }
  }

  // Fetch function
  const fetchFn = async (name: string): Promise<RegistryItem> => {
    const s = logger.spinner(`Fetching ${name}...`);
    try {
      const item = parsed.local
        ? fetchComponentLocal(cwd, name)
        : await fetchComponent(config.registryUrl, name);
      s.stop(`  ${logger.green("+")} ${name}`);
      return item;
    } catch (err) {
      s.stop(`  ${logger.red("x")} ${name} — ${(err as Error).message}`);
      throw err;
    }
  };

  // Resolve dependencies
  let resolved;
  try {
    resolved = await resolveAll(finalNames, fetchFn);
  } catch (err) {
    logger.error(`Failed to resolve components: ${(err as Error).message}`);
    process.exit(1);
  }

  // Confirm extra dependencies
  if (resolved.extraDeps.length > 0 && !parsed.yes) {
    logger.info("");
    logger.info(`The following dependencies will also be installed:`);
    for (const dep of resolved.extraDeps) {
      logger.info(`  ${logger.cyan(dep)}`);
    }
    const ok = await confirm("\nProceed?");
    if (!ok) {
      logger.info("Aborted.");
      return;
    }
  }

  // Write files (dry-run or actual)
  const result = writeComponents(resolved.items, config, cwd, {
    overwrite: parsed.overwrite,
    dryRun: parsed.dryRun,
  });

  if (result.writtenFiles.length === 0 && !parsed.dryRun) {
    logger.warn(
      "No files were written. All components already exist (use --overwrite to replace).",
    );
    return;
  }

  // Print file list
  logger.info("");
  if (parsed.dryRun) {
    logger.info(logger.bold("DRY RUN — These files would be created:"));
  } else {
    logger.info(logger.bold("Files:"));
  }

  for (const f of result.writtenFiles) {
    const status = parsed.dryRun ? " (new)" : "";
    logger.info(`  ${logger.dim(f)}${status}`);
  }

  // If dry-run, show next steps
  if (parsed.dryRun) {
    logger.info("");
    logger.info(
      `Run without ${logger.cyan("--dry-run")} to install these files.`,
    );
    logger.info("");
    return;
  }

  // Install npm dependencies
  if (result.npmDeps.length > 0 && !parsed.noInstall) {
    installDeps(result.npmDeps, cwd);
  } else if (result.npmDeps.length > 0 && parsed.noInstall) {
    logger.info("");
    logger.info("Skip npm install (--no-install). Install manually:");
    logger.info(`  npm install ${result.npmDeps.join(" ")}`);
  }

  // Print import hints and preview URLs
  logger.info("");
  logger.success("Done!");
  logger.info("");
  logger.info("Import:");
  for (const item of resolved.items) {
    if (finalNames.includes(item.name)) {
      const dir =
        item.type === "registry:section"
          ? config.sectionDir
          : item.type === "registry:template"
            ? config.templateDir
            : config.componentDir;
      logger.info(
        `  ${logger.cyan(`import { ${item.title} } from './${dir}/${item.name}'`)}`,
      );
    }
  }

  // Show preview URLs
  const previewUrls = resolved.items
    .filter((i) => finalNames.includes(i.name))
    .map((i) => {
      const indexItem = index.items.find((ii) => ii.name === i.name);
      return indexItem ? getPreviewUrl(indexItem) : null;
    })
    .filter((url): url is string => url !== null);

  if (previewUrls.length > 0) {
    logger.info("");
    logger.info("Preview:");
    for (const url of previewUrls) {
      logger.info(`  ${logger.cyan(url)}`);
    }
  }
}
