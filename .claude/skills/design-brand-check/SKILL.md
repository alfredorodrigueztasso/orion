---
name: design-brand-check
description: Verifica consistencia visual entre los 6 brands (orion, red, deepblue, orange, lemon, ember). Colores (color-500), radius, tipografía, estilos. Auto-triggers con "verifica marca", "brand consistency", "multi-brand".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🎨 Design — Brand Consistency Check

Verify that designs work across all 6 brands consistently. Check colors, typography, radius, and brand-specific overrides.

## Brand Rules

| Brand | Accent Color | Radius | Typography | Pills |
|-------|--------|--------|------------|-------|
| **orion** | #1B5BFF (blue 500) | 12px | Primary font stack | No |
| **red** | #D7282F (red 500) | 9999px (pill) | Primary font stack | Yes |
| **deepblue** | #006FBA (navy 500) | 12px | Primary font stack | No |
| **orange** | #F15D22 (orange 500) | 9999px (pill) | Primary font stack | Yes |
| **lemon** | #72FF43 (lemon 500) | 12px | Primary font stack | No |
| **ember** | #F15D22 (orange accent) + neutral-900 buttons | 12px | DM Sans / Inter | No |

## Audit Checklist

- [ ] All 6 brands rendered correctly
- [ ] Colors use semantic tokens (not hardcoded)
- [ ] Radius correct per brand (12px vs 9999px)
- [ ] Typography consistent
- [ ] Shadows brand-tinted where needed
- [ ] Light/dark themes work for all brands
- [ ] No color hardcoding
- [ ] All variant combinations tested

Output: Brand audit report confirming consistency across all variants.
