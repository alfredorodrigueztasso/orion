# Visual Consistency Audit Report

**Generated**: 2026-03-18T12:40:51.455Z
**Components Scanned**: 72
**Components with Violations**: 4

## Severity Levels

- **P0**: Critical — Break visual consistency across themes/brands
- **P1**: High — Prevent mode-aware styling (display/product/app)
- **P2**: Medium — Technical debt but not breaking

## Violations by Severity

### P0 - Critical Violations (Hardcoded Radius)

| Component | Issue | Fix |
|-----------|-------|-----|
| CodeEditor | Hardcoded radius: 4px (should use var(--radius-*)) | Use `var(--radius-control)` or `var(--radius-container)` |
| CodeEditor | Hardcoded radius: 4px (should use var(--radius-*)) | Use `var(--radius-control)` or `var(--radius-container)` |
| CodeEditor | Hardcoded radius: 4px (should use var(--radius-*)) | Use `var(--radius-control)` or `var(--radius-container)` |
| NavTree | Hardcoded radius: 4px (should use var(--radius-*)) | Use `var(--radius-control)` or `var(--radius-container)` |

### P1 - High Violations (Shadow/Hover)

| Component | Issue | Suggestion |
|-----------|-------|-------------|
| Card | Hardcoded hover lift: -2px (should use var(--mode-hover-lift)) | Use `var(--mode-hover-lift)` |
| IconGallery | Hardcoded hover lift: -2px (should use var(--mode-hover-lift)) | Use `var(--mode-hover-lift)` |

## Summary

- **Total Issues**: 6
- **Critical (P0)**: 4
- **High (P1)**: 2

## Remediation Priority

1. Fix all P0 (radius hardcoding) — breaks consistency
2. Fix all P1 (shadow/hover) — breaks mode-aware behavior
3. Monitor for P2 issues — track in backlog

## Known False Positives

- Avatar.module.css has hardcoded colors for .teal and .pink badge backgrounds (intentional for icon palette)
