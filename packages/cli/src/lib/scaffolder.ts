/**
 * Scaffolder — Generate project from template with variable interpolation
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as logger from "./logger.js";

export interface ScaffoldConfig {
  projectName: string;
  typescript?: boolean;
  brand?: string;
  mode?: string;
  packageManager?: "npm" | "pnpm" | "yarn" | "bun";
}

export interface ScaffoldResult {
  filesCreated: string[];
  warnings: string[];
}

/**
 * Interpolate variables in text content
 * Supports: {{projectName}}, {{typescript}}, {{brand}}, {{mode}}
 */
function interpolate(content: string, vars: Record<string, string>): string {
  let result = content;
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    result = result.replace(pattern, value);
  }
  return result;
}

/**
 * Check if path should be skipped during traversal
 */
function shouldSkip(filePath: string): boolean {
  const basename = path.basename(filePath);
  const skipped = [".git", "node_modules", ".next", "dist", ".env", ".env.local"];
  return skipped.includes(basename);
}

/**
 * Scaffold a project from a template directory
 * @param templateDir - Source template directory (e.g., packages/cli/templates/react-app)
 * @param targetDir - Target project directory to create
 * @param config - Scaffold configuration
 * @returns Result with list of created files
 */
export function scaffoldProject(
  templateDir: string,
  targetDir: string,
  config: ScaffoldConfig,
): ScaffoldResult {
  const filesCreated: string[] = [];
  const warnings: string[] = [];

  // Validate inputs
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`);
  }

  const vars = {
    projectName: config.projectName,
    typescript: config.typescript ? "true" : "false",
    brand: config.brand || "orion",
    mode: config.mode || "product",
  };

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Recursively copy and interpolate files
  function walkDir(src: string, dest: string): void {
    if (shouldSkip(src)) return;

    const stat = fs.statSync(src);

    if (stat.isDirectory()) {
      // Create directory
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      // Process directory contents
      const entries = fs.readdirSync(src);
      for (const entry of entries) {
        walkDir(path.join(src, entry), path.join(dest, entry));
      }
    } else if (stat.isFile()) {
      // Read file
      let content = fs.readFileSync(src, "utf-8");

      // Special handling for specific files
      const basename = path.basename(src);

      if (basename === "package.json") {
        // Parse JSON, update name, interpolate, and reserialize
        try {
          const pkg = JSON.parse(content);
          pkg.name = config.projectName;

          // Interpolate description and other string fields
          for (const key in pkg) {
            if (typeof pkg[key] === "string") {
              pkg[key] = interpolate(pkg[key], vars);
            }
          }

          content = JSON.stringify(pkg, null, 2) + "\n";
        } catch (err) {
          warnings.push(`Failed to parse package.json: ${(err as Error).message}`);
          // Fall back to regular interpolation
          content = interpolate(content, vars);
        }
      } else if (basename === "orion.json") {
        // Parse JSON, update config fields, and reserialize
        try {
          const orionCfg = JSON.parse(content);
          orionCfg.brand = config.brand || "orion";
          orionCfg.mode = config.mode || "product";
          orionCfg.typescript = config.typescript !== false;
          content = JSON.stringify(orionCfg, null, 2) + "\n";
        } catch (err) {
          warnings.push(`Failed to parse orion.json: ${(err as Error).message}`);
          content = interpolate(content, vars);
        }
      } else if (
        basename === ".gitignore" ||
        basename === ".eslintrc.json" ||
        basename === ".prettierrc" ||
        basename.endsWith(".json") ||
        basename.endsWith(".ts") ||
        basename.endsWith(".tsx") ||
        basename.endsWith(".md") ||
        basename.endsWith(".css") ||
        basename.endsWith(".html")
      ) {
        // Interpolate template variables
        content = interpolate(content, vars);
      }

      // Ensure directory exists
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(dest, content, "utf-8");
      const relPath = path.relative(targetDir, dest);
      filesCreated.push(relPath);
      logger.info(`  ${logger.dim(relPath)}`);
    }
  }

  logger.info(`\nScaffolding project files...`);
  walkDir(templateDir, targetDir);

  return {
    filesCreated,
    warnings,
  };
}
