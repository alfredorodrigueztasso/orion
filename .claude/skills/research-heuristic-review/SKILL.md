---
name: research-heuristic-review
description: Evaluación heurística de usabilidad (Nielsen 10). Identifica violaciones de principios de diseño con severity ratings. Auto-triggers con "revisa usabilidad", "heurísticas", "heuristic review", "usability evaluation".
allowed-tools: ["Read", "AskUserQuestion"]
---

# 🔍 Research — Heuristic Evaluation

Evaluate usability against Nielsen's 10 Usability Heuristics. Identify problems and severity ratings for prioritized fixes.

## Nielsen's 10 Usability Heuristics

1. **Visibility of System Status** — Users always informed about what's happening
2. **Match Between System and Real World** — Speak user's language, real-world conventions
3. **User Control and Freedom** — Users can undo/redo, exit emergency exits
4. **Consistency and Standards** — Follow platform conventions, consistent patterns
5. **Error Prevention** — Prevent problems before they occur
6. **Error Recovery** — Help users recover from errors gracefully
7. **Flexibility and Efficiency** — Shortcuts for expert users, customization
8. **Aesthetic and Minimalist Design** — Remove irrelevant information, focus on essentials
9. **Help and Documentation** — Task-focused help, concrete steps
10. **Recognition Rather Than Recall** — Visible options, minimize memory load

## Severity Ratings

| Rating | Impact | Example |
|--------|--------|---------|
| **Critical** | Task failure, data loss, confusion | Can't submit form, no error message |
| **Major** | Significant friction, workaround needed | Button label unclear, hard to undo |
| **Minor** | Small annoyance, easily worked around | Inconsistent spacing, style drift |
| **Cosmetic** | Doesn't affect functionality | Typo, color preference |

## Output Deliverable

A Heuristic Evaluation Report including:
- **Heuristic Violated**: Which principle?
- **Issue Description**: What's the problem?
- **Location**: Where in the interface?
- **Severity**: Critical/Major/Minor/Cosmetic?
- **Recommendation**: How to fix?

Example:

```markdown
# Heuristic Evaluation: Photo Upload Flow

## Critical Issues (Fix First)

### Issue 1: No System Status During Upload
- **Heuristic**: Visibility of System Status
- **Problem**: No indication of upload progress, user can't tell if process is working
- **Location**: Upload dialog, after clicking "Upload"
- **Severity**: Critical
- **Recommendation**: Add progress bar showing percentage uploaded, update every 100ms

### Issue 2: No Error Recovery
- **Heuristic**: Error Recovery
- **Problem**: If upload fails, no message or retry option shown
- **Location**: Upload result screen
- **Severity**: Critical
- **Recommendation**: Show clear error message + "Retry" button on failure

## Major Issues (Fix Soon)

### Issue 3: Unclear Button Labels
- **Heuristic**: Match Between System and Real World
- **Problem**: "Process" button is ambiguous (process what?)
- **Location**: Upload dialog, primary action
- **Severity**: Major
- **Recommendation**: Change to "Upload Photo" (clearer intent)

## Minor Issues (Fix When Convenient)

### Issue 4: Inconsistent Spacing
- **Heuristic**: Consistency and Standards
- **Problem**: Margins inconsistent with design system
- **Location**: Upload dialog margins
- **Severity**: Minor
- **Recommendation**: Align with 16px (--spacing-4) padding throughout
```

Use heuristic evaluation to identify systematic design problems and prioritize fixes.
