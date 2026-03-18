# Tier 2 Implementation Action Plan
**Status**: Ready for Execution
**Priority**: P0 (Blocks Tier 3)
**Duration**: 2 weeks / 22 hours

---

## Quick Reference: What to Fix

| Item | Gap | Fix | Time | P |
|------|-----|-----|------|---|
| spec.yaml | 7% (5/72) | Generate 67 missing specs | 8h | 0 |
| FAKE_VARS | Scattered | Create `tokens/fake-vars.json` | 2h | 0 |
| sync-manifest | Manual | Add to pre-commit hook | 1.5h | 0 |
| Registry metadata | 17% (18/106) | Expand to all items | 3h | 1 |
| enrich-registry | Not integrated | Add to build pipeline | 1h | 1 |
| Schema validation | Missing | Add validators | 3h | 2 |

---

## Action Items (Detailed)

### P0.1: Generate 67 Missing spec.yaml Files (8 hours)

**Goal**: Every component (1/72) has a spec.yaml that documents its API for AI agents

**Current State**:
- 5 specs exist: Button, Card, Field, Modal, Alert
- 67 missing: All other components
- **Blocker**: AI agents can't use spec-driven workflow for 93% of components

**Implementation Steps**:

#### Step 1: Create spec.yaml Generator Script (2 hours)
```bash
# Create: scripts/generate-component-specs.js

Features needed:
1. Read component .tsx file
2. Extract TypeScript interface (ComponentProps)
3. Parse prop names, types, defaults
4. Generate YAML skeleton with:
   - name, title, description
   - props (auto-extracted from interface)
   - tokens (placeholder, human fills)
   - ai_rules (placeholder, human fills)
   - examples (placeholder, human fills)
5. Output to Component/spec.yaml

Example output:
---
name: Checkbox
title: "Checkbox"
description: "Binary selection control"

props:
  checked:
    type: "boolean"
    default: false
    description: "Checkbox state"
  disabled:
    type: "boolean"
    default: false
    description: "Disables checkbox"
  # ... auto-generated from interface

ai_rules:
  - "TODO: Add AI rules here"

tokens:
  - "TODO: List tokens used"

examples:
  - title: "Basic Checkbox"
    code: |
      <Checkbox checked={false} onChange={...} />
```

**File to create**: `/scripts/generate-component-specs.js` (~200 lines)

#### Step 2: Run Generator + Generate 67 Specs (1 hour)
```bash
# Command:
node scripts/generate-component-specs.js

# Output:
Generated spec.yaml for: Avatar, Badge, Checkbox, ...
Total: 67 new specs created

# Result:
packages/react/src/components/*/spec.yaml (67 new files)
```

#### Step 3: Human Review & Fill Gaps (5 hours)

For each of 67 specs, fill in:
- **ai_rules**: Specific guidance for AI agents (2-3 rules per component)
- **tokens**: List all CSS variables used
- **examples**: 2-3 code examples showing common patterns
- **description**: Refine if generator created generic description

**Review checklist per component**:
```yaml
- [ ] ai_rules populated (at least 2 rules)
- [ ] tokens list is complete
- [ ] examples are realistic and runnable
- [ ] description matches component purpose
```

**Suggested review order** (by complexity):
1. Simple components (Avatar, Badge, Divider) — 1 hour
2. Form components (Checkbox, Radio, Select) — 2 hours
3. Complex components (Tabs, Dropdown, Combobox) — 2 hours

#### Step 4: Validate All Specs (0.5 hours)
```bash
# Command:
npm run validate:component-specs

# Checks:
- All 72 components have spec.yaml
- All specs have required fields
- All referenced tokens exist in ai-manifest.json
- All specs are valid YAML

# Result:
✅ 72/72 specs valid
```

**Deliverable**: 72 component specs at 100% coverage

---

### P0.2: Centralize FAKE_VARS (2 hours)

