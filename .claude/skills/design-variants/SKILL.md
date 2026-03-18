---
name: design-variants
description: Genera matriz de variantes (size × theme × brand × state × mode). Combinaciones completas. Auto-triggers con "genera variantes", "variant matrix", "todas las combinaciones".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🎨 Design — Variant Matrix Generation

Generate a complete matrix of component variants across all dimensions: size, style/variant, state, theme (light/dark), brand (4x), and mode (display/product/app).

## Variant Dimensions

### Size
- **sm** (small): Compact UI, dense layouts
- **md** (medium): Default, most common
- **lg** (large): Prominent, CTAs, emphasis

### Style/Variant (Component-Specific)
- **primary**: Main action, dominant
- **secondary**: Supporting action, alternative
- **ghost**: Minimal, outline, transparent
- **danger**: Destructive action (delete, remove)
- **success**: Positive action (confirm, save)
- **warning**: Cautionary action (alert, proceed with caution)
- *Custom variants* per component

### State
- **default**: Normal, resting state
- **hover**: Mouse over, interactive feedback
- **active**: Pressed, focused, current
- **disabled**: Non-interactive, 50% opacity
- **loading**: In progress, spinner visible
- **error**: Invalid state, error message

### Theme
- **light**: Light backgrounds, dark text
- **dark**: Dark backgrounds, light text

