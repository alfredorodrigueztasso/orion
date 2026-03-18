---
name: design-create
description: Crea spec completa de componente (variantes, tokens, estados, ARIA, responsive). Auto-triggers con "diseña componente", "crea spec", "component spec", "design spec".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🎨 Design — Create Component Spec

Create a complete, production-ready component design specification with all variants, tokens, states, and accessibility requirements.

## Output Deliverable

A Component Design Specification including:
- **Component Name & Purpose**: What is it? When to use?
- **Visual Variants**: Size (sm/md/lg), state (default/hover/active/disabled/loading), theme (light/dark), brand (4x)
- **Token Dependencies**: All design tokens required (colors, spacing, typography, radius, shadows)
- **Interaction States**: Hover, focus, active, disabled, loading, error
- **Accessibility**: WCAG 2.1 AA compliance, ARIA labels, keyboard navigation
- **Responsive Behavior**: Mobile (320px), tablet (768px), desktop (1440px)
- **Motion Design**: Hover transitions, duration, easing
- **Design Decisions**: Why these choices? Alternatives considered?
- **Developer Handoff**: Clear specs for implementation

Example spec structure:

```markdown
# Button Component Spec

## Purpose
Primary interactive element for user actions (CTA, form submission, navigation)

## Variants
### Size
- sm: 28px height, 12px font, padding 2-3
- md: 32px height, 14px font, padding 4-6 (default)
- lg: 36px height, 16px font, padding 6-8

### Style
- primary: var(--interactive-primary) bg, var(--interactive-primary-text) text
- secondary: var(--interactive-secondary) bg, var(--text-primary) text
- ghost: transparent bg, var(--interactive-primary) text, border

### State
- default: Normal state
- hover: Background darker, shadow added, lift -2/-4px
- active: Background darker still, no lift
- disabled: 50% opacity, cursor not-allowed
- loading: Spinner inside button, text hidden

## Tokens Required
- Colors: --interactive-primary, --interactive-secondary, --text-primary
- Spacing: --spacing-2, --spacing-3, --spacing-4, --spacing-6
- Typography: --font-secondary, --font-size-sm, --font-size-base, --font-size-lg
- Radius: --radius-control
- Shadows: --mode-shadow-hover

## Accessibility
- Keyboard: Tab to focus, Enter/Space to activate
- ARIA: aria-label for icon-only buttons, aria-busy during loading
- Focus: Visible focus ring via :focus-visible
- Contrast: 4.5:1 text/bg ratio (WCAG AA)
- Motion: Respects prefers-reduced-motion

## Responsive
- Mobile (320px): Full width, centered, default size
- Tablet (768px): Auto width, padding as needed
- Desktop (1440px): Auto width, normal behavior

## Motion
- Hover: translateY(var(--mode-hover-lift)) over 200ms ease
- Transition: All properties, 200ms ease
- Reduced motion: No translate, color change only
```

This becomes the blueprint for implementation.
