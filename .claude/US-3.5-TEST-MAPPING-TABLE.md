# US-3.5: AC-to-Test Mapping Reference

**Quick lookup**: Which tests validate which acceptance criteria?

---

## Test Matrix: 10 ACs × 23+ Tests

| AC # | Feature | Test File | Test Cases | Status | Notes |
|------|---------|-----------|-----------|--------|-------|
| **1** | `orion add --category=forms` | add.test.ts | Test #6: Filter by category | ✅ | Single category test; doesn't cover multi-category |
| **2** | `orion add --tag=accessible` | add.test.ts | Test #7: Filter by tag | ✅ | Single tag; doesn't test multi-tag (AND/OR logic) |
| **3** | `orion add --filter="form\|input"` | add.test.ts | (IMPLIED) | ⚠️ | Likely combined with AC1/AC2; needs explicit test |
| **4** | `orion add --brand=red` | add.test.ts | Test #8a: Pre-configure brand (NEW) | ❌ | **MISSING FROM PLAN** — Critical feature |
| **5** | `orion add --no-deps` | add.test.ts | Test #8b: Skip dependency resolution (NEW) | ❌ | **MISSING FROM PLAN** — Important for advanced users |
| **6** | `orion add --dry-run` | add.test.ts + writer.test.ts | Test #4 (add), Test #2-3 (writer) | ✅ | Good coverage; shows preview + validates no files written |
| **7** | Tab completion (bash/zsh) | completion.test.ts (NEW) | Test #1-3: Bash/zsh completion (NEW FILE) | ❌ | **MISSING FROM PLAN** — Needs separate module |
| **8** | Already-installed skip | edge-cases.test.ts (NEW) | Test #1: Skip existing components (NEW) | ❌ | **MISSING FROM PLAN** — Edge case |
| **9** | Preview URLs in output | add.test.ts | Test #4a: Validate output format (IMPLICIT) | ⚠️ | **NOT EXPLICITLY TESTED** — Needs output validation |
| **10** | Documentation | — | — | — | Not testable (qualitative, not quantitative) |

---

## Detailed Test Breakdown (23+ Tests Total)

### add.test.ts (10 tests)

```
✅ Test 1: Basic smoke test — install single component (button)
✅ Test 2: Multiple components — install 3 with auto-resolved deps
✅ Test 3: Fuzzy suggestion — suggest "button" for typo "botton"
✅ Test 4: Dry-run flag — preview files without writing
⚠️ Test 4a: Dry-run output — validate preview format (IMPLICIT)
✅ Test 5: Category filter — --category=forms filters correctly
✅ Test 6: Tag filter — --tag=accessible shows tagged components
✅ Test 7: Type flag — --type=section disambiguates hero section
❌ Test 8a: Brand flag -- NEW -- --brand=red pre-configures brand
❌ Test 8b: No-deps flag -- NEW -- --no-deps skips dependency resolution

Coverage: AC1, AC2, AC3(implied), AC5(implied), AC6, AC7, AC8, AC9(implied)
Missing: AC4, AC5 explicit, AC7(explicit), AC9(explicit)
```

### utils.test.ts (5 tests) ✅

```
✅ Test 1: fuzzyMatch() — exact match scores highest
✅ Test 2: fuzzyMatch() — Levenshtein distance 1 (typo "botton")
✅ Test 3: fuzzyMatch() — Levenshtein distance 2 (typo "btton")
✅ Test 4: fuzzyMatch() — no match returns empty array
✅ Test 5: fuzzyMatch() — multiple candidates ranked by distance

Additional utilities (bonus):
  ✅ filterByCategory() — filters items by single category
  ✅ filterByTag() — filters items by tag
  ✅ confirm() — user confirmation (yes/no)

Coverage: Helper functions for add command
```

### writer.test.ts (4 tests)

```
✅ Test 1: dryRun=false — writes files to disk (existing behavior)
✅ Test 2: dryRun=true — prevents writing to disk (new behavior)
⚠️ Test 3: dryRun=true — returns file list without writing (NEW)
⚠️ Test 3a: dryRunFiles field — validates return structure (CLARIFICATION NEEDED)

Coverage: File writing logic with new dryRun parameter
Dependency: Needs API clarification for dryRun return value
```

### error-scenarios.test.ts (4 tests) [NEW FILE]

```
❌ Test 1: Unknown component — error when component doesn't exist
❌ Test 2: Missing orion.json — helpful error message
❌ Test 3: Registry unreachable — graceful failure
❌ Test 4: Partial resolution failure — handles dependency errors

Coverage: Production-critical error handling
```

