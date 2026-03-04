---
name: log-pattern
description: Document a reusable pattern discovered during development into memory/patterns.md. Auto-triggers when user says "log this pattern", "documenta este patrón", "save pattern", or "pattern detected". Captures CSS patterns, data-attribute selectors, compound component patterns, and token usage patterns.
allowed-tools: ["Read", "Write", "Edit"]
model: haiku
argument-hint: [pattern-name]
---

# Log Pattern — Capture Reusable Patterns

Writes a structured entry to `memory/patterns.md` documenting a reusable pattern discovered during this session.

## Purpose

Prevents re-discovering the same patterns in future sessions. When the conversation includes evidence of a new pattern (CSS technique, data-attribute selector, compound component architecture, token usage approach), this skill captures it with enough context to be reused directly.

## Usage

```bash
/log-pattern data-on-dark-context-selector
/log-pattern compound-component-pattern
/log-pattern               # Derives title from conversation context
```

## What This Writes

A structured entry in `memory/patterns.md`.

## Execution Steps

### Step 1: Determine Pattern Title

If `$ARGUMENTS` is provided, use it as the pattern name (convert kebab-case to Title Case).

If no argument, synthesize a descriptive title from the current conversation context and confirm with the user:
```
Pattern title: "data-on-dark Context Selector"
Category: CSS / data-attribute patterns

Correct? (yes / or provide new title)
```

### Step 2: Read Existing patterns.md (if it exists)

Check if `memory/patterns.md` exists. If it does, read it to check for duplicate or similar pattern entries.

If a pattern with the same or similar title already exists, ask:
```
A pattern named "[existing title]" already exists.
Update it or create a new entry? (update/new)
```

### Step 3: Synthesize Pattern Entry from Conversation

Extract from the current conversation:
- The **problem** that triggered discovering this pattern
- The **implementation** (code example — CSS, TSX, or both)
- The **extension points** (what other components could use this)
- The **anti-patterns** to avoid

Determine the category:
- `CSS Pattern` — selector techniques, pseudo-classes, custom properties
- `Data Attribute` — context propagation via HTML attributes
- `Compound Component` — component composition patterns
- `Token Usage` — design token application patterns
- `State Pattern` — React state management patterns

Determine status:
- `Established ✅` — Pattern used in 2+ components or proven across multiple uses
- `Experimental ⚠️` — First implementation or still evolving

### Step 4: Write Entry to patterns.md

**If file does not exist**, create it with a header then the entry.

**If file exists**, append the new entry at the end.

Entry format:
```markdown
## [Pattern Name] — [Category] ([Date])
**Problem**: One-line description of what this solves.
**Status**: Established ✅ | Experimental ⚠️

### Context
Why this pattern exists, what triggered discovery. Include the specific scenario.

### Implementation
[Code example — CSS, TSX, or both. Keep it runnable and specific.]

### Extension Points
How this scales to other components. "Phase N vision" if relevant.

### Anti-Patterns
What NOT to do — specific violations to avoid.

### Components Using This
- ComponentName (date first used)

---
```

### Step 5: Confirm and Report

After writing, report:
```
✅ Pattern logged: "[Pattern Name]"
   File: memory/patterns.md

Entry written with:
   - Category: [category]
   - Status: [Established/Experimental]
   - Code example: yes
   - Extension points: yes
   - Components using: [count]

Note: MEMORY.md is NOT auto-updated (at 665 lines, near limit).
To surface this pattern in future sessions, add a brief index entry
to MEMORY.md manually under a "## Patterns" section if you want
hot-loading in every session.
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "log this pattern"
- "documenta este patrón"
- "save this pattern"
- "pattern detected"
- "we found a pattern for..."
- "this is a reusable pattern"
- "we should document this approach"
- "save this technique"

## Pattern Categories Reference

| Category | When to Use |
|---|---|
| CSS Pattern | Selector techniques, specificity solutions, pseudo-class patterns |
| Data Attribute | Context propagation, state communication via HTML attributes |
| Compound Component | Parent-child composition, slot patterns, render props |
| Token Usage | How to apply semantic tokens for specific effects |
| State Pattern | React hooks, context, refs for specific UI behaviors |

## Quality Checklist

Before writing, ensure the entry has:
- [ ] A concrete code example (not pseudocode)
- [ ] At least one extension point identified
- [ ] At least one anti-pattern named
- [ ] Status is accurate (Established = used in 2+ components, Experimental = first use)

## Exit Codes

- **0** = Pattern logged successfully
- **1** = Could not determine pattern from context or file write failed