**Goal**: Single source of truth for validation rules (no scattered hardcoded patterns)

**Current State**:
```javascript
// Currently scattered across:
// 1. scripts/validate-components.js (line ~88)
// 2. scripts/validate-tokens.js (implicit)
// 3. Other validators...

if (content.includes('data-brand')) { /* violation */ }
if (content.includes('#')) { /* violation */ }
```

**Problem**: When adding a new validator, developer must remember all patterns manually

**Implementation**:

#### Step 1: Create `tokens/fake-vars.json` (0.5 hours)
```json
{
  "validators": {
    "hardcoded_colors": [
      "#",
      "rgb(",
      "rgba(",
      "hsl(",
      "hsla(",
      "transparent"
    ],
    "hardcoded_pixels": [
      "16px",
      "24px",
      "32px",
      "8px",
      "12px",
      "20px"
    ],
    "forbidden_patterns": [
      "data-brand",
      "brand:",
      "theme:"
    ],
    "allowed_prefixes": [
      "var(--",
      "--font-",
      "--color-",
      "--spacing-"
    ]
  }
}
```

**File to create**: `/tokens/fake-vars.json`

#### Step 2: Refactor `validate-components.js` (1 hour)
```javascript
// At top of file:
const FAKE_VARS = require('../tokens/fake-vars.json');

// Instead of:
if (content.includes('data-brand')) { ... }

// Use:
FAKE_VARS.validators.forbidden_patterns.forEach(pattern => {
  if (content.includes(pattern)) {
    stats.failed++;
    log.error(`${component}: Contains forbidden pattern "${pattern}"`);
  }
});
```

**Changes needed**:
- Import FAKE_VARS at top
- Replace hardcoded pattern checks with loop over FAKE_VARS
- All validators benefit automatically

#### Step 3: Update Other Validators (0.5 hours)
```javascript
// scripts/validate-tokens.js
const FAKE_VARS = require('../tokens/fake-vars.json');

// Use same patterns:
FAKE_VARS.validators.hardcoded_colors.forEach(color => {
  if (tokenValue.includes(color)) {
    log.error(`Hardcoded color: ${color}`);
  }
});
```

**Validators to update**:
- validate-components.js
- validate-tokens.js
- (any others that check for hardcoded values)

**Deliverable**: Single FAKE_VARS config + refactored validators

---

### P0.3: Automate sync-manifest (1.5 hours)

**Goal**: Manifest stays in sync with filesystem automatically (no manual runs needed)

**Current State**:
```bash
# Currently manual:
npm run sync-manifest  # Must remember to run after creating components
```

**Problem**: Developers forget → manifest becomes stale → AI agents see outdated data

**Implementation**:

#### Step 1: Verify sync-manifest Script Works (0.25 hours)
```bash
# Test current script:
npm run sync-manifest

# Verify output:
✅ Manifest synchronized:
   Components: 72
   Sections: 26
   Templates: 8
```

#### Step 2: Add to Pre-commit Hook (0.75 hours)
```bash
# Update: .husky/pre-commit

# Current content:
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged

# New content:
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npm run sync-manifest  # ← Add this line first
npx lint-staged        # Then run linting
```

**Rationale**: Sync manifest BEFORE linting so lint-staged includes manifest updates

#### Step 3: Test Pre-commit Hook (0.5 hours)
```bash
# Test workflow:

# 1. Create new component:
mkdir packages/react/src/components/NewComponent

# 2. Commit (will trigger hook):
git add .
git commit -m "feat: add NewComponent"

# Expected output:
✅ Manifest synchronized:
   Components: 73
   Sections: 26
   Templates: 8

# 3. Verify manifest updated:
git show HEAD:tokens/ai-manifest.json | grep '"total": 73'
```

