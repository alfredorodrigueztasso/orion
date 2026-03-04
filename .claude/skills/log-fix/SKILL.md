---
name: log-fix
description: Document a resolved bug or error into memory/debugging.md to avoid repeating the same debugging path. Auto-triggers when user says "log this fix", "documenta este error", "save this bug", "log resolved error", or "remember this failure".
allowed-tools: ["Read", "Write", "Edit"]
model: haiku
argument-hint: [error-title]
---

# Log Fix — Capture Resolved Errors

Writes a structured entry to `memory/debugging.md` documenting a bug that was found and fixed during this session.

## Purpose

Eliminates re-debugging the same issues across sessions. When a non-trivial bug has been resolved, capturing the symptom, root cause, and fix prevents future sessions from spending time on the same diagnostic path.

## Usage

```bash
/log-fix "ComponentShowcaseTabs wrong Tabs API"
/log-fix SSR-hydration-mismatch
/log-fix                   # Derives from current conversation context
```

## What This Writes

A structured entry in `memory/debugging.md`.

## Execution Steps

### Step 1: Determine Error Title

If `$ARGUMENTS` is provided, use it as the entry title.

If no argument, synthesize a title from the conversation context and confirm:
```
Error title: "ComponentShowcaseTabs Wrong Tabs API"
Component/Area: docs-site / ComponentShowcaseTabs

Correct? (yes / or provide new title)
```

### Step 2: Read Existing debugging.md (if it exists)

Check if `memory/debugging.md` exists. If it does, read it to check for a duplicate entry.

If a similar bug is already documented, offer to update it rather than create a new entry:
```
Similar error found: "Tabs API Mismatch — docs-site"
Is this a new bug or an update to the existing entry?
(new / update)
```

### Step 3: Classify Complexity

Determine the fix complexity from the conversation:
- `quick` — Obvious once identified, fix was a one-liner or known API correction
- `moderate` — Required investigation across 2-3 files or some research
- `complex` — Involved debugging across multiple systems, architectural understanding, or subtle interactions

### Step 4: Synthesize Entry from Conversation

Extract:
- **Symptom** — The observable error (error message, visual artifact, test failure)
- **Root Cause** — The actual underlying problem (not just the surface symptom)
- **Fix** — What resolved it (what was changed, not just "fixed it")
- **Early Detection** — How this could have been caught sooner (lint rule, test, documentation check)
- **Files Modified** — The specific files changed and why

### Step 5: Write Entry to debugging.md

**If file does not exist**, create it with a header then the entry.

**If file exists**, append the new entry at the end.

Entry format:
```markdown
## [Error Title] — [Component/Area] ([Date])
**Symptom**: What the user or test observed.
**Root Cause**: The actual underlying problem.
**Fix**: What resolved it — specific and actionable.
**Complexity**: quick | moderate | complex

### Early Detection
How to catch this before it becomes a debugging session.
- Lint rule that would catch it
- Test that would expose it
- Documentation that clarifies the correct pattern

### Files Modified
- `path/to/file` — what changed and why

---
```

### Step 6: Report

```
✅ Fix logged: "[Error Title]"
   File: memory/debugging.md

Entry written with:
   - Component/Area: [area]
   - Complexity: [quick/moderate/complex]
   - Root cause: documented
   - Early detection: noted
   - Files modified: [count] files

Note: MEMORY.md is NOT auto-updated (near 200-line load limit).
Add a one-line summary to MEMORY.md manually if this is a
recurring error pattern worth hot-loading in future sessions.
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "log this fix"
- "documenta este error"
- "save this bug"
- "log resolved error"
- "remember this failure"
- "we should remember this debugging path"
- "note this for future sessions"
- "log this error resolution"

## Quality Checklist

Before writing, ensure:
- [ ] Root cause is specific (not "it was broken")
- [ ] Fix is actionable (can be applied again from the description)
- [ ] Early detection has at least one concrete suggestion
- [ ] Files modified includes actual paths (not generic descriptions)
- [ ] Complexity classification is accurate

## Exit Codes

- **0** = Fix logged successfully
- **1** = Could not determine error from context or file write failed
