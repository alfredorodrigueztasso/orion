# US-3.3 vs US-3.1: Architecture & Implementation Comparison

**Purpose**: Help developers understand where US-3.3 reuses US-3.1 patterns vs. introduces new patterns.

---

## Quick Summary

| Dimension | US-3.1 (Create) | US-3.3 (Build) | Relation |
|-----------|---|---|---|
| **Command** | `orion create <name>` | `orion build [flags]` | Sequential workflow |
| **Input** | User provides: project name | File system: componentDir | Build operates on output of create |
| **Output** | Complete scaffolded project | Optimized CSS artifacts | Post-processing step |
| **Size** | 250+ lines (scaffolding) | 150 lines (orchestration) | US-3.3 is leaner |
| **Dependencies** | 5 lib modules | 4 lib modules | Partially overlapping |
| **Reuse From US-3.1** | N/A | 80% of patterns | High leverage |

---

## Side-by-Side Workflow

### User Journey: US-3.1 + US-3.3

```bash
# PHASE 1: Create project (US-3.1)
$ npx @orion-ds/cli create my-app --brand=red
  ✓ Scaffolds React + Vite project
  ✓ Installs @orion-ds/react
  ✓ Creates orion.json
  ✓ Runs npm install
  ✓ Initializes git repo
  → Output: /my-app/ (full project)

$ cd my-app

# PHASE 2: Add components (existing `orion add`)
$ orion add button card modal
  ✓ Copies component source code
  ✓ Resolves dependencies
  → Output: src/components/orion/button/, .../card/, .../modal/

# PHASE 3: Optimize for production (US-3.3) — NEW
$ orion build --analyze
  ✓ Analyzes which tokens are used
  ✓ Tree-shakes unused tokens
  ✓ Minifies CSS
  ✓ Generates analysis report
  → Output: .orion-build/index.css (optimized)

$ npm run build
  ✓ Bundles app with optimized CSS
  ✓ Production bundle is 15-25% smaller
  → Output: dist/ (production-ready)
```

---

## Code Reuse Matrix

### ✅ Modules Directly Reusable from US-3.1

#### 1. **logger.ts** — Colored Console Output

```typescript
// US-3.1 Usage (Create command)
logger.success("Project created at /my-app");
logger.warn("Git init failed, skipping git repo");
logger.error("Invalid template name");

// US-3.3 Usage (Build command) — IDENTICAL
logger.success("Build complete: .orion-build/index.css");
logger.warn("No typescript field in orion.json, assuming true");
logger.error("No components found in componentDir");
```

**Reuse Status**: ✅ 100% — Zero changes needed

---

#### 2. **config.ts** — orion.json Loading

```typescript
// US-3.1 Usage
const config = loadConfig(process.cwd());
const componentDir = config.componentDir;

// US-3.3 Usage — IDENTICAL
const config = loadConfig(process.cwd());
const componentDir = config.componentDir;
```

**Reuse Status**: ✅ 100% — Zero changes needed

---

#### 3. **Argument Parsing Pattern**

```typescript
// US-3.1 Pattern
interface CreateArgs {
  projectName: string;
  template: string;
  packageManager?: PM;
  noInstall: boolean;
  // ... 5 more flags
}

function parseArgs(args: string[]): CreateArgs {
  for (const arg of args) {
    if (arg === "--no-install") noInstall = true;
    else if (arg.startsWith("--template=")) template = arg.split("=")[1];
    // ... flag handling
  }
  return { projectName, template, ... };
}

// US-3.3 Pattern — IDENTICAL STRUCTURE
interface BuildArgs {
  analyze: boolean;
  minify: boolean;
  treeShakeTokens: boolean;
  outputDir: string;
  watch: boolean;
  // ... more flags
}

function parseArgs(args: string[]): BuildArgs {
  for (const arg of args) {
    if (arg === "--analyze") analyze = true;
    else if (arg.startsWith("--output-dir=")) outputDir = arg.split("=")[1];
    // ... flag handling
  }
  return { analyze, minify, treeShakeTokens, ... };
}
```

**Reuse Status**: ✅ 90% — Copy pattern, adapt flag names

---

#### 4. **Error Handling**

```typescript
// US-3.1 Pattern
try {
  const parsed = parseArgs(args);
} catch (err) {
  logger.error((err as Error).message);
  process.exit(1);
}

// US-3.3 Pattern — IDENTICAL
try {
  const config = loadConfig(process.cwd());
} catch (err) {
  logger.error((err as Error).message);
  process.exit(1);
}
```

**Reuse Status**: ✅ 100% — Copy-paste pattern

---

#### 5. **Help/Documentation Pattern**

