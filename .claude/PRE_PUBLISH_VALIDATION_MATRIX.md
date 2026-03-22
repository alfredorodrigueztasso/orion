# Pre-Publish Validation Matrix - Orion Design System

**Purpose**: Prevent regression of v4.9.2 and other critical issues discovered via docs-site friction log.

**Generated**: 2026-03-21 | **Based on**: FRICTION_LOG.md analysis

---

## Executive Summary

### Historical Issues (v4.9.0 → v4.9.5)

| Version | Issue | Impact | Root Cause | Prevention |
|---------|-------|--------|-----------|-----------|
| **4.9.0** | CSS token handler missing | `[object Object]` in theme.css | 6 nested tokens without explicit handlers | Add handler validation |
| **4.9.0** | Preview modules path missing | Build fails | Index file not created | Pre-build file check |
| **4.9.0** | Blocks export missing from dist | Module resolution fails | Subpath exports not compiled | Export completeness check |
| **4.9.2** | ❌ ALL dist files missing | Complete package failure | Build pipeline skipped JS compilation | Export manifest validation |
| **4.9.3** | React context null in error pages | Static prerendering fails | Context initialized with `undefined` | SSR pattern validation |
| **4.9.5** | Preview module `.ts` with JSX | Next.js build fails | File extension mismatch | File extension validation |

### Lessons Learned

1. **Build completeness**: Declaring exports without generating dist files breaks consuming projects
2. **Incremental validation**: Partial fixes hide systemic issues (6 of 16 token handlers)
3. **SSR safety**: Context defaults must handle pre-rendering scenarios
4. **File conventions**: JSX files must use `.tsx` extension (TypeScript standard)
5. **CI coverage**: Automation must validate what humans miss at scale

---

## Part 1: Pre-Publish Checklist (Ordered by Dependency)

### Level 0: Pre-Build Checks (No build required)

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **File conventions** | All `.tsx` files contain JSX; `.ts` files don't | `scripts/validate-file-extensions.js` | 1 if fails | DevOps |
| **Structure check** | All required directories exist (src/, dist/, types/) | `scripts/validate-structure.js` | 1 if fails | DevOps |
| **Token handlers** | All nested tokens have explicit handlers | `scripts/validate-token-handlers.js` | 1 if fails | DevOps |
| **SSR safety** | Context objects have defaults (not undefined) | `scripts/validate-ssr-defaults.js` | 1 if fails | DevOps |

### Level 1: Build & Compilation

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **TypeScript compilation** | All packages compile without errors | `npm run type-check` | 1 if fails | CI |
| **Build success** | All packages build to dist/ | `npm run build` | 1 if fails | CI |
| **CSS validity** | Generated CSS has no `[object Object]` artifacts | Grep for `\[object Object\]` in theme.css | 1 if found | CI |
| **ESBuild/Vite output** | No build warnings that suggest missing files | Parse build logs | 1 if suspicious | DevOps |

### Level 2: Export Completeness (CRITICAL - prevents v4.9.2)

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **Declared vs. built** | Every export in package.json has corresponding dist files | `scripts/validate-exports.js` | 1 if mismatch | CI |
| **Subpath exports** | All `/blocks`, `/client`, `/chart`, `/calendar`, etc. have `.mjs`, `.cjs`, `.d.ts` | Parse exports field, verify dist | 1 if missing | CI |
| **Entry points accessible** | Can resolve all declared exports programmatically | `scripts/validate-export-resolution.js` | 1 if fails | CI |
| **TypeScript declaration files** | All `.d.ts` files generated for exports | Check dist/ for `.d.ts` | 1 if missing | CI |

### Level 3: Module Resolution (CRITICAL - prevents early import failures)

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **Import tests** | Can import from all declared export paths in test environment | `npm run test:imports` | 1 if fails | CI |
| **Preview modules** | `registry/preview-modules/index.tsx` exists and has no syntax errors | Check file exists + parse JSX | 1 if fails | CI |
| **Blocks availability** | Can import `{ Hero, Features, ... }` from `@orion-ds/react/blocks` | Integration test | 1 if fails | CI |
| **Tokens import** | Can import tokens from `@orion-ds/react/tokens` | Integration test | 1 if fails | CI |

