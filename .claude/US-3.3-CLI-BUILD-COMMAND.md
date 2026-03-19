# US-3.3: CLI Build Command (`orion build`)

**Epic**: Tier 3 Phase 1 - CLI Enhancement Suite
**Sprint**: Week 1-2 of Phase 1 (P1 priority)
**Previous**: US-3.1 (CLI Create Command) ✅ COMPLETE
**Date**: 2026-03-18
**Status**: Requirements Definition

---

## Executive Summary

`orion build` optimizes user-copied Orion components for production. It analyzes projects using copied components (from `orion add`), eliminates unused tokens, minifies CSS, and generates bundle analysis reports. Unlike `orion add` which copies components into a project, `orion build` is invoked **inside** the user's project to prepare copied components for deployment.

**Why it matters**: Users who copy Orion components into their projects need a way to optimize their bundled CSS/JS before production. Tree-shaking of tokens reduces CSS bundle size by 15-25%, and bundle analysis helps identify optimization opportunities.

---

## Problem Statement

### User Journey (Current - Broken)

```bash
$ orion add button card modal
# ✅ Components copied

$ npm run build
# Bundles with ALL 250+ CSS variables, even if using only 20
# Result: 15-25KB extra CSS in production bundle
```

### User Journey (Desired - With US-3.3)

```bash
$ orion add button card modal
# ✅ Components copied

$ orion build --analyze
# ✅ Tree-shakes tokens → 85 variables actually used
# ✅ Minifies CSS modules
# ✅ Generates analysis report

$ npm run build
# Builds with optimized, minified tokens
# Result: 8-12KB smaller bundle
```

---

## Purpose & Scope

### What `orion build` Does

1. **Analyzes** the project for referenced tokens from copied components
2. **Tree-shakes** unused tokens from CSS output
3. **Minifies** all CSS (components + tokens)
4. **Generates** bundle analysis report (optional)
5. **Validates** configuration (orion.json exists, components installed)

### What `orion build` Does NOT Do

