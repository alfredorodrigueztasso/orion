# PR Workflow Runbook — team-git

**Created**: 2026-03-23
**Status**: ENFORCED for all future PRs
**Incident**: Landing Page Rewrite committed to main (commit 8429eff)

---

## ⚠️ THE PROBLEM WE SOLVED

On 2026-03-23, the Landing Page Rewrite changes (10 modified files) were accidentally committed directly to `main` instead of being in a feature branch. This happened because the workflow was:

1. ❌ Make changes (edit 10 files)
2. ❌ Stage files (`git add`)
3. ❌ Commit to main (`git commit`)
4. ❌ Push to origin (`git push origin main`)
5. ❌ Try to create PR (FAILS — changes already in main!)

**Result**: No PR created. Changes merged to main without code review. Difficult to track what changed and why.

---

## ✅ THE CORRECT WORKFLOW (6 STEPS)

### Step 1: CREATE FEATURE BRANCH FIRST
```bash
git checkout -b feat/your-feature-name
```

**Examples**:
- `git checkout -b feat/landing-page-rewrite`
- `git checkout -b feat/button-animation`
- `git checkout -b feat/docs-site-nav`

**Why first?** Creates a clean separation from main. All changes isolated. Safe to revert if needed.

---

### Step 2: EDIT FILES
Make your changes in the feature branch.
```bash
# Edit files
vim docs-site/components/HomepageHero.tsx
vim docs-site/components/HomepagePricing.tsx
# etc...
```

**At this point**: Changes are LOCAL. No commits yet. Easy to abandon if needed.

---

### Step 3: STAGE FILES
```bash
git add docs-site/components/HomepageHero.tsx \
        docs-site/components/HomepagePricing.tsx \
        # ... other files
```

**⚠️ RULE**: NEVER use `git add .` — always list files explicitly.
**Why?** Prevents accidentally staging files you don't want (secrets, builds, etc).

---

### Step 4: COMMIT WITH MESSAGE
```bash
git commit -m "feat(docs-site): landing page rewrite - MCP-first positioning

- Hero badge updated to MCP Server
- Features reordered (MCP first)
- Pricing tier renamed to Founding Member
- Added Claude Code and AI Agents tabs
- Updated all copy with user-action voice"
```

**Rules**:
- Use conventional commits: `feat`, `fix`, `refactor`, `docs`, `chore`
- Include scope: `feat(component-name)` or `feat(docs-site)`
- Summarize what changed and why

---

### Step 5: PUSH FEATURE BRANCH
```bash
git push -u origin feat/your-feature-name
```

**The `-u` flag** sets upstream tracking. Future pushes can be simple `git push`.

**At this point**: Branch is on GitHub. Visible to team. Safe to work from.

---

### Step 6: CREATE PR
```bash
/team-git --pr
# OR
gh pr create --title "feat(docs-site): ..." --body "Description..."
```

**What happens**:
1. gh CLI detects you're on a feature branch
2. Creates PR from `feat/your-feature-name` → `main`
3. Shows URL for team review
4. PR is OPEN (not merged)

---

## 🛡️ PREVENTION: Built-in Checks

### Check 1: `/team-git --commit-only` (ENFORCED)

If you try to commit while on `main` with uncommitted changes:

```
⚠️ ERROR: You're on main branch

You cannot commit directly to main. This prevents accidental merges.

SOLUTION: Create a feature branch first

  git checkout -b feat/your-feature-name

Then stage and commit your changes in that branch.
```

**How it works**: Before staging files, `/team-git` checks:
- Are you on `main`?
- Are there uncommitted changes?
- If both true → REFUSE and show instructions

---

### Check 2: `/team-git --pr` (ENFORCED)

If you try to create a PR while on `main`:

```
⚠️ ERROR: Cannot create PR from main

PRs must originate from a feature branch, not main.

SOLUTION: Create a feature branch first

  git checkout -b feat/your-feature-name
  git push -u origin feat/your-feature-name
  /team-git --pr
```