### Level 4: Token System Integrity

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **Token compliance** | CSS variables match token spec (97%+ threshold) | `npm run validate` | 1 if <95% | CI |
| **Semantic tokens** | Light/dark semantic maps are complete | `scripts/validate-semantic-tokens.js` | 1 if incomplete | DevOps |
| **Brand overrides** | All brands have complete token sets | `scripts/validate-brand-tokens.js` | 1 if incomplete | DevOps |
| **No hardcoded values** | CSS contains no literal hex, px, or font-family values (except allowed) | Parse CSS | 1 if found | CI |

### Level 5: React/Component-Specific

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **ThemeProvider SSR safety** | ThemeContext has defaults, not undefined | Check src/contexts/ThemeContext.tsx | 1 if `createContext(undefined)` | DevOps |
| **No brand/theme props** | Components don't accept brand/theme parameters | `node scripts/validate-components.js` | 1 if violations found | DevOps |
| **Color/spacing compliance** | Components use CSS variables only | Grep for hardcoded values | 1 if found | CI |
| **Component exports** | All 90+ components are exported and importable | `scripts/validate-component-exports.js` | 1 if missing | CI |

### Level 6: Testing & Validation

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **Unit tests pass** | All Vitest tests passing | `npm run test` | 1 if fails | CI |
| **AI-First validation** | All anti-hallucination rules enforced | `npm run validate` | 1 if violations | DevOps |
| **Type safety** | TypeScript compilation with strict mode | `npm run type-check` | 1 if fails | CI |
| **Lint success** | ESLint + Stylelint pass on all files | `npm run lint` | 1 if fails | CI |

### Level 7: Documentation & Versioning

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **CHANGELOG updated** | Version change documented with breaking changes flagged | Check CHANGELOG.md | 1 if missing | Human |
| **README current** | Examples reflect new API (if changed) | Manual review | 1 if outdated | Human |
| **Package.json version** | Version bumped correctly (semver) | Compare old/new | 1 if wrong | Human |
| **Git tag** | Release tag created (v4.x.x format) | `git tag` | 1 if missing | CI |

### Level 8: Final Pre-Publish (Last chance)

| Check | Description | Command | Exit Code | Owner |
|-------|-------------|---------|-----------|-------|
| **Dry-run publish** | npm publish simulation (no registry update) | `npm publish --dry-run` | 1 if fails | CI |
| **Package integrity** | Tarball contains expected files | Unzip and verify | 1 if incomplete | CI |
| **npm registry resolvable** | Can be found on npm registry (post-publish) | `npm info @orion-ds/react@VERSION` | 1 if not found | Manual |

---

## Part 2: Automation Priority & Ownership

### Red Flags (MUST BE AUTOMATED - No manual override)

```
❌ File extensions mismatch        → BLOCK deploy
❌ Declared export missing from dist → BLOCK deploy
❌ [object Object] in CSS          → BLOCK deploy
❌ TypeScript compilation fails    → BLOCK deploy
❌ ThemeContext not SSR-safe       → BLOCK deploy
❌ Build produces no dist files    → BLOCK deploy
```

### Yellow Flags (SHOULD BE AUTOMATED - Require review)

```
⚠️ Token compliance <95%          → Flag, allow override with justification
⚠️ Preview modules missing        → Flag, allow fallback UI
⚠️ Component exports incomplete   → Flag, document missing components
⚠️ Build warnings present         → Flag, review each one
```

### Green Flags (CAN BE MANUAL - Code review sufficient)

```
✅ CHANGELOG updated              → Human review during PR
✅ README examples current         → Human review during PR
✅ Documentation links valid       → Human review during PR
```

### Automation Architecture

```
Pre-Commit (Husky) → prevents bad code entry
  - validate-file-extensions.js (2s)
  - validate-ssr-defaults.js (2s)
  - validate-token-handlers.js (3s)

Pre-Build (npm run build) → catches systemic issues
  - validate-structure.js (1s)
  - validate-semantic-tokens.js (2s)

Pre-Publish (scripts/release.js) → last-chance validation
  - npm run type-check (30s)
  - npm run validate (15s)
  - validate-exports.js (5s)
  - validate-export-resolution.js (10s)
  - npm run test:imports (15s)
  - npm publish --dry-run (20s)
```