#### Step 4: Enhance sync-manifest with Validation (Optional P2)
```javascript
// Add validation to sync-manifest.js:

// After counting, verify each component has:
// - ComponentName.tsx
// - ComponentName.module.css
// - spec.yaml

components.forEach(name => {
  const hasTypescript = fs.existsSync(`${dir}/${name}/${name}.tsx`);
  const hasStyles = fs.existsSync(`${dir}/${name}/${name}.module.css`);
  const hasSpec = fs.existsSync(`${dir}/${name}/spec.yaml`);

  if (!hasTypescript || !hasStyles) {
    log.warning(`⚠️ ${name}: Missing required files`);
  }
  if (!hasSpec) {
    log.warning(`⚠️ ${name}: Missing spec.yaml (needed for AI-first)`);
  }
});
```

**Deliverable**: sync-manifest automated in pre-commit hook

---

## P1 Tasks (Secondary Priority)

### P1.1: Expand Registry Metadata (3 hours)

**Current**: 18 of 106 items have metadata (17%)
**Goal**: 106 of 106 items (100%)

**Steps**:
1. Create metadata for all 72 components (2 hours)
2. Create metadata for all 26 sections (1 hour)
3. Validate all metadata is complete (review YAML structure)

**Template per component**:
```json
{
  "tags": ["action", "button", "primary"],
  "related_components": ["Modal", "Form"],
  "common_patterns": ["CTA button", "form submission"]
}
```

**Result**: `registry-metadata.json` has 106 entries (not 18)

---

### P1.2: Integrate enrich-registry into Build (1 hour)

**Current**: enrich-registry.js is standalone script
**Goal**: Automatically runs during `npm run build:registry`

**Steps**:
1. Update `package.json`:
```json
{
  "scripts": {
    "build:registry": "node scripts/generate-registry.ts && node scripts/enrich-registry.js"
  }
}
```

2. Test:
```bash
npm run build:registry
# Should enrich all 106 items automatically
```

---

### P2: Add Schema Validators (3 hours)

Create validators for:
- spec.yaml schema compliance
- registry-metadata.json structure
- ai-manifest.json integrity

Add to pre-commit hook for automatic validation

---

## Testing Checklist

After completing all P0 tasks:

```
Phase 1: spec.yaml Coverage
- [ ] 72/72 components have spec.yaml files
- [ ] All specs have required fields (name, props, ai_rules, tokens, examples)
- [ ] npm run validate:component-specs passes
- [ ] AI agents can read spec.yaml for code generation

Phase 2: FAKE_VARS Centralization
- [ ] tokens/fake-vars.json exists with all patterns
- [ ] validate-components.js uses FAKE_VARS
- [ ] validate-tokens.js uses FAKE_VARS
- [ ] All validators produce same results as before (no regression)

Phase 3: sync-manifest Automation
- [ ] .husky/pre-commit includes sync-manifest
- [ ] Creating new component auto-updates manifest
- [ ] ai-manifest.json.last_updated is current date

Phase 4: Registry Metadata Expansion
- [ ] registry-metadata.json has 106 entries (not 18)
- [ ] enrich-registry.js runs in build pipeline
- [ ] npm run build:registry produces fully enriched output
```

---

## Git Commit Strategy

Commit in logical chunks (one per pattern fix):

```bash
# Commit 1: spec.yaml Generator
git commit -m "feat(tier2): add spec.yaml generator + generate 67 missing specs

- Create scripts/generate-component-specs.js
- Generate spec.yaml for all 72 components
- Each spec documents props, ai_rules, tokens, examples
- Enables spec-driven AI code generation workflow"

# Commit 2: FAKE_VARS Centralization
git commit -m "refactor(tier2): centralize validator rules in tokens/fake-vars.json

- Create tokens/fake-vars.json as single source of truth
- Refactor validate-components.js to use FAKE_VARS
- Refactor validate-tokens.js to use FAKE_VARS
- Ensures all validators stay in sync"

# Commit 3: sync-manifest Automation
git commit -m "automation(tier2): integrate sync-manifest into pre-commit hook

- Add sync-manifest to .husky/pre-commit
- Manifest now auto-syncs when creating/deleting components
- Prevents manual sync issues"

# Commit 4: Registry Metadata Expansion
git commit -m "feat(tier2): expand registry metadata to 100% coverage

- Expand registry-metadata.json from 18 to 106 items
- Integrate enrich-registry into build pipeline
- Full registry JSON now includes tags, related items, patterns"
```