```typescript
// US-3.1 (index.ts)
function showHelp(): void {
  console.log(`
    ${logger.bold("@orion-ds/cli")} — Create new Orion project

    ${logger.bold("Usage:")}
      orion create <project>
      orion create my-app --template=vite-app

    ${logger.bold("Options:")}
      --template=<name>        Project template
      --no-install            Skip npm install
  `);
}

// US-3.3 (new section in index.ts) — SIMILAR PATTERN
function showBuildHelp(): void {
  console.log(`
    ${logger.bold("orion build")} — Optimize components for production

    ${logger.bold("Usage:")}
      orion build [options]
      orion build --analyze

    ${logger.bold("Options:")}
      --analyze               Generate build analysis report
      --no-minify            Skip CSS minification
  `);
}
```

**Reuse Status**: ✅ 85% — Copy pattern, adapt for build context

---

### ⚠️ Partially Reusable from US-3.1

#### 6. **package-manager.ts** — Dependency Detection

```typescript
// US-3.1 Usage
const pm = await detect();  // Detect npm, pnpm, yarn, bun
if (!pm) throw new Error("No package manager found");

// US-3.3 Usage — OPTIONAL (only if analyzing dependencies)
// → Not needed in first version of US-3.3
// Future: Might use for --analyze feature to detect bundler
```

**Reuse Status**: ⚠️ 10% — May use in future enhancements

---

### ❌ Not Reusable from US-3.1

#### 7. **scaffolder.ts** — Project Template Copying

```typescript
// US-3.1
scaffoldProject({  // Copies entire template directory
  projectDir,
  templateDir,
  variables: { projectName, brand, mode }
});

// US-3.3 — NOT NEEDED
// Build doesn't scaffold anything, only analyzes existing files
```

**Reuse Status**: ❌ 0% — Different purpose entirely

---

#### 8. **writer.ts** — File Writing (Partial)

```typescript
// US-3.1 Usage
writeFile(filePath, content); // Write template files (100+ files)

// US-3.3 Usage — DIFFERENT PATTERN
// ✅ Will use for writing build artifacts (3 files: index.css, variables.css, analysis.json)
// But logic is different: aggregating CSS, not templating
```

**Reuse Status**: ⚠️ 30% — Can adapt file writing, not templating logic

---

## Module Dependencies Comparison

### US-3.1 Dependency Graph

```
commands/create.ts
  ├─→ lib/logger.ts (colors, output)
  ├─→ lib/config.ts (orion.json)
  ├─→ lib/scaffolder.ts (template copying)
  ├─→ lib/package-manager.ts (npm/pnpm detection)
  └─→ lib/writer.ts (file operations)
```

### US-3.3 Dependency Graph

```
commands/build.ts
  ├─→ lib/logger.ts ✅ (reuse)
  ├─→ lib/config.ts ✅ (reuse)
  ├─→ lib/build-analyzer.ts (NEW)
  │   └─→ fs.readFileSync, regex matching
  ├─→ lib/tree-shaker.ts (NEW)
  │   └─→ string manipulation
  ├─→ lib/minifier.ts (NEW)
  │   └─→ CSS parsing/normalization
  └─→ lib/reporter.ts (NEW)
      └─→ JSON generation
```

### Venn Diagram

```
                  US-3.1 Modules
            ┌─────────────────────┐
            │   logger.ts         │
            │   config.ts         │  ← Shared (Reuse)
            │   package-manager   │
            │   scaffolder.ts     │
            │   writer.ts         │
            └─────────────────────┘
                        ∩
            ┌─────────────────────┐
            │  build.ts           │
            │ (argument parsing)   │ ← Error handling pattern
            │ (help text format)   │ ← Output format
            └─────────────────────┘
                        │
            ┌──────────────────────────────┐
            │   build-analyzer.ts (NEW)    │
            │   tree-shaker.ts (NEW)       │
            │   minifier.ts (NEW)          │
            │   reporter.ts (NEW)          │
            └──────────────────────────────┘
                 US-3.3 Unique Modules
```

---

## Implementation Line Count Estimate

### US-3.1 Breakdown (from actual codebase)

```
commands/create.ts         150 lines  (arg parsing, orchestration)
lib/scaffolder.ts          180 lines  (template copying logic)
lib/package-manager.ts     140 lines  (npm/pnpm/yarn detection)
lib/config.ts               80 lines  (orion.json loading)
lib/writer.ts               90 lines  (file writing)
lib/logger.ts               50 lines  (colored output)
──────────────────────
TOTAL US-3.1             ~690 lines
```

### US-3.3 Breakdown (Estimate)

