---
name: log-adr
description: Document an Architecture Decision Record into memory/architecture-decisions.md with mandatory scalability reasoning. The "mentalidad escalable, no parches" skill. Auto-triggers when user says "log architecture decision", "ADR", "log ADR", "documenta decisión arquitectural", or "registro de decisión".
allowed-tools: ["Read", "Write", "Edit"]
argument-hint: [decision-title]
---

# Log ADR — Architecture Decision Records

Appends a structured ADR to `memory/architecture-decisions.md` with mandatory scalability reasoning.

## Purpose

Captures architectural decisions with their full context: what was decided, why alternatives were rejected, and crucially — **why this is scalable, not a patch**. This is the skill that builds institutional architectural knowledge.

The mandatory "Why This Is Scalable" section forces explicit reasoning about extensibility. If you cannot articulate why a decision scales, it may not belong in architecture-decisions.md at all.

## Usage

```bash
/log-adr "data-on-dark Context Propagation"
/log-adr release-pipeline-separation
/log-adr                    # Derives from current conversation context
```

## What This Writes

Appends to: `memory/architecture-decisions.md`

Never overwrites — always appends. The file is an append-only log by design.

## Execution Steps

### Step 1: Determine Decision Title

If `$ARGUMENTS` is provided, use it as the ADR title.

If no argument, derive a title from conversation context and confirm:
```
ADR title: "Release Pipeline Separation"
Scope: Infrastructure

Does this represent an architectural decision (not a patch)?
A decision is architectural if it:
- Establishes a pattern others will follow
- Changes how a system boundary is managed
- Has downstream consequences across 2+ sessions

Proceed? (yes / suggest different title)
```

### Step 2: Read architecture-decisions.md

Read the file to identify the next ADR number by counting existing `## ADR-N:` entries. The new entry will be `ADR-[N+1]`.

Check for similar decisions that already exist. If found, flag it:
```
Similar ADR found: "ADR-1: Badge + Hero data-on-dark Pattern"

Is this a new decision or an update to ADR-1?
(new / update ADR-1)
```

If updating, modify the existing entry's Status field and add an "Updated" note rather than creating a new entry.

### Step 3: Determine Scope and Status

Classify:
- **Scope**: Components | Tokens | Infrastructure | Build | DX | Testing
- **Status**: Accepted | Experimental | Deprecated

### Step 4: Synthesize ADR Content from Conversation

This requires careful synthesis. The model must reason about:
1. What problem or opportunity prompted this decision
2. What specific decision was made (not just what was done)
3. What alternatives were considered and why they were rejected
4. Whether this is a patch or a foundation — this is the critical distinction
5. How this scales from 1 instance to N instances
6. What the concrete extension path is
7. What tradeoffs were accepted

See `reference.md` for the full ADR template and scalability heuristics.

### Step 5: Write Entry

Append to `architecture-decisions.md`. The file already has a header and existing entries — append after the last `---` separator.

ADR entry format (use full template from reference.md):
```markdown
## ADR-[N]: [Decision Title] ([Date])
**Status**: Accepted | Experimental | Deprecated
**Scope**: Components | Tokens | Infrastructure | Build | DX | Testing

### Context
Problem or opportunity that prompted this decision.

### Decision
What was decided — specific and implementable.

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| Option A | Reason |
| Option B | Reason |

### Why This Is Scalable (Not a Patch)
**MANDATORY** — explicit reasoning:
- How does this pattern scale from 1 → N cases?
- What is the Phase N vision?
- Why will future developers follow this pattern naturally?
- What would a patch look like instead, and why was it rejected?

### Extension Path
1. Immediate: What can be done now
2. Short-term: What becomes possible in the next 2-4 sessions
3. Long-term: What the ecosystem effect looks like

### Consequences
**Positive**:
- [outcome 1]

**Tradeoffs accepted**:
- [tradeoff 1]

### Related Commits
- sha: message

---
```

### Step 6: Report

```
✅ ADR logged: "ADR-[N]: [Decision Title]"
   File: memory/architecture-decisions.md

Entry written with:
   - Scope: [scope]
   - Status: [Accepted/Experimental/Deprecated]
   - Alternatives considered: [count]
   - Scalability reasoning: documented
   - Extension path: [immediate/short/long-term]
   - Related commits: [count]

Scalability verdict: [one-sentence assessment of whether this is
                      genuinely architectural or borderline]

Note: architecture-decisions.md loads directly via MEMORY.md reference.
MEMORY.md itself is NOT auto-updated (near 200-line load limit).
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "log architecture decision"
- "ADR"
- "log ADR"
- "documenta decisión arquitectural"
- "registro de decisión"
- "this is an architectural decision"
- "this is a scalable pattern, not a patch"
- "we should record this decision"
- "save this architectural choice"

## Distinguishing ADRs from Patterns

Use `/log-pattern` for:
- CSS techniques reused across components
- Component composition approaches
- Token usage patterns

Use `/log-adr` for:
- Decisions that change how a system boundary is managed
- Infrastructure choices with downstream consequences
- Design system philosophy decisions (e.g., brand as global context)
- Build pipeline architecture choices

If unsure, ask: "Will this decision constrain or enable future architectural choices?" If yes → ADR. If no → Pattern.

## Scalability Checklist

Before writing "Scalable", verify at least 3 of these:
- [ ] The pattern works unchanged for 3+ other components/systems
- [ ] A future developer could discover and follow this without documentation
- [ ] The pattern does not require a global change when the N+1 case is added
- [ ] The pattern has a named "ecosystem effect" — what happens at scale

If fewer than 3 are true, mark the ADR as "Experimental" instead of "Accepted".

## Exit Codes

- **0** = ADR logged successfully
- **1** = Could not determine decision from context or file write failed
