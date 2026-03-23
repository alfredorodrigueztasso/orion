---
name: design-taste
description: Premium layout evaluator. Analyzes existing layouts and proposes premium improvements using Taste patterns mapped to Orion tokens. Auto-triggers with "mejora este layout", "design taste review", "cómo haría taste-skill esto", "revisa este diseño".
allowed-tools: ["Read", "Grep", "AskUserQuestion"]
argument-hint: [--file, --component, --full-audit]
---

# /design-taste — Premium Layout Evaluator

Analyzes existing layouts and proposes premium improvements using Taste patterns mapped to Orion tokens.

## What This Does

Reads a layout file or component, scores it on visual richness dimensions, and suggests Taste patterns that elevate the design from generic to premium. All suggestions are:
- ✅ **Mapped to Orion tokens** (not hardcoded values)
- ✅ **Copy-paste ready** (shows exact code changes)
- ✅ **Prioritized by effort** (Easy, Medium, Hard)
- ✅ **Non-invasive** (cosmetic improvements, not API changes)

**Does NOT generate code** — only suggests what could be better and how to fix it.

**Auto-triggers**:
- "mejora este layout"
- "cómo haría taste-skill esto"
- "design taste review"
- "revisa este diseño visual"

---

## Usage

```bash
/design-taste                          # Interactive: ask user for file
/design-taste --file src/components/Button/Button.tsx
/design-taste --component Button       # Search for component
/design-taste --full-audit             # Evaluate entire components/ directory
```

---

## Modes

| Mode | Argument | Function |
|---|---|---|
| **Interactive** | (none) | Ask user for file path or component name |
| **Single File** | `--file <path>` | Evaluate one file |
| **By Component** | `--component <name>` | Find component and evaluate |
| **Audit** | `--full-audit` | Score all components in directory |

---

## Execution Steps

### PASO 0: Determine Input

If no argument provided:
```
¿Qué quieres mejorar?

a) Archivo específico (--file src/...)
b) Componente por nombre (--component Button)
c) Auditoría completa (--full-audit)
d) Mostrar ejemplo

Elige (a/b/c/d):
```

If user says "d", show:
```
EJEMPLO: /design-taste --file src/sections/Hero.tsx

(Skill will then evaluate Hero.tsx)
```

### PASO 1: Read Target File

```bash
# If --file: read directly
cat <path>

# If --component: find component
find src/components -name "<name>*" -type f | grep -E "\.(tsx|css)" | head -5

# If --full-audit: list all components
find src/components -name "*.tsx" -not -path "*.stories.*" -not -path "*.test.*"
```

**Output**: File content (if single file) or list of components (if audit)

### PASO 2: Analyze Layout Structure

Read the CSS/JSX and classify:

**Layout Pattern** (from `tokens/design-taste.json`):
- 3-column equal grid (generic) → Upgrade to Bento
- Single-column layout (flat) → Add hierarchy
- Centered content only (cliché) → Asymmetric arrangement
- All cards same height (no hierarchy) → Variable height with spans

**Visual Elements Present**:
- ✅/❌ Motion (transitions, hover effects)
- ✅/❌ Elevation (shadows, borders, depth)
- ✅/❌ Spacing rhythm (consistent vertical rhythm)
- ✅/❌ Typography hierarchy (size variation, weight changes)
- ✅/❌ Color intentionality (semantic tokens vs hardcoded)

**Anti-Patterns Detected** (from `tokens/design-taste.json` → `ai-tell-anti-patterns`):
- Hardcoded colors (`#FFF`, `#000`, `rgb(...)`)
- No motion anywhere (static hover states)
- Linear easing only
- All text same size
- Cramped spacing (`gap-2`, `gap-3`)

### PASO 3: Score on Taste Dimensions

Use this scale (1-10 for each):

```
Visual Richness (variety in layouts, asymmetry, hierarchy)
  1 = All equal columns, same height cards
  10 = Bento grid with varied spans, organic heights

Micro-interaction (hover states, transitions, feedback)
  1 = Static, no transitions
  10 = Spring physics, multiple states per element

Spatial Harmony (breathing room, vertical rhythm, margins)
  1 = Cramped (gap-2, py-2)
  10 = Generous (gap-8, py-6), perfect white space

Premium Feel (elevation, depth, polish)
  1 = Flat, no shadows
  10 = Layered shadows, double-bezel borders, glass effects
```

Example assessment:
```
Layout: 3-column equal grid
Visual Richness: 3/10 (monotonous)
Micro-interaction: 2/10 (no transitions)
Spatial Harmony: 5/10 (adequate but not breathing)
Premium Feel: 3/10 (flat design)

OVERALL TASTE SCORE: 3.25/10 (Below Premium Threshold)
```

