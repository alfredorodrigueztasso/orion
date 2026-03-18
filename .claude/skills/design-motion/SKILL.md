---
name: design-motion
description: Crea spec de animaciones (transiciones, hover, reduced-motion). Duración, easing, triggers. Auto-triggers con "spec de animaciones", "motion design", "transiciones", "animations".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🎨 Design — Motion & Animation Specification

Create a complete motion design specification with animation timings, easing functions, triggers, and accessibility considerations (reduced-motion compliance).

## Motion System

### Duration Guidelines (Mode-Aware)

| Duration | Use Case | Effect |
|----------|----------|--------|
| **100ms** | Micro-interactions (icon change, status indicator) | Instant feedback |
| **150ms** | Hover states (button, card lift) | Quick response |
| **200ms** | State changes (expand/collapse, modal open) | Smooth, snappy |
| **300ms** | Page transitions, complex animations | Graceful, deliberate |
| **500ms+** | Entrance animations, hero animations | Dramatic, cinematic |

**Mode-Aware Speeds**:
- **Display mode**: Slower (250–500ms) — Atmospheric, generous timing
- **Product mode**: Faster (100–200ms) — Efficient, responsive
- **App mode**: Medium (150–250ms) — Tactile, natural

### Easing Functions

```css
/* Easing curve names (CSS variable aliases) */
--easing-linear: linear
--easing-in: cubic-bezier(0.4, 0, 1, 1)
--easing-out: cubic-bezier(0, 0, 0.2, 1)
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--easing-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

**When to Use**:
- `ease-out`: Enter animations (elements appearing)
- `ease-in`: Exit animations (elements disappearing)
- `ease-in-out`: Continuous state changes (expand/collapse)
- `linear`: Progress indicators, spinners
- `bounce/elastic`: Playful, engaging interactions

### Transform Properties

```css
/* Safe transforms for smooth 60fps animations */
--mode-hover-lift: -2px | -4px | 0px (mode-specific)
--mode-shadow-hover: var(--shadow-md) | var(--shadow-lg) | var(--shadow-flat)

/* Components should use */
transform: translateY(var(--mode-hover-lift));
box-shadow: var(--mode-shadow-hover);
transition: all 200ms var(--easing-out);
```

## Motion Specification Template

### Hover States
- [ ] **Button hover**: `translateY(var(--mode-hover-lift))` + shadow lift
- [ ] **Card hover**: Subtle shadow increase or lift (no translate)
- [ ] **Link hover**: Color change or underline animation
- [ ] **Icon hover**: Color change or scale (1 → 1.1)

### State Changes
- [ ] **Expand/Collapse**: `max-height: 0 → auto` with opacity fade
- [ ] **Modal Open**: Fade-in background (`opacity: 0 → 1`), scale content (`scale: 0.95 → 1`)
- [ ] **Toggle Switch**: Icon slides inside or color transitions
- [ ] **Accordion**: `max-height` animation + icon rotation

### Page/View Transitions
- [ ] **Fade-in**: New page `opacity: 0 → 1` over 200–300ms
- [ ] **Slide-in**: New page `translateX(-20px → 0)` + fade
- [ ] **Expand-in**: Modal `scale: 0.95 → 1` + fade

### Loading & Progress
- [ ] **Spinner**: Continuous rotation (infinite)
  ```css
  animation: spin 1s linear infinite;
  @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
  ```
- [ ] **Progress bar**: Width expansion with `ease-out`
- [ ] **Skeleton**: Subtle shimmer or pulse
  ```css
  animation: pulse 2s ease-in-out infinite;
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  ```

### Hover Lift (Mode-Aware)

```css
/* Display mode: Dramatic lift */
[data-mode="display"] .card:hover {
  transform: translateY(var(--mode-hover-lift)); /* -4px */
  box-shadow: var(--mode-shadow-hover);         /* shadow-lg */
  transition: all 250ms ease-out;                /* Slower, generous */
}