**Total Pre-Publish Time**: ~100s (fully automated, zero human wait)

---

## Part 3: Regression Test Suite

### Test 1: Export Completeness (Prevents v4.9.2)

```typescript
// tests/pre-publish/export-completeness.test.ts
describe('Pre-publish: Export Completeness', () => {
  it('should have .mjs for every declared export', () => {
    const packageJson = require('@orion-ds/react/package.json');
    const exports = Object.keys(packageJson.exports || {});

    for (const exportPath of exports) {
      const mjsPath = resolveModulePath(exportPath, '.mjs');
      expect(fs.existsSync(mjsPath)).toBe(true);
    }
  });

  it('should have .cjs for every declared export', () => {
    const packageJson = require('@orion-ds/react/package.json');
    const exports = Object.keys(packageJson.exports || {});

    for (const exportPath of exports) {
      const cjsPath = resolveModulePath(exportPath, '.cjs');
      expect(fs.existsSync(cjsPath)).toBe(true);
    }
  });

  it('should have .d.ts for every declared export', () => {
    const packageJson = require('@orion-ds/react/package.json');
    const exports = Object.keys(packageJson.exports || {});

    for (const exportPath of exports) {
      const dtsPath = resolveModulePath(exportPath, '.d.ts');
      expect(fs.existsSync(dtsPath)).toBe(true);
    }
  });

  it('should resolve all exports at runtime', async () => {
    const exports = [
      '@orion-ds/react',
      '@orion-ds/react/blocks',
      '@orion-ds/react/client',
      '@orion-ds/react/tokens',
      '@orion-ds/react/chart',
      '@orion-ds/react/calendar',
    ];

    for (const exportPath of exports) {
      const resolved = await import(exportPath);
      expect(resolved).toBeDefined();
    }
  });
});
```

### Test 2: File Extension Validation (Prevents v4.9.5)

```typescript
// tests/pre-publish/file-extensions.test.ts
describe('Pre-publish: File Extension Correctness', () => {
  it('should have no .ts files containing JSX syntax', () => {
    const tsFiles = glob.sync('packages/react/src/**/*.ts');
    const jsxPattern = /<\w+[\s>]/; // <Component or <div

    for (const file of tsFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).not.toMatch(jsxPattern);
    }
  });

  it('should have .tsx for all files with JSX', () => {
    const registry = glob.sync('registry/**/*.tsx');

    for (const file of registry) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).toMatch(/<\w+[\s>]/); // Must have JSX
    }
  });

  it('preview-modules/index.tsx should be .tsx not .ts', () => {
    const hasTs = fs.existsSync('registry/preview-modules/index.ts');
    const hasTsx = fs.existsSync('registry/preview-modules/index.tsx');

    expect(hasTs).toBe(false);
    expect(hasTsx).toBe(true);
  });
});
```

### Test 3: CSS Artifact Detection (Prevents v4.9.0)

```typescript
// tests/pre-publish/css-artifacts.test.ts
describe('Pre-publish: CSS Generation Quality', () => {
  it('should not have [object Object] in theme.css', () => {
    const css = fs.readFileSync('packages/react/dist/theme.css', 'utf-8');
    expect(css).not.toContain('[object Object]');
  });

  it('should not have unhandled token values in CSS', () => {
    const css = fs.readFileSync('packages/react/dist/theme.css', 'utf-8');
    const suspiciousPatterns = [
      /:\s*\[object/,        // : [object
      /:\s*function/,         // : function
      /:\s*undefined/,        // : undefined
      /:\s*null/,            // : null
    ];

    for (const pattern of suspiciousPatterns) {
      expect(css).not.toMatch(pattern);
    }
  });

  it('should only contain valid CSS variable values', () => {
    const css = fs.readFileSync('packages/react/dist/theme.css', 'utf-8');
    const rules = css.match(/--[\w-]+:\s*([^;]+);/g) || [];

    for (const rule of rules) {
      const value = rule.match(/:\s*(.+);/)[1];
      expect(isValidCssValue(value)).toBe(true);
    }
  });
});

function isValidCssValue(value) {
  // Allowed: hex colors, px values, function calls, var()
  const valid = [
    /^#[0-9a-fA-F]{3,8}$/,      // hex
    /^\d+px$/,                   // px
    /^var\(--[\w-]+\)$/,         // var()
    /^rgb\(/,                    // rgb()
    /^\d+(\.\d+)?%$/,            // percentage
    /^0$/,                       // zero
  ];

  return valid.some(pattern => pattern.test(value.trim()));
}
```

