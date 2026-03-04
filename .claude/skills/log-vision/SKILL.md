---
name: log-vision
description: Document a design vision or UX decision into memory/design-vision.md. Optionally creates VISUAL_GUIDELINES.md for stable decisions. Auto-triggers when user says "log design vision", "documenta visión de diseño", "save UX decision", or "log visual principle".
allowed-tools: ["Read", "Write", "Edit"]
model: haiku
argument-hint: [principle-name]
---

# Log Vision — Capture Design Vision & UX Decisions

Writes a structured entry to `memory/design-vision.md` documenting a design principle, visual rule, or UX decision discovered during iteration. Optionally contributes stable decisions to `VISUAL_GUIDELINES.md`.

## Purpose

Preserves the "why" behind design decisions across sessions. When visual principles emerge through iteration (typography rules, interaction patterns, spacing philosophy, mode-specific visual logic), capturing them prevents inconsistency when returning to the same areas later.

## Usage

```bash
/log-vision "display-mode-atmospheric-shadows"
/log-vision contextual-minimalism-per-mode
/log-vision                  # Derives from current conversation context
```

## What This Writes

Primary: `memory/design-vision.md`

Side effect (when stable): `VISUAL_GUIDELINES.md` in project root

## Execution Steps

### Step 1: Determine Principle Name

If `$ARGUMENTS` is provided, use it as the principle title.

If no argument, derive a title from conversation context and confirm:
```
Visual Principle: "Display Mode Atmospheric Shadows"
Category: Motion | Color | Typography | Spacing | Layout | Interaction

Correct? (yes / or provide new title)
```

### Step 2: Read Existing Files

Read both files to check for existing entries:
- `memory/design-vision.md` (if exists)
- `VISUAL_GUIDELINES.md` (if exists — currently missing but referenced in CLAUDE.md)

If `design-vision.md` does not exist, it will be created.
If `VISUAL_GUIDELINES.md` does not exist, note that it will be created only if the principle is stable.

### Step 3: Determine Stability

Ask the user:
```
Is this principle stable enough for VISUAL_GUIDELINES.md?
(The file is referenced in CLAUDE.md and will load in every session)

- Stable: Proven through 2+ implementations, unlikely to change
- Experimental: First iteration, may evolve

Stable or experimental?
```

### Step 4: Determine Category and Mode Scope

Classify the principle:
- **Category**: Typography | Spacing | Motion | Color | Interaction | Layout | Glassmorphism
- **Applies to**: Display | Product | App | All modes

### Step 5: Synthesize Entry from Conversation

Extract:
- **Principle** — The clear, implementable design rule
- **Rationale** — Why this decision was made (what it optimizes for: clarity, atmosphere, efficiency)
- **Implementation** — The CSS variables or tokens to use, with a code example
- **Violations** — Specific anti-patterns to avoid

### Step 6: Write to design-vision.md

**If file does not exist**, create it with header then entry.
**If file exists**, append entry at the end.

Entry format:
```markdown
## [Visual Principle] — [Category] ([Date])
**Category**: Typography | Spacing | Motion | Color | Interaction | Layout | Glassmorphism
**Applies to**: Display | Product | App | All modes
**Status**: Stable ✅ | Experimental ⚠️

### Principle
Clear, implementable statement of the design decision.

### Rationale
Why this decision was made. What it optimizes for. What problem it solves.

### Implementation
```css
/* CSS variables and code example */
```

### Violations
Specific anti-patterns — what NOT to do.

---
```

### Step 7: Conditionally Update VISUAL_GUIDELINES.md

**If the principle is Stable** and the user confirmed writing to VISUAL_GUIDELINES.md:

Check if `VISUAL_GUIDELINES.md` exists in the project root.

If it does not exist: Create it with a standard header:
```markdown
# Orion Visual Guidelines

This file is referenced in CLAUDE.md and automatically loaded in every development session.
Stable design decisions documented here are immediately available to all AI agents.

---

## Display Mode

## Product Mode

## App Mode

## Typography

## Spacing

## Motion

## Color

## Interaction

## Layout
```

Then add the principle under the appropriate section.

If it exists: Read its current structure. Add the principle under the appropriate section heading. Do NOT duplicate content that already exists.

The VISUAL_GUIDELINES.md entry should be written for an AI agent audience — concise, rule-based, with code examples. Reference the token variables from CLAUDE.md.

### Step 8: Report

```
✅ Vision logged: "[Principle Name]"

Written to:
   memory/design-vision.md     ✅ (full entry with rationale)
   VISUAL_GUIDELINES.md        ✅ stable / ⏭️ skipped (experimental)

Category: [category]
Mode scope: [Display/Product/App/All]
Status: Stable / Experimental

Note: VISUAL_GUIDELINES.md IS referenced in CLAUDE.md — stable
principles written there will load in every future session.
MEMORY.md is NOT auto-updated (near load limit).
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "log design vision"
- "documenta visión de diseño"
- "save UX decision"
- "log visual principle"
- "we should document this visual rule"
- "this is a visual guideline"
- "save this design decision"
- "log this UX pattern"

## Key Design Areas to Capture

| Area | Examples |
|---|---|
| Mode-aware visual | Shadow depth per mode, glassmorphism rules |
| Typography | Size scale per mode, font role (primary vs secondary) |
| Motion | Hover lift per mode, transition duration per mode |
| Color | Gradient patterns, brand tint on shadows |
| Interaction | Focus states, active states, disabled patterns |
| Layout | Split-view contracts, spacing rhythms |

## VISUAL_GUIDELINES.md Note

This file is referenced in CLAUDE.md but does not yet exist on disk. The first stable principle written via `/log-vision` will create it. Once created, it will auto-load in every session via the CLAUDE.md reference, making stable principles immediately available to all future AI sessions.

## Quality Checklist

Before writing, ensure:
- [ ] Principle is clear and implementable (not vague)
- [ ] Rationale explains the "why" (not just the "what")
- [ ] Implementation includes CSS variables (not hardcoded values)
- [ ] At least one violation/anti-pattern named
- [ ] Stability is accurate (Stable = proven in 2+ contexts)

## Exit Codes

- **0** = Vision logged successfully
- **1** = Could not determine principle from context or file write failed
