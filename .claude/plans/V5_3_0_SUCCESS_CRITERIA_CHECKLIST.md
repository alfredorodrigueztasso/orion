# v5.3.0 Success Criteria & Validation Checklist

**Purpose**: Define exactly what "done" means for APPROACH B implementation
**Target**: April 8-12, 2026
**Reviewer**: Frontend Developer (Alfredo)

---

## 🎯 Phase 1: Code Implementation Criteria

### 1.1 APPROACH B Refactoring

**Criterion**: `scripts/generate-types-dynamic.ts` refactored to separate type generation from execution

**Definition of Done**:
- [ ] `generateTypeDefinitionsString()` function exists
- [ ] Function returns entire type definitions as a single string
- [ ] Template literal syntax escaped as `\`` inside string
- [ ] Function called instead of inline template string
- [ ] Original behavior preserved (types.ts output identical)

**Verification Command**:
```bash
npm run build:tokens
grep -n "export type ColorTokenPath" packages/react/src/tokens/types.ts | head -1
```

**Expected Output**:
```
export type ColorTokenPath =
  | `color.brand.${Brand}...
```

---

### 1.2 P1 Fix #1: JSON Error Handling

**Criterion**: Clear error messages for file reading failures

**Definition of Done**:
- [ ] `readTokenFile()` function exists
- [ ] Catches `ENOENT` (file not found)
- [ ] Catches `SyntaxError` (invalid JSON)
- [ ] Console error includes file path
- [ ] Console error includes helpful fix suggestion
- [ ] `process.exit(1)` called on error (prevents silent failure)

**Verification Command**:
```bash
# Temporarily corrupt primary.json
cp tokens/primary.json tokens/primary.json.backup
echo "{ invalid json" > tokens/primary.json

npm run build:tokens 2>&1 | grep -i "invalid json"

# Restore
mv tokens/primary.json.backup tokens/primary.json
```

**Expected Output**:
```
❌ Invalid JSON in primary.json:
   Unexpected token
```

---

### 1.3 P1 Fix #2: Brand Validation

**Criterion**: Only 5 valid brands accepted, phantom brands rejected

**Definition of Done**:
- [ ] `VALID_BRANDS` constant defined: `['orion', 'deepblue', 'red', 'orange', 'lemon']`
- [ ] `extractBrandKeys()` validates against whitelist
- [ ] Rejects any brand not in whitelist
- [ ] Clear error message lists valid brands
- [ ] Error message shows invalid brands found
- [ ] `process.exit(1)` called on error

**Verification Command**:
```bash
# Check VALID_BRANDS constant
grep -n "VALID_BRANDS" scripts/generate-types-dynamic.ts

# Count brands in token output
npm run build:tokens 2>&1 | grep "Brands detected"
```

**Expected Output**:
```
VALID_BRANDS = ['orion', 'deepblue', 'red', 'orange', 'lemon'] as const;
...
📊 Brands detected: orion, deepblue, red, orange, lemon
```

**Error Case**:
```bash
# Add phantom brand to brands.json, run build:tokens
❌ Unknown brands in tokens/brands.json:
   Found: phantom
   Valid: orion, deepblue, red, orange, lemon
```

---

### 1.4 P1 Fix #3: Type Validation

**Criterion**: Validate required tokens before writing types.ts

**Definition of Done**:
- [ ] `validateGeneratedTypes()` function exists
- [ ] Checks for minimum spacing (spacing.4 required)
- [ ] Checks for minimum typography (size 14 or similar)
- [ ] Checks for at least one brand
- [ ] Checks for duplicates
- [ ] Logs warnings (non-fatal)
- [ ] Logs errors (fatal, exit(1))
- [ ] Called BEFORE type generation

**Verification Command**:
```bash
# Remove required spacing token
cp tokens/primary.json tokens/primary.json.backup
jq 'del(.spacing[4])' tokens/primary.json > tokens/primary.json.tmp
mv tokens/primary.json.tmp tokens/primary.json

npm run build:tokens 2>&1 | grep -i "spacing.4"

# Restore
mv tokens/primary.json.backup tokens/primary.json
```

**Expected Output**:
```
❌ Validation failed:
  - Base spacing 4 (pixels) missing — required by design system
```

---

### 1.5 New File: tokens-runtime.ts

**Criterion**: Runtime utilities for type-safe token access

**Definition of Done**:
- [ ] File exists: `packages/react/src/tokens/tokens-runtime.ts`
- [ ] Imports types from `./types` (types-only import)
- [ ] Exports `getToken(path: ColorTokenPath): string`
- [ ] Exports `getSemanticToken(theme: Theme, path: SemanticTokenPath): string`
- [ ] Exports `isValidTokenPath(path: string): boolean`
- [ ] Exports type definitions (re-export)
- [ ] Has JSDoc comments for all functions
- [ ] PRIMITIVES_MAP defined (token values)
- [ ] SEMANTIC_MAP defined (theme-aware tokens)

**Verification Command**:
```bash
# Check file exists
test -f packages/react/src/tokens/tokens-runtime.ts && echo "✅ File exists"