### Test 4: SSR Context Safety (Prevents v4.9.3)

```typescript
// tests/pre-publish/ssr-safety.test.ts
describe('Pre-publish: SSR Context Safety', () => {
  it('ThemeContext should initialize with defaults, not undefined', () => {
    const contextCode = fs.readFileSync(
      'packages/react/src/contexts/ThemeContext.tsx',
      'utf-8'
    );

    // Should NOT have: createContext(undefined)
    expect(contextCode).not.toMatch(/createContext\s*\(\s*undefined\s*\)/);

    // Should have: createContext({ theme: ..., brand: ... })
    expect(contextCode).toMatch(/createContext\s*\(\s*{[\s\S]*?theme/);
  });

  it('useThemeContext should handle undefined gracefully', () => {
    const contextCode = fs.readFileSync(
      'packages/react/src/contexts/ThemeContext.tsx',
      'utf-8'
    );

    // Should return defaults, not throw
    expect(contextCode).toMatch(/return\s*{[\s\S]*?theme:/);
    // Should NOT have: throw new Error
    expect(contextCode).not.toMatch(/throw new Error.*ThemeProvider/);
  });

  it('should work in Next.js prerendering without React hydration', async () => {
    // Simulate Next.js static prerendering
    const ThemeContext = require('@orion-ds/react/contexts/ThemeContext');
    const context = ThemeContext.useThemeContext();

    expect(context).toBeDefined();
    expect(context.theme).toBeDefined();
    expect(context.brand).toBeDefined();
  });
});
```

### Test 5: Token Handler Completeness (Prevents v4.9.0 variant)

```typescript
// tests/pre-publish/token-handlers.test.ts
describe('Pre-publish: Token Handler Coverage', () => {
  it('should handle all nested token types', () => {
    const handlers = require('scripts/build-tokens.js').getTokenHandlers();
    const primaryJson = JSON.parse(
      fs.readFileSync('tokens/primary.json', 'utf-8')
    );

    const nestedTokens = findNestedTokens(primaryJson);

    for (const tokenPath of nestedTokens) {
      expect(handlers[tokenPath]).toBeDefined();
    }
  });

  it('should not have incomplete handler implementations', () => {
    const handlers = require('scripts/build-tokens.js').getTokenHandlers();

    for (const [path, handler] of Object.entries(handlers)) {
      const result = handler({ key: 'test', value: {} });
      expect(result).not.toBe('[object Object]');
      expect(typeof result).toBe('string');
    }
  });

  it('should validate all token handlers produce valid CSS', () => {
    const tokens = JSON.parse(
      fs.readFileSync('tokens/primary.json', 'utf-8')
    );
    const css = compileTokensToCss(tokens);

    // No [object Object] instances
    expect(css).not.toContain('[object Object]');

    // Every CSS variable has a valid value
    const vars = css.match(/--[\w-]+:\s*([^;]+);/g) || [];
    expect(vars.length).toBeGreaterThan(200); // Should have 300+
  });
});

function findNestedTokens(obj, prefix = '') {
  const nested = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      nested.push(path);
      nested.push(...findNestedTokens(value, path));
    }
  }
  return nested;
}
```

### Test 6: Preview Modules Integrity (Prevents v4.9.0 variant)