### PASO 4: Map to Taste Patterns

For each low-scoring dimension, suggest ONE pattern from `tokens/design-taste.json`:

| Dimension | Pattern Option | Token References |
|---|---|---|
| **Visual Richness** | Bento Grid (Asymmetric) | grid-cols, lg:col-span-2, auto-rows-auto |
| **Visual Richness** | Masonry Layout | columns, gap |
| **Micro-interaction** | Spring Physics on Hover | motion.button, whileHover, transition |
| **Micro-interaction** | Perpetual Pulse | animation, duration |
| **Spatial Harmony** | Breathing Room | spacing-6, spacing-8, vertical rhythm |
| **Premium Feel** | Double-Bezel Card | border-subtle, text-tertiary (inset highlight) |
| **Premium Feel** | Spotlight Border | gradient animation, blur tokens |

### PASO 5: Generate Recommendations

For each pattern, provide:

1. **Pattern Name** — From `tokens/design-taste.json`
2. **Why** — 1-2 sentences on impact
3. **Before/After Code** — Exact CSS/JSX changes
4. **Effort Level** — Easy/Medium/Hard
5. **Token References** — Which Orion tokens to use

Example:

```
1️⃣ LAYOUT UPGRADE (Easy)
   Pattern: "Bento Grid (Asymmetric)"
   Why: Reduces monotony, creates visual weight variation,
        guides user attention to featured content

   Change from:
   <div className="grid grid-cols-3 gap-4">

   Change to:
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
     <div className="lg:col-span-2"> {/* Feature card larger */}
       <h2>Featured Section</h2>
     </div>
     <div className="lg:col-span-1"> {/* 2 smaller cards stack */}
       <Card />
       <Card />
     </div>

   Tokens used:
   - gap-6: var(--spacing-6) [16px gap]
   - lg:col-span-2: Tailwind grid span (standard)
   - auto-rows-max: CSS Grid [flexible height]
```

### PASO 6: Prioritize Recommendations

Show priority grid:

```
HIGH PRIORITY (80% of premium feel)
  🔴 Layout improvement (visual richness)
  🔴 Add elevation/shadows (premium feel)

MEDIUM PRIORITY (Adds polish)
  🟡 Micro-interactions (hover feedback)
  🟡 Fix spacing rhythm (breathing room)

LOW PRIORITY (Refinement)
  🟢 Color intentionality (use semantic tokens)
  🟢 Typography hierarchy (size/weight variation)
```

---

## Output Format

