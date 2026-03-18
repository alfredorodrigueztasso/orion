---
name: design-responsive
description: Crea spec responsiva (mobile/tablet/desktop). Breakpoints, reflow, touch targets. Auto-triggers con "spec responsiva", "responsive design", "mobile layout".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🎨 Design — Responsive Specification

Create a complete responsive design specification with layout behavior across all breakpoints (mobile, tablet, desktop) and device-specific considerations.

## Breakpoint System

| Device | Width | Context | Behavior |
|--------|-------|---------|----------|
| **Mobile** | 320–479px | Phone portrait | Single column, stacked layout, touch-optimized |
| **Mobile L** | 480–639px | Phone landscape/small tablet | 2-column, increased spacing |
| **Tablet** | 640–1023px | Tablet portrait | 2–3 column, adaptive grid |
| **Desktop** | 1024–1439px | Laptop standard | Full multi-column layout, sidebar navigation |
| **Desktop XL** | 1440px+ | Ultrawide | Maximum content width, side margins |

## Responsive Checklist

### Layout & Spacing
- [ ] Single-column on mobile, progressive expansion on larger screens
- [ ] Spacing scales proportionally (`--spacing-4` base constant across all breakpoints)
- [ ] Touch targets minimum 44×44px on mobile (WCAG requirement)
- [ ] Padding/margin adjust per breakpoint (mobile: minimal, desktop: generous)
- [ ] No horizontal scroll on any breakpoint

### Typography
- [ ] Font sizes scale fluidly or step per breakpoint
  - Mobile: 14px (readable at arm's length)
  - Tablet: 16px (more breathing room)
  - Desktop: 16–18px (comfortable for desk reading)
- [ ] Line length max 100 characters on desktop (readability)
- [ ] Heading sizes scale proportionally across breakpoints

### Navigation
- [ ] Mobile: Hamburger menu or bottom tab bar
- [ ] Tablet: Toggle sidebar or inline navigation
- [ ] Desktop: Full sidebar or horizontal navigation bar

### Interactive Elements
- [ ] Buttons: 44×44px minimum on mobile, 48×48px on tablet/desktop
- [ ] Links: Minimum 44px height for touch targets
- [ ] Form inputs: 44px height on mobile, 40px on desktop
- [ ] Spacing between interactive elements: `--spacing-3` (12px) minimum

### Images & Media
- [ ] Images scale responsively (`max-width: 100%`, `height: auto`)
- [ ] Aspect ratios preserved across breakpoints
- [ ] Hero images adapt to portrait on mobile
- [ ] Video embeds (YouTube, Vimeo) scale with container

### Grid & Flex
- [ ] Mobile: Single column or 2-column layouts
- [ ] Tablet: 2–3 column grid with flexible gaps
- [ ] Desktop: 3+ column grids with consistent gaps (`--spacing-4`)
- [ ] Flexbox: Children shrink/grow proportionally

### Landscape Orientation (Mobile)
- [ ] Accounts for reduced vertical space (480px height typical)
- [ ] Navigation collapses to icons or horizontal scrolling
- [ ] Modal dialogs adapt to portrait-only layout

### Container Queries (Advanced)
- [ ] If using `@container`, verify width rules trigger correctly
- [ ] Test at intermediate container sizes (not just viewport breakpoints)

## Output Deliverable

A Responsive Design Specification including:
1. **Breakpoint Map**: All target widths and device contexts
2. **Layout Behavior**: How layout reflows at each breakpoint
3. **Typography Scale**: Font sizes and line heights per breakpoint
4. **Spacing/Padding Rules**: How spacing adapts
5. **Navigation Strategy**: Mobile/tablet/desktop navigation patterns
6. **Touch Target Sizing**: Minimum sizes per device type
7. **Image & Media Behavior**: Responsive images, aspect ratios, video embeds
8. **Device-Specific Considerations**: Orientation handling, safe areas (notches), etc.
9. **Visual Examples**: Wireframes or annotations showing layout at each breakpoint
10. **Testing Checklist**: Devices and orientations to test

Example spec structure:

```markdown
# Responsive Design: Button Component

## Breakpoints

### Mobile (320–479px)
- Full-width buttons with `padding: var(--spacing-2) var(--spacing-4)`
- Height: 44px (touch target)
- Font size: `var(--font-size-sm)` (13px)
- No icon + text together (too cramped)

### Tablet (640–1023px)
- Auto-width buttons, grouped in flex row
- Height: 44px (consistent with mobile)
- Font size: `var(--font-size-base)` (14px)
- Icon + text supported if button width ≥ 120px

### Desktop (1024px+)
- Auto-width, grouped in flex row
- Height: 40–48px depending on context
- Font size: `var(--font-size-base)` to `var(--font-size-lg)` (14–18px)
- Icon + text always available

## Layout Behavior

### Mobile Form
```
Input (full-width)
Button (full-width, stacked below input)
```

### Tablet Form
```
Input | Button (side-by-side, 1fr 0fr grid)
```

### Desktop Form
```
Label
Input (width: 100%, max 300px)
Buttons in flex row
```

## Testing Checklist
- [x] iPhone SE (375px) — buttons readable, no overflow
- [x] iPhone 12 Pro (390px) — same
- [x] iPhone 14 Pro Max (430px) — extra padding visible
- [x] iPad (768px) — buttons expand nicely
- [x] iPad Pro (1024px) — full layout works
- [x] Desktop (1440px) — max-width applied correctly
- [x] Landscape 480px — hamburger works, buttons stack
```

This becomes the blueprint for responsive implementation across all breakpoints.
