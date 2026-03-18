---
name: content-audit
description: Audita contenido existente (microcopy, terminología, consistencia, claridad, ARIA labels). Auto-triggers con "audita contenido", "content audit", "revisa copy", "content review".
allowed-tools: ["Read", "Glob", "Grep", "AskUserQuestion"]
---

# ✍️ Content — Audit

Review existing UI copy for consistency, clarity, accessibility, and alignment with Orion content guidelines. Content audits identify opportunities to improve user experience through better writing.

## What is a Content Audit?

A content audit examines all written text in a component, flow, or system and evaluates it for:

1. **Consistency** — Same terminology, voice, tone across elements
2. **Clarity** — Copy is specific, free of jargon, easy to scan
3. **Accessibility** — ARIA labels present, text conveys meaning
4. **Completeness** — All states have copy (default, loading, error, success)
5. **Brand alignment** — Copy matches Orion voice and guidelines

## Audit Checklist

### Content Inventory
- [ ] List all text elements (buttons, labels, messages, tooltips, help text)
- [ ] Identify orphaned ARIA labels (screen reader text missing)
- [ ] Note character constraints (space-limited UI)
- [ ] Document current copy (as-is baseline)

### Consistency Check
- [ ] Same verbs used consistently ("Save" vs "Persist" vs "Update")
- [ ] Terminology aligned (Sign in/Sign up vs Login/Register)
- [ ] Capitalization consistent (Title Case for buttons, Sentence case for messages)
- [ ] Punctuation consistent (periods, question marks, exclamation marks)
- [ ] Second-person usage consistent (you/your throughout)

### Clarity Analysis
- [ ] Copy is specific, not generic ("Email must include @" vs "Invalid input")
- [ ] No unexplained jargon or acronyms ("2FA" vs "Two-factor authentication")
- [ ] Copy is active voice, not passive ("Saving..." vs "Will be saved")
- [ ] Copy action-oriented (strong verbs, clear next steps)
- [ ] Copy is scannable (short, not wordy)

### Accessibility Assessment
- [ ] Every interactive element has ARIA label or aria-labelledby
- [ ] ARIA labels are meaningful (not duplicate button text)
- [ ] Icons have aria-label or title text
- [ ] Errors announced to screen readers (aria-live="polite")
- [ ] Error messages linked to form fields (aria-describedby)
- [ ] Status changes announced (loading, success, error)

