# ADR Reference Guide

This file contains the complete ADR template, scalability heuristics, and examples to guide the creation of Architecture Decision Records.

---

## Full ADR Entry Template

Use this template for every ADR entry written to `memory/architecture-decisions.md`:

```markdown
## ADR-[N]: [Decision Title] ([Date])
**Status**: Accepted | Experimental | Deprecated
**Scope**: Components | Tokens | Infrastructure | Build | DX | Testing

### Context
The problem or opportunity that prompted this decision.

Include:
- What was breaking or suboptimal before
- What triggered the investigation
- What constraints existed (time, compatibility, architecture)
- Why this decision was needed now

### Decision
What was decided — specific and implementable. Not "we improved X" but "we decided to use Y approach because Z".

State the decision as a clear, actionable choice.

### Alternatives Considered

| Alternative | Why Rejected |
|---|---|
| Option A | Specific reason — too complex, breaks constraint X, performance impact, etc. |
| Option B | Specific reason |
| Option C | Specific reason |

Include at least 2 alternatives. Explain why each was insufficient.

### Why This Is Scalable (Not a Patch)

**MANDATORY SECTION** — Answer these questions explicitly:

1. **How does this scale from 1 → N?**
   - 1 component uses the pattern today
   - N components can adopt it without architectural changes
   - The pattern is component-agnostic / system-agnostic

2. **What is the Phase N vision?**
   - What does the system look like when this is fully adopted?
   - What becomes automatic that is currently manual?

3. **Why will developers follow this naturally?**
   - Does it reduce decision fatigue?
   - Does it reduce code duplication?
   - Does it align with existing system conventions?

4. **What would a patch look like instead?**
   - Name the patch alternative
   - Explain why it was rejected in favor of this approach

### Extension Path

1. **Immediate** (this session): What was implemented or changed
2. **Short-term** (next 2-4 sessions): Next components/systems to adopt this pattern
3. **Long-term** (ecosystem effect): What becomes automatic when 5-8+ components use this

### Consequences

**Positive**:
- [measurable or observable outcome]
- [another positive consequence]

**Tradeoffs accepted**:
- [what was given up or made more complex]
- [migration burden if any]
- [performance implications if any]

### Related Commits

- sha: commit message
- sha: commit message

---
```

---

## Scalability Heuristics Checklist

Before marking an ADR as "Accepted", verify at least 3 of these 4 criteria:

**Scalability Checklist**:
- [ ] **Generalization**: The pattern works unchanged for 3+ other components/systems (not just this one)
- [ ] **Discoverability**: A future developer could discover and follow this pattern without documentation
- [ ] **Automation**: The pattern does not require a global change when the N+1 case is added
- [ ] **Ecosystem Effect**: The pattern has a named "ecosystem effect" — what happens when all components use it

**If fewer than 3 boxes are checked**: Mark the ADR as **"Experimental"** rather than "Accepted". Experimental ADRs can mature into Accepted once they've proven scalability through multiple implementations.

---

## Examples of Strong vs. Weak ADR Reasoning

### ❌ Weak (Do NOT write this)

```markdown
### Why This Is Scalable (Not a Patch)
This approach will work for future components too.
```

**Why it's weak**: Vague, unsupported, doesn't address the four questions above.

---

### ✅ Strong (Write THIS)

```markdown
### Why This Is Scalable (Not a Patch)

**Scale 1 → N**: The `data-on-dark` attribute is component-agnostic CSS.
Any component can adopt it by adding one CSS selector:
```css
:global([data-on-dark="true"]) .variant { /* inverse appearance */ }
```
No prop changes, no TypeScript changes, no registry updates required.

**Phase N vision**: When 8+ components (Alert, Card, Chip, Badge, Button, etc.)
implement this, any container component (Hero, Modal, Sidebar) that sets
`data-on-dark="true"` becomes a "dark zone" where all children auto-adapt.
Developers stop choosing `variant="inverse"` manually — the container context
handles it entirely. This is zero-config theming.

**Natural adoption**: The pattern mirrors how CSS specificity already works.
Developers familiar with context-based styling (`data-theme`, `data-brand`)
will adopt it without training. No documentation needed once the pattern is
in place.

**vs. Patch alternative**: A patch would add `variant="inverse"` to every component
manually at each use site. That scales linearly (N components × M use sites).
The scalable approach moves the decision to the container level (1 place),
eliminating per-component decisions. This is the key difference between a
patch and a foundation.
```