**How it works**: Before creating PR, `/team-git` checks:
- Is current branch `main`?
- If true → REFUSE and show instructions

---

## 📋 WHY THIS MATTERS

| Benefit | What You Get |
|---------|--------------|
| **Code Review** | Team sees changes before merge. Time to discuss approach. |
| **History** | PR shows what changed and why. Easy to blame/audit. |
| **Rollback** | If something breaks, revert PR instead of git reset. |
| **CI/CD** | Automated tests run on PR. Catches bugs before merge. |
| **Collaboration** | Multiple developers can work on different features simultaneously. |
| **Clean main** | main always points to deployable code. Feature branches are experimental. |

---

## 🚨 COMMON MISTAKES (What NOT to do)

### ❌ Mistake 1: Committing to main
```bash
# ON main
git add .
git commit -m "fixes"
# OOPS! Should have branched first
```

**Fix**:
```bash
git reset HEAD~1          # Undo commit (keep changes)
git checkout -b feat/fixes
git add . && git commit -m "fixes"
git push -u origin feat/fixes
```

---

### ❌ Mistake 2: Using `git add .`
```bash
git add .  # Dangerous! Adds everything
```

**Better**:
```bash
git add docs-site/components/HomepageHero.tsx \
        docs-site/components/HomepagePricing.tsx
```

---

### ❌ Mistake 3: Force pushing to main
```bash
git push --force origin main  # NEVER do this!
```

**Why**: Rewrites history. Breaks other developers' branches. Use PRs instead.

---

### ❌ Mistake 4: Merging feature branch manually
```bash
git checkout main
git merge feat/my-feature
git push origin main
# Skipped code review!
```

**Better**: Use PR and require team review before merge.

---

## 🔄 WORKFLOW CHECKLIST

Before starting ANY new work:

- [ ] You are on `main` and up-to-date (`git pull origin main`)
- [ ] Run `/team-git --status` to see current state
- [ ] Create feature branch: `git checkout -b feat/feature-name`
- [ ] Make changes to files
- [ ] Run `/quick-check` for validation
- [ ] Stage files: `git add file1 file2 file3`
- [ ] Commit: `git commit -m "conventional message"`
- [ ] Push: `git push -u origin feat/feature-name`
- [ ] Create PR: `/team-git --pr` or `gh pr create`
- [ ] Wait for team review
- [ ] Address feedback if any
- [ ] Merge when approved
- [ ] Delete feature branch (GitHub will ask)

---

## 🎓 QUICK REFERENCE

```bash
# START NEW FEATURE
git checkout -b feat/feature-name

# MAKE CHANGES
# (edit files)

# VALIDATE
/quick-check

# COMMIT
git add file1 file2 file3
git commit -m "feat(scope): description"

# PUSH
git push -u origin feat/feature-name

# CREATE PR
/team-git --pr

# AFTER MERGE
git checkout main
git pull origin main
```

---

## 📞 ENFORCEMENT

### Starting 2026-03-23:

1. **`/team-git --commit-only`** will check branch and REFUSE if on main with changes
2. **`/team-git --pr`** will check branch and REFUSE if on main
3. **Git hooks** (pre-commit) may be added to prevent accidental commits to main

### Incident Documentation

Full incident logged in: `memory/debugging.md`
- Date: 2026-03-23
- Symptom: Changes committed to main instead of feature branch
- Root cause: No branch created before staging
- Prevention: This runbook + built-in checks
- Lesson: Always branch first — it's the first step, not the last

---

## 🚀 Questions?

- **"Why branch first?"** Separates work. main stays clean. Easy to compare.
- **"Can I use a different branch name?"** Yes! Use `feat/`, `fix/`, `refactor/` prefixes.
- **"What if I already committed to main?"** See "Mistake 1" above for recovery steps.
- **"Can I commit without a PR?"** Not recommended. Always use PR for team visibility.

---

**This runbook is ACTIVE and ENFORCED.**
**Last updated**: 2026-03-23
**Owner**: team-git skill + Tech Lead
**Next review**: After 3 successful PR cycles using this workflow

