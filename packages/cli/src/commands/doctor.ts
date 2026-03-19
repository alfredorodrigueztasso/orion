/**
 * Doctor — Check project health and diagnose common issues
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { OrionConfig, DoctorArgs, DoctorCheck } from "../types.js";
import { findConfigPath, loadConfig, getTargetDir } from "../lib/config.js";
import { fetchIndex } from "../lib/registry.js";
import * as logger from "../lib/logger.js";

export function parseArgs(args: string[]): DoctorArgs {
  return {
    fix: args.includes("--fix"),
    json: args.includes("--json"),
    verbose: args.includes("--verbose"),
  };
}

export function checkConfigExists(cwd: string): DoctorCheck {
  const configPath = findConfigPath(cwd);

  if (!configPath) {
    return {
      name: "orion.json",
      status: "fail",
      message: "Not found",
      fix: "orion init",
    };
  }

  return {
    name: "orion.json",
    status: "pass",
    message: `Found at ${path.relative(cwd, configPath)}`,
  };
}

export function checkConfigFields(config: OrionConfig): DoctorCheck {
  const required = ["registryUrl", "componentDir", "sectionDir", "templateDir", "typescript", "brand", "mode"];
  const missing = required.filter((field) => !(field in config) || (config as any)[field] === "");

  if (missing.length > 0) {
    return {
      name: "Config fields",
      status: "fail",
      message: `Missing or empty: ${missing.join(", ")}`,
      fix: `Edit orion.json and add: ${missing.join(", ")}`,
    };
  }

  const validBrands = ["orion", "red", "deepblue", "orange"];
  if (!validBrands.includes(config.brand)) {
    return {
      name: "Config fields",
      status: "fail",
      message: `Invalid brand: ${config.brand}`,
      fix: `Set brand to one of: ${validBrands.join(", ")}`,
    };
  }

  const validModes = ["display", "product", "app"];
  if (!validModes.includes(config.mode)) {
    return {
      name: "Config fields",
      status: "fail",
      message: `Invalid mode: ${config.mode}`,
      fix: `Set mode to one of: ${validModes.join(", ")}`,
    };
  }

  return {
    name: "Config fields",
    status: "pass",
    message: "All required fields present",
  };
}

export function checkPackageInstalled(cwd: string): DoctorCheck {
  // Walk up to find node_modules
  let current = cwd;
  let nodeModulesPath: string | null = null;

  for (let i = 0; i < 10; i++) {
    const candidate = path.join(current, "node_modules", "@orion-ds", "react");
    if (fs.existsSync(candidate)) {
      nodeModulesPath = candidate;
      break;
    }
    const parent = path.dirname(current);
    if (parent === current) break; // reached root
    current = parent;
  }

  if (!nodeModulesPath) {
    return {
      name: "@orion-ds/react",
      status: "fail",
      message: "Not installed",
      fix: "npm install @orion-ds/react",
    };
  }

  // Try to read version from package.json
  try {
    const pkgPath = path.join(nodeModulesPath, "package.json");
    const content = fs.readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(content);
    return {
      name: "@orion-ds/react",
      status: "pass",
      message: `v${pkg.version} installed`,
    };
  } catch {
    return {
      name: "@orion-ds/react",
      status: "pass",
      message: "Installed",
    };
  }
}

export function checkCssImport(cwd: string): DoctorCheck {
  const entryFiles = [
    "src/main.ts", "src/main.tsx",
    "src/index.ts", "src/index.tsx",
    "src/App.tsx", "src/App.ts",
    "app/layout.tsx", "app/layout.ts",
    "pages/_app.tsx", "pages/_app.ts",
  ];

  const cssImportPatterns = [
    "@orion-ds/react/styles.css",
    "@orion-ds/react/theme.css",
  ];

  for (const file of entryFiles) {
    const filePath = path.join(cwd, file);
    if (!fs.existsSync(filePath)) continue;

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      for (const pattern of cssImportPatterns) {
        if (content.includes(pattern)) {
          return {
            name: "CSS import",
            status: "pass",
            message: `Found in ${file}`,
          };
        }
      }
    } catch {
      // file read error, continue
    }
  }

  return {
    name: "CSS import",
    status: "fail",
    message: "Not found in entry files",
    fix: "Add to your entry file:\n       import '@orion-ds/react/styles.css'",
  };
}

export function checkOutputDirs(config: OrionConfig, cwd: string): DoctorCheck {
  const dirs = [
    { name: "componentDir", path: config.componentDir },
    { name: "sectionDir", path: config.sectionDir },
    { name: "templateDir", path: config.templateDir },
  ];

  const missing: string[] = [];
  for (const dir of dirs) {
    if (!dir.path || dir.path === "") {
      return {
        name: "Output directories",
        status: "skip",
        message: "Cannot check: config has empty paths",
      };
    }
    const fullPath = path.join(cwd, dir.path);
    if (!fs.existsSync(fullPath)) {
      missing.push(dir.name);
    }
  }

  if (missing.length > 0) {
    return {
      name: "Output directories",
      status: "warn",
      message: `Not created yet: ${missing.join(", ")}`,
      fix: "orion add button",
    };
  }

  return {
    name: "Output directories",
    status: "pass",
    message: "All directories exist",
  };
}

export async function checkRegistryConnectivity(registryUrl: string): Promise<DoctorCheck> {
  const startTime = Date.now();

  try {
    await fetchIndex(registryUrl);
    const latency = Date.now() - startTime;
    return {
      name: "Registry",
      status: "pass",
      message: `${registryUrl} (${latency}ms)`,
    };
  } catch (err) {
    return {
      name: "Registry",
      status: "warn",
      message: `Unreachable: ${(err as Error).message}`,
      fix: `Check network or change registryUrl in orion.json`,
    };
  }
}

function printResults(checks: DoctorCheck[], _args: DoctorArgs): void {
  const pass = checks.filter((c) => c.status === "pass").length;
  const fail = checks.filter((c) => c.status === "fail").length;
  const warn = checks.filter((c) => c.status === "warn").length;

  console.log("");
  console.log(logger.bold("Orion Doctor — Project Health Check"));
  console.log(logger.dim("─".repeat(50)));
  console.log("");

  for (const check of checks) {
    let icon = "  ";
    if (check.status === "pass") {
      icon = logger.green("✓");
    } else if (check.status === "fail") {
      icon = logger.red("✗");
    } else if (check.status === "warn") {
      icon = logger.yellow("⚠");
    } else if (check.status === "skip") {
      icon = logger.dim("–");
    }

    console.log(`${icon}  ${check.name.padEnd(24)} ${check.message}`);
  }

  console.log("");
  console.log(logger.dim("─".repeat(50)));

  if (fail > 0 || warn > 0) {
    console.log(`${fail} error${fail !== 1 ? "s" : ""}, ${warn} warning${warn !== 1 ? "s" : ""}`);
    console.log("");
    console.log(logger.bold("Issues:"));

    for (const check of checks) {
      if (check.status === "fail") {
        console.log(`  ${logger.red("✗")}  ${check.name} — ${check.fix}`);
      } else if (check.status === "warn") {
        console.log(`  ${logger.yellow("⚠")}  ${check.name} — ${check.fix}`);
      }
    }
  } else {
    console.log(logger.green("✓  All checks passed!"));
  }

  console.log("");
}

export async function doctor(args: string[]): Promise<void> {
  const cwd = process.cwd();
  const parsed = parseArgs(args);

  // Run checks 1-5 (sync)
  const checks: DoctorCheck[] = [];

  const configExistsCheck = checkConfigExists(cwd);
  checks.push(configExistsCheck);

  let config: OrionConfig | null = null;
  if (configExistsCheck.status === "pass") {
    try {
      config = loadConfig(cwd);
      checks.push(checkConfigFields(config));
      checks.push(checkPackageInstalled(cwd));
      checks.push(checkCssImport(cwd));
      checks.push(checkOutputDirs(config, cwd));
    } catch (err) {
      checks.push({
        name: "Config fields",
        status: "fail",
        message: `Cannot parse: ${(err as Error).message}`,
      });
    }
  } else {
    // Config doesn't exist, skip dependent checks
    checks.push({
      name: "Config fields",
      status: "skip",
      message: "Skipped: requires orion.json",
    });
    checks.push({
      name: "@orion-ds/react",
      status: "skip",
      message: "Skipped: requires orion.json",
    });
    checks.push({
      name: "CSS import",
      status: "skip",
      message: "Skipped: requires orion.json",
    });
    checks.push({
      name: "Output directories",
      status: "skip",
      message: "Skipped: requires orion.json",
    });
  }

  // Run check 6 (async)
  let spinner: ReturnType<typeof logger.spinner> | null = null;
  if (!parsed.json) {
    spinner = logger.spinner("Checking registry connectivity...");
  }

  let registryCheck: DoctorCheck;
  if (config) {
    registryCheck = await checkRegistryConnectivity(config.registryUrl);
  } else {
    registryCheck = {
      name: "Registry",
      status: "skip",
      message: "Skipped: requires orion.json",
    };
  }

  if (spinner) {
    spinner.stop();
  }
  checks.push(registryCheck);

  // Output
  if (parsed.json) {
    const fail = checks.filter((c) => c.status === "fail").length;
    const result = {
      status: fail > 0 ? "fail" : "pass",
      checks,
      summary: {
        pass: checks.filter((c) => c.status === "pass").length,
        fail,
        warn: checks.filter((c) => c.status === "warn").length,
        skip: checks.filter((c) => c.status === "skip").length,
      },
    };
    console.log(JSON.stringify(result, null, 2));
  } else {
    printResults(checks, parsed);
  }

  const fail = checks.filter((c) => c.status === "fail").length;
  process.exit(fail > 0 ? 1 : 0);
}
