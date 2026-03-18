---
name: design-tokens-audit
description: Audita uso de tokens de diseño. Identifica tokens faltantes, redundantes, naming inconsistente. Auto-triggers con "audita tokens", "token analysis", "tokens revisión".
allowed-tools: ["Read", "Glob", "AskUserQuestion"]
---

# 🎨 Design — Tokens Audit

Analyze design token usage and structure. Identify missing tokens, redundant definitions, naming inconsistencies, and opportunities to improve the token system.

## Token Analysis

Check for:
- **Missing tokens**: Is there a semantic token for this use case?
- **Redundant tokens**: Are multiple tokens doing the same thing?
- **Naming clarity**: Does the token name describe intent, not appearance?
- **Brand scalability**: Will this token work across all 4 brands?
- **Type safety**: Does TypeScript generation work correctly?

## Output Deliverable

Token Audit Report:
- Token inventory and usage
- Missing tokens (recommendations to add)
- Redundant tokens (suggestions to consolidate)
- Naming improvements
- Brand scalability issues
- TypeScript generation status

Example:

```markdown
# Token Audit: Button Component

## Tokens Used
- --interactive-primary ✅ (primary button bg)
- --interactive-primary-text ✅ (primary button text)
- --radius-control ✅ (border-radius)
- --spacing-4 ✅ (padding)
- --font-secondary ✅ (font-family)

## Missing Tokens
- [ ] --interactive-primary-hover (hover state) — RECOMMEND: Add
- [ ] --mode-hover-lift (hover animation) — Use existing: var(--spacing-2)

## Redundant Tokens
- None found ✅

## Naming Issues
- None found ✅

## Brand Scalability
- All tokens scale across 4 brands ✅
- Radius uses --radius-control (12px orion/deepblue, 9999px red/orange) ✓

## TypeScript
- All tokens have types ✅
- Types auto-generate correctly ✅

### Recommendation: PASS ✅
Token usage is clean and scalable.
```
