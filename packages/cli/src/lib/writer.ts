/**
 * Writer — Write component files to the user's project
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { OrionConfig, RegistryItem } from "../types.js";
import { getTargetDir } from "./config.js";
import { transformImports, componentDirName, fileName } from "./transforms.js";
import * as logger from "./logger.js";

export interface WriteResult {
  writtenFiles: string[];
  npmDeps: string[];
  dryRun?: boolean;
}

export function writeComponents(
  items: RegistryItem[],
  config: OrionConfig,
  cwd: string,
  opts: { overwrite?: boolean; dryRun?: boolean } = {},
): WriteResult {
  const writtenFiles: string[] = [];
  const npmDeps = new Set<string>();

  // Collect all installed component names for cross-component import resolution
  const installedNames = new Set<string>();
  for (const item of items) {
    installedNames.add(item.name);
  }

  // Collect all items that are already in the project (for dry-run metadata)
  const alreadyInstalled = new Set<string>();
  if (opts.dryRun) {
    for (const item of items) {
      const baseDir = getTargetDir(config, item.type);
      for (const file of item.files) {
        const dirName = componentDirName(file.path);
        const fName = fileName(file.path);
        const targetPath = path.join(cwd, baseDir, dirName, fName);
        if (fs.existsSync(targetPath)) {
          alreadyInstalled.add(path.relative(cwd, targetPath));
        }
      }
    }
  }

  for (const item of items) {
    const baseDir = getTargetDir(config, item.type);

    // Collect npm dependencies
    if (item.dependencies) {
      for (const dep of item.dependencies) {
        npmDeps.add(dep);
      }
    }

    for (const file of item.files) {
      const dirName = componentDirName(file.path);
      const fName = fileName(file.path);
      const targetPath = path.join(cwd, baseDir, dirName, fName);
      const relativePath = path.relative(cwd, targetPath);

      // In dry-run mode, just collect file info without writing
      if (opts.dryRun) {
        if (!alreadyInstalled.has(relativePath)) {
          writtenFiles.push(relativePath);
        }
        continue;
      }

      // Check for existing files
      if (fs.existsSync(targetPath) && !opts.overwrite) {
        logger.warn(
          `Skipping ${relativePath} (already exists, use --overwrite)`,
        );
        continue;
      }

      // Apply import transforms
      let content = file.content;
      if (fName.endsWith(".ts") || fName.endsWith(".tsx")) {
        content = transformImports(content, installedNames);
      }

      // Ensure directory exists
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, content, "utf-8");
      writtenFiles.push(relativePath);
    }
  }

  return {
    writtenFiles,
    npmDeps: Array.from(npmDeps),
    dryRun: opts.dryRun,
  };
}