# Check exports
grep -n "export function" packages/react/src/tokens/tokens-runtime.ts
grep -n "export type" packages/react/src/tokens/tokens-runtime.ts
```

**Expected Output**:
```
✅ File exists
export function getToken(path: ColorTokenPath): string
export function getSemanticToken(theme: Theme, path: SemanticTokenPath): string
export function isValidTokenPath(path: string): path is TokenPath
export type TokenPath
export type ColorTokenPath
export type SemanticTokenPath
```

---

## 🧪 Phase 2: Testing Criteria

### 2.1 Happy Path Test

**Criterion**: `npm run build:tokens` succeeds with valid input

**Definition of Done**:
- [ ] Command completes without errors
- [ ] No console warnings (only info logs)
- [ ] `packages/react/src/tokens/types.ts` created
- [ ] File size > 600 lines (includes all types)
- [ ] File contains template literal syntax (backticks)
- [ ] Output shows "✅ Validation passed"
- [ ] Output shows "📝 Generated: ..."
- [ ] Output shows brand count (should be 5)

**Verification Command**:
```bash
npm run build:tokens

wc -l packages/react/src/tokens/types.ts
grep "\`color.brand" packages/react/src/tokens/types.ts | head -1
```

**Expected Output**:
```
✅ Validation passed
📝 Generated: .../packages/react/src/tokens/types.ts
📊 Brands detected: orion, deepblue, red, orange, lemon
📊 Typography sizes: 12 detected
📊 Spacing scales: 13 detected
...
650 packages/react/src/tokens/types.ts
export type ColorTokenPath = ...
  | `color.brand.${Brand}...
```

---

### 2.2 Invalid JSON Test

**Criterion**: Invalid JSON caught with clear error, types.ts NOT updated

**Definition of Done**:
- [ ] Command exits with code 1
- [ ] Error message includes filename (primary.json)
- [ ] Error message includes JSON error details
- [ ] Error message suggests fix
- [ ] Process exits before writing types.ts
- [ ] Existing types.ts not corrupted

**Verification Command**:
```bash
cp tokens/primary.json tokens/primary.json.backup
echo "{ bad json }" > tokens/primary.json

npm run build:tokens 2>&1
EXIT_CODE=$?

# Restore
mv tokens/primary.json.backup tokens/primary.json

echo "Exit code: $EXIT_CODE"
test $EXIT_CODE -eq 1 && echo "✅ Correct exit code"
```

**Expected Output**:
```
❌ Invalid JSON in primary.json:
   Unexpected token }
Exit code: 1
✅ Correct exit code
```

---

### 2.3 Brand Validation Test

**Criterion**: Phantom brands rejected, clear error shown

**Definition of Done**:
- [ ] Command exits with code 1
- [ ] Error message shows invalid brand name
- [ ] Error message lists valid brands
- [ ] Process exits before writing types.ts
- [ ] No types.ts generated with phantom brand

**Verification Command**:
```bash
# Add phantom brand to brands.json
cp tokens/brands.json tokens/brands.json.backup
jq '.phantom = { test: "data" }' tokens/brands.json > tokens/brands.json.tmp
mv tokens/brands.json.tmp tokens/brands.json

npm run build:tokens 2>&1
EXIT_CODE=$?

# Restore
mv tokens/brands.json.backup tokens/brands.json

echo "Exit code: $EXIT_CODE"
test $EXIT_CODE -eq 1 && echo "✅ Correct exit code"
```

**Expected Output**:
```
❌ Unknown brands in tokens/brands.json:
   Found: phantom
   Valid: orion, deepblue, red, orange, lemon
Exit code: 1
✅ Correct exit code
```

---

### 2.4 Type Checking Test

**Criterion**: TypeScript compiler accepts generated types

**Definition of Done**:
- [ ] `npm run type-check` completes without errors
- [ ] No error about types.ts file
- [ ] No error about template literal syntax
- [ ] IDE recognizes ColorTokenPath type
- [ ] IDE shows autocomplete for token paths

**Verification Command**:
```bash
npm run type-check

# Also verify in IDE (manual check)
# Open packages/react/src/tokens/tokens-runtime.ts
# Hover over ColorTokenPath in getToken() parameter
# Should show full type with template literals
```

**Expected Output**:
```
✅ No type errors
```

---

### 2.5 Full Package Build Test

**Criterion**: All packages build successfully with new types