### edge-cases.test.ts (3 tests) [NEW FILE]

```
❌ Test 1: Already-installed skip — skips without --overwrite
❌ Test 2: Empty filter results — graceful handling of no matches
❌ Test 3: Deep dependency tree — resolves 5+ level dependencies

Coverage: Edge cases and production scenarios
```

### completion.test.ts (2-3 tests) [NEW FILE, IF INCLUDED]

```
❌ Test 1: Bash completion — suggests components on tab
❌ Test 2: Zsh completion — works in zsh shell
❌ Test 3: Flag completion — completes --category, --tag, etc.

Coverage: Tab completion functionality
Note: May be separate from main tests depending on architecture
```

---

## AC-Specific Test Details

### AC 1: Category Filter

**User Story**: `orion add --category=forms` installs all form-related components

**Test Case** (add.test.ts #5):
```typescript
it("should filter components by category when --category=forms", async () => {
  const result = await add(["--category=forms", "--yes"]);

  // Verify multiple form components installed (field, checkbox, radio, select, etc.)
  expect(result.writtenFiles.length).toBeGreaterThanOrEqual(4);
  expect(result.components).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "field" }),
      expect.objectContaining({ name: "checkbox" }),
    ])
  );
});
```

**Acceptance**: All components with `category: "forms"` are installed

---

### AC 2: Tag Filter

**User Story**: `orion add --tag=accessible` filters by tag

**Test Case** (add.test.ts #6):
```typescript
it("should filter components by tag when --tag=accessible", async () => {
  const result = await add(["--tag=accessible", "--yes"]);

  // All returned components should have 'accessible' tag
  expect(result.components).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ tags: expect.arrayContaining(["accessible"]) }),
    ])
  );
});
```

**Acceptance**: Only components with `tags: ["accessible"]` are installed

---

### AC 3: Regex Filter

**User Story**: `orion add --filter="form|input"` filters by regex

**Status**: ⚠️ Not explicitly in plan; unclear if separate or combined test

**Proposed Test Case** (add.test.ts, new):
```typescript
it("should filter components by regex pattern --filter='form|input'", async () => {
  const result = await add(["--filter=form|input", "--yes"]);

  // Components matching regex pattern
  expect(result.components.map(c => c.name)).toEqual(
    expect.arrayContaining([
      expect.stringMatching(/form|input/)
    ])
  );
});
```

**Acceptance**: Components matching regex pattern are installed

---

### AC 4: Brand Pre-Configuration

**User Story**: `orion add --brand=red` pre-configures brand in orion.json

**Status**: ❌ **NOT IN PLAN** — Critical gap

**Proposed Test Case** (add.test.ts, new):
```typescript
it("should pre-configure brand when --brand=red", async () => {
  await add(["button", "--brand=red", "--yes"]);

  const config = loadConfig(tempDir);
  expect(config.brand).toBe("red");
});
```

**Acceptance**: orion.json contains `"brand": "red"` after command

---

### AC 5: Skip Dependency Resolution

**User Story**: `orion add --no-deps` skips dependency resolution

**Status**: ⚠️ Implied in test #2 but not explicit

**Proposed Test Case** (add.test.ts, new):
```typescript
it("should skip dependency resolution when --no-deps", async () => {
  // theme-controller normally depends on 6 components
  // With --no-deps, only theme-controller installs
  await add(["theme-controller", "--no-deps", "--yes"]);

  const result = await add(["theme-controller", "--no-deps", "--yes"]);
  expect(result.writtenFiles.length).toBe(1); // Only theme-controller
});
```

**Acceptance**: Only requested component installed, no dependencies resolved

---

### AC 6: Dry-Run Flag

**User Story**: `orion add --dry-run` previews without writing

**Test Cases** (add.test.ts #4 + writer.test.ts #2-3):
```typescript
it("should preview files with --dry-run without writing", async () => {
  const result = await add(["button", "--dry-run", "--yes"]);

  // Should show file list
  expect(result.output).toContain("Files that would be installed:");

  // Should NOT write files
  expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(false);

  // Should return file list
  expect(result.dryRunFiles).toBeDefined();
  expect(result.dryRunFiles.length).toBeGreaterThan(0);
});
```

**Acceptance**: Preview shown, no files written, process exits successfully

---

### AC 7: Tab Completion

**User Story**: `orion add b<TAB>` suggests "button"

**Status**: ❌ **NOT IN PLAN** — Needs separate test file

**Proposed Test File** (completion.test.ts):
```typescript
describe("orion add completion", () => {
  it("should suggest components on tab completion", () => {
    const suggestions = getCompletions("orion add b");
    expect(suggestions).toContain("button");
    expect(suggestions).toContain("badge");
    expect(suggestions).toContain("banner");
  });

  it("should complete flags on tab", () => {
    const suggestions = getCompletions("orion add --ca");
    expect(suggestions).toContain("--category");
  });

  it("should work in bash shell", () => {
    // Test bash completion script
    expect(bashCompletionExists()).toBe(true);
  });

  it("should work in zsh shell", () => {
    // Test zsh completion script
    expect(zshCompletionExists()).toBe(true);
  });
});
```

**Acceptance**: Completion works in bash and zsh shells

---

### AC 8: Already-Installed Skip

**User Story**: Components already installed are skipped (without --overwrite)

**Status**: ❌ **MISSING FROM PLAN** — Edge case not listed

**Proposed Test Case** (edge-cases.test.ts #1):
```typescript
it("should skip already-installed components without --overwrite", async () => {
  // First install
  await add(["button", "--yes"]);
  expect(fs.existsSync(path.join(tempDir, "src/components/button"))).toBe(true);

  // Second install (should skip)
  const result = await add(["button", "--yes"]);
  expect(result.output).toContain("already exists");
  expect(result.writtenFiles).toHaveLength(0);
});
```

**Acceptance**: File skipped with clear message, not overwritten

---

### AC 9: Preview URLs in Output

**User Story**: Preview URLs shown for each installed component

**Status**: ⚠️ **IMPLIED BUT NOT EXPLICIT** — Needs output validation

**Proposed Test Case** (add.test.ts #4a):
```typescript
it("should display preview URLs in output", async () => {
  const result = await add(["button", "--yes"]);

  // Assumes each component has a preview URL
  expect(result.output).toContain("Preview:");
  expect(result.output).toMatch(/https:\/\/orion-ds\.dev.*button/);
});
```

**Acceptance**: Output includes working preview URLs for installed components

---

### AC 10: Documentation

**User Story**: Complete documentation for all flags and options

**Status**: Not testable (qualitative)

**Manual Verification**:
- [ ] `orion add --help` shows all flags
- [ ] Each flag has clear description
- [ ] Examples provided for common use cases
- [ ] Error messages are helpful

---

## Test Summary Table

| Test Count | File | Focus | Complexity | Status |
|-----------|------|-------|-----------|--------|
| 10 | add.test.ts | Command integration | High | ⚠️ Needs +2 tests (AC4, AC5) |
| 5 | utils.test.ts | Helper functions | Low | ✅ Complete |
| 4 | writer.test.ts | File writing | Medium | ⚠️ Needs API clarification |
| 4 | error-scenarios.test.ts | Error handling | Medium | ❌ NEW (Critical) |
| 3 | edge-cases.test.ts | Edge cases | Low | ❌ NEW (Production safety) |
| 2-3 | completion.test.ts | Shell completion | Medium | ❌ NEW (If included) |
| **28-29** | **TOTAL** | | | ⚠️ +12-13 from original 16 |

---

## Implementation Checklist

Before coding tests:

- [ ] Confirm all 10 ACs are understood (pair with product owner if needed)
- [ ] Clarify dryRun API signature with development team
- [ ] Clarify --brand, --no-deps flag behavior
- [ ] Define mock registry structure (10 items, all categories/tags)
- [ ] Decide on tab completion scope (in-scope or separate US?)
- [ ] Set coverage targets (80%+ add.ts, 90%+ utils.ts, 100% writer.ts)
- [ ] Create test fixtures (temp dir setup, mock data, error mocks)
- [ ] Review existing build.test.ts pattern for consistency

---

## Questions for Development Team

1. **dryRun API**: Should `writeComponents()` accept `dryRun: true` and return a different structure?
   - Current: Returns `{ writtenFiles, npmDeps }`
   - With dryRun: Return `{ dryRunFiles, npmDeps }` or keep same structure?

2. **--brand flag**: Where should brand be persisted?
   - Update orion.json after install? (Assumes yes, but confirm)
   - Or just pass to registry lookups?

3. **--no-deps flag**: Does this skip `resolveAll()` entirely?
   - Yes: Fetch requested items only, no BFS
   - No: Fetch but show list of deps without prompt?

4. **Tab completion scope**: Is this in US-3.5 or separate us-3.X?
   - Critical for deadline/effort planning

5. **Performance budgets**: Are these targets acceptable?
   - Fuzzy matching 100+ items: <200ms?
   - Dependency resolution (5 items): <1s?
   - Category filtering 98 items: <50ms?

---

**Last Updated**: March 19, 2026
**Status**: Ready for implementation after clarifications above
