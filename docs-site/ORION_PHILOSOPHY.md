# Orion Design System Philosophy - docs-site

## Core Principle: **Use Orion. Report Friction. Drive Improvement.**

This docs-site is built **WITH** Orion, not around it. When friction is encountered, it's a signal for improvement—not a reason to work around the system.

---

## Rules for This Project

### ✅ **ALWAYS**

1. **Use Orion components, sections, and blocks directly**
   - Import from `@orion-ds/react`
   - Import sections from `@orion-ds/react/blocks` or `@orion-ds/react/sections`
   - Use provided APIs as designed
   - Example: `import { Hero, Features, CTA } from '@orion-ds/react/blocks'`

2. **Document every friction point**
   - If something doesn't work as expected, create an issue or comment
   - Include:
     - **What you tried**: The exact import/usage
     - **What failed**: The error or unexpected behavior
     - **Expected behavior**: How it should work
     - **Version**: @orion-ds/react version number
   - Store in `FRICTION_LOG.md` at project root

3. **Assume friction = Feature opportunity**
   - Blocking issue? → Orion improvement needed
   - Awkward API? → Design refinement opportunity
   - Missing export? → Scope expansion for Orion
   - Build error? → Infrastructure improvement in Orion

4. **Test with latest Orion**
   - Always use latest `@orion-ds/react` version
   - Run `npm update @orion-ds/react` before reporting friction
   - Check Orion changelog for recent fixes/improvements

### ❌ **NEVER**

1. **Create workarounds or patches**
   - ❌ Don't create wrapper components to "fix" Orion behavior
   - ❌ Don't duplicate Orion components locally
   - ❌ Don't use conditional imports to work around issues
   - ❌ Don't hardcode values to replace missing features

2. **Ignore build errors or TypeScript issues**
   - If Orion import fails → Report it, don't stub it
   - If types are wrong → File issue, don't use `any`
   - If subpath export broken → Document it, don't use relative imports

3. **Override Orion styling without justification**
   - If Orion component doesn't match design → Modify Orion, not docs-site CSS
   - If spacing is wrong → Report token issue, don't hardcode pixels
   - If color is off → Check token system, don't hardcode hex

4. **Assume a limitation is permanent**
   - If feature seems missing → Check Orion releases
   - If API seems awkward → Check if improved in latest version
   - If build fails → Check Orion issues/PRs before workarounds

---

## Workflow: When You Hit Friction

### Step 1: Reproduce and Document
```markdown
# Friction: [Component] doesn't [behavior]

**Context**: docs-site v1.0, @orion-ds/react@4.9.0

**What I tried**:
import { Hero } from '@orion-ds/react/blocks';

**What happened**:
Module not found: Can't resolve '@orion-ds/react/blocks'

**Expected**:
Hero component imports successfully

**Steps to reproduce**:
1. docs-site/package.json has @orion-ds/react@^4.9.0
2. docs-site/components/HomepageHero.tsx tries to import
3. Next.js build fails with module not found
```

### Step 2: Check Orion
- [ ] Check `CHANGELOG.md` in Orion monorepo
- [ ] Search Orion GitHub issues
- [ ] Check latest version on npm
- [ ] Try updating: `npm update @orion-ds/react`

### Step 3: Report to Orion
- [ ] Create GitHub issue in Orion repo
- [ ] Include reproduction steps
- [ ] Link docs-site branch if relevant
- [ ] **Wait for fix before using workarounds**

### Step 4: Log the Friction
Add to `FRICTION_LOG.md`:
```markdown
## [Date] Blocks export broken
- **Issue**: @orion-ds/react/blocks index.mjs missing
- **Status**: Reported to Orion #12345
- **Resolution**: Fixed in 4.9.1 patch
- **Lesson**: Vite build config must include subpath exports
```

---

## Why This Matters

1. **Orion improves faster** when docs-site (the showcase) hits real problems first
2. **Users benefit** when their primary use case (building with Orion) works flawlessly
3. **Priorities align** → docs-site needs = Orion improvements
4. **We avoid tech debt** → no workarounds = no hidden complexity

---

## Examples

### ✅ Correct: Report and wait
```
// ❌ WRONG
const MockHero = () => <div>Hero placeholder</div>;
export { MockHero as Hero };

// ✅ RIGHT
// Create issue: "Blocks subpath exports missing from dist"
// Wait for Orion fix
// Then: import { Hero } from '@orion-ds/react/blocks';
```

### ✅ Correct: Use Orion directly
```
// ❌ WRONG
import Hero from '../local-reimplementation/Hero';

// ✅ RIGHT
import { Hero } from '@orion-ds/react/blocks';
```

### ✅ Correct: Document the learning
```markdown
## Friction Log: [Date] - Blocks export timing

When importing Hero from @orion-ds/react/blocks:
- Root cause: Vite dist build not generating .mjs/.cjs for /blocks subpath
- Impact: Blocks consolidation feature blocked
- Fix: Vite config updated to include subpath entrypoints
- PR: Orion#123
- Lesson: Build config must explicitly define all export paths
```

---

## Contact / Escalation

If friction is blocking:
1. Document in `FRICTION_LOG.md`
2. File issue in Orion repo
3. Slack/Discord: Tag @Orion team
4. **Do not proceed with workarounds**

---

**Last Updated**: 2026-03-21
**Version**: docs-site@1.0.0 | @orion-ds/react@4.9.0+
