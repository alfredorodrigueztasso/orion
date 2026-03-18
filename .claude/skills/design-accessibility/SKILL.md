---
name: design-accessibility
description: Valida cumplimiento WCAG 2.1 Level AA. Verifica contraste, navegación teclado, ARIA, screen readers. Auto-triggers con "valida accesibilidad", "wcag", "accessibility", "a11y".
allowed-tools: ["Read", "AskUserQuestion"]
---

# ♿ Design — Accessibility Validation

Validate designs for WCAG 2.1 Level AA accessibility compliance. Identify barriers and ensure inclusive design for all users.

## WCAG 2.1 Level AA Checklist

### Perceivable
- [ ] Color contrast: 4.5:1 for text, 3:1 for graphics
- [ ] Text alternatives for images (alt text)
- [ ] Captions for videos
- [ ] Readable text: min 16px for body, max 100 chars per line
- [ ] Color not sole indicator (use icons, patterns, text)

### Operable
- [ ] Keyboard navigation: All interactive elements keyboard accessible
- [ ] Focus visible: Clear focus indicator on all interactive elements
- [ ] No keyboard trap: Can exit any component with keyboard
- [ ] Touch targets: Minimum 44x44px for mobile
- [ ] Motion: Respects prefers-reduced-motion preference
- [ ] Timeouts: No auto-advancing content without user control

### Understandable
- [ ] Plain language: No jargon, clear labels
- [ ] Consistent navigation: Buttons/links work the same way
- [ ] Instructions: Clear steps and error messages
- [ ] Error prevention: Validation before submission
- [ ] Error recovery: Clear error messages + recovery path

### Robust
- [ ] Valid HTML: No invalid markup
- [ ] ARIA correctly used: Labels, roles, states
- [ ] Screen reader tested: Works with NVDA, JAWS, VoiceOver
- [ ] Browser compatibility: Works across browsers/devices

## Output Deliverable

Accessibility Audit Report:
- Compliance score (% passing)
- Critical issues (must fix before release)
- Major issues (should fix soon)
- Minor issues (nice to fix)
- Specific recommendations per issue
- Testing evidence (manual tests performed)

Example:

```markdown
# Accessibility Audit: Button Component

## Overall Compliance: PASS ✅ (100%)

### Critical Issues: 0 ✅

### Major Issues: 0 ✅

### Minor Issues: 0 ✅

### Testing Evidence
- [x] Contrast ratio tested (4.5:1 for text)
- [x] Keyboard navigation tested (Tab, Enter, Space work)
- [x] Focus visible tested (clear focus ring shows)
- [x] Screen reader tested (NVDA announces button correctly)
- [x] Mobile touch target tested (44x44px minimum met)
- [x] prefers-reduced-motion tested (no motion when disabled)

### Recommendation: APPROVED ✅
Component meets WCAG 2.1 Level AA. Ready for implementation.
```