```
╔═══════════════════════════════════════════════════════════════════════╗
║ DESIGN-TASTE EVALUATION: [File Name or Component]                    ║
╚═══════════════════════════════════════════════════════════════════════╝

CURRENT STATE:
═════════════

Layout Pattern:      3-column grid (equal width)
Motion:             ❌ None (static hover)
Elevation:          ⚠️  Minimal (no shadows)
Spacing:            ⚠️  Adequate but cramped (gap-4)
Typography:         ✅ Hierarchy present
Color:              ⚠️  Mix of tokens + hardcoded

TASTE ASSESSMENT (Scale 1-10):
══════════════════════════════

  Visual Richness:      4/10  (monotonous 3-column layout)
  Micro-interaction:    2/10  (no transitions)
  Spatial Harmony:      5/10  (adequate but not breathing)
  Premium Feel:         3/10  (flat design, no depth)
  ────────────────────────
  OVERALL SCORE:        3.5/10 (Generic — Needs Premium Treatment)

═══════════════════════════════════════════════════════════════════════════

RECOMMENDATIONS (Prioritized):
══════════════════════════════

1️⃣ LAYOUT UPGRADE (Easy) — 15 min
   Pattern: "Bento Grid (Asymmetric)"
   Why: Removes monotony, creates visual hierarchy, guides attention

   CSS Change:
   FROM:
   grid grid-cols-3 gap-4

   TO:
   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max

   JSX Change:
   <div className="lg:col-span-2"> {/* Feature card 2x wider */}
     <Card featured />
   </div>
   <div className="lg:col-span-1">
     <Card />
     <Card />
   </div>

   Tokens:
   ✅ gap-6 = var(--spacing-6)
   ✅ grid = Tailwind CSS Grid (standard)
   ✅ auto-rows-max = CSS Grid height auto

   Estimated Result: 7/10 visual richness

2️⃣ CARD ELEVATION (Medium) — 10 min
   Pattern: "Double-Bezel"
   Why: Adds depth and premium feel without breaking accessibility

   CSS Change:
   .card {
     border: 1px solid var(--border-subtle);      /* Outer shell */
     box-shadow: inset 0 1px 0 0 var(--text-tertiary);  /* Inner highlight */
     background: var(--surface-base);
   }

   On Hover:
   .card:hover {
     box-shadow: var(--mode-shadow-hover), inset 0 1px 0 0 var(--text-tertiary);
   }

   Tokens:
   ✅ --border-subtle: Semantic border
   ✅ --text-tertiary: Inset highlight color
   ✅ --mode-shadow-hover: Mode-aware shadow (Display/Product/App)

   Estimated Result: 6/10 premium feel

3️⃣ MOTION ADD (Easy) — 20 min
   Pattern: "Spring Physics on Hover"
   Why: Tactile feedback, premium polish, responsive feel

   JSX Change (if using Framer Motion):
   <motion.button
     whileHover={{ scale: 0.98 }}
     transition={{ type: 'spring', stiffness: 200, damping: 25 }}
   >
     Click me
   </motion.button>

   OR CSS (if Framer Motion not available):
   .button {
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .button:hover {
     transform: scale(0.98);
     box-shadow: var(--mode-shadow-hover);
   }

   Motion Spec (from tokens/design-taste.json):
   - Stiffness: 200 (snappy feel)
   - Damping: 25 (responsive)
   - Type: spring (not linear)

   Estimated Result: 7/10 micro-interaction

4️⃣ SPACING REFINEMENT (Easy) — 10 min
   Pattern: "Breathing Room"
   Why: Premium layouts have generous vertical rhythm

   CSS Changes:
   FROM:  gap-4 py-2
   TO:    gap-6 py-4 (or gap-8 py-6 for extra breathing room)

   Tokens:
   ✅ gap-6 = var(--spacing-6) = 24px
   ✅ py-4 = var(--spacing-4) = 16px vertical padding

   Estimated Result: 6/10 spatial harmony

═══════════════════════════════════════════════════════════════════════════

PRIORITY SUMMARY:
═════════════════

🔴 HIGH (Do First — 80% of improvement)
   ✓ Layout upgrade (pattern #1)
   ✓ Card elevation (pattern #2)

🟡 MEDIUM (Adds Polish)
   ✓ Motion (pattern #3)

🟢 LOW (Refinement)
   ✓ Spacing (pattern #4)

ESTIMATED TOTAL EFFORT: 45-60 minutes to implement all

ESTIMATED RESULT:
  Current Score:  3.5/10
  After Changes:  7.5/10 (Premium Threshold ✅)

═══════════════════════════════════════════════════════════════════════════

NEXT STEPS:
═══════════

1. Review recommendations above
2. Start with HIGH priority (#1 and #2)
3. Test layout changes in browser
4. Add motion (#3) and spacing (#4) refinements
5. Run validation:
   npm run validate              (check token compliance)
   npm run type-check            (verify TypeScript)
6. git commit with message: "refactor: apply design-taste patterns to [component]"

Ready to implement?

  ✅ Start with HIGH priority recommendations
  📖 Show more details on any pattern
  ❓ Ask follow-up questions
  ✋ Skip this component for now
```

---

## Integration with Other Skills

**Before using this skill**:
- Optional: `/quick-check` to validate current state

**After using this skill**:
- Implement recommendations
- Run `/validate-ai-first` to ensure token compliance
- Run `/test-full` to ensure changes don't break tests

**Related skills**:
- `/design-taste-audit` — Detects anti-patterns (complementary)
- `/quick-check` — Pre-flight validation
- `/validate-ai-first` — Ensure token compliance after changes

---

## Common Patterns Used

### Bento Grid (Asymmetric)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
  <div className="lg:col-span-2">Featured Card</div>
  <div className="lg:col-span-1">Small Card 1</div>
  <div className="lg:col-span-1">Small Card 2</div>
</div>
```

### Masonry Layout
```css
.masonry {
  columns: 1;
  gap: var(--spacing-6);
}

@media (min-width: 768px) {
  .masonry { columns: 2; }
}

@media (min-width: 1024px) {
  .masonry { columns: 3; }
}
```

### Spring Motion (Framer)
```jsx
<motion.button
  whileHover={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
>
  Click
</motion.button>
```

### Double-Bezel Card
```css
.card {
  border: 1px solid var(--border-subtle);
  box-shadow: inset 0 1px 0 0 var(--text-tertiary);
  background: var(--surface-base);
}

.card:hover {
  box-shadow: var(--mode-shadow-hover), inset 0 1px 0 0 var(--text-tertiary);
}
```

---

## Exit Codes

- **0** = Evaluation complete, recommendations provided
- **1** = File not found or read error
- **2** = User cancelled

---

## Skill Constraints

- ❌ Does NOT modify files (read-only)
- ❌ Does NOT generate code
- ✅ Only suggests improvements
- ✅ All suggestions mapped to Orion tokens
- ✅ All suggestions copy-paste ready
