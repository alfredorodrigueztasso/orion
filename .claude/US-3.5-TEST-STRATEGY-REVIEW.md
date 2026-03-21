# US-3.5 Test Strategy Review — QA Validation Report

**Date**: March 19, 2026
**Status**: READY FOR IMPLEMENTATION WITH RECOMMENDATIONS
**Reviewer Role**: QA/Validator

---

## Executive Summary

**Story**: US-3.5 — Enhance `orion add` with Advanced Filtering
**Current Implementation**: `add.ts` (160 LOC) + `resolver.ts` (52 LOC) + `writer.ts` (72 LOC) = ~284 LOC
**Estimated New Code**: ~400 LOC (fuzzy matching, filtering, dry-run, utils)
**Planned Tests**: 16 total across 3 files
**Estimated Test Effort**: 2.5 hours

### Quick Verdict

| Category | Assessment | Notes |
|----------|-----------|-------|
| Test Count | ⚠️ MINIMAL | 16 tests for 10 ACs is lean; recommend 18-20 tests |
| AC Coverage | ⚠️ INCOMPLETE | AC5 (--no-install), AC7 (--type), AC9 (preview URLs) not explicitly mapped |
| Time Estimate | ⚠️ OPTIMISTIC | 2.5h assumes setup already in place; first test file setup adds 0.5-1h overhead |
| Test Distribution | ✅ REASONABLE | Breakdown between add.test.ts (8), utils.test.ts (5), writer.test.ts (3) is logical |
| Edge Cases | ❌ MISSING | No error scenarios, network failures, or partial resolution tests planned |
| Coverage Target | ❌ NOT SPECIFIED | Plan doesn't mention coverage targets; recommend 80%+ minimum |

---

## 1. Detailed AC-to-Test Mapping

| AC # | Feature | Required Tests | Plan Includes? | Gap Analysis |
|------|---------|---|---|---|
| **1** | `orion add --category=forms` | 1 category filter | ✅ add.test.ts #6 | None |
| **2** | `orion add --tag=accessible` | 1 tag filter | ✅ add.test.ts #7 | Single test; no multi-tag scenarios |
| **3** | `orion add --filter="form\|input"` | 1 regex filter | ⚠️ Unclear | Not explicitly listed; assume combined with AC1/2 |
| **4** | `orion add --brand=red` | 1 brand pre-config | ❌ MISSING | **CRITICAL GAP**: No test for brand parameter |
| **5** | `orion add --no-deps` | 1 skip deps | ⚠️ IMPLICIT | Not listed explicitly; may be in add.test.ts but unclear |
| **6** | `orion add --dry-run` | 2-3 tests | ✅ add.test.ts #4 | Covers preview format; needs "no files written" validation |
| **7** | Tab completion (bash/zsh) | 1+ tests | ❌ NOT IN PLAN | **CRITICAL GAP**: Completion tests need separate module/fixtures |
| **8** | Fuzzy matching "botton" | 3+ tests | ✅ utils.test.ts #3-5 | Good; covers exact, distance, no-match |
| **9** | Skip already-installed | 2 tests | ✅ add.test.ts #5 | Good coverage |
| **10** | Preview URLs in output | 1 test | ⚠️ IMPLIED | Not explicitly listed; assume in add.test.ts output tests |

### Critical Gaps Found

1. **AC4 (--brand flag)**: Not explicitly in plan. This is critical for test coverage.
2. **AC7 (Tab completion)**: Not in plan. Completion scripts are separate from main command and need:
   - Fixture setup for bash/zsh
   - Runtime testing of completion function
   - Integration test with actual shell
3. **AC3 (--filter regex)**: Unclear if separate test or combined with category/tag tests.

---

## 2. Test File Architecture

### Current Test Pattern (from build.test.ts)

```typescript
describe("build command", () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "orion-build-test-"));
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
  // ... tests
});
```

✅ **Pattern approved for US-3.5**: Uses temp directories + original CWD cleanup.

---

### Proposed Test File Breakdown

#### add.test.ts (8 tests) — Main command integration