```typescript
// tests/pre-publish/preview-modules.test.ts
describe('Pre-publish: Preview Modules', () => {
  it('should have preview-modules/index.tsx file', () => {
    expect(fs.existsSync('registry/preview-modules/index.tsx')).toBe(true);
  });

  it('should have no syntax errors in preview modules', () => {
    const code = fs.readFileSync(
      'registry/preview-modules/index.tsx',
      'utf-8'
    );

    // Should parse as valid TypeScript/JSX
    expect(() => {
      require('@typescript-eslint/parser').parse(code, {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      });
    }).not.toThrow();
  });

  it('all preview components should be importable', async () => {
    const module = await import('registry/preview-modules/index.tsx');
    const exports = Object.keys(module);

    expect(exports.length).toBeGreaterThan(30); // Should have 35+

    for (const exportName of exports) {
      expect(typeof module[exportName]).toBe('function'); // React component
    }
  });

  it('should only import from @orion-ds/react', () => {
    const code = fs.readFileSync(
      'registry/preview-modules/index.tsx',
      'utf-8'
    );

    const imports = code.match(/from ['"]([^'"]+)['"]/g) || [];
    const nonOrionImports = imports.filter(
      imp => !imp.includes('@orion-ds/react') && !imp.includes('lucide')
    );

    expect(nonOrionImports).toEqual([]);
  });
});
```

---

## Part 4: SLA for Critical Issues

### Severity Levels

```
🔴 BLOCKER (v4.9.2 class)
   - Package cannot be imported
   - Build completely fails
   - All consumers affected immediately

   SLA: Hotfix within 2 hours
   Response: Yank broken version + publish immediately
   Example: Missing all .mjs/.cjs files in dist/

🟡 HIGH (v4.9.3/v4.9.5 class)
   - Specific feature broken
   - Build succeeds but partial functionality fails
   - Some consumers affected

   SLA: Patch within 4 hours
   Response: Acknowledge + prioritize + publish patch
   Example: useContext null in error pages, .ts/.tsx mismatch

🟢 MEDIUM
   - Edge case or specific use pattern broken
   - Most consumers unaffected
   - Workaround available

   SLA: Patch within 24 hours
   Example: SSR context issue with Next.js only

⚪ LOW
   - Documentation issue
   - Non-breaking enhancement
   - No functionality impact

   SLA: Include in next planned release
   Example: README outdated examples
```

### Response Protocol

```
1. DETECT (Automated CI)
   → Pre-publish validation fails
   → Exit code 1 prevents npm publish

2. ALERT (Immediate)
   → Slack notification to #engineering
   → Jira ticket auto-created
   → Release script paused

3. INVESTIGATE (Within 15 minutes)
   → Run validate suite
   → Check git log for recent changes
   → Identify root cause

4. FIX & TEST (Depends on severity)
   BLOCKER:  Fix within 30 min, test within 15 min
   HIGH:     Fix within 1 hour, test within 30 min
   MEDIUM:   Fix within 4 hours, test before publish

5. PUBLISH (Conditional)
   → Re-run full validation
   → Publish hotfix with git tag
   → Post incident summary

6. COMMUNICATE
   → GitHub issue comment
   → FRICTION_LOG.md entry
   → @docs-site notification if blocking
```

### Example: v4.9.2 Incident (BLOCKER)

```
Detection: 2026-03-21 10:15
  npm run release:patch triggers validation
  validate-exports.js fails: Missing dist/index.mjs
  Exit code 1, publish blocked ✅

Alert: 2026-03-21 10:16
  #engineering: BLOCKER - v4.9.2 build failed, exports missing
  Jira: ORN-1234 - [BLOCKER] v4.9.2 dist generation

Investigation: 2026-03-21 10:20
  Vite build logs: Compilation succeeded, but output directory empty
  Git log: turbov2.x config change from yesterday
  Root cause: --filter exclude regex not working in new Turbo

Fix: 2026-03-21 10:35
  Updated turbo.json with explicit package names instead of regex
  npm run build succeeds
  All 11 exports have .mjs/.cjs/.d.ts files

Publish: 2026-03-21 10:50
  npm run release:patch (bumps to v4.9.2.1 or v4.9.3)
  All validation passes ✅
  GitHub tag created
  #engineering: Hotfix published

Communicate: 2026-03-21 11:00
  FRICTION_LOG.md entry: Root cause + prevention
  GitHub PR description: Regression test added
  @docs-site: v4.9.3 safe to use
```