### Brand (4x)
- **orion**: Blue (#1B5BFF), 12px radius
- **red**: Red (#D7282F), 9999px pills
- **deepblue**: Navy (#006FBA), 12px radius
- **orange**: Orange (#F15D22), 9999px pills

### Mode (3x)
- **display**: Atmospheric (marketing, landing pages)
- **product**: Geometric (SaaS, dashboards)
- **app**: Tactile (mobile, touch interfaces)

## Variant Matrix Structure

```
Component × Dimensions = Total Variants

Button: 3 sizes × 3 styles × 6 states × 2 themes × 4 brands × 3 modes
     = 3 × 3 × 6 × 2 × 4 × 3 = 2,160 total variants

BUT practical reality: Not all combinations are valid
     - Disabled: No hover/active needed
     - Loading: No hover/active states
     - Practical count: ~200–400 visually distinct variants
```

## Variant Generation Checklist

### Size Variants
- [ ] Small (sm): Padding reduced, font smaller, touchable (≥44px height on mobile)
- [ ] Medium (md): Default, standard sizing
- [ ] Large (lg): Increased padding, font larger, prominent

### Style/Type Variants
- [ ] Primary: Brand accent, dominant visual weight
- [ ] Secondary: Muted accent, supporting role
- [ ] Ghost: Transparent/outlined, minimal visual weight
- [ ] Danger: Red/destructive color, warning tone
- [ ] Success: Green/positive color, affirmation tone
- [ ] Warning: Orange/caution color, attention tone

### State Variants
- [ ] Default: Resting appearance
- [ ] Hover: Visual feedback (darker, lifted, shadow change)
- [ ] Active: Pressed appearance (darker still, no lift)
- [ ] Focused: Keyboard focus indicator (visible focus ring)
- [ ] Disabled: Reduced opacity (50%), cursor not-allowed
- [ ] Loading: Spinner or progress indicator visible
- [ ] Error: Red tint, error message/icon visible

### Theme Variants
- [ ] Light theme: All 6 states × 3 styles × 3 sizes per brand/mode
- [ ] Dark theme: Same matrix, colors inverted via semantic tokens

### Brand Variants
- [ ] Orion: Blue accent, 12px radius
- [ ] Red: Red accent, 9999px pills
- [ ] Deepblue: Navy accent, 12px radius
- [ ] Orange: Orange accent, 9999px pills

### Mode Variants
- [ ] Display mode: Slower animations, generous spacing, atmospheric
- [ ] Product mode: Fast animations, compact spacing, geometric
- [ ] App mode: Medium animations, adaptable spacing, tactile

## Variant Matrix Table Example

For Button component (size × style × state):

```
| Size | Primary-Default | Primary-Hover | Primary-Active | Secondary-Default | ... |
|------|-----------------|---------------|----------------|-------------------|-----|
| sm   | Blue, 28px      | Darker blue   | Darkest blue   | Gray, 28px        | ... |
| md   | Blue, 32px      | Darker blue   | Darkest blue   | Gray, 32px        | ... |
| lg   | Blue, 36px      | Darker blue   | Darkest blue   | Gray, 36px        | ... |
```

Expanded for themes (2x):
```
| Theme | Brand | Size | Primary | Secondary | Ghost | Success | Warning | Danger |
|-------|-------|------|---------|-----------|-------|---------|---------|--------|
| Light | Orion | sm   | ✓       | ✓         | ✓     | ✓       | ✓       | ✓      |
| Light | Orion | md   | ✓       | ✓         | ✓     | ✓       | ✓       | ✓      |
| Light | Orion | lg   | ✓       | ✓         | ✓     | ✓       | ✓       | ✓      |
| Light | Red   | sm   | ✓       | ✓         | ✓     | ✓       | ✓       | ✓      |
| ...   | ...   | ...  | ...     | ...       | ...   | ...     | ...     | ...    |
| Dark  | Orion | sm   | ✓       | ✓         | ✓     | ✓       | ✓       | ✓      |
| ...   | ...   | ...  | ...     | ...       | ...   | ...     | ...     | ...    |
```

## Variant Testing Checklist

### Coverage
- [ ] All size combinations tested (sm, md, lg)
- [ ] All style variants tested (primary, secondary, ghost, danger, etc.)
- [ ] All states tested (default, hover, active, disabled, loading, error)
- [ ] All themes tested (light, dark)
- [ ] All 4 brands tested (orion, red, deepblue, orange)
- [ ] All 3 modes tested (display, product, app)

### Visual Consistency
- [ ] Colors use semantic tokens (not hardcoded)
- [ ] Radius matches brand (12px vs 9999px pills)
- [ ] Spacing scales proportionally
- [ ] Typography hierarchy maintained
- [ ] Shadows brand-tinted where applicable
- [ ] Motion respects mode (Display slower, Product faster)

### Accessibility
- [ ] Contrast: 4.5:1 for text, 3:1 for graphics (all states, all brands)
- [ ] Focus indicator visible (all interactive states)
- [ ] Disabled state clearly distinguishable (50% opacity + cursor)
- [ ] Color not sole indicator (text, icons, patterns used too)
- [ ] Loading indicators understandable (spinner/progress visible)

### Responsive
- [ ] Touch targets ≥44px on mobile (all states)
- [ ] Hover states work on desktop only (not mobile/touch)
- [ ] Disabled states prevent click (pointer-events: none)
- [ ] Text doesn't overflow (truncate if needed)

## Output Deliverable

A Variant Matrix Specification including:
1. **Dimension Map**: All applicable sizes, styles, states, themes, brands, modes
2. **Variant Count**: Total possible combinations vs. practical variants
3. **Visual Matrix**: Table or grid showing all combinations
4. **Token Dependencies**: Which tokens change per variant
5. **State Transitions**: How variants transition (default → hover → active → disabled)
6. **Exclusions**: Which combinations don't apply (e.g., disabled + hover)
7. **Brand-Specific Rules**: How each brand variant differs
8. **Mode Adjustments**: How Display/Product/App modes adjust timing/spacing
9. **Accessibility Notes**: Contrast, focus, color usage per variant
10. **Implementation Guide**: How to implement all variants in code

Example spec structure:

```markdown
# Variant Matrix: Button Component

## Dimensions
- **Sizes**: sm (28px), md (32px), lg (36px)
- **Styles**: primary, secondary, ghost, danger, success, warning
- **States**: default, hover, active, disabled, loading
- **Themes**: light, dark
- **Brands**: orion, red, deepblue, orange
- **Modes**: display, product, app

## Total Combinations
- Theoretical: 3 × 6 × 5 × 2 × 4 × 3 = 2,160
- Practical: ~350 (some combinations redundant)

## Style-Size Matrix (Light Theme, Orion Brand, Default State)

| Style | sm (28px) | md (32px) | lg (36px) |
|-------|-----------|-----------|-----------|
| Primary | Blue, padding-2 | Blue, padding-4 | Blue, padding-6 |
| Secondary | Gray, padding-2 | Gray, padding-4 | Gray, padding-6 |
| Ghost | Transparent, blue text | Transparent, blue text | Transparent, blue text |
| Danger | Red, padding-2 | Red, padding-4 | Red, padding-6 |
| Success | Green, padding-2 | Green, padding-4 | Green, padding-6 |
| Warning | Orange, padding-2 | Orange, padding-4 | Orange, padding-6 |

## State Transitions (Primary, md, Light Theme)

```
Default → Hover → Active → Disabled
Blue ────→ Darker ────→ Darkest → 50% opacity
         lift      no lift
```

## Brand Variants (Primary, md, Default, Light)

| Brand | Color | Radius | Appearance |
|-------|-------|--------|------------|
| Orion | #1B5BFF | 12px | Blue rounded |
| Red | #D7282F | 9999px | Red pill |
| Deepblue | #006FBA | 12px | Navy rounded |
| Orange | #F15D22 | 9999px | Orange pill |

## Mode Adjustments (Primary, md)

| Mode | Hover Lift | Shadow | Duration | Spacing |
|------|-----------|--------|----------|---------|
| Display | -4px | shadow-lg | 250ms | spacious |
| Product | 0px | shadow-flat | 150ms | compact |
| App | -2px | shadow-md | 200ms | normal |

## Accessibility (All Variants)

- Contrast: 4.5:1 text/background (all states, all brands)
- Focus: Visible focus ring on :focus-visible
- Disabled: 50% opacity + cursor not-allowed
- Loading: Spinner visible, text hidden or loading label shown

## Testing Evidence

- [x] All 18 style-size combinations tested
- [x] All states (default, hover, active, disabled, loading) tested
- [x] All 4 brands tested on light/dark themes
- [x] All 3 modes tested (Display/Product/App)
- [x] Contrast verified (4.5:1 minimum)
- [x] Keyboard focus visible
- [x] Touch targets ≥44px (mobile)
```

This becomes the blueprint for implementing all component variants consistently.