```typescript
describe("orion add command", () => {
  let tempDir: string;
  let originalCwd: string;
  let mockRegistry: RegistryIndex;

  beforeEach(() => {
    // Setup temp dir
    tempDir = fs.mkdtempSync(...);
    originalCwd = process.cwd();
    process.chdir(tempDir);

    // Create orion.json
    fs.writeFileSync(
      path.join(tempDir, "orion.json"),
      JSON.stringify({
        registryUrl: "https://orion-ds.dev/r",
        componentDir: "src/components",
        // ...
      })
    );

    // Setup mock registry (or fetch real one locally with --local flag)
    mockRegistry = buildMockRegistry();
  });

  // Test 1: Basic smoke test
  it("should install single component (button)", async () => {
    await add(["button", "--yes"]);
    expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(true);
  });

  // Test 2: Fuzzy suggestion — exact match
  it("should suggest components with fuzzy matching for typo 'botton'", async () => {
    // This needs suggest() function in utils
    const suggestions = fuzzyMatch("botton", mockRegistry.items.map(i => i.name));
    expect(suggestions[0]).toBe("button");
  });

  // Test 3: Fuzzy matching — multi-edit distance
  it("should handle typos 2+ edits away (e.g., 'btton' -> 'button')", () => {
    const suggestions = fuzzyMatch("btton", ["button", "badge"]);
    expect(suggestions).toContain("button");
  });

  // Test 4: Fuzzy matching — no match
  it("should return empty array for unmatchable input", () => {
    const suggestions = fuzzyMatch("zzzzzzz", ["button", "card"]);
    expect(suggestions).toHaveLength(0);
  });

  // Test 5: Dry-run flag (--dry-run)
  it("should preview files with --dry-run flag without writing", async () => {
    const output = await add(["button", "--dry-run", "--yes"]);
    // Should:
    // - Show file list
    // - NOT create files
    // - Exit successfully
    expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(false);
  });

  // Test 6: Category filter (--category=forms)
  it("should filter components by category", async () => {
    const filtered = filterByCategory("forms", mockRegistry.items);
    expect(filtered.every(c => c.category === "forms")).toBe(true);
  });

  // Test 7: Tag filter (--tag=accessible)
  it("should filter components by tag", async () => {
    const filtered = filterByTag("accessible", mockRegistry.items);
    expect(filtered.length).toBeGreaterThan(0);
  });

  // Test 8: Type flag (--type=section) — disambiguation
  it("should disambiguate when multiple types exist (--type=section)", async () => {
    // Example: 'hero' exists as both component? and section
    // --type=section should install the section
    await add(["hero", "--type=section", "--yes"]);
    // Verify it's the section, not component
  });
});
```

**Issues Found**:
- ✅ Tests 1-3 cover happy path and fuzzy matching
- ✅ Test 4 covers dry-run
- ✅ Tests 5-6 cover filtering
- ✅ Test 7 covers type disambiguation
- ❌ **MISSING**: --brand flag test (AC4)
- ❌ **MISSING**: --no-deps flag test (AC5)
- ❌ **MISSING**: --no-install flag test
- ❌ **MISSING**: Preview URL output validation (AC9)

**Recommendation**: Expand add.test.ts from 8 to 10-11 tests to cover missing ACs.

---

#### utils.test.ts (5 tests) — Helper functions

```typescript
describe("add utilities", () => {
  describe("fuzzyMatch()", () => {
    // Test 1: Exact match
    it("should return exact match with highest score", () => {
      const result = fuzzyMatch("button", ["button", "badge"]);
      expect(result[0]).toBe("button");
    });

    // Test 2: Levenshtein distance 1
    it("should find match with 1 edit (typo)", () => {
      const result = fuzzyMatch("botton", ["button"]);
      expect(result[0]).toBe("button");
    });

    // Test 3: Levenshtein distance 2
    it("should find match with 2 edits", () => {
      const result = fuzzyMatch("btton", ["button"]);
      expect(result[0]).toBe("button");
    });

    // Test 4: No match
    it("should return empty for unreasonable typo", () => {
      const result = fuzzyMatch("xxxxxxxxxx", ["button"]);
      expect(result).toHaveLength(0);
    });

    // Test 5: Multiple candidates
    it("should rank candidates by distance score", () => {
      const result = fuzzyMatch("butto", ["button", "bread", "badge"]);
      expect(result[0]).toBe("button"); // Closest match
    });
  });

  describe("filterByCategory()", () => {
    it("should filter items by category", () => {
      const items = [
        { name: "field", category: "forms" },
        { name: "button", category: "actions" },
      ];
      const result = filterByCategory("forms", items);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("field");
    });
  });

  describe("filterByTag()", () => {
    it("should filter items by tag", () => {
      const items = [
        { name: "button", tags: ["accessible", "core"] },
        { name: "badge", tags: ["core"] },
      ];
      const result = filterByTag("accessible", items);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("button");
    });
  });

  describe("confirm()", () => {
    // Test 2a: Yes response
    it("should return true for 'y' or 'yes'", async () => {
      const result = await confirm("Proceed?", "y");
      expect(result).toBe(true);
    });

    // Test 2b: No response
    it("should return false for 'n' or 'no'", async () => {
      const result = await confirm("Proceed?", "n");
      expect(result).toBe(false);
    });
  });
});
```