---

## Success Criteria

After 2 weeks of work:

✅ **Metrics**:
- spec.yaml coverage: 100% (72/72)
- Registry metadata coverage: 100% (106/106)
- Validators consolidated: 1 source (FAKE_VARS)
- Automation coverage: 100% (sync-manifest in pre-commit)

✅ **Validation**:
- `npm run validate:component-specs` passes
- `npm run validate` passes (token compliance)
- `npm run audit` passes (all checks)
- Pre-commit hook runs without errors

✅ **Documentation**:
- SPEC_YAML_GUIDE.md created
- FAKE_VARS schema documented in code
- Architecture decisions recorded in ADR files

✅ **Ready for Tier 3**:
- All P0 tasks complete (blocks nothing else)
- Tier 3 can proceed with full data sources
- Tier 3 unblocks: MCP, CLI, docs sites

---

## Resources

**Reference Files**:
- `ARCHITECTURE_REVIEW_TIER2.md` — Full technical analysis
- `TIER2_EXECUTIVE_SUMMARY.md` — Leadership summary
- `SPEC_YAML_GUIDE.md` — Schema documentation (to be created)
- `tokens/fake-vars.json` — Validator rules (to be created)

**Related Skills** (Pre-built):
- `/create-component` — Template for creating new specs
- `/design-create` — Component creation workflow
- `quick-check` — Validation automation

---

## Timeline

**Week 1**:
- Mon-Tue: Generate 67 spec.yaml + review (8h)
- Wed: Centralize FAKE_VARS (2h)
- Thu: Automate sync-manifest (1.5h)
- Fri: Buffer + testing (1.5h)

**Week 2**:
- Mon-Tue: Expand registry metadata + integrate enrich-registry (4h)
- Wed-Thu: Add schema validators (3h)
- Fri: Full validation pass + documentation

**Total**: 22 hours = ~2.75 days of focused work

---

## Who Should Do What

| Task | Owner | Time | Expertise |
|------|-------|------|-----------|
| spec.yaml generator script | Tech Lead | 2h | Node.js, TypeScript parsing |
| Generate + review 67 specs | Designer/PO team | 5h | Product knowledge, AI-first patterns |
| FAKE_VARS refactoring | Tech Lead | 2h | Validation scripts, Node.js |
| Pre-commit integration | DevOps/Tech Lead | 1.5h | Git hooks, shell scripting |
| Registry metadata | Tech Lead | 3h | JSON structure, tagging |
| Schema validators | Tech Lead | 3h | JSON Schema, validation |
| Documentation | Tech Writer | 2h | Documentation patterns |

**Recommended**: 2-person team (1 technical, 1 product/design) over 2 weeks

---

## Questions & Escalations

**Q: Can we skip spec.yaml and do it later?**
A: Not recommended. 7% coverage blocks "AI-first" promise for customers. Better to finish now while fresh.

**Q: What if spec.yaml format needs to change?**
A: Specs are auto-generated + validated. Easy to regenerate if schema changes.

**Q: Will adding specs slow down development?**
A: No. Specs are generated automatically. Developers just fill in ~5 lines of AI rules + tokens.

**Q: Is FAKE_VARS config needed if we use spec.yaml?**
A: Yes. Different purpose—FAKE_VARS validates code, spec.yaml documents API.

---

**Ready to start?** Begin with P0.1 (spec generator). Contact tech lead for sprint kickoff.
