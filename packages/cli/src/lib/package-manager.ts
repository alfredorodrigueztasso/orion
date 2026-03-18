/**
 * Package Manager — Detect npm/pnpm/yarn/bun and run install
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";
import * as logger from "./logger.js";

export type PM = "pnpm" | "npm" | "yarn" | "bun";

export function detect(cwd: string = process.cwd()): PM {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (
    fs.existsSync(path.join(cwd, "bun.lockb")) ||
    fs.existsSync(path.join(cwd, "bun.lock"))
  )
    return "bun";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function installDeps(deps: string[], cwd: string = process.cwd()): void {
  if (deps.length === 0) return;

  const pm = detect(cwd);
  const depsStr = deps.join(" ");

  let cmd: string;
  switch (pm) {
    case "pnpm":
      cmd = `pnpm add ${depsStr}`;
      break;
    case "yarn":
      cmd = `yarn add ${depsStr}`;
      break;
    case "bun":
      cmd = `bun add ${depsStr}`;
      break;
    default:
      cmd = `npm install ${depsStr}`;
  }

  logger.info(`\nInstalling dependencies with ${pm}...`);
  try {
    execSync(cmd, { cwd, stdio: "pipe" });
    logger.success(`Dependencies installed: ${deps.join(", ")}`);
  } catch {
    logger.warn(`Could not auto-install: ${depsStr}`);
    logger.info(`Run manually: ${cmd}`);
  }
}