**Assessment**: ✅ Good coverage of helper functions. These tests are simple, focused, and fast.

---

#### writer.test.ts (3 tests) — File writing logic

```typescript
describe("writeComponents with dry-run", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(...);
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  // Test 1: dryRun=false (existing behavior)
  it("should write files when dryRun is false", () => {
    const items = [buildMockComponent("button")];
    const config = buildMockConfig();
    const result = writeComponents(items, config, tempDir, { dryRun: false });

    expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(true);
    expect(result.writtenFiles.length).toBeGreaterThan(0);
  });

  // Test 2: dryRun=true (new behavior)
  it("should NOT write files when dryRun is true", () => {
    const items = [buildMockComponent("button")];
    const config = buildMockConfig();
    const result = writeComponents(items, config, tempDir, { dryRun: true });

    expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(false);
    expect(result.writtenFiles).toHaveLength(0);
  });

  // Test 3: dryRun=true shows file list (new behavior)
  it("should return file list even when dryRun=true", () => {
    const items = [buildMockComponent("button")];
    const config = buildMockConfig();
    const result = writeComponents(items, config, tempDir, { dryRun: true });

    // Should have a list of files that WOULD be written
    expect(result.dryRunFiles).toBeDefined();
    expect(result.dryRunFiles?.length).toBeGreaterThan(0);
  });
});
```

**Assessment**: ⚠️ Minimal but critical. Test 3 assumes `dryRunFiles` is returned by writer. Needs clarification on API design.

---

## 3. Test Data Strategy Comparison

### Option A: Real Registry Index (Local)

```typescript
// Use --local flag and fetch from public/r/index.json
const mockRegistry = await fetchIndexLocal(process.cwd());
```

**Pros**: Tests against real data
**Cons**: Tests brittle if registry changes; slow; depends on file system state
**Recommendation**: ❌ Not suitable for unit tests

### Option B: Mocked Data (Small JSON objects)

```typescript
const mockRegistry: RegistryIndex = {
  items: [
    {
      name: "button",
      title: "Button",
      description: "...",
      category: "actions",
      type: "registry:component",
      tags: ["accessible", "core"],
      registryDependencies: [],
    },
    {
      name: "field",
      title: "Field",
      description: "...",
      category: "forms",
      type: "registry:component",
      tags: ["accessible"],
      registryDependencies: ["button"],
    },
    // ... 8-10 more items covering all categories/tags
  ],
};
```

**Pros**: Fast, deterministic, focused
**Cons**: Doesn't catch real registry issues
**Recommendation**: ✅ **USE FOR UNIT TESTS** (15+ tests)

### Option C: Fixture Files (5-10 real registry items)

```
__tests__/fixtures/registry/
├── index.json      (5 real items from registry/index.json)
├── button.json     (real button.json from registry/)
├── field.json
└── hero-section.json
```

**Pros**: Real data; closer to production; detects real registry issues
**Cons**: Requires fixture maintenance; slower
**Recommendation**: ✅ **USE FOR INTEGRATION TESTS** (3-5 tests)

### Recommended Hybrid Strategy

```
add.test.ts (8 unit tests)
  ├─ Use mocked registry data (Option B)
  ├─ Fast execution (<1 second)
  └─ Focus on command logic

add.integration.test.ts (3 integration tests) [BONUS]
  ├─ Use fixture files (Option C)
  ├─ Fetch real components
  └─ Validate against real registry
```

