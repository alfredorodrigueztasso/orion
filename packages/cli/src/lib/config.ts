/**
 * Config — Read/write orion.json
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { OrionConfig } from "../types.js";

const CONFIG_FILE = "orion.json";

export const DEFAULT_CONFIG: OrionConfig = {
  $schema: "https://orion-ds.dev/schema/cli-config.json",
  registryUrl: "https://orion-ds.dev/r",
  componentDir: "src/components/orion",
  sectionDir: "src/sections/orion",
  templateDir: "src/templates/orion",
  typescript: true,
  brand: "orion",
  mode: "product",
};

export function findConfigPath(cwd: string = process.cwd()): string | null {
  let dir = cwd;
  while (true) {
    const candidate = path.join(dir, CONFIG_FILE);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

export function loadConfig(cwd?: string): OrionConfig {
  const configPath = findConfigPath(cwd);
  if (!configPath) {
    throw new Error(`Could not find ${CONFIG_FILE}. Run "orion init" first.`);
  }
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw) as OrionConfig;
}

export function saveConfig(
  config: OrionConfig,
  dir: string = process.cwd(),
): string {
  const configPath = path.join(dir, CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
  return configPath;
}

export function getTargetDir(config: OrionConfig, type: string): string {
  switch (type) {
    case "registry:section":
      return config.sectionDir;
    case "registry:template":
      return config.templateDir;
    default:
      return config.componentDir;
  }
}
