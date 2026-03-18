/**
 * orion list — List all available registry items
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { loadConfig, getTargetDir } from "../lib/config.js";
import { fetchIndex, fetchIndexLocal } from "../lib/registry.js";
import * as logger from "../lib/logger.js";
import type { RegistryIndexItem, OrionConfig } from "../types.js";

function isInstalled(
  item: RegistryIndexItem,
  config: OrionConfig,
  cwd: string,
): boolean {
  const baseDir = getTargetDir(config, item.type);
  const targetDir = path.join(cwd, baseDir, item.name);
  return fs.existsSync(targetDir);
}

export async function list(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const local = args.includes("--local");
  const filterType = getFilterType(args);

  // Try loading config (optional for list)
  let config: OrionConfig | null = null;
  try {
    config = loadConfig(cwd);
  } catch {
    // Config not required for listing
  }

  const registryUrl = config?.registryUrl || "https://orion-ds.dev/r";

  let index;
  try {
    if (local) {
      index = fetchIndexLocal(cwd);
    } else {
      index = await fetchIndex(registryUrl);
    }
  } catch (err) {
    logger.error(`Could not fetch registry: ${(err as Error).message}`);
    process.exit(1);
  }

  // Filter by type
  let items = index.items;
  if (filterType) {
    items = items.filter((i) => i.type === `registry:${filterType}`);
  }

  // Group by type then category
  const groups = new Map<string, Map<string, RegistryIndexItem[]>>();
  for (const item of items) {
    const typeLabel = item.type.replace("registry:", "");
    if (!groups.has(typeLabel)) groups.set(typeLabel, new Map());
    const categoryMap = groups.get(typeLabel)!;
    if (!categoryMap.has(item.category)) categoryMap.set(item.category, []);
    categoryMap.get(item.category)!.push(item);
  }

  // Print
  let total = 0;
  let installed = 0;

  for (const [type, categories] of groups) {
    logger.info("");
    logger.info(
      logger.bold(`${type.charAt(0).toUpperCase() + type.slice(1)}s`),
    );
    logger.info(logger.dim("─".repeat(40)));

    for (const [category, categoryItems] of categories) {
      logger.info(`  ${logger.dim(category)}`);
      for (const item of categoryItems) {
        total++;
        const isInst = config ? isInstalled(item, config, cwd) : false;
        if (isInst) installed++;
        const marker = isInst ? logger.green(" [installed]") : "";
        logger.info(
          `    ${item.name}${marker} ${logger.dim("— " + item.description)}`,
        );
      }
    }
  }

  logger.info("");
  logger.info(
    `${logger.bold(String(total))} items available${config ? `, ${logger.green(String(installed))} installed` : ""}`,
  );
  logger.info("");
  logger.info(`Add components: ${logger.cyan("orion add <name...>")}`);
}

function getFilterType(args: string[]): string | null {
  const typeFlag = args.find((a) => a.startsWith("--type="));
  if (typeFlag) return typeFlag.split("=")[1] || null;
  if (args.includes("--components")) return "component";
  if (args.includes("--sections")) return "section";
  if (args.includes("--templates")) return "template";
  return null;
}