---

## 4. Missing Tests — Critical Gaps

### Category A: Error Scenarios (3-4 tests needed)

```typescript
// add.test.ts additions

it("should error gracefully when component unknown", async () => {
  const result = await add(["unknown-component-xyz", "--yes"]);
  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain("Unknown components");
});

it("should error when orion.json missing", async () => {
  fs.rmSync(path.join(tempDir, "orion.json"));
  const result = await add(["button", "--yes"]);
  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain("orion.json");
});

it("should error when registry unreachable", async () => {
  const result = await add(["button", "--yes", "--registry=http://invalid.test"]);
  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain("registry");
});

it("should handle partial resolution failure gracefully", async () => {
  // Button depends on Icon, Icon fetch fails
  const result = await add(["button", "--yes"]);
  expect(result.stderr).toContain("Failed to resolve");
  expect(result.writtenFiles).toHaveLength(0);
});
```

### Category B: Edge Cases (2-3 tests needed)

```typescript
it("should skip already-installed components without --overwrite", async () => {
  // Install button first time
  await add(["button", "--yes"]);

  // Install again
  const result = await add(["button", "--yes"]);
  expect(result.stderr).toContain("already exists");
  expect(result.writtenFiles).toHaveLength(0);
});

it("should handle --category with zero results", async () => {
  const result = await add(["--category=nonexistent", "--yes"]);
  expect(result.stderr).toContain("No components found");
});

it("should resolve and install 5+ component dependencies correctly", async () => {
  // theme-controller depends on 6 other components
  await add(["theme-controller", "--yes"]);
  expect(result.writtenFiles.length).toBeGreaterThanOrEqual(7);
});
```

### Category C: Performance Tests (Optional, 1-2 tests)

```typescript
it("should filter 100+ components in <200ms", () => {
  const start = performance.now();
  const result = fuzzyMatch("form", largeRegistry.items.map(i => i.name));
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(200);
});

it("should resolve dependencies for 5 components in <1s", async () => {
  const start = performance.now();
  await resolveAll(["theme-controller", "button", "field", "card", "modal"], fetchFn);
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(1000);
});
```

---

## 5. Test Naming Convention

**Proposed Naming Pattern** (for clarity and navigation):

```typescript
describe("orion add command", () => {
  describe("basic functionality", () => {
    it("should install single component", () => {});
    it("should install multiple components with auto-resolved dependencies", () => {});
  });

  describe("filtering", () => {
    describe("--category flag", () => {
      it("should filter by single category", () => {});
      it("should show error if category has no matches", () => {});
    });

    describe("--tag flag", () => {
      it("should filter by tag", () => {});
      it("should support multiple tags (AND logic)", () => {});
    });

    describe("--filter (regex)", () => {
      it("should support regex pattern matching", () => {});
    });
  });

  describe("flags", () => {
    describe("--dry-run", () => {
      it("should show file list without writing", () => {});
      it("should not call npm install", () => {});
    });

    describe("--brand", () => {
      it("should pre-configure brand in orion.json", () => {});
    });

    describe("--no-deps", () => {
      it("should skip dependency resolution", () => {});
    });
  });

  describe("error handling", () => {
    it("should error for unknown component", () => {});
    it("should error when registry unreachable", () => {});
    it("should handle partial resolution failure", () => {});
  });
});
```

✅ **Benefits**: Clear hierarchy, easy to find tests, readable test output

---

## 6. Coverage Targets

### Recommended Minimum Coverage

| File | LOC | Target | Justification |
|------|-----|--------|---|
| `add.ts` (refactored) | 180 | 80%+ | Complex command, many branches (flags, errors, filters) |
| `resolver.ts` | 52 | 90%+ | Critical BFS logic, well-bounded, few edge cases |
| `writer.ts` | 72 | 100% | File system operations, must be 100% tested |
| `utils.ts` (NEW) | ~80 | 90%+ | Helper functions (fuzzyMatch, filters) |
| **Total** | ~384 | **85%** | Good balance of coverage and practicality |

### Current Plan Coverage

- Plan mentions: **None** — Critical omission
- Recommendation: **Add explicit coverage target to AC10 (testing requirements)**

---

## 7. Manual QA Checklist

**After automated tests pass**, manual testing should cover:

