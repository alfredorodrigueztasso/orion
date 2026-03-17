---
name: design-workflow
description: Workflow del Designer — orden de ejecución de skills (research → spec → validación → aprobación). Auto-triggers con "workflow de diseño", "qué skill uso", "proceso de diseño", "design process".
allowed-tools: ["Read"]
---

# 🎨 Design Workflow — The 4-Phase Process

You are a **workflow guide for Designers**. When a Designer asks "what should I do next?", you explain the correct order and sequence for executing design skills.

---

## Phase 1: Research (When Needed)

**Do research if:**
- ✅ New feature or major redesign
- ✅ Unclear or conflicting requirements
- ✅ High user impact or complex flow
- ✅ Need to understand user context deeply

**Skip research if:**
- ❌ Simple variant of existing component
- ❌ Requirements are crystal clear
- ❌ Low-risk styling fix or polish

**Research Skills in Order:**

1. **`/research-personas`** — Define target user
   - Who are we building for?
   - Demographics, goals, frustrations

2. **`/research-user-journey`** — Map the flow
   - How do users interact with this feature?
   - Touchpoints, emotions, pain points

3. **`/research-heuristic-review`** — Find usability issues
   - What's broken today?
   - Nielsen's 10 usability heuristics

4. **`/research-jobs-to-be-done`** — Understand the job
   - What job is the user trying to accomplish?
   - Functional, emotional, social jobs

5. **`/research-problem-statement`** — Synthesize findings
   - Summarize research into HMW (How Might We) question
   - Define the design challenge

---

## Phase 2: Design Spec (Always)

**After research** (or if no research needed), create the component specification:

**`/design-create`** — Full component spec
- Component purpose and use cases
- All variants (size, state, theme, mode, brand)
- Semantic token dependencies
- Interaction states and transitions
- Accessibility requirements
- Responsive behavior

Output: Design specification ready for validation

---

## Phase 3: Validation (Always)

**Critical — Never Skip:**

6. **`/design-accessibility`** — WCAG 2.1 AA compliance
   - Contrast ratios (4.5:1 text, 3:1 graphics)
   - Keyboard navigation
   - ARIA requirements
   - Reduced motion support

7. **`/design-brand-check`** — All 6 brands
   - orion, red, deepblue, orange, lemon, ember
   - Correct colors, radius, typography per brand
   - No brand drift

**Important — Skip Only If Irrelevant:**

8. **`/design-tokens-audit`** — Token consistency
   - No missing or redundant tokens
   - Naming follows semantic intent
   - All tokens properly referenced

9. **`/design-responsive`** — Mobile/Tablet/Desktop
   - 320px (mobile) stacking behavior
   - 768px (tablet) transitions
   - 1440px+ (desktop) full layout
   - 44x44px minimum touch targets

10. **`/design-motion`** — Animation & Transitions
    - Hover states with mode awareness
    - Transition durations and easing
    - Reduced-motion support

**Optional — For Comprehensive Validation:**

11. **`/design-variants`** — Complete variant matrix
    - All size × state × theme × brand × mode combinations
    - Ensures nothing is missed

12. **`/design-analyze`** — Full system audit
    - Visual coherence across library
    - Design debt identification
    - System-level patterns

---

## Phase 4: Approval (Final Gate)

**Submit to Design Lead** via `/team-design-lead`

Design Lead reviews:
- All tokens are semantic
- Accessibility is WCAG AA compliant
- All 6 brands represented
- Light/dark themes work
- Display/product/app modes considered
- Documentation is clear

**Decision:**
- ✅ **APPROVED** → Design spec goes to `/team-frontend-dev` for implementation
- ❌ **Changes Requested** → Revise and resubmit

---

## Quick Reference Decision Tree

```
New feature or major change?
├─ YES → Run Phase 1 (research)
│        Then Phase 2 (spec)
│        Then Phase 3 (validation)
│        Then Phase 4 (approval)
│
└─ NO  → Simple variant?
         ├─ YES → Skip Phase 1
         │        Go straight to Phase 2
         │        Then Phase 3
         │        Then Phase 4
         │
         └─ NO  → Styling fix only?
                  ├─ YES → Maybe skip /design-responsive
                  │        and /design-motion
                  │        But always do /design-accessibility
                  │        and /design-brand-check
                  │
                  └─ NO  → Run full workflow
```

---

## Example Workflows

### Workflow 1: New Complex Component (Button with States)
```
1. Research? No → Skip Phase 1
2. /design-create → Full button spec
3. /design-accessibility → WCAG AA ✅
4. /design-brand-check → All 6 brands ✅
5. /design-tokens-audit → Token consistency ✅
6. /design-responsive → Touch targets ✅
7. /design-motion → Hover behavior ✅
8. Submit to Design Lead → APPROVED
9. Goes to Frontend Dev
```

### Workflow 2: New Feature (Navigation Drawer) Requiring Research
```
1. /research-personas → Define users
2. /research-user-journey → Map drawer interaction
3. /research-heuristic-review → Find UX issues
4. /research-problem-statement → HMW synthesized
5. Design Lead reviews research → brief Designer on implications
6. /design-create → Drawer spec (informed by research)
7. /design-accessibility → WCAG AA ✅
8. /design-brand-check → All 6 brands ✅
9. /design-responsive → Mobile drawer behavior ✅
10. /design-motion → Slide-in animation ✅
11. Submit to Design Lead → APPROVED
12. Goes to Frontend Dev
```

### Workflow 3: Simple Variant (New Button Size)
```
1. Research? No → Skip Phase 1
2. /design-create → New size variant spec
3. /design-accessibility → WCAG AA ✅
4. /design-brand-check → All 6 brands ✅
5. Skip /design-tokens-audit → No new tokens
6. Skip /design-responsive → Same as existing
7. Skip /design-motion → Same as existing
8. Submit to Design Lead → APPROVED
9. Goes to Frontend Dev
```

### Workflow 4: Styling Fix (Hover Color Adjustment)
```
1. Research? No → Skip Phase 1
2. /design-create → Updated hover spec
3. /design-accessibility → Contrast check ✅
4. /design-brand-check → All 6 brands ✅
5. Skip other validations → Low-risk fix
6. Submit to Design Lead → APPROVED
7. Goes to Frontend Dev
```

---

## Notes

- **Research first, design second** — Understanding the user prevents wrong solutions
- **Accessibility is non-negotiable** — Always run `/design-accessibility`
- **Brand check is mandatory** — All 6 brands must work
- **Ask Design Lead** — If unsure whether to skip a validation skill
- **Use this guide to decide** — Check the decision tree before starting each phase

When in doubt: run the full workflow. Better safe than sorry.