**Definition of Done**:
- [ ] `npm run build:packages` completes
- [ ] No cascading errors from types.ts
- [ ] All 6 packages build (@orion-ds/react, blocks, cli, create, mcp, validate)
- [ ] No warnings about missing tokens
- [ ] Bundle size reasonable (no bloat from types)

**Verification Command**:
```bash
npm run build:packages

echo "Build output: $?"
# Should be exit code 0

# Verify compiled output
test -f packages/react/dist/index.d.ts && echo "✅ Type definitions included"
```

**Expected Output**:
```
✅ Build successful
✅ Type definitions included
```

---

## 📝 Phase 3: Documentation Criteria

### 3.1 CHANGELOG.md Updated

**Criterion**: Release notes added for v5.3.0

**Definition of Done**:
- [ ] Section `## [5.3.0] - 2026-04-15` exists
- [ ] Lists features (dynamic generation, tokens-runtime.ts)
- [ ] Lists changes (APPROACH B, improved errors)
- [ ] Lists fixes (template literal error, phantom brand)
- [ ] Mentions all 3 P1 fixes
- [ ] Clear language (not technical jargon)

**Verification Command**:
```bash
grep -A 20 "## \[5.3.0\]" CHANGELOG.md | head -25
```

**Expected Output**:
```
## [5.3.0] - 2026-04-15

### Added
- Dynamic TypeScript type generation from JSON tokens (APPROACH B)
- tokens-runtime.ts for type-safe token access
...

### Fixed
- Template literal compilation error ✅
- Phantom brand "ember" no longer included
```

---

### 3.2 docs/DYNAMIC_TYPES.md Created

**Criterion**: Architecture documentation for dynamic type generation

**Definition of Done**:
- [ ] File exists: `docs/DYNAMIC_TYPES.md`
- [ ] Explains APPROACH B architecture
- [ ] Shows 3 execution contexts diagram
- [ ] Explains why template literals failed
- [ ] Usage section shows examples
- [ ] Troubleshooting section (5+ common issues)
- [ ] Developer workflow documented
- [ ] Links to related documents

**Verification Command**:
```bash
test -f docs/DYNAMIC_TYPES.md && echo "✅ File exists"

grep -c "APPROACH B" docs/DYNAMIC_TYPES.md
grep -c "Troubleshooting" docs/DYNAMIC_TYPES.md
```

**Expected Output**:
```
✅ File exists
2 (mentions APPROACH B twice)
1 (has troubleshooting section)
```

---

### 3.3 CLAUDE.md TypeScript Section Updated

**Criterion**: User documentation reflects v5.3.0 changes

**Definition of Done**:
- [ ] "TypeScript Token System" section updated
- [ ] Explains `npm run build:tokens` usage
- [ ] Mentions dynamic generation (new in v5.3.0)
- [ ] Lists generated files
- [ ] Explains when to regenerate types
- [ ] Mentions 3 P1 fixes
- [ ] Links to DYNAMIC_TYPES.md

**Verification Command**:
```bash
grep -n "TypeScript Token System" CLAUDE.md
grep -A 20 "TypeScript Token System" CLAUDE.md | grep -i "dynamic"
```

**Expected Output**:
```
Line number where section found
✅ Contains "dynamic" (confirming v5.3.0 updates)
```

---

## 🔀 Phase 4: Git Workflow Criteria

### 4.1 Feature Branch Created

**Criterion**: Clean, isolated feature branch

**Definition of Done**:
- [ ] Branch name: `feature/v5.3.0-dynamic-types-fix`
- [ ] Based on latest main
- [ ] 4 commits total
- [ ] No merge commits
- [ ] All commits on this branch only

**Verification Command**:
```bash
git branch -v | grep "feature/v5.3.0"
git log --oneline main..HEAD | wc -l
```

**Expected Output**:
```
feature/v5.3.0-dynamic-types-fix [ahead of main by 4]
4 commits
```

---

### 4.2 Commit Messages Clear

**Criterion**: Commit history tells the story of APPROACH B

**Definition of Done**:
- [ ] Commit 1: "refactor(types): separate type generation..." (APPROACH B)
- [ ] Commit 2: "feat(types): add error handling and validation" (3 P1 fixes)
- [ ] Commit 3: "feat(tokens): create tokens-runtime.ts" (new file)
- [ ] Commit 4: "docs(v5.3.0): add dynamic type generation documentation"
- [ ] Each message includes body (not just title)
- [ ] Body explains "why" not just "what"

**Verification Command**:
```bash
git log --oneline feature/v5.3.0-dynamic-types-fix | head -4
git log -1 --format="%B" feature/v5.3.0-dynamic-types-fix | head -10
```