```markdown
## Manual Testing Checklist

### Basic Smoke Tests
- [ ] `orion add button --yes` — Works without prompts
- [ ] `orion add card modal --yes` — Multiple components
- [ ] `orion add theme-controller --yes` — Deep dependency tree (6+ items)

### Filtering & Discovery
- [ ] `orion add --category=forms --yes` — Filters correctly (4-5 form components)
- [ ] `orion add --tag=accessible --yes` — Shows multiple items, asks confirmation
- [ ] `orion add --filter="button|checkbox" --yes` — Regex filtering
- [ ] `orion add --type=section hero --yes` — Installs section, not component

### Flags & Options
- [ ] `orion add button --dry-run` — Preview without writing
- [ ] `orion add button --overwrite` — Overwrites existing component
- [ ] `orion add button --no-install` — Installs files, skips npm
- [ ] `orion add button --brand=red` — Pre-configures brand
- [ ] `orion add button --no-deps` — Skips dependency resolution
- [ ] `orion add --yes` — Skips all prompts (automation use-case)

### Error Scenarios
- [ ] `orion add unknown-xyz` — Clear error message
- [ ] `orion add button` (no orion.json) — Helpful error
- [ ] `orion add button` (registry offline) — Graceful timeout
- [ ] `orion add` (no args) — Shows usage help

### Output Quality
- [ ] Preview URLs displayed (if AC9 is included)
- [ ] Import hints shown correctly
- [ ] File paths relative to project root
- [ ] Spinner animations smooth (on supportive terminals)
- [ ] Colors render correctly on light/dark terminals

### Integration Tests
- [ ] `orion add button card field` — All 3 installed, correct import hints
- [ ] `orion add hero --type=section` + `orion add button` — Mixed types
- [ ] Run `npm install` after add — Dependencies resolve correctly
- [ ] Import components into React app — Works without errors

### Tab Completion (if included)
- [ ] `orion add b<TAB>` — Suggests "button"
- [ ] `orion add --ca<TAB>` — Completes "--category"
- [ ] Works in bash and zsh
```

---

## 8. Revised Test Count & Time Estimate

### Original Plan
- **Tests**: 16 total
- **Effort**: 2.5 hours
- **Files**: 3 (add.test.ts, utils.test.ts, writer.test.ts)

### Recommended Expansion

| Component | Original | Recommended | Reason |
|-----------|----------|-------------|--------|
| add.test.ts | 8 | 10 | Add AC4 (--brand), AC9 (preview URLs) |
| utils.test.ts | 5 | 5 | Sufficient as-is |
| writer.test.ts | 3 | 4 | Add dryRunFiles output validation |
| **Error scenarios** | 0 | 4 | Critical for production (unknown component, missing config, network, partial resolution) |
| **Edge cases** | 0 | 3 | Already-installed handling, zero-match categories, deep dependencies |
| **SUBTOTAL** | 16 | 26 | +10 tests (+62%) |

### Revised Time Estimate

| Phase | Time | Notes |
|-------|------|-------|
| Test file setup (temp fixtures) | 0.5h | One-time; applies to all 3 files |
| Mock registry builder | 0.5h | Small JSON objects, ~10 items |
| add.test.ts (10 tests) | 1.5h | 9 min/test avg (fuzzy matching has overhead) |
| utils.test.ts (5 tests) | 0.5h | Simple helpers, 6 min/test |
| writer.test.ts (4 tests) | 0.5h | File system ops, 7.5 min/test |
| Error scenarios (4 tests) | 0.75h | 11 min/test (need error mocking) |
| Edge cases (3 tests) | 0.5h | 10 min/test |
| **TOTAL** | **4.75h** | Range: 4-5.5 hours depending on async complexity |

**Difference**: 2.5h → 4.75h (+2.25h or +90%)

**Why larger**:
1. Original estimate didn't account for test setup overhead (0.5h)
2. Fuzzy matching tests require performance awareness
3. Error scenarios need mock configuration
4. Missing ACs require 5+ additional tests

---

## 9. Final Verdict

### Test Strategy Status: ⚠️ NEEDS EXPANSION