**Why it's strong**:
- Directly answers all 4 questions
- Includes concrete code example
- Explains the ecosystem effect
- Contrasts with the patch alternative explicitly
- Uses specific component names (proves the vision is real)

---

## Scope Classification Guide

Use one of these scope categories for every ADR:

| Scope | When to Use | Examples |
|---|---|---|
| **Components** | Decision about how a component family works | New variant system, prop API change, composition pattern |
| **Tokens** | Decision about the token layer | Semantic token categories, new primitive, theme extension |
| **Infrastructure** | CI/CD, release pipeline, build tool, pre-commit hooks | Turbo caching strategy, release automation, git hooks |
| **Build** | Vite config, bundle strategy, code splitting, externalization | Shared vite config, preserveModules strategy, entry points |
| **DX** | Developer Experience — documentation, CLI, skill system, workflows | Skill system design, CLI command structure, template patterns |
| **Testing** | Test strategy, coverage requirements, test organization | E2E test structure, visual regression approach, coverage thresholds |

---

## Status Field Guidance

| Status | When to Use | Examples |
|---|---|---|
| **Accepted** | Decision is proven and in use; 3+ scalability criteria met | data-on-dark pattern (used in Badge, Hero), release pipeline separation (deployed) |
| **Experimental** | Decision is promising but not yet proven at scale; 0-2 criteria met | New token category (planned for 2-3 components), new build approach (first implementation) |
| **Deprecated** | Decision was previously accepted but is being phased out | Old variant system (being replaced), legacy build approach (moved to new system) |

---

## Real-World ADR Examples from Orion

### Example 1: Strong (Accepted)

```markdown
## ADR-1: data-on-dark Context Propagation (Feb 28 2026)
**Status**: Accepted
**Scope**: Components

### Context
Multiple components (Alert, Card, Hero) needed to display on dark backgrounds
without prop drilling. Current approach: manual `variant="inverse"` at each site.
This scales poorly and creates decision fatigue.

### Decision
Introduce `data-on-dark="true"` HTML attribute for containers. Components detect
it via CSS `:global([data-on-dark="true"])` selector and auto-adapt their appearance
(e.g., switch to inverse variant automatically).

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| Add `brand` prop to every component | Violates AI-first principle (brand is global, not component prop) |
| ThemeProvider dark mode toggle | Doesn't work for mixed light/dark sections on same page |
| Manual prop passing | Scales linearly, requires documentation at every use site |

### Why This Is Scalable (Not a Patch)
**Scale 1 → N**: The `data-on-dark` attribute is component-agnostic. Any component
adds one CSS selector — no prop changes.

**Phase N vision**: When 8+ components use this, any container (Hero, Modal) that
sets the attribute becomes a dark zone. Children auto-adapt. Zero-config.

**Natural adoption**: Aligns with existing `data-theme` and `data-brand` patterns.

**vs. Patch**: Manual `variant="inverse"` at every site is the patch. Moving to
container-level context is the scalable foundation.

### Extension Path
1. Immediate: Implement in Badge, Hero
2. Short-term: Alert, Card, Chip, Button (2-3 sessions)
3. Long-term: All 40+ components support it; dark zones are standard pattern

### Consequences
**Positive**:
- Zero-config dark backgrounds
- Eliminates variant prop drilling
- Aligns with global context pattern

**Tradeoffs accepted**:
- Initial CSS overhead (one selector per variant)
- Developers must understand the context pattern

### Related Commits
- 8e7deb4: feat(badge, hero): add inverse + auto-switching
```

This ADR is **Accepted** because:
- ✅ Works unchanged in 2+ components (Badge, Hero, Card)
- ✅ Discoverable (mirrors data-theme pattern)
- ✅ No global change needed for N+1 components
- ✅ Named ecosystem effect ("dark zones")

---

### Example 2: Experimental (First Implementation)

