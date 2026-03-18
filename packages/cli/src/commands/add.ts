/**
 * orion add <name...> — Copy components from the registry to the project
 */

import * as readline from "node:readline";
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
import * as logger from "../lib/logger.js";
import type { RegistryIndex, RegistryItem } from "../types.js";

function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question} ${logger.dim("(y/N)")} `, (answer) => {
      rl.close();
      resolve(
        answer.trim().toLowerCase() === "y" ||
          answer.trim().toLowerCase() === "yes",
      );
    });
  });
}

export async function add(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const yes = args.includes("--yes") || args.includes("-y");
  const overwrite = args.includes("--overwrite");
  const local = args.includes("--local");

  // Filter out flags to get component names
  const names = args.filter((a) => !a.startsWith("--") && !a.startsWith("-"));

  if (names.length === 0) {
    logger.error("No components specified. Usage: orion add <name...>");
    logger.info("  Example: orion add button card modal");
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

  // Fetch index to validate names
  let index: RegistryIndex;
  try {
    if (local) {
      index = fetchIndexLocal(cwd);
    } else {
      index = await fetchIndex(config.registryUrl);
    }
  } catch (err) {
    logger.error(`Could not fetch registry index: ${(err as Error).message}`);
    process.exit(1);
  }

  // Validate component names
  const indexNames = new Set(index.items.map((i) => i.name));
  const invalid = names.filter((n) => !indexNames.has(n));
  if (invalid.length > 0) {
    logger.error(`Unknown components: ${invalid.join(", ")}`);
    logger.info('Run "orion list" to see available components.');
    process.exit(1);
  }

  // Fetch function
  const fetchFn = async (name: string): Promise<RegistryItem> => {
    const s = logger.spinner(`Fetching ${name}...`);
    try {
      const item = local
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
    resolved = await resolveAll(names, fetchFn);
  } catch (err) {
    logger.error(`Failed to resolve components: ${(err as Error).message}`);
    process.exit(1);
  }

  // Confirm extra dependencies
  if (resolved.extraDeps.length > 0 && !yes) {
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

  // Write files
  const result = writeComponents(resolved.items, config, cwd, { overwrite });

  if (result.writtenFiles.length === 0) {
    logger.warn(
      "No files were written. All components already exist (use --overwrite to replace).",
    );
    return;
  }

  // Print written files
  logger.info("");
  logger.info(logger.bold("Files:"));
  for (const f of result.writtenFiles) {
    logger.info(`  ${logger.dim(f)}`);
  }

  // Install npm dependencies
  if (result.npmDeps.length > 0) {
    installDeps(result.npmDeps, cwd);
  }

  // Print import hints
  logger.info("");
  logger.success("Done!");
  logger.info("");
  logger.info("Import:");
  for (const item of resolved.items) {
    if (names.includes(item.name)) {
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
}