### Brand Voice Alignment
- [ ] Copy matches Orion tone (direct, helpful, clear)
- [ ] Respectful language (doesn't blame user for errors)
- [ ] Professional but approachable
- [ ] Inclusive language (no assumptions, no bias)

## Content Audit Output Template

### 1. Executive Summary

```markdown
## Content Audit Summary: [Component/Flow]

**Overall Score**: 65% (Needs Improvement)

**Key Findings**:
- ❌ Inconsistent terminology ("Save" + "Submit" in same flow)
- ❌ Missing ARIA labels on 3 buttons
- ⚠️ Jargon: "Authenticate credentials" should be "Sign in"
- ✅ Tone is consistent and matches Orion voice
```

### 2. Content Inventory

| Element | Current Copy | Issues | Priority |
|---------|--------------|--------|----------|
| Primary button | "Submit" | Generic verb, not actionable | Major |
| Secondary button | "Cancel" | Consistent, clear ✅ | N/A |
| Error message | "Invalid email" | Too vague, no guidance | Major |
| Help text | "At least 8 characters" | Consistent with other fields ✅ | N/A |
| Tooltip | "Click for more info" | Says action, not benefit | Minor |
| ARIA label | (missing) | Button is not accessible to screen readers | Critical |

### 3. Issues by Severity

#### Critical Issues (Blocks Release)
- [ ] Missing ARIA labels on interactive elements
- [ ] Error messages don't explain how to fix
- [ ] Empty state has no call-to-action

#### Major Issues (Should Fix)
- [ ] Inconsistent terminology
- [ ] Generic button labels
- [ ] Jargon in UI copy
- [ ] Passive voice in messages

#### Minor Issues (Nice to Fix)
- [ ] Wordiness (copy can be tighter)
- [ ] Tone inconsistency (one element is too casual)
- [ ] Missing punctuation consistency

### 4. Recommendations with Before/After

| Issue | Before | After | Rationale |
|-------|--------|-------|-----------|
| Generic button | "Submit" | "Save changes" | Specific, actionable, second-person |
| Vague error | "Invalid email" | "Email must include @ and domain" | Specific problem, shows how to fix |
| Orphaned ARIA | (none) | aria-label="Save changes" | Screen reader can announce button purpose |
| Passive message | "Changes will be saved" | "Saving your changes..." | Active voice, shows progress |
| Missing help | (none) | "Password must be 8+ characters with 1 uppercase letter" | Specific constraints, scannable |

### 5. Consistency Report

```markdown
## Terminology Consistency

| Term | Variations Found | Recommendation |
|------|------------------|-----------------|
| Sign in | "Sign in", "Login", "Authenticate" | Use "Sign in" consistently |
| Save | "Save", "Submit", "Persist" | Use "Save" consistently |
| Cancel | "Cancel", "Discard", "Go back" | Use "Cancel" for form rejection |
| Delete | "Delete", "Remove", "Destroy" | Use "Delete" for destructive actions |

## Capitalization Consistency

- Button labels: Title Case ✅
- Form labels: Sentence case ✅
- Error messages: Sentence case with specific reason ✅
- Tooltips: Sentence case (no period) ✅

## Voice & Tone Consistency

- Respectful language: ✅ No blame language found
- Active voice: ⚠️ 2 instances of passive voice (fix: "Saving..." instead of "Will save")
- Second-person: ⚠️ Inconsistent use of "you/your" (standardize)
- Actionable: ✅ Verbs are strong and specific
```

### 6. Accessibility Assessment

```markdown
## ARIA & Accessibility

| Element | Current State | Issue | Recommended Fix |
|---------|---------------|-------|-----------------|
| Save button | No aria-label | Screen reader says "button" only | aria-label="Save your changes" |
| Delete button | aria-label="Delete" | Vague (delete what?) | aria-label="Delete this document permanently" |
| Error message | No aria-live | Not announced to screen readers | Add aria-live="polite" to error container |
| Help icon | Icon only | No text | aria-label="Help with password requirements" |
| Empty state | Text only | No visual context | Pair with icon + descriptive message |

## Recommendations

- Add aria-live="polite" to all error/success message containers
- Use aria-describedby to link form fields to help text
- Test with screen reader (NVDA, JAWS, VoiceOver)
```

### 7. Missing Copy (Incomplete States)

```markdown
## States Without Copy

| State | Current | Needed | Impact |
|-------|---------|--------|--------|
| Loading | "Save" button → spinner | "Saving..." | User doesn't know status |
| Success | (no feedback) | "Saved ✓" | User doesn't know action succeeded |
| Error | Generic alert | Specific error message | User doesn't know how to fix |
| Disabled | Disabled state | "Sign in to save" | User doesn't know why disabled |
```

### 8. Jargon Audit

```markdown
## Jargon & Unclear Terms

| Current | Issue | Recommendation |
|---------|-------|-----------------|
| "Authenticate" | Technical, intimidating | "Sign in" |
| "Instantiate" | Developer speak | "Create" |
| "Persist" | Database term | "Save" |
| "2FA" | Acronym without explanation | "Two-factor authentication" or use "Security code" |
| "Webhook" | Technical, confusing | Avoid in UI copy; use "Notification settings" |
```

## Audit Workflow

### Phase 1: Gather
1. Read all UI copy for the component/flow
2. Inventory each text element (button, label, message, tooltip)
3. Note current state (as-is baseline)

### Phase 2: Analyze
1. Check consistency (same verbs, terminology, tone?)
2. Assess clarity (specific? actionable? jargon-free?)
3. Verify accessibility (ARIA labels? complete states?)
4. Compare to `/content-guidelines` for brand alignment

### Phase 3: Identify Issues
1. Flag critical blockers (missing ARIA, inaccessible copy)
2. Note major improvements (inconsistency, generic terms)
3. Suggest minor enhancements (wordiness, tone)

### Phase 4: Recommend & Document
1. Provide before/after for each issue
2. Explain rationale (why this is better)
3. Link to relevant guidelines
4. Prioritize by severity

## Common Audit Findings

### 1. Inconsistent Terminology
```
❌ Found: "Save", "Submit", "Persist", "Update" in same flow
✅ Recommendation: Standardize on "Save"
```

### 2. Generic Button Labels
```
❌ Found: "OK", "Cancel", "Next", "Submit"
✅ Recommendation: "Save changes", "Discard changes", "Continue to payment"
```

### 3. Missing ARIA Labels
```
❌ Found: Icon buttons with no aria-label
✅ Recommendation: Add aria-label="Download file" to every icon button
```

### 4. Passive Voice
```
❌ Found: "Changes will be saved"
✅ Recommendation: "Saving your changes..."
```

### 5. Jargon in UI
```
❌ Found: "Authenticate credentials", "Instantiate session"
✅ Recommendation: "Sign in", "Create account"
```

### 6. Missing Error Messages
```
❌ Found: No explanation when validation fails
✅ Recommendation: "Email must include @ and domain (example@domain.com)"
```

### 7. No Progress Feedback
```
❌ Found: Button says "Save" then becomes disabled with no status
✅ Recommendation: "Save" → "Saving..." → "Saved ✓"
```

## Audit Deliverable

A Complete Content Audit Report including:
1. **Executive summary** — Overall score, key findings
2. **Content inventory** — All text elements catalogued
3. **Issues by severity** — Critical/major/minor, prioritized
4. **Recommendations** — Before/after for each issue
5. **Consistency report** — Terminology, capitalization, voice alignment
6. **Accessibility assessment** — ARIA labels, screen reader testing
7. **Missing copy** — Incomplete states (loading, error, success, disabled)
8. **Jargon audit** — Technical terms to replace
9. **Action plan** — Which fixes to do first (critical → major → minor)

This becomes the roadmap for improving content quality across the system.
