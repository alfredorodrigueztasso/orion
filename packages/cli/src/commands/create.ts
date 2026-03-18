/**
 * orion create <project-name> — Scaffold a new React/Next.js project with Orion
 */

import * as path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { execSync, spawn } from "node:child_process";
import { scaffoldProject, type ScaffoldConfig } from "../lib/scaffolder.js";
import { detect, type PM } from "../lib/package-manager.js";
import * as logger from "../lib/logger.js";

const VALID_TEMPLATES = ["react-app", "vite-app", "nextjs-app"];

function isValidProjectName(name: string): boolean {
  // Check for valid npm package name pattern
  return /^[a-z0-9\-_\.]+$/.test(name) && !name.startsWith("-");
}

function getTemplateDir(templateName: string): string {
  // Convert import.meta.url to file path
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFile);

  // From src/commands/create.ts or dist/commands/create.js,
  // go up 2 levels to get to packages/cli, then templates/
  const templatesDir = path.join(currentDir, "..", "..", "templates", templateName);

  if (fs.existsSync(templatesDir)) {
    return templatesDir;
  }

  // Fallback: try from package root (in case we're installed as a module)
  // Look for templates adjacent to node_modules or package.json
  let searchDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const candidate = path.join(
      searchDir,
      "node_modules",
      "@orion-ds",
      "cli",
      "templates",
      templateName,
    );
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    searchDir = path.dirname(searchDir);
  }

  // Last resort
  return templatesDir;
}

interface CreateArgs {
  projectName: string;
  template: string;
  packageManager?: PM;
  noInstall: boolean;
  git: boolean;
  typescript: boolean;
  brand: string;
  mode: string;
  overwrite: boolean;
}

function parseArgs(args: string[]): CreateArgs {
  const projectName = args[0];

  if (!projectName) {
    throw new Error(
      "Project name is required. Usage: orion create <project-name>",
    );
  }

  if (!isValidProjectName(projectName)) {
    throw new Error(
      `Invalid project name: "${projectName}". Use lowercase letters, numbers, hyphens, underscores, and dots only.`,
    );
  }

  let template = "react-app";
  let packageManager: PM | undefined;
  let noInstall = false;
  let git = true;
  let typescript = true;
  let brand = "orion";
  let mode = "product";
  let overwrite = false;

  for (const arg of args.slice(1)) {
    if (arg === "--no-install") noInstall = true;
    else if (arg === "--no-git") git = false;
    else if (arg === "--no-typescript") typescript = false;
    else if (arg === "--overwrite") overwrite = true;
    else if (arg.startsWith("--template=")) {
      template = arg.split("=")[1]!;
    } else if (arg.startsWith("--package-manager=")) {
      packageManager = arg.split("=")[1] as PM;
    } else if (arg.startsWith("--brand=")) {
      brand = arg.split("=")[1]!;
    } else if (arg.startsWith("--mode=")) {
      mode = arg.split("=")[1]!;
    }
  }

  // Validate template
  if (!VALID_TEMPLATES.includes(template)) {
    throw new Error(
      `Invalid template: "${template}". Valid options: ${VALID_TEMPLATES.join(", ")}`,
    );
  }

  return {
    projectName,
    template,
    packageManager,
    noInstall,
    git,
    typescript,
    brand,
    mode,
    overwrite,
  };
}

export async function create(args: string[]): Promise<void> {
  // Parse arguments
  let parsed: CreateArgs;
  try {
    parsed = parseArgs(args);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  const {
    projectName,
    template,
    packageManager,
    noInstall,
    git,
    typescript,
    brand,
    mode,
    overwrite,
  } = parsed;

  // Check Node version
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split(".")[0]!);
  if (majorVersion < 18) {
    logger.error(
      `Requires Node 18+. You have ${majorVersion}. Please upgrade.`,
    );
    process.exit(1);
  }

  // Resolve target directory
  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if target directory exists
  if (fs.existsSync(targetDir) && !overwrite) {
    logger.error(
      `Directory "${projectName}" already exists. Use --overwrite to replace.`,
    );
    process.exit(1);
  }

  logger.info(
    logger.bold(
      `Creating ${projectName} (${template} template) with ${brand} brand`,
    ),
  );
  logger.info("");

  // Scaffold project from template
  const templateDir = getTemplateDir(template);

  if (!fs.existsSync(templateDir)) {
    logger.error(`Template not found: ${template}`);
    process.exit(1);
  }

  const scaffoldConfig: ScaffoldConfig = {
    projectName,
    typescript,
    brand,
    mode,
    packageManager,
  };

  let scaffoldResult;
  try {
    scaffoldResult = scaffoldProject(templateDir, targetDir, scaffoldConfig);
  } catch (err) {
    logger.error(`Failed to scaffold project: ${(err as Error).message}`);
    process.exit(1);
  }

  // Report any warnings
  if (scaffoldResult.warnings.length > 0) {
    logger.warn("Warnings during scaffolding:");
    for (const warning of scaffoldResult.warnings) {
      logger.warn(`  ${warning}`);
    }
    logger.info("");
  }

  // Detect or use specified package manager
  const pm = packageManager || detect(targetDir);

  // Install dependencies (unless --no-install)
  if (!noInstall) {
    logger.info(`\nInstalling dependencies with ${pm}...`);

    let installCmd: string;
    switch (pm) {
      case "pnpm":
        installCmd = "pnpm install";
        break;
      case "yarn":
        installCmd = "yarn install";
        break;
      case "bun":
        installCmd = "bun install";
        break;
      default:
        installCmd = "npm install";
    }

    try {
      execSync(installCmd, {
        cwd: targetDir,
        stdio: "inherit",
      });
      logger.success("Dependencies installed");
    } catch (err) {
      logger.error(`Failed to install dependencies: ${(err as Error).message}`);
      logger.info(`Run manually: cd ${projectName} && ${installCmd}`);
    }
  }

  // Initialize git (unless --no-git)
  if (git) {
    logger.info("\nInitializing git repository...");

    try {
      execSync("git init", {
        cwd: targetDir,
        stdio: "pipe",
      });
      execSync("git add .", {
        cwd: targetDir,
        stdio: "pipe",
      });
      execSync('git commit -m "Initial commit"', {
        cwd: targetDir,
        stdio: "pipe",
      });
      logger.success("Git repository initialized");
    } catch (err) {
      logger.warn(
        `Could not initialize git: ${(err as Error).message}`,
      );
    }
  }

  // Success message
  logger.info("");
  logger.success(`Project created: ${logger.cyan(projectName)}`);
  logger.info("");
  logger.info("Next steps:");
  logger.info(`  ${logger.dim("$")} ${logger.cyan(`cd ${projectName}`)}`);
  logger.info("");

  // Template-specific instructions
  if (template === "nextjs-app") {
    logger.info(`  ${logger.dim("$")} ${logger.cyan("npm run dev")}`);
    logger.info("  Open http://localhost:3000");
  } else {
    logger.info(`  ${logger.dim("$")} ${logger.cyan("npm run dev")}`);
    logger.info("  Open http://localhost:5173");
  }

  logger.info("");
  logger.info("Add components:");
  logger.info(
    `  ${logger.dim("$")} ${logger.cyan("npx @orion-ds/cli add button card")}`,
  );
  logger.info("");
  logger.info("Learn more:");
  logger.info("  https://orion-ds.dev");
}
