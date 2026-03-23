---
name: design-taste-audit
description: Detects visual anti-patterns and "AI tells" in code. Identifies generic layouts, hardcoded values, missing motion, etc. Maps each issue to a Taste pattern solution. Auto-triggers with "audita el design", "detecta ai tells", "revisa visual slop", "busca anti-patrones".
allowed-tools: ["Read", "Grep", "AskUserQuestion"]
argument-hint: [--file, --strict, --suggest-patterns]
---

# /design-taste-audit — Anti-Pattern Detective

Detects "AI tells" (visual indicators that code was AI-generated or generic), anti-patterns, and suggests Taste pattern fixes.

## What This Does

Analyzes code for common visual/design anti-patterns that signal generic or AI-generated design:
- Generic 3-column layouts (Bootstrap default)
- Hardcoded colors (`#000000`, `#FFFFFF`, `rgb(...)`)
- No motion (static designs)
- Linear easing only (robotic feeling)
- Oversized typography
- No semantic token usage
- Missing focus states (accessibility)
- Cramped spacing (`gap-2`, `gap-3`)

For each anti-pattern found, provides:
- ✅ **Root cause** (why it's generic)
- ✅ **Solution** (which Taste pattern fixes it)
- ✅ **Code example** (copy-paste ready)
- ✅ **Tokens to use** (Orion semantic tokens)

**Auto-triggers**:
- "audita el design"
- "detecta ai tells"
- "revisa visual slop"
- "busca anti-patrones"

---

## Usage

```bash
/design-taste-audit                    # Interactive: ask user
/design-taste-audit --file src/Button.tsx
/design-taste-audit --strict           # Report even minor issues
/design-taste-audit --suggest-patterns # Include pattern suggestions
```

---

## Execution Steps

### PASO 0: Determine Input

If no argument provided:
```
¿Qué archivo auditar?

a) Archivo específico (--file src/...)
b) Ejemplo de anti-patrones (--show-examples)

Elige (a/b):
```

### PASO 1: Read File

```bash
cat <path>
```

### PASO 2: Detect Anti-Patterns

Use `Grep` to search for patterns from `tokens/design-taste.json` → `ai-tell-anti-patterns`.

**Anti-Pattern Categories**:

#### Layout Anti-Patterns
```bash
grep -E "grid-cols-3|grid-cols-4|grid-cols-5" <file>  # Equal 3+ columns
grep -E "flex flex-col" <file>                          # All vertical stacks
grep -E "items-center justify-center" <file>            # Always centered
```

Indicators:
- `grid grid-cols-3` (generic)
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (no asymmetry)
- All cards have `h-full` or same height
- Everything centered or aligned same way

#### Color Anti-Patterns
```bash
grep -E "#000|#fff|#FFF|#000000|#FFFFFF" <file>        # Pure black/white
grep -E "rgb\(0,\s*0,\s*0\)|rgb\(255,\s*255,\s*255\)" <file>  # RGB hardcodes
grep -E "bg-\[#|text-\[#" <file>                        # Tailwind hardcodes
grep -E "background:\s*#|color:\s*#" <file>            # CSS hardcodes
```

Indicators:
- Hardcoded `#000`, `#FFF`, `#000000`, `#FFFFFF`
- RGB hardcodes: `rgb(0,0,0)`, `rgb(255,255,255)`
- Oversaturated colors (HSL sat > 80%)
- No use of `var(--*)` tokens
- "AI Purple" gradients (unsaturated purples)

#### Typography Anti-Patterns
```bash
grep -E "font-family|Inter|DM Sans" <file>             # Hardcoded fonts
grep -E "font-size:\s*[0-9]+px|text-\[[0-9]+" <file>  # Hardcoded sizes
grep -E "text-\[48px\]|text-\[56px\]" <file>           # Oversized H1
```

Indicators:
- `font-family: Inter` (assume it's already set)
- `font-size: 48px` or larger for body text
- All text same size (no hierarchy)
- `line-height` < 1.4 (readability issue)
- No font-weight variation

#### Motion Anti-Patterns
```bash
grep -E "transition|transform|animate" <file>          # Check if exists
grep -E "linear" <file>                                 # Linear easing
grep -E "200ms|duration" <file>                         # Only 200ms
```

Indicators:
- No `transition` property anywhere
- `transition: all 0.3s linear` (linear easing = robotic)
- Duration always `200ms` (no variation)
- No `prefers-reduced-motion` fallback
- No hover states defined

#### Component Anti-Patterns
```bash
grep -E ":focus|:focus-visible" <file>                  # Missing focus states
grep -E "appearance: none|::-webkit" <file>            # Style resets missing
grep -E "opacity.*0\.|disabled" <file>                  # Disabled state handling
```

Indicators:
- No `:focus-visible` styles (accessibility)
- Unstyled shadcn/ui components
- No hover states on interactive elements
- No disabled state styling
- Missing ARIA attributes

#### Spacing Anti-Patterns
```bash
grep -E "gap-[123]|p[xy]?-[123]|m[xy]?-[123]" <file>  # Cramped spacing
grep -E "gap-4 gap-6" <file>                            # Inconsistent gaps
```

Indicators:
- `gap-2`, `gap-3` (4px, 6px — cramped)
- `py-2`, `px-2` (small padding)
- Mixed gap sizes without rhythm
- No consistent vertical rhythm

### PASO 3: Count & Classify Issues

Categorize by severity:

```
Critical (blocks usage)
├─ Hardcoded colors without tokens
├─ Missing accessibility (focus, ARIA)
└─ Broken responsive layout

Medium (impacts premium feel)
├─ Missing motion/transitions
├─ Generic 3-column layout
├─ Linear easing only
└─ No component states

Low (Polish)
├─ Spacing rhythm inconsistency
├─ Oversized typography
└─ Color intentionality (could use semantic tokens)
```

### PASO 4: Generate Report

For each anti-pattern found:

1. **Location** — Line number, code excerpt
2. **Issue** — What's wrong, why it's generic
3. **Pattern Reference** — From `tokens/design-taste.json`
4. **Solution** — Exact fix with tokens
5. **Severity** — Critical/Medium/Low

---

## Output Format

```
╔═══════════════════════════════════════════════════════════════════════╗
║ DESIGN-TASTE AUDIT: [File Name]                                      ║
╚═══════════════════════════════════════════════════════════════════════╝

SUMMARY:
────────
Issues Found:     8
Critical:         1
Medium:           4
Low:              3
Effort to Fix:    30-45 min

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL ISSUES (Fix First):

❌ [Line 12] Hardcoded Color
   Issue:    background: '#4A90E2'
   Problem:  Hardcoded hex violates Orion AI-first rules + no dark mode
   Pattern:  Use semantic tokens for brand/interactive colors
   Solution: background: var(--interactive-primary)
   Tokens:   --interactive-primary (light), --interactive-primary-dark (dark)

   Why: Hardcoded colors break:
   • Dark mode switching (two colors needed)
   • Brand switching (can't use data-brand attribute)
   • Accessibility (no contrast guarantee)

   Fix (CSS):
   ✅ FROM:
   background: '#4A90E2';

   ✅ TO:
   background: var(--interactive-primary);
   @media (prefers-color-scheme: dark) {
     background: var(--interactive-primary-dark);
   }

   Or use CSS custom property + theme:
   [data-theme="light"] .button { background: var(--interactive-primary); }
   [data-theme="dark"] .button { background: var(--interactive-primary-dark); }

❌ [Line 27] Missing Focus Ring
   Issue:    No :focus-visible styles defined
   Problem:  Keyboard navigation is broken (accessibility violation)
   Pattern:  All interactive elements need visible focus rings
   Solution: Add focus styling

   Fix (CSS):
   .button:focus-visible {
     outline: 2px solid var(--interactive-primary);
     outline-offset: 2px;
   }

   Or with tokens:
   .button:focus-visible {
     box-shadow: 0 0 0 3px var(--interactive-primary),
                 inset 0 0 0 3px var(--surface-base);
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEDIUM ISSUES (Add Polish):

⚠️  [Line 18] No Motion/Transitions
   Issue:    Missing transition property on hover state
   Problem:  Instant state change feels cheap and robotic
   Pattern:  Spring Physics on Hover (from tokens/design-taste.json)
   Solution: Add smooth transitions with appropriate easing

   Why: Motion matters:
   • Instant changes feel jarring
   • Linear easing feels mechanical
   • Spring physics feel responsive and premium

   Fix (CSS):
   ✅ FROM:
   .button:hover {
     background-color: #3a7bc8;
   }

   ✅ TO (Tailwind):
   transition-all duration-300 ease-out hover:scale-98
   Or with CSS:
   .button {
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .button:hover {
     transform: scale(0.98);
     background-color: var(--interactive-primary-hover);
   }

   Recommended (Framer Motion):
   <motion.button
     whileHover={{ scale: 0.98 }}
     transition={{ type: 'spring', stiffness: 200, damping: 25 }}
   />

   Tokens:
   ✅ --interactive-primary-hover: Semantic hover state
   ✅ Spring config: stiffness 200, damping 25 (snappy feel)

⚠️  [Line 7] Generic 3-Column Layout
   Issue:    grid grid-cols-3 gap-4
   Problem:  Equal columns are monotonous and generic (Bootstrap default)
   Pattern:  Bento Grid (Asymmetric) from tokens/design-taste.json
   Solution: Create asymmetric layout with varied column spans

   Why: Asymmetry adds interest:
   • Guides user attention to featured content
   • Creates visual hierarchy
   • Feels intentional, not generic

   Fix (JSX/HTML):
   ✅ FROM:
   <div className="grid grid-cols-3 gap-4">
     <Card />
     <Card />
     <Card />
   </div>

   ✅ TO:
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
     <div className="lg:col-span-2">
       <Card featured />
     </div>
     <div className="lg:col-span-1">
       <Card />
     </div>
     <div className="lg:col-span-1">
       <Card />
     </div>
   </div>

   Tokens:
   ✅ gap-6: var(--spacing-6) = 24px
   ✅ lg:col-span-2: Wider featured card
   ✅ auto-rows-max: Flexible height per row

⚠️  [Line 32] Linear Easing
   Issue:    transition: 'all 0.3s linear'
   Problem:  Linear easing feels mechanical and cheap
   Pattern:  Cubic-bezier easing or spring physics
   Solution: Use ease-out or spring curves

   Why: Easing matters:
   • Linear = robotic, constant speed
   • Ease-out = natural, responsive
   • Spring = tactile, premium

   Fix (CSS):
   ✅ FROM:
   transition: all 0.3s linear;

   ✅ TO (Cubic-bezier):
   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   /* This is the Material Design easing function */

   ✅ TO (Tailwind):
   transition-all duration-300 ease-out

   ✅ TO (Framer Motion):
   transition={{ type: 'spring', stiffness: 200, damping: 25 }}

⚠️  [Line 44] Hardcoded Font
   Issue:    font-family: 'Inter, sans-serif'
   Problem:  Hardcoded fonts ignore design token system
   Pattern:  Use semantic font tokens (--font-primary, --font-secondary)
   Solution: Remove hardcoded font, rely on CSS variable inheritance

   Why: Semantic fonts matter:
   • Single source of truth for typography
   • Supports theme switching
   • Enables brand customization

   Fix (CSS):
   ✅ FROM:
   font-family: 'Inter, sans-serif';

   ✅ TO:
   font-family: var(--font-secondary);
   /* Already set in root, no need to repeat */

   Tokens:
   ✅ --font-primary: Libre Baskerville (headings)
   ✅ --font-secondary: DM Sans (body, UI) ← Use this for buttons
   ✅ --font-mono: JetBrains Mono (code)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOW ISSUES (Polish & Refinement):

🟢 [Line 50] Cramped Spacing
   Issue:    gap-3 py-2 px-3
   Problem:  Spacing is too tight, layout doesn't "breathe"
   Pattern:  Breathing Room from tokens/design-taste.json
   Solution: Increase spacing to create visual breathing room

   Why: Spacing psychology:
   • Cramped = cheap, dense
   • Generous = premium, luxurious
   • Rhythm = intentional design

   Fix (CSS):
   ✅ FROM:
   gap: var(--spacing-3);  /* 12px */
   padding: var(--spacing-2);  /* 8px */

   ✅ TO:
   gap: var(--spacing-6);  /* 24px */
   padding: var(--spacing-4);  /* 16px */

   For extra breathing (premium feel):
   gap: var(--spacing-8);  /* 32px */
   padding: var(--spacing-6);  /* 24px */

   Tokens:
   ✅ --spacing-6: var(--spacing-6) = 24px
   ✅ --spacing-8: var(--spacing-8) = 32px

🟢 [Line 63] Oversized Typography
   Issue:    font-size: 48px on body text
   Problem:  Large fonts reduce readability and look clumsy
   Pattern:  Use semantic font size tokens + hierarchy
   Solution: Use var(--font-size-xl) or var(--font-size-2xl) only for headings

   Fix (CSS):
   ✅ FROM:
   font-size: 48px;

   ✅ TO (Heading):
   font-size: var(--font-size-2xl);  /* 24px */

   ✅ TO (Body):
   font-size: var(--font-size-base);  /* 14px */

   Tokens:
   ✅ --font-size-base: 14px (standard body)
   ✅ --font-size-lg: 18px (large UI text)
   ✅ --font-size-xl: 20px (emphasis)
   ✅ --font-size-2xl: 24px (headings)
   ✅ --font-size-3xl: 32px (display text)

🟢 [Line 71] No Disabled State
   Issue:    Button has no disabled styling
   Problem:  Disabled buttons look clickable (accessibility + UX issue)
   Pattern:  Component State Styling
   Solution: Add opacity, color, and cursor changes

   Fix (CSS):
   .button:disabled {
     opacity: 0.5;
     cursor: not-allowed;
     background-color: var(--surface-layer);
     color: var(--text-tertiary);
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY BY CATEGORY:
════════════════════

Layout:       2 issues (1 medium)
Color:        2 issues (1 critical, 1 low)
Motion:       2 issues (2 medium)
Typography:   2 issues (1 medium, 1 low)
Spacing:      1 issue (1 low)
A11y:         1 issue (1 critical)
─────────────────────────────
Total:        10 issues

EFFORT TO FIX:
  Critical: 15 min (hardcoded colors, focus rings)
  Medium:   20 min (layout, motion, easing)
  Low:      10 min (spacing, typography)
  ──────────────
  Total:    45 min

IMPACT:
  Compliance: +30% (fixes hardcoded values)
  Premium Feel: +40% (adds motion, breathing room)
  Accessibility: +90% (focus rings, disabled states)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
═══════════

1. Review CRITICAL issues first (focus rings, hardcoded colors)
2. Fix MEDIUM issues (motion, layout, easing)
3. Polish with LOW issues (spacing, typography)
4. Validate changes:
   npm run validate              (check tokens)
   npm run validate-ai-first     (check compliance)
5. Run tests:
   npm test                      (unit tests)
6. Commit with message:
   git commit -m "refactor: fix design anti-patterns in [component]"

Ready to fix?

  ✅ Show me the fixes
  📋 Export a checklist
  ❓ Ask about a specific pattern
  ✋ Done reviewing for now
```

---

## Anti-Pattern Reference (From tokens/design-taste.json)

### Layout Anti-Patterns
- ❌ Three equal card columns (generic Bootstrap)
- ❌ Centered hero sections (cliché)
- ❌ All cards same height (no hierarchy)
- ❌ Symmetrical layouts everywhere

### Color Anti-Patterns
- ❌ Hardcoded `#000000`, `#FFFFFF` (pure black/white)
- ❌ Oversaturated colors (HSL sat > 80%)
- ❌ "AI Purple" gradients
- ❌ No semantic token usage

### Typography Anti-Patterns
- ❌ Hardcoded `font-family: Inter`
- ❌ Oversized H1 (>48px)
- ❌ No font hierarchy
- ❌ Line-height < 1.4 (readability)

### Motion Anti-Patterns
- ❌ Static (no transitions)
- ❌ Linear easing everywhere
- ❌ `200ms` duration only
- ❌ No `prefers-reduced-motion` fallback

### Component Anti-Patterns
- ❌ Unstyled shadcn/ui components
- ❌ Generic card design
- ❌ No hover states
- ❌ Missing focus rings

---

## Integration with Other Skills

**Before audit**:
- Optional: `/quick-check` to validate syntax

**After audit**:
- Implement fixes using `/design-taste` for pattern suggestions
- Run `/validate-ai-first` to verify compliance
- Run `/test-full` to ensure no regressions

**Related skills**:
- `/design-taste` — Suggests Taste patterns for improvement
- `/validate-ai-first` — Ensures compliance after fixes
- `/quick-check` — Pre-flight validation

---

## Flags & Options

### `--strict`
Report even low-severity issues:
```bash
/design-taste-audit --file src/Button.tsx --strict
```

### `--suggest-patterns`
Include Taste pattern suggestions for each issue:
```bash
/design-taste-audit --file src/Button.tsx --suggest-patterns
```

---

## Exit Codes

- **0** = Audit complete, issues found and reported
- **1** = File not found or read error
- **2** = User cancelled

---

## Skill Constraints

- ❌ Does NOT modify files (read-only)
- ❌ Does NOT generate code fixes
- ✅ Detects anti-patterns
- ✅ Suggests solutions mapped to Orion tokens
- ✅ All suggestions copy-paste ready