**Expected Output**:
```
<commit hash> refactor(types): separate type generation from type definitions (APPROACH B)
<commit hash> feat(types): add error handling and validation (3 P1 fixes)
<commit hash> feat(tokens): create tokens-runtime.ts for type-safe token access
<commit hash> docs(v5.3.0): add dynamic type generation documentation

<extended message with body>
```

---

### 4.3 PR Created with Complete Description

**Criterion**: GitHub PR ready for review

**Definition of Done**:
- [ ] Title clear and concise (under 70 chars)
- [ ] Description includes "Summary" section
- [ ] Lists all code changes (files modified)
- [ ] Lists all test results (5/5 passing)
- [ ] Explains APPROACH B architecture
- [ ] Mentions 3 P1 fixes
- [ ] No breaking changes noted
- [ ] Release target (April 15, 2026)

**PR Title Example**:
```
fix(types): resolve template literal compilation blocker (APPROACH B)
```

**PR Body Structure**:
```markdown
## Summary
[2-3 sentences explaining problem and solution]

## Code Changes
- scripts/generate-types-dynamic.ts: APPROACH B refactoring
- packages/react/src/tokens/tokens-runtime.ts: New file
- CHANGELOG.md, docs/, CLAUDE.md: Documentation

## Architecture (APPROACH B)
[Diagram and explanation of 3 execution contexts]

## Validation Results
✅ Test 1: Happy path
✅ Test 2: Invalid JSON
[... 5 total tests]

## Ready for Review
- [x] All tests passing
- [x] No breaking changes
- [x] Documentation complete
```

---

## ✅ Final Sign-Off Checklist

Complete this after all phases are done:

### Code Quality
- [ ] `npm run build:tokens` ✅ passes
- [ ] `npm run type-check` ✅ passes
- [ ] `npm run build:packages` ✅ passes
- [ ] `npm run audit` ✅ passes
- [ ] No console errors or warnings

### Functionality
- [ ] All 5 brands in generated types (not 6 with phantom)
- [ ] IDE autocomplete works for token paths
- [ ] Template literals in types.ts (visible in file)
- [ ] Runtime utilities exported and usable
- [ ] No circular dependencies

### Error Handling
- [ ] Invalid JSON caught: ✅
- [ ] Missing files caught: ✅
- [ ] Phantom brands caught: ✅
- [ ] Missing required tokens caught: ✅
- [ ] All errors have clear messages: ✅

### Testing (5/5)
- [ ] Test 1: Happy path ✅
- [ ] Test 2: Invalid JSON ✅
- [ ] Test 3: Brand validation ✅
- [ ] Test 4: Type checking ✅
- [ ] Test 5: Full build ✅

### Documentation
- [ ] CHANGELOG.md updated ✅
- [ ] docs/DYNAMIC_TYPES.md created ✅
- [ ] CLAUDE.md updated ✅
- [ ] GitHub PR with full description ✅
- [ ] Commit messages clear ✅

### Git Status
- [ ] Feature branch created ✅
- [ ] 4 commits on feature branch ✅
- [ ] All commits have bodies ✅
- [ ] Pushed to remote ✅
- [ ] PR created ✅

### Ready to Merge
- [ ] All criteria met: ✅
- [ ] Architect approval: ✅ (APPROACH B)
- [ ] Code review passed: ✅
- [ ] Tests validated: ✅
- [ ] Release date: April 15, 2026

---

## 📊 Metrics

### Code Coverage
- **Lines changed**: ~300-400 (refactor + new file)
- **Functions added**: 4 (generateTypeDefinitionsString, readTokenFile, extractBrandKeys, validateGeneratedTypes)
- **New file**: 1 (tokens-runtime.ts)
- **Deletions**: 0 (backwards compatible)

### Test Coverage
- **Happy path**: ✅
- **Error cases**: 3 (invalid JSON, phantom brand, missing tokens)
- **Integration**: Full build test
- **Type safety**: TypeScript compiler verification

### Documentation
- **Files updated**: 3 (CHANGELOG.md, CLAUDE.md, new docs/DYNAMIC_TYPES.md)
- **Lines documented**: ~400-500
- **Examples included**: 10+
- **Troubleshooting entries**: 5+

---

## ⏰ Timeline Tracking

| Milestone | Target Date | Actual Date | Status |
|-----------|-------------|------------|--------|
| APPROACH B refactor complete | Apr 8 | ? | Pending |
| P1 Fixes implemented | Apr 9 | ? | Pending |
| All 5 smoke tests pass | Apr 10 | ? | Pending |
| Documentation complete | Apr 11 | ? | Pending |
| PR merged to main | Apr 11-12 | ? | Pending |
| Release v5.3.0 | Apr 15 | ? | Pending |

---

**Document Status**: Ready for Implementation
**Last Updated**: 2026-03-24
**Approval**: Architect ✅ (APPROACH B Selected)