/* Product mode: Minimal, no lift */
[data-mode="product"] .card:hover {
  background-color: var(--surface-layer);       /* Color only */
  transition: background-color 150ms ease-out;  /* Fast, snappy */
}

/* App mode: Subtle lift */
[data-mode="app"] .card:hover {
  transform: translateY(var(--mode-hover-lift)); /* -2px */
  box-shadow: var(--mode-shadow-hover);         /* shadow-md */
  transition: all 200ms ease-out;                /* Medium, natural */
}
```

## Accessibility: Reduced Motion

**CRITICAL**: Respect `prefers-reduced-motion: reduce` user preference.

```css
/* Always check for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Blur effects are OK (not motion-inducing) */
  [data-mode="display"] .navbar {
    backdrop-filter: blur(12px); /* KEEP */
  }
}
```

**What to disable**:
- ❌ Transforms (`translateY`, `scale`, `rotate`)
- ❌ Transitions > 0.01ms
- ❌ Animations (spin, pulse, bounce)

**What to keep**:
- ✅ Blur effects (CSS filter, not motion)
- ✅ Color changes (instant)
- ✅ Static visibility changes (instant, no animation)

## Motion Checklist

### General
- [ ] All animations use `ease-out` (enter) or `ease-in-out` (state change)
- [ ] Duration matches purpose (100–300ms standard, 500ms+ for dramatic)
- [ ] Uses GPU-accelerated properties: `transform`, `opacity`, `filter`
- [ ] No animations on `width`, `height`, `left`, `top` (performance ❌)

### Hover States
- [ ] Button hover: lift + shadow within 150–200ms
- [ ] Card hover: shadow or lift, consistent across similar components
- [ ] Link hover: underline or color change within 100ms
- [ ] Icon hover: scale or color within 100ms

### State Changes
- [ ] Modal open: fade + scale within 200–250ms
- [ ] Expand/Collapse: `max-height` within 200–300ms
- [ ] Toggle: state change within 150ms
- [ ] Loading: spinner, progress bar, skeleton (continuous or pulsing)

### Accessibility
- [ ] Respects `prefers-reduced-motion: reduce`
- [ ] No disorienting animations (flashing, rapid spinning)
- [ ] No auto-playing animations (only on user trigger)
- [ ] Animation purpose is clear (not gratuitous)

### Mode-Aware
- [ ] Display mode: Slower, generous timing (250–500ms)
- [ ] Product mode: Fast, minimal motion (100–200ms, no lift)
- [ ] App mode: Medium, natural timing (150–250ms, subtle lift)

## Output Deliverable

A Motion Design Specification including:
1. **Animation Inventory**: All animated elements in the component/system
2. **Timing Map**: Duration and easing per animation type
3. **Transform Properties**: Which properties animate (translateY, scale, etc.)
4. **Hover State Spec**: Lift, shadow, and timing per component
5. **State Change Spec**: How elements transition between states
6. **Loading Indicators**: Spinner, progress, skeleton animations
7. **Page Transitions**: Entrance and exit animation patterns
8. **Reduced Motion Handling**: How animations degrade gracefully
9. **Mode-Aware Adjustments**: Display/Product/App mode timing variations
10. **CSS Examples**: Code snippets for implementation

Example spec structure:

```markdown
# Motion Design: Card Component

## Hover Animation
- Property: `transform: translateY`, `box-shadow`
- Duration: 200ms
- Easing: ease-out
- Lift: `var(--mode-hover-lift)` (-4px display, -2px app, 0px product)
- Shadow: `var(--mode-shadow-hover)`

## Display Mode
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  transition: all 250ms ease-out;
}
```

## Product Mode
```css
.card:hover {
  background-color: var(--surface-layer);
  transition: background-color 150ms ease-out;
}
```

## Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition-duration: 0.01ms !important;
  }
}
```

## Testing
- [x] Hover animation smooth at 60fps
- [x] Reduced motion respected (no animation)
- [x] Mobile touch state visible
- [x] Dark mode shadow visible
```

This becomes the blueprint for motion implementation across all components.