---

## Part 5: Automation Roadmap (Scripts to Implement)

### Immediate (Week 1 - Prevent v4.9.2 repeat)

```bash
# scripts/validate-exports.js (CRITICAL)
# Prevents: v4.9.2 (missing all dist files)
# Time: 5s
# Runs: Pre-publish in release.js

Check:
  1. Parse package.json exports field
  2. For each export path:
     - Verify dist/{path}.mjs exists
     - Verify dist/{path}.cjs exists
     - Verify dist/{path}.d.ts exists
  3. Exit code 1 if any missing
  4. List missing files with full paths

Output:
  ✅ All 11 exports have complete dist files
  OR
  ❌ Missing dist/blocks/index.mjs (and list others)
```

```bash
# scripts/validate-file-extensions.js (CRITICAL)
# Prevents: v4.9.5 (.ts files with JSX)
# Time: 3s
# Runs: Pre-commit hook

Check:
  1. Find all .ts files in packages/react/src/
  2. Check each for JSX syntax (<Component, <div)
  3. Find all .tsx files
  4. Check registry/preview-modules/index.tsx exists

Output:
  ✅ All file extensions correct
  OR
  ❌ registry/preview-modules/index.ts has JSX (should be .tsx)
```

```bash
# scripts/validate-ssr-defaults.js (CRITICAL)
# Prevents: v4.9.3 (useContext null in error pages)
# Time: 2s
# Runs: Pre-commit hook

Check:
  1. Read src/contexts/ThemeContext.tsx
  2. Verify createContext NOT initialized with undefined
  3. Verify createContext has default object { theme, brand, ... }
  4. Verify useThemeContext() returns defaults, doesn't throw

Output:
  ✅ ThemeContext is SSR-safe
  OR
  ❌ ThemeContext initializes with undefined
```

```bash
# scripts/validate-token-handlers.js
# Prevents: v4.9.0 CSS artifact issues
# Time: 3s
# Runs: Pre-commit hook

Check:
  1. Load scripts/build-tokens.js handlers
  2. Find all nested token paths in tokens/primary.json
  3. For each nested token:
     - Verify handler exists
     - Verify handler returns valid CSS value (not [object Object])
  4. Count handlers vs tokens

Output:
  ✅ All 16 nested tokens have handlers
  OR
  ❌ Token "interactive.ghost" missing handler (and list others)
```

### Phase 2 (Week 2 - Build-time validation)

```bash
# scripts/validate-export-resolution.js
# Prevents: Import failures before publish
# Time: 15s
# Runs: Pre-publish in release.js

Check:
  1. Try to import each declared export path:
     - import('@orion-ds/react')
     - import('@orion-ds/react/blocks')
     - import('@orion-ds/react/client')
     - etc.
  2. Verify each resolves to actual module
  3. Verify no module resolution errors

Output:
  ✅ All 11 exports resolve successfully
  OR
  ❌ Cannot resolve @orion-ds/react/blocks (module not found)
```

```bash
# scripts/validate-css-artifacts.js
# Prevents: [object Object] issues post-build
# Time: 5s
# Runs: Post-build (before publish)

Check:
  1. Read generated dist/theme.css
  2. Search for suspicious patterns:
     - [object Object]
     - :undefined
     - :null
     - :function
  3. Parse CSS variable values for validity

Output:
  ✅ theme.css is clean (no artifacts)
  OR
  ❌ Found "[object Object]" at line 158 (and list all)
```

```bash
# npm test:imports
# Prevents: Runtime import failures
# Time: 15s
# Runs: Pre-publish in release.js

Test:
  1. Create test file that imports all exports
  2. Run with Node.js/Vitest
  3. Verify each import succeeds

Output:
  ✅ All exports import successfully
  OR
  ❌ Cannot import { Hero } from @orion-ds/react/blocks
```

### Phase 3 (Week 3 - Comprehensive pre-publish)