```markdown
## ADR-7: Shared Vite Configuration (Feb 28 2026)
**Status**: Experimental
**Scope**: Build

### Context
Both packages/react and packages/blocks had divergent, hard-to-maintain Vite
configs (60+ lines each, duplicated). Changes to one risked breaking the other.

### Decision
Create `vite.shared.config.ts` with factory function `createViteConfig()` and
`COMMON_EXTERNALS` export. Both packages call the factory with their specific
entry points.

### Alternatives Considered
| Alternative | Why Rejected |
|---|---|
| Keep separate configs | Maintenance burden, easy to drift |
| One global config | Can't support different entry points (react vs blocks) |
| Manual inheritance | Config inheritance in Vite is not straightforward |

### Why This Is Scalable (Not a Patch)
**Scale 1 → N**: If we add packages/cli or packages/create that use Vite, they
call `createViteConfig()` with their own entry point.

**Phase N vision**: When 5-6 packages use the factory, maintenance becomes trivial.
Shared build strategy across entire monorepo.

**Natural adoption**: Future packages will see the pattern and follow it.

**vs. Patch**: Copy-paste config to each new package would be the patch.

### Extension Path
1. Immediate: Use in react and blocks
2. Short-term: packages/cli and packages/create if they get Vite builds
3. Long-term: Single source of truth for all monorepo build config

### Consequences
**Positive**:
- DRY (no duplication)
- Single source of truth for build strategy
- Easy to add new packages

**Tradeoffs accepted**:
- Factory complexity (small)
- All packages constrained by COMMON_EXTERNALS

### Related Commits
- 4eb03e8: Shared Vite config + refactoring both packages
```

This ADR is **Experimental** because:
- ✅ Works unchanged in 2+ packages (react, blocks)
- ❌ Haven't added a 3rd package yet (not proven at scale)
- ✅ No global change needed for N+1 packages
- ❌ Ecosystem effect not yet visible (only 2 packages use it)

**3 of 4 criteria met** → Experimental is appropriate. Once packages/cli and
packages/create adopt it, this can become Accepted.

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: "Patch ADR"

**Problem**: ADR describes a one-off fix, not a pattern.

```markdown
## ADR-12: Fix Button TypeScript Error (Date)
**Scope**: Components

### Decision
Added `readonly` to ButtonProps interface to fix TypeScript error.
```

**Why it's wrong**: This is a bug fix, not an architectural decision. Use `/log-fix` instead.

---

### ❌ Anti-Pattern 2: "Missing Scalability Section"

```markdown
## ADR-13: Add Card Component (Date)

### Decision
Create a new Card component for layouts.
```

**Why it's wrong**: No "Why This Is Scalable" section = not an architectural decision, just a component.
Architectural decisions must explain how they scale.

---

### ❌ Anti-Pattern 3: "Vague Scalability"

```markdown
### Why This Is Scalable (Not a Patch)
This will work for all components in the future.
```

**Why it's wrong**: Unsupported, vague, doesn't answer the 4 questions. See Strong example above.

---

## Decision Tree: Is It an ADR?

```
Does this decision establish a pattern others will follow?
├─ YES → Is it specific and implementable?
│  ├─ YES → Can you write a 3-part Extension Path?
│  │  ├─ YES → 🟢 Log it as ADR
│  │  └─ NO → 🔴 Too vague, wait for more clarity
│  └─ NO → 🔴 Not specific enough
└─ NO → Is it a pattern that can be reused in components/sections?
   ├─ YES → 🟢 Log it with /log-pattern instead
   └─ NO → 🔴 Not worth recording (bug fixes → /log-fix)
```

---

## Revision Protocol

If an ADR needs updating (status change, new consequences discovered):

1. Do NOT create a new ADR
2. Update the existing entry's Status field
3. Add an "**Updated**" subsection explaining the change:

```markdown
## ADR-5: [Original Title] (Original Date)
**Status**: Accepted → Deprecated (Updated 2026-03-03)

### Updated
Previously Accepted. Now being phased out in favor of ADR-8 (new approach).
Migration timeline: components will switch to ADR-8 approach over next 3 sessions.
```

---

## Related Skills

- `/log-pattern` — For CSS techniques, component composition patterns, token usage
- `/log-fix` — For bug resolutions and error documentation
- `/log-vision` — For visual principles and design decisions

Use `/log-adr` **only** for decisions that change system boundaries or establish patterns
with downstream consequences.
