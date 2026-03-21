/**
 * Tests for the doctor command
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  parseArgs,
  checkConfigExists,
  checkConfigFields,
  checkPackageInstalled,
  checkCssImport,
  checkOutputDirs,
} from "../commands/doctor.js";
import type { OrionConfig } from "../types.js";

describe("doctor command", () => {
  describe("parseArgs", () => {
    it("defaults to false for all flags", () => {
      const result = parseArgs([]);
      expect(result.fix).toBe(false);
      expect(result.json).toBe(false);
      expect(result.verbose).toBe(false);
    });

    it("extracts all boolean flags", () => {
      const result = parseArgs(["--fix", "--json", "--verbose"]);
      expect(result.fix).toBe(true);
      expect(result.json).toBe(true);
      expect(result.verbose).toBe(true);
    });

    it("ignores unknown flags", () => {
      const result = parseArgs(["--unknown", "--other"]);
      expect(result.fix).toBe(false);
      expect(result.json).toBe(false);
      expect(result.verbose).toBe(false);
    });
  });

  describe("checkConfigExists", () => {
    it("returns pass when orion.json exists", () => {
      const cwd = process.cwd();
      // This test will pass if orion.json exists in the project
      const result = checkConfigExists(cwd);
      if (result.status === "pass") {
        expect(result.status).toBe("pass");
        expect(result.message).toContain("orion.json");
      }
    });

    it("returns fail when orion.json does not exist", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-no-config");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const result = checkConfigExists(tempDir);
      expect(result.status).toBe("fail");
      expect(result.message).toBe("Not found");
      expect(result.fix).toBe("orion init");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });
  });

  describe("checkConfigFields", () => {
    it("passes with complete config", () => {
      const config: OrionConfig = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "product",
      };

      const result = checkConfigFields(config);
      expect(result.status).toBe("pass");
    });

    it("fails with missing required field", () => {
      const config: any = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        // missing sectionDir
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "product",
      };

      const result = checkConfigFields(config);
      expect(result.status).toBe("fail");
      expect(result.message).toContain("Missing");
    });

    it("fails with invalid brand", () => {
      const config: any = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "invalid-brand",
        mode: "product",
      };

      const result = checkConfigFields(config);
      expect(result.status).toBe("fail");
      expect(result.message).toContain("Invalid brand");
    });

    it("fails with invalid mode", () => {
      const config: any = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "invalid-mode",
      };

      const result = checkConfigFields(config);
      expect(result.status).toBe("fail");
      expect(result.message).toContain("Invalid mode");
    });
  });

  describe("checkPackageInstalled", () => {
    it("detects @orion-ds/react installation in project", () => {
      const cwd = process.cwd();
      const result = checkPackageInstalled(cwd);

      // In the Orion monorepo, the package should be installed at workspace root
      if (result.status === "pass") {
        expect(result.message).toContain("installed");
      }
    });

    it("returns fail when package not installed", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-no-pkg");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const result = checkPackageInstalled(tempDir);
      expect(result.status).toBe("fail");
      expect(result.message).toBe("Not installed");
      expect(result.fix).toContain("npm install");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });
  });

  describe("checkCssImport", () => {
    it("detects CSS import in entry files", () => {
      // Create a temporary directory with a main.ts that has the import
      const tempDir = path.join(process.cwd(), ".test-doctor-css-check");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir, { recursive: true });

      const mainFile = path.join(srcDir, "main.ts");
      fs.writeFileSync(mainFile, "import '@orion-ds/react/styles.css';\n");

      const result = checkCssImport(tempDir);
      expect(result.status).toBe("pass");
      expect(result.message).toContain("src/main.ts");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it("returns fail when CSS import not found", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-no-css");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir, { recursive: true });

      const mainFile = path.join(srcDir, "main.ts");
      fs.writeFileSync(mainFile, "// no imports\n");

      const result = checkCssImport(tempDir);
      expect(result.status).toBe("fail");
      expect(result.message).toContain("Not found");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });
  });

  describe("checkOutputDirs", () => {
    it("passes when all output directories exist", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-dirs-ok");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const config: OrionConfig = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "product",
      };

      // Create the directories
      fs.mkdirSync(path.join(tempDir, config.componentDir), {
        recursive: true,
      });
      fs.mkdirSync(path.join(tempDir, config.sectionDir), { recursive: true });
      fs.mkdirSync(path.join(tempDir, config.templateDir), { recursive: true });

      const result = checkOutputDirs(config, tempDir);
      expect(result.status).toBe("pass");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it("warns when some directories are missing", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-dirs-missing");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const config: OrionConfig = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "product",
      };

      // Only create componentDir
      fs.mkdirSync(path.join(tempDir, config.componentDir), {
        recursive: true,
      });

      const result = checkOutputDirs(config, tempDir);
      expect(result.status).toBe("warn");
      expect(result.message).toContain("Not created yet");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });

    it("skips when config has empty paths", () => {
      const tempDir = path.join(process.cwd(), ".test-doctor-empty-paths");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const config: any = {
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "",
        sectionDir: "src/sections",
        templateDir: "src/templates",
        typescript: true,
        brand: "orion",
        mode: "product",
      };

      const result = checkOutputDirs(config, tempDir);
      expect(result.status).toBe("skip");

      // Cleanup
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true });
      }
    });
  });
});