```
commands/build.ts          150 lines  (arg parsing, orchestration)
lib/build-analyzer.ts      120 lines  (token reference extraction)
lib/tree-shaker.ts          80 lines  (unused token removal)
lib/minifier.ts             60 lines  (CSS minification)
lib/reporter.ts            100 lines  (analysis JSON generation)
lib/logger.ts               50 lines  (reused from US-3.1)
lib/config.ts               80 lines  (reused from US-3.1)
──────────────────────
TOTAL US-3.3             ~640 lines

NEW code (unique to US-3.3): ~350 lines
REUSED code (from US-3.1):  ~290 lines
```

---

## Testing Strategy Comparison

### US-3.1 Testing

```typescript
// Create tests (file structure, template copying, git init, etc.)
describe('create', () => {
  test('scaffolds project structure', () => { ... });
  test('installs dependencies', () => { ... });
  test('handles invalid project names', () => { ... });
});
```

### US-3.3 Testing (Reuses Test Patterns)

```typescript
// Build tests (analysis, tree-shaking, minification)
describe('build', () => {
  test('validates orion.json exists', () => { ... });  // ← Same error pattern as create
  test('analyzes token references', () => { ... });     // ← New test type
  test('removes unused tokens', () => { ... });         // ← New test type
  test('minifies CSS output', () => { ... });           // ← New test type
});

// Shared test utilities (both can use)
function createTestProject(components) { ... }
function loadTestConfig() { ... }
```

**Reuse**: ~40% of test infrastructure (error handling tests, config loading tests)

---

## Inline Comparison: Flag Parsing

### US-3.1: Create Command Flags

```typescript
// create.ts - Full implementation pattern

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
    throw new Error("Project name is required.");
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
    }
    else if (arg.startsWith("--package-manager=")) {
      packageManager = arg.split("=")[1] as PM;
    }
    else if (arg.startsWith("--brand=")) {
      brand = arg.split("=")[1]!;
    }
    else if (arg.startsWith("--mode=")) {
      mode = arg.split("=")[1]!;
    }
  }

  // Validate template
  if (!VALID_TEMPLATES.includes(template)) {
    throw new Error(`Invalid template: "${template}".`);
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
```

### US-3.3: Build Command Flags (Using Same Pattern)

```typescript
// build.ts - Can copy-paste and adapt

interface BuildArgs {
  analyze: boolean;
  minify: boolean;
  treeShakeTokens: boolean;
  outputDir: string;
  watch: boolean;
  statsOnly: boolean;
  verbose: boolean;
}

function parseArgs(args: string[]): BuildArgs {
  let analyze = false;
  let minify = true;
  let treeShakeTokens = true;
  let outputDir = ".orion-build";
  let watch = false;
  let statsOnly = false;
  let verbose = false;

  for (const arg of args) {
    if (arg === "--analyze") analyze = true;
    else if (arg === "--no-minify") minify = false;
    else if (arg === "--no-tree-shake-tokens") treeShakeTokens = false;
    else if (arg === "--watch") watch = true;
    else if (arg === "--stats-only") statsOnly = true;
    else if (arg === "--verbose") verbose = true;
    else if (arg.startsWith("--output-dir=")) {
      outputDir = arg.split("=")[1]!;
    }
    else if (arg === "--help" || arg === "-h") {
      showHelp();
      process.exit(0);
    }
  }

  return {
    analyze,
    minify,
    treeShakeTokens,
    outputDir,
    watch,
    statsOnly,
    verbose,
  };
}
```

**Observation**: Structure is identical, only flag names change. Easy to copy-paste and adapt.

---

## Orchestration Pattern Comparison

### US-3.1: Create Flow

```typescript
export async function create(args: string[]): Promise<void> {
  // 1. Parse and validate
  let parsed: CreateArgs;
  try {
    parsed = parseArgs(args);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // 2. Validate environment (Node version)
  const nodeVersion = process.versions.node;
  if (semverLt(nodeVersion, "18.0.0")) {
    logger.error("Requires Node 18+");
    process.exit(1);
  }

  // 3. Check project doesn't already exist
  if (fs.existsSync(parsed.projectName) && !parsed.overwrite) {
    logger.error(`Directory already exists: ${parsed.projectName}`);
    process.exit(1);
  }

  // 4. Detect package manager
  const pm = parsed.packageManager || await detect();

  // 5. Scaffold project
  const spin = logger.spinner("Creating project...");
  await scaffoldProject({ ... });
  spin.stop(logger.success("Project created!"));

  // 6. Install dependencies
  if (!parsed.noInstall) {
    const spin = logger.spinner("Installing dependencies...");
    execSync(`${pm} install`, { cwd: parsed.projectName });
    spin.stop(logger.success("Dependencies installed!"));
  }

  // 7. Initialize git
  if (parsed.git) {
    const spin = logger.spinner("Initializing git...");
    execSync("git init", { cwd: parsed.projectName });
    spin.stop(logger.success("Git initialized!"));
  }

  // 8. Summary
  logger.success(`
    🎉 Project created successfully!

    Next steps:
      cd ${parsed.projectName}
      npm run dev
  `);
}
```