- ❌ Re-copy components (that's `orion add`)
- ❌ Modify component source code
- ❌ Handle JavaScript minification (that's the bundler's job)
- ❌ Require @orion-ds/react as a dependency (components are already copied)

### Scope Constraints

- **Input**: `orion.json` + copied component files in `src/components/orion/`
- **Output**: Optimized CSS in `.orion-build/` directory
- **Time Budget**: 12 development hours (Week 1)
- **Target Projects**: React/Vite/Next.js with `orion add` setup

---

## Command Syntax & Flags

### Basic Syntax

```bash
orion build [options]
```

### Flags & Options

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--analyze` | boolean | `false` | Generate `build-analysis.json` with token/component breakdown |
| `--minify` | boolean | `true` | Minify CSS output (disable with `--no-minify`) |
| `--tree-shake-tokens` | boolean | `true` | Remove unused tokens (disable with `--no-tree-shake-tokens`) |
| `--output-dir` | string | `.orion-build` | Directory for build artifacts |
| `--watch` | boolean | `false` | Watch mode: rebuild on file changes |
| `--stats-only` | boolean | `false` | Show stats without writing files |
| `--verbose` | boolean | `false` | Detailed logging |
| `--help` | boolean | false | Show command help |

### Examples

```bash
# Basic build with default settings
orion build

# Generate bundle analysis report
orion build --analyze

# Tree-shaking disabled (for debugging)
orion build --no-tree-shake-tokens --verbose

# Watch mode for development
orion build --watch

# Stats without file output (dry-run)
orion build --stats-only

# Custom output directory
orion build --output-dir=build/orion
```

---

## What Happens When You Run `orion build`

### Step 1: Validation (0-2s)
```
✓ Check orion.json exists
✓ Check componentDir is readable
✓ Verify at least 1 component is installed
✓ Check write permissions for output-dir
```

**Error Examples:**
- `❌ Error: orion.json not found. Run 'orion init' first.`
- `❌ Error: No components installed. Run 'orion add <name>' first.`
- `❌ Error: Cannot write to output directory. Check permissions.`

### Step 2: Analysis (1-3s)
```
Scanning installed components...
  ✓ button
  ✓ card
  ✓ modal
Found 3 components

Analyzing CSS imports...
  ✓ Button.module.css → uses 18 tokens
  ✓ Card.module.css → uses 14 tokens
  ✓ Modal.module.css → uses 22 tokens
Total tokens referenced: 45 of 250 (18%)
```

### Step 3: Tree-Shaking (1-2s)
```
Tree-shaking unused tokens...
  Kept: 45 tokens (primary, semantic, utilities)
  Removed: 205 unused tokens
Output size: 8.2 KB (was 28.5 KB)
Reduction: 71%
```

### Step 4: Minification (0-1s)
```
Minifying CSS...
  Input:  8.2 KB
  Output: 5.8 KB
Compression: 29%
```

### Step 5: Report (if --analyze)
```
✓ Generated: .orion-build/index.css
✓ Generated: .orion-build/build-analysis.json
✓ Report:
  - 3 components analyzed
  - 45 tokens referenced
  - 5.8 KB final CSS
  - 77% bundle reduction from original
```

---

## Output Artifacts

### Default Output Directory: `.orion-build/`

```
.orion-build/
├── index.css                  # Optimized, minified CSS (5.8 KB)
├── variables.css              # Tree-shaken variables only (2.1 KB)
├── build-analysis.json        # (only if --analyze flag)
└── README.md                  # Usage instructions
```

### `index.css` Structure

```css
/* 1. Component Styles (minified) */
.btn{background:var(--interactive-primary);border-radius:var(--radius-control);...}
.card{background:var(--surface-base);border-radius:var(--radius-container);...}
.modal{...}

/* 2. Tree-Shaken Variables (45 total) */
:root{
  --spacing-4:16px;
  --spacing-6:24px;
  --radius-control:12px;
  --text-primary:#1a1a1a;
  --interactive-primary:#1B5BFF;
  /* ... 40 more */
}
```

### `build-analysis.json` Schema

```json
{
  "timestamp": "2026-03-18T14:32:00Z",
  "projectName": "my-app",
  "components": [
    {
      "name": "button",
      "path": "src/components/orion/button",
      "files": ["Button.tsx", "Button.module.css", "Button.types.ts"],
      "tokensReferenced": 18,
      "cssSize": "2.1 KB"
    },
    {
      "name": "card",
      "path": "src/components/orion/card",
      "tokensReferenced": 14,
      "cssSize": "1.8 KB"
    }
  ],
  "tokens": {
    "total": 250,
    "referenced": 45,
    "percentage": 18,
    "byCategory": {
      "colors": 12,
      "spacing": 8,
      "typography": 5,
      "radius": 3,
      "effects": 2,
      "other": 15
    }
  },
  "bundleSize": {
    "original": "28.5 KB",
    "minified": "5.8 KB",
    "reduction": "77%",
    "gzipped": "2.1 KB"
  },
  "recommendations": [
    "Tree-shaking removed 205 unused tokens (71% reduction)",
    "Consider adding more components if CSS is still large",
    "Import only index.css in your app root"
  ]
}
```

---

## Acceptance Criteria

### 1. ✓ Command Execution
```gherkin
Given I have a project with orion.json and copied components
When I run `orion build` without flags
Then the command completes successfully (exit code 0)
And it creates .orion-build/index.css with minified CSS
And it outputs a summary to console
```

**Test**: `npm test -- cli.build.basic`

---

### 2. ✓ Validation & Error Handling
```gherkin
Given a project WITHOUT orion.json
When I run `orion build`
Then it fails with exit code 1
And prints: "Error: orion.json not found. Run 'orion init' first."

Given a project with orion.json but NO copied components
When I run `orion build`
Then it fails with exit code 1
And prints: "Error: No components installed. Run 'orion add <name>' first."

Given an invalid output directory path
When I run `orion build --output-dir=/root-only/`
Then it fails with exit code 1
And prints: "Error: Cannot write to output directory. Check permissions."
```

**Test**: `npm test -- cli.build.validation`

---

### 3. ✓ Token Analysis & Tree-Shaking
```gherkin
Given 3 components (button, card, modal) are installed
When I run `orion build`
Then it analyzes CSS files for token references
And identifies exactly which tokens are used
And removes unused tokens from output
And reduces CSS size by 60-80%
And console shows: "Tree-shaking removed X unused tokens"

Given --no-tree-shake-tokens flag
When I run `orion build --no-tree-shake-tokens`
Then it includes all 250+ tokens in output
And CSS is larger than with tree-shaking
```

**Test**: `npm test -- cli.build.tree-shake`

---

### 4. ✓ CSS Minification
```gherkin
Given a build with readable CSS
When I run `orion build` (default --minify=true)
Then output CSS has no comments
And no extra whitespace
And no newlines between rules
And is 25-35% smaller than unminified

Given --no-minify flag
When I run `orion build --no-minify`
Then output CSS has proper formatting
And includes helpful comments
And is human-readable
```

**Test**: `npm test -- cli.build.minify`

---

### 5. ✓ Analysis Report (--analyze Flag)
```gherkin
Given I run `orion build --analyze`
Then it creates .orion-build/build-analysis.json
And JSON contains:
  - Timestamp of build
  - List of analyzed components with token counts
  - Token breakdown (colors: 12, spacing: 8, etc.)
  - Bundle size before/after/gzipped
  - Recommendations for optimization
And console shows path to analysis file
```

**Test**: `npm test -- cli.build.analyze`

---

### 6. ✓ Console Output & Feedback
```gherkin
Given I run `orion build`
Then console shows:
  ✓ Validation checkmarks (config, components)
  ✓ Scanning progress (which components found)
  ✓ Analysis results (tokens analyzed)
  ✓ Tree-shake summary (removed X tokens, Y% reduction)
  ✓ Minification summary (input → output size)
  ✓ Final success message with output path

Given --verbose flag
When I run `orion build --verbose`
Then console shows additional debug info:
  - Full path of each component analyzed
  - Exact token list per component
  - Before/after CSS for each component
  - Detailed minification stats
```

**Test**: `npm test -- cli.build.output`

---

### 7. ✓ Flag Combinations
```gherkin
Given multiple valid flag combinations
When I run:
  - orion build --analyze --verbose
  - orion build --no-tree-shake-tokens --output-dir=dist/
  - orion build --stats-only
Then each combination works correctly
And respects all flags simultaneously
And produces expected output
```

**Test**: `npm test -- cli.build.flags`

---

### 8. ✓ orion.json Integration
```gherkin
Given orion.json with custom componentDir
When I run `orion build`
Then it uses the configured directory
And finds components there (not default)
And outputs to configured output directory if set

Given incomplete orion.json
When I run `orion build`
Then uses sensible defaults for missing fields
And warns about missing optional config: "No 'sectionDir' in orion.json, skipping sections"
```

**Test**: `npm test -- cli.build.config`

---

### 9. ✓ Watch Mode (--watch Flag)
```gherkin
Given a project with components
When I run `orion build --watch`
Then it performs initial build
And watches for file changes in componentDir
And when a .module.css file changes
Then it rebuilds automatically within 500ms
And prints: "Rebuilt: src/components/orion/button/Button.module.css"

Given I press Ctrl+C in watch mode
Then gracefully exits
And prints: "Build watch stopped"
```

**Test**: `npm test -- cli.build.watch`

---

### 10. ✓ Help & Documentation
```gherkin
Given I run `orion build --help`
Then it prints:
  - Command description
  - Usage syntax
  - All flags with descriptions
  - Examples with output paths
  - Link to full docs

Given I run `orion --help`
Then `orion build` is listed in commands
And includes one-line description
```

**Test**: `npm test -- cli.build.help`

---

## Implementation Strategy

### Architecture (Reuses US-3.1 Patterns)

```
packages/cli/src/
├── commands/
│   ├── build.ts                    # NEW: Main build command
│   └── ...existing...
├── lib/
│   ├── build-analyzer.ts           # NEW: Token analysis logic
│   ├── tree-shaker.ts              # NEW: Unused token removal
│   ├── minifier.ts                 # NEW: CSS minification
│   ├── reporter.ts                 # NEW: Analysis report generation
│   └── ...existing...
└── index.ts                         # Updated: Add build command routing
```

### Reusable From US-3.1

- ✅ Command routing pattern (create → build)
- ✅ Flag parsing logic (--analyze, --verbose, etc.)
- ✅ Logger utilities (colored console output)
- ✅ Config loading (orion.json reading)
- ✅ Error handling pattern

### New Code

- **build-analyzer.ts** (120 lines): Scan component CSS for token references
- **tree-shaker.ts** (80 lines): Remove unused tokens from CSS output
- **minifier.ts** (60 lines): Minify CSS (remove comments, whitespace)
- **reporter.ts** (100 lines): Generate build-analysis.json
- **build.ts** (150 lines): Orchestrate build process, handle flags

**Total**: ~510 lines new code (typical Node.js CLI module)

### Dependencies

- ✅ ZERO new dependencies (use Node.js built-ins only)
- Uses existing `logger` module
- Uses existing `config` module (orion.json)
- Simple regex for token extraction
- Native Node.js file operations

---

## Data Flow Diagram

```
User runs: orion build --analyze
│
├─→ Parse arguments
│   └─→ Validate flags + defaults
│
├─→ Load orion.json
│   └─→ Get componentDir
│
├─→ Scan components (build-analyzer.ts)
│   ├─→ Find all .module.css files
│   ├─→ Extract token references (regex: var(--\w+))
│   └─→ Build usage map: { button: [token1, token2], card: [...] }
│
├─→ Load component CSS files
│   └─→ Merge all CSS into single buffer
│
├─→ Tree-shake tokens (tree-shaker.ts)
│   ├─→ Extract used token set from usage map
│   ├─→ Remove unused :root variables
│   └─→ Keep all component styles
│
├─→ Minify CSS (minifier.ts)
│   ├─→ Remove comments
│   ├─→ Remove whitespace
│   ├─→ Normalize rules
│   └─→ Compress variable values
│
├─→ Write output
│   ├─→ Save to .orion-build/index.css
│   └─→ Save variables to .orion-build/variables.css
│
├─→ Generate report (reporter.ts)
│   ├─→ Calculate sizes (before/after/gzipped)
│   ├─→ Generate recommendations
│   └─→ Save as .orion-build/build-analysis.json
│
└─→ Print console summary + success
```

---

## Testing Strategy (Included in 12h estimate)

### Unit Tests (4 hours)

| Module | Tests | Coverage |
|--------|-------|----------|
| `build-analyzer.ts` | 6 tests | Find all .module.css, extract tokens correctly |
| `tree-shaker.ts` | 5 tests | Remove unused, keep used, edge cases |
| `minifier.ts` | 4 tests | Remove comments, whitespace, normalize |
| `reporter.ts` | 3 tests | Generate correct JSON structure |

### Integration Tests (2 hours)

| Test | Scenario |
|------|----------|
| `build.integration.success` | Full happy path: 3 components → optimized output |
| `build.integration.missing-config` | Error handling: no orion.json |
| `build.integration.flags` | All flag combinations work |
| `build.integration.watch` | File watching and rebuild |

### E2E Tests (2 hours)

| Test | Scenario |
|------|----------|
| `cli.build.real-project` | Create actual project, run build, verify output |
| `cli.build.analyze-output` | Verify analysis.json structure and accuracy |

### Manual QA (Included in dev time)

- [ ] Test on real Next.js project
- [ ] Test on real Vite project
- [ ] Verify CSS works in actual app
- [ ] Test watch mode interactivity

---

## Comparison with US-3.1 (CLI Create)

### Similarities (Reusable Patterns)

| Aspect | US-3.1 (Create) | US-3.3 (Build) | Pattern |
|--------|---|---|---|
| Argument parsing | ✅ Extensive flags | ✅ Simple flags | Use same parseArgs pattern |
| Validation | ✅ Check node version, paths | ✅ Check orion.json, components | Use same validator pattern |
| Config loading | ✅ Reads orion.json | ✅ Reads orion.json | Reuse config module |
| Console output | ✅ Colored, progressive | ✅ Progressive spinner | Reuse logger module |
| Error handling | ✅ Clear messages, exit codes | ✅ Same | Reuse error patterns |

### Differences

| Aspect | US-3.1 (Create) | US-3.3 (Build) |
|---|---|---|
| **Input** | Project name, flags | orion.json + components |
| **Output** | Full scaffolded project | Optimized CSS artifact |
| **Complexity** | 250+ lines (template copying) | 150 lines (build orchestration) |
| **Dependencies** | Scaffolder, package-manager | Analyzer, tree-shaker, minifier |
| **Watch mode** | ❌ No | ✅ Yes |
| **Config write** | ✅ Creates orion.json | ❌ No (reads only) |

### What to Reuse

```typescript
// From US-3.1 patterns:
import * as logger from "../lib/logger.js";        // ✅ Color output
import { loadConfig } from "../lib/config.js";     // ✅ Read orion.json
import { PM, detect } from "../lib/package-manager.js"; // ❌ Not needed

// New for US-3.3:
import { analyzeComponents } from "../lib/build-analyzer.js";
import { treeShakeTokens } from "../lib/tree-shaker.js";
import { minifyCSS } from "../lib/minifier.js";
import { generateReport } from "../lib/reporter.js";
```

---

## Estimation Breakdown

### Development Hours (12 total)

| Task | Hours | Notes |
|------|-------|-------|
| **Planning & Design** | 1 | Architecture, data flow, API design |
| **Core Implementation** | 6 | build.ts, analyzer, tree-shaker, minifier |
| **Reporting** | 1.5 | reporter.ts, JSON schema, analysis features |
| **Testing** | 2 | Unit + integration tests |
| **Documentation** | 0.75 | JSDoc, CLI help, README updates |
| **Manual QA** | 0.75 | Real-world testing, edge cases |
| **Buffer** | 0.5 | Unforeseen issues, refactoring |

### Risk Factors (Could add 2-3h)

| Risk | Probability | Mitigation |
|------|---|---|
| CSS token extraction regex too simple | Medium | Use robust regex, test edge cases |
| Tree-shaking removes too much | Low | Conservative analysis, keep utility classes |
| Watch mode file system timing | Low | Use Node.js watchFile() with debounce |
| Bundle size calculation accuracy | Low | Use actual file sizes, gzip-size package |

---

## Validation & Success Criteria

### Definition of Done

- [ ] All 10 acceptance criteria pass
- [ ] All unit tests passing (6/6 modules)
- [ ] All integration tests passing (4/4)
- [ ] Manual QA on 2+ real projects
- [ ] CLI help updated with `orion build` examples
- [ ] No new dependencies added
- [ ] 100% TypeScript strict mode passing
- [ ] Bundle size measurement accurate (within 1%)

### Exit Criteria for Week 1-2

```
✓ orion build command fully functional
✓ All flags working (analyze, minify, tree-shake, watch, etc.)
✓ Bundle reduction verified (60-80% on test projects)
✓ Analysis report generation working
✓ Documentation complete
✓ Ready for user testing in Tier 3 Phase 2
```

---

## Future Enhancements (Out of Scope for US-3.3)

- [ ] **`orion build --output-webpack`**: Webpack-compatible config generation
- [ ] **`orion build --split`**: Generate separate CSS files per component
- [ ] **`orion build --with-fonts`**: Include font loading CSS
- [ ] **`orion build --compare`**: Compare with previous build
- [ ] **`orion build --ci`**: Machine-readable output for CI/CD pipelines

---

## Questions & Decisions

### Q1: Should `orion build` modify component source?
**A**: NO. It generates artifacts in `.orion-build/`, user imports from there.

### Q2: What if user doesn't use all components in production?
**A**: That's where tree-shaking helps. `orion build` only includes what's imported.

### Q3: Should it work without orion.json?
**A**: NO. Requires configuration for componentDir, outputDir, etc.

### Q4: Watch mode implementation — fs.watchFile or chokidar?
**A**: Use Node.js built-in `fs.watchFile()` (zero dependencies).

### Q5: gzip calculation — include or estimate?
**A**: Show both minified and estimated gzipped (via simple algorithm, not full gzip).

---

## Sign-Off

**Scope**: Realistic for Week 1-2 of Tier 3 Phase 1 ✅
**Dependencies**: All available (US-3.1 patterns, config system) ✅
**Blockers**: None ✅
**Risk Level**: Low ✅

**Recommendation**: ✅ **APPROVE** — Clear requirements, achievable scope, high user value.

---

## Appendix A: Token Analysis Algorithm

```typescript
// Pseudocode for build-analyzer.ts
function analyzeComponents(componentDir): TokenUsageMap {
  const usageMap = {};

  for (const componentFolder of fs.readdirSync(componentDir)) {
    const cssFile = path.join(componentDir, componentFolder, '*.module.css');
    const cssContent = fs.readFileSync(cssFile, 'utf-8');

    // Extract all var(--token-name) references
    const matches = cssContent.matchAll(/var\(--[\w-]+\)/g);
    const tokens = [...matches].map(m => m[0].slice(4, -1)); // Remove 'var(' and ')'

    usageMap[componentFolder] = tokens;
  }

  return usageMap;
}

// Pseudocode for tree-shaker.ts
function treeShakeTokens(cssContent, usageMap): string {
  const usedTokens = new Set();

  // Collect all referenced tokens
  for (const tokens of Object.values(usageMap)) {
    tokens.forEach(t => usedTokens.add(t));
  }

  // Remove unused :root variables
  return cssContent.replace(
    /--[\w-]+:\s*[^;]+;/g,
    (match) => {
      const tokenName = match.split(':')[0].trim();
      return usedTokens.has(tokenName) ? match : '';
    }
  );
}
```

---

**Last Updated**: 2026-03-18
**Next Review**: Week 2 sprint kickoff (after implementation starts)