```bash
# npm run prepublish:check (NEW)
# Comprehensive validation before release script
# Time: 100s total (all checks combined)
# Runs: Manually before npm run release:*

Steps:
  1. validate-exports.js (5s)
  2. validate-file-extensions.js (3s)
  3. validate-ssr-defaults.js (2s)
  4. validate-token-handlers.js (3s)
  5. npm run type-check (30s)
  6. npm run validate (15s)
  7. validate-css-artifacts.js (5s)
  8. validate-export-resolution.js (10s)
  9. npm test:imports (15s)
  10. npm publish --dry-run (20s)

Output:
  ✅ ALL CHECKS PASSED - Ready for publish
  OR
  ❌ [Check name] FAILED - Fix before retrying

  Total: 3 minutes, zero false positives
```

### Integration Points

```
.husky/pre-commit
  → validate-file-extensions.js
  → validate-ssr-defaults.js
  → validate-token-handlers.js

scripts/release.js (around line 150)
  → npm run prepublish:check (new)
  → Only proceed to npm publish if exit code 0

GitHub Actions CI
  → npm run build
  → validate-css-artifacts.js
  → npm test:imports
```

---

## Part 6: Checklist for Each Release

### Before Starting Release

```
□ Are you on main branch?
□ Is main up-to-date with origin/main?
□ Did you run npm install?
□ Did you run npm run build locally?
□ Do all tests pass locally (npm test)?
```

### During Release Script

```
□ npm run prepublish:check passes?
□ All 8 validations show ✅?
□ Build output shows all dist files?
□ Theme.css has zero [object Object]?
□ TypeScript compilation succeeds?
□ All exports resolve?
```

### After Publishing

```
□ npm info @orion-ds/react@VERSION shows correct version?
□ npm view @orion-ds/react@VERSION shows all exports in types?
□ GitHub tag created (git tag v4.x.x)?
□ FRICTION_LOG.md updated if relevant?
□ @docs-site notified if breaking change?
```

### If Validation Fails

```
□ Do NOT override with --force
□ Do NOT skip checks with --no-verify
□ Do NOT publish without understanding the error
□ DO read the full error message
□ DO fix the root cause
□ DO run npm run prepublish:check again
□ DO ask for help if unsure
```

---

## Summary: The Validation Layers

```
Layer 1: Pre-Commit (2s)
  ✓ File extensions correct
  ✓ SSR defaults present
  ✓ Token handlers complete

Layer 2: Build (40s)
  ✓ TypeScript compiles
  ✓ Build succeeds
  ✓ CSS has no artifacts
  ✓ All tokens valid

Layer 3: Pre-Publish (60s)
  ✓ All exports in dist
  ✓ All exports resolve
  ✓ All imports work
  ✓ Dry-run succeeds

TOTAL: ~2 minutes before publish
AUTOMATION: 100% automated, zero manual steps
CONFIDENCE: Prevents v4.9.2, v4.9.3, v4.9.5 class issues
```

---

## Appendix: Validation Scripts Template

```bash
#!/usr/bin/env node

/**
 * Template for validation scripts
 *
 * Usage: node scripts/validate-*.js
 * Exit: 0 (success) | 1 (failure)
 */

const fs = require('fs');
const path = require('path');

const CHECK_NAME = 'Export Completeness';
const VERBOSE = process.argv.includes('--verbose');

function log(message, isError = false) {
  const prefix = isError ? '❌' : '✅';
  console.log(`${prefix} ${CHECK_NAME}: ${message}`);
}

function logError(message) {
  log(message, true);
}

try {
  // Your validation logic here
  const issues = [];

  if (issues.length > 0) {
    logError(`Found ${issues.length} issue(s):`);
    issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });
    process.exit(1);
  }

  log('All checks passed');
  process.exit(0);
} catch (err) {
  logError(`Unexpected error: ${err.message}`);
  if (VERBOSE) console.error(err);
  process.exit(1);
}
```

---

**Generated by**: QA/Validator | **For**: Pre-publish validation automation
**Last Updated**: 2026-03-21 | **Status**: Ready for implementation