### US-3.3: Build Flow (Same Structure, Different Steps)

```typescript
export async function build(args: string[]): Promise<void> {
  // 1. Parse and validate
  let parsed: BuildArgs;
  try {
    parsed = parseArgs(args);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // 2. Load config
  let config: Config;
  try {
    config = loadConfig(process.cwd());
  } catch (err) {
    logger.error(`orion.json not found. Run 'orion init' first.`);
    process.exit(1);
  }

  // 3. Validate components exist
  const componentDir = config.componentDir;
  if (!fs.existsSync(componentDir)) {
    logger.error(`No components found in ${componentDir}`);
    process.exit(1);
  }

  // 4. Analyze components
  const spin = logger.spinner("Analyzing components...");
  const usageMap = analyzeComponents(componentDir);
  spin.stop(logger.success(`Found ${Object.keys(usageMap).length} components`));

  // 5. Load and process CSS
  const spin = logger.spinner("Processing CSS...");
  let css = loadComponentCSS(componentDir);

  if (parsed.treeShakeTokens) {
    css = treeShakeTokens(css, usageMap);
  }

  if (parsed.minify) {
    css = minifyCSS(css);
  }
  spin.stop(logger.success("CSS processed"));

  // 6. Write output
  const spin = logger.spinner("Writing output...");
  const outputDir = parsed.outputDir;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(`${outputDir}/index.css`, css);
  spin.stop(logger.success(`Build artifact: ${outputDir}/index.css`));

  // 7. Generate analysis (optional)
  if (parsed.analyze) {
    const report = generateReport(usageMap, css);
    fs.writeFileSync(`${outputDir}/build-analysis.json`, JSON.stringify(report, null, 2));
    logger.success(`Analysis report: ${outputDir}/build-analysis.json`);
  }

  // 8. Summary
  logger.success(`
    ✨ Build complete!

    Import in your app:
      import '${outputDir}/index.css'
  `);
}
```

**Pattern Observation**: Both follow identical orchestration:
1. Parse args
2. Load/validate config
3. Process (scaffold vs. analyze)
4. Write output
5. Optional step (git init vs. analysis report)
6. Summary

---

## Key Takeaways for Implementation

### What Copy-Paste From US-3.1

1. **Entire argument parsing structure** (interface + for loop)
2. **Error handling pattern** (try-catch + logger.error + exit(1))
3. **Help text format** (logger.bold for headers)
4. **Spinner/progress pattern** (logger.spinner + spin.stop)
5. **Main orchestration loop** (validate → process → output → summary)

### What Adapt From US-3.1

1. **Module dependencies** (keep logger.ts + config.ts, add 4 new modules)
2. **Command routing** (add "build" case in index.ts switch)
3. **Flag validation** (new flags, same parsing pattern)

### What Ignore From US-3.1

1. Scaffolding logic (entirely different)
2. Package manager detection (not needed for build)
3. Template path resolution (not needed for build)
4. Git initialization (not needed for build)

---

## Estimated Copy-Paste Efficiency

| Activity | Lines | Effort | Reuse |
|----------|-------|--------|-------|
| Setup, types, interfaces | 50 | 15 min | 60% |
| Argument parsing | 50 | 20 min | 90% |
| Validation logic | 40 | 20 min | 70% |
| Error handling | 30 | 10 min | 100% |
| Logger integration | 20 | 5 min | 100% |
| Core logic (build-analyzer, etc.) | 360 | 6 hours | 0% |
| Testing infrastructure | 80 | 1.5 hours | 40% |
| Documentation | 30 | 45 min | 30% |
| **TOTAL** | **660** | **~8.5h actual coding** | **~60% from patterns** |

**Interpretation**: 8.5 hours of actual coding, but 60% of patterns/structure reused from US-3.1. Total 12-hour sprint estimate includes planning, QA, and buffer.

---

## Dependency Matrix (What Blocks What)

```
┌─────────────────────────────────────────┐
│ US-3.1 COMPLETE ✅                      │
│ (create command, argument parsing)      │
└──────────────┬──────────────────────────┘
               │
               ├─→ Patterns reusable for US-3.3
               │   (argument parsing, logger, error handling)
               │
               └─→ Configuration system (config.ts)
                   (both need orion.json)

┌──────────────────────────────────────────┐
│ US-3.3 CAN START (week 1-2)             │
│ (build command, no new blockers)         │
└──────────────────────────────────────────┘
```

**Conclusion**: US-3.3 has ZERO blockers. All dependencies are satisfied by existing code and US-3.1 completion.

---

**Last Updated**: 2026-03-18
**Author**: Product Owner
**Review Status**: Ready for Developer Kickoff