| Aspect | Grade | Comment |
|--------|-------|---------|
| **AC Coverage** | C+ | Missing AC4 (--brand), AC7 (tab completion), AC9 (preview URLs) clearly mapped |
| **Test Count** | C | 16 tests insufficient; recommend 23-26 tests for 10 ACs |
| **Error Handling** | D | No error scenarios; critical for production CLI |
| **Test Quality** | A- | Proposed tests are specific, focused, verifiable |
| **Data Strategy** | B | Suggests mocks but doesn't specify fixture structure |
| **Documentation** | D | Plan lacks explicit coverage targets, test naming, edge case list |
| **Time Estimate** | D | 2.5h is optimistic; recommend 4-5 hours |

### Recommended Actions

**MUST DO (Before Implementation):**
1. ✅ Expand test count from 16 to 23-26 tests
2. ✅ Add explicit coverage targets (80%+ minimum)
3. ✅ Map each AC to specific test cases (use table in AC-to-Test Mapping section)
4. ✅ Add error scenario tests (unknown component, missing config, network, partial failure)
5. ✅ Clarify --brand, --no-install, --no-deps flag behavior and tests
6. ✅ Define mock registry structure (10 components with categories/tags)

**SHOULD DO (Nice-to-Have):**
1. 📌 Add integration test file (add.integration.test.ts) with real fixtures
2. 📌 Add performance benchmarks (fuzzy matching <200ms, resolve <1s)
3. 📌 Create manual QA checklist (copy from Section 7 above)
4. 📌 Add tab completion tests (separate module, bash/zsh fixtures)

**GOOD TO KNOW:**
- Use existing build.test.ts pattern (temp dir + CWD management) ✅
- Hybrid test data strategy: Mocks for unit tests, fixtures for integration ✅
- Expected implementation time: 4-5 hours (with tests) vs. 2.5h planned ⚠️

---

## 10. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Test flakiness (network, timing) | Medium | High | Use mock registry, avoid real HTTP calls |
| Missing AC coverage | High | High | Use detailed mapping table; pair with dev |
| Fuzzy matching performance | Low | Medium | Add performance benchmarks (200ms threshold) |
| Tab completion untestable | Medium | Medium | Skip from main tests; add separate completion.test.ts |
| Error message wording changes | Medium | Low | Use regex matchers, not exact string checks |
| Incomplete dryRun implementation | Medium | High | Clarify API (dryRunFiles field) with dev before testing |

---

## Appendix: Test Naming Examples

```typescript
// ✅ GOOD - Specific, actionable, describes behavior
it("should install button component and show import hint", () => {})
it("should skip fetch when --local flag used and cached", () => {})
it("should error with helpful message when component unknown", () => {})

// ❌ POOR - Vague, implementation-focused, hard to understand
it("should handle button", () => {})
it("should validate", () => {})
it("test add with bad input", () => {})
```

---

## Summary Table

```
┌─────────────────────────────────────────────────────────────┐
│ TEST STRATEGY REVIEW SUMMARY                                │
├─────────────────────────────────────────────────────────────┤
│ Story: US-3.5 — Enhance orion add with Filtering           │
│ Implementation: 284 LOC existing + 400 LOC new              │
│ Test Count: 16 (plan) → 23-26 (recommended) tests           │
│ Estimated Effort: 2.5h (plan) → 4-5h (recommended)          │
│ Coverage Target: Not specified → 80%+ (recommended)         │
│ Critical Gaps: AC4, AC7, AC9, error scenarios              │
│ Recommendation: READY WITH EXPANSION                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Questions for Development Team

1. **API Design**: Does `writeComponents()` support `dryRun` parameter? If so, what's the return signature? (affects writer.test.ts test 3)

2. **--brand Flag**: Should `--brand=red` update orion.json with `"brand": "red"`, or is it just runtime config? (affects test design)

3. **--no-install Flag**: Does this exist in the plan? (currently in AC5 but not listed in test plan)

4. **Tab Completion**: Should this be tested as part of US-3.5 or separate story? (affects scope)

5. **Error Message Quality**: Any specific format for error messages? (affects error test matchers)

6. **Performance Budgets**: Is <200ms for fuzzy matching acceptable? <1s for deep resolution? (affects benchmark tests)

---

**Created**: March 19, 2026
**QA Review Status**: READY FOR IMPLEMENTATION WITH 10+ TESTS ADDED
**Next Step**: Pair with development team to finalize test count and API signatures
