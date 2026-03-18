---
name: content-error-messages
description: Redacta mensajes de error y validación (qué pasó, por qué, cómo resolver). Auto-triggers con "error message", "mensaje de error", "validación", "empty state", "confirmación destructiva".
allowed-tools: ["Read", "AskUserQuestion"]
---

# ✍️ Content — Error Messages

Write clear, helpful error messages that guide users to resolve problems. Error messages are conversations—they explain what went wrong, why it matters, and how to fix it.

## Error Message Formula

**Every error message should answer 3 questions:**

1. **What happened?** (Clear, specific problem)
2. **Why did it happen?** (Context or constraint)
3. **How do I fix it?** (Next steps)

### Pattern: [What] + [Why] + [How]

```
❌ "Error 422"
❌ "Invalid input"
❌ "Password too weak"

✅ "Password too short
   Passwords must be at least 8 characters long
   Try adding uppercase letters or numbers"
```

**Breakdown**:
- **What**: "Password too short" (specific problem)
- **Why**: "Passwords must be at least 8 characters long" (the rule)
- **How**: "Try adding uppercase letters or numbers" (actionable suggestion)

## Error Message Types

### 1. Form Validation Errors

**Appear next to form field on submit**

Pattern: [Field name] must/must not [constraint]

```
✅ "Email must include @ and domain (example@domain.com)"
✅ "Phone number must have 10 digits"
✅ "Password must be at least 8 characters"
✅ "Usernames cannot contain spaces"
✅ "This email is already in use. Sign in instead?"
```

**Progressive validation** (validate as user types):

```
Typing: "johndoe" → no error
Typing: "johndoe@" → "Domain needed (example: gmail.com)"
Typing: "johndoe@gmail" → "Add top-level domain (.com, .org, etc.)"
Typing: "johndoe@gmail.com" → ✅ Valid
```

### 2. Server/Network Errors

**Appear as alert or error state**

Pattern: What failed + Why + Retry/Escalation option

```
✅ "Upload failed—file is too large (max 10MB)
   Try compressing the file or splitting into smaller parts"

✅ "Connection lost—we're trying to reconnect
   Check your internet and refresh the page"

✅ "Server is temporarily unavailable
   Try again in a few minutes or contact support"
```

### 3. Permission Errors

**User doesn't have access to action**

Pattern: What they can't do + Why + Alternative action

```
✅ "You can't edit this document
   You have view-only access
   Ask the document owner to upgrade your permissions"

✅ "You need a paid account to export
   Upgrade to Pro to unlock exports and API access"

✅ "Sign in to save your progress
   Your changes will be lost if you leave"
```

### 4. Empty States & Guidance

**When there's no data, guide user to next step**

Pattern: Empathetic message + Action

```
✅ "No documents yet
   Create your first document or import an existing one"

✅ "No search results for 'abc'
   Try different keywords or browse categories"

✅ "No notifications
   You're all caught up!"
```

### 5. Confirmation Messages (Destructive Actions)

**Warn user before permanent action**

Pattern: Consequence + Confirm button

```
❌ "Are you sure?"

✅ "Delete account?
   This will permanently remove your account and all your data
   [Cancel] [Delete account]"

✅ "Remove user?
   They'll lose access to all shared documents
   [Cancel] [Remove user]"

✅ "Clear history?
   This cannot be undone
   [Cancel] [Clear]"
```

### 6. Success Messages

**Brief confirmation that action completed**

Pattern: Action + Optional next step

```
✅ "Saved ✓"
✅ "File uploaded"
✅ "Invitation sent to john@example.com"
✅ "Changes published—view on site"
```

**Progressive status**:
```
Default: "Save"
→ Loading: "Saving..." or spinner icon
→ Success: "Saved ✓" (shows for 2–3 seconds, then fades)
→ Error: "Save failed—try again?"
```

## Error Message Tone & Voice

### Be Respectful (Don't Blame)

```
❌ "You entered the wrong value"
❌ "Invalid input"
❌ "Incorrect password"

✅ "Email format is incorrect"
✅ "Password doesn't match"
✅ "This field is required"
```

**Why**: Users aren't stupid—they made a mistake. Don't make them feel bad about it.

### Be Specific (Not Generic)

```
❌ "Error"
❌ "Failed"
❌ "Something went wrong"

✅ "Email must include @ and domain"
✅ "Connection lost—refresh the page"
✅ "File upload timed out after 5 minutes"
```

### Be Actionable (Show How to Fix)

```
❌ "Validation error"
❌ "Invalid format"

✅ "Phone number must have 10 digits (555-123-4567)"
✅ "Upload failed—file is too large (max 10MB). Try compressing it."
```

### Be Consistent (Use Orion Voice)

```
✅ Use "Sign in" consistently (not "Log in", "Authenticate")
✅ Use "Save" consistently (not "Persist", "Submit")
✅ Second-person: "You don't have permission" (not "Permission denied")
```

## Common Error Scenarios

### Form Submission Errors

```markdown
## Email Validation

**Error**: "Email already in use"
**Full message**:
"This email is already in use.
Sign in to your existing account or use a different email address."

**State**:
- Field: highlighted with error color
- Icon: alert or X icon
- Message: appears below field
- Button: "Sign in" CTA link in the message

---

## Password Strength

**Error**: "Password too weak"
**Full message**:
"Password must be at least 8 characters
Include uppercase letter, number, and special character (!@#$%)"

**Helpful**: Show password strength meter
- 0–3 chars: "Too short"
- 4–7 chars: "Weak—add uppercase or number"
- 8–11 chars: "Good—consider a special character"
- 12+ chars: "Strong ✓"
```

### Upload Errors

```markdown
## File Size

**Error**: "File too large"
**Full message**:
"This file is too large (50MB)
Maximum file size is 25MB. Try compressing the file or splitting into parts."

---

## File Type

**Error**: "File type not supported"
**Full message**:
"JPG files are not supported
Supported formats: PNG, SVG, WebP"
```

### Network Errors

```markdown
## Connection Lost

**Error**: "Connection lost"
**Full message**:
"Connection lost—we're trying to reconnect
Your changes are being saved locally"

**Action**: "Retry" button or auto-retry with countdown

---

## Timeout

**Error**: "Request timed out"
**Full message**:
"That took too long (30 seconds)
Try again or check your internet connection"
```

## Error Message Output Template

```markdown
## [Component/Flow]: [Scenario]

### Error State

| Element | Copy | Rationale |
|---------|------|-----------|
| Error message | "Email already in use. Sign in or use a different email." | Specific problem, two solutions |
| Error icon | Alert triangle | Visual indicator, not text-only |
| Message color | Red (#D7282F) | Orion error token |
| Accessibility | aria-live="polite" | Screen reader announces change |

### Recovery Options
- [Sign in] — Link to login
- [Try again] — Retry submission
- [Get help] — Support contact

### Progressive Disclosure
1. User enters email
2. On blur: Check availability
3. If taken: Show "Email already in use" message
4. User sees two options: Sign in or change email

### Context
- Form: Sign up form
- Trigger: Email validation on blur or submit
- UX pattern: Inline error (not modal)

### ARIA Labels
- aria-label="Error: Email already in use"
- aria-describedby="email-error-message"
```

## Consistency Checklist

- [ ] **Specific**: Does the message explain WHAT went wrong? (Not generic "Error")
- [ ] **Actionable**: Does the message explain HOW to fix it?
- [ ] **Respectful**: Does the message blame the user? (No ❌)
- [ ] **Tone**: Does the message match Orion voice? (Direct, helpful, clear)
- [ ] **Visibility**: Is the error message easy to spot? (Color, icon, position)
- [ ] **Accessibility**: Does aria-live="polite" announce the error?
- [ ] **Length**: Is the message scannable? (Avoid long paragraphs)
- [ ] **Terminology**: Does it use consistent terms? (Check `/content-guidelines`)
- [ ] **Progressive**: Does status progress? (Error → Saving → Saved)

## Common Mistakes

### 1. Technical Error Codes
```
❌ "Error 422: Unprocessable Entity"
✅ "Email format is incorrect"
```

### 2. Passive Voice
```
❌ "Password will not be accepted"
✅ "Password doesn't meet requirements"
```

### 3. Jargon
```
❌ "Insufficient entropy in passphrase"
✅ "Password is too weak—try adding more variety"
```

### 4. Blame Language
```
❌ "You entered invalid data"
✅ "Email format is incorrect"
```

### 5. Missing Solution
```
❌ "File format not supported"
✅ "JPG is not supported. Try PNG, SVG, or WebP"
```

### 6. No Next Step
```
❌ "Upload failed"
✅ "Upload failed—try again or contact support"
```

### 7. Hidden Errors
```
❌ Error message appears in top corner only
✅ Error message appears near the field + visual indicator (color, icon)
```

## Output Deliverable

A Complete Error Message Specification including:
1. **Error scenario inventory**: All error conditions
2. **Error message per scenario**: What users will see
3. **Message anatomy**: [What] + [Why] + [How] breakdown
4. **Visual treatment**: Color, icon, position, animation
5. **Accessibility**: ARIA attributes, screen reader text
6. **Recovery options**: What user can do next
7. **Progressive states**: How message changes (loading → error → success)
8. **Consistency notes**: Terminology alignment with `/content-guidelines`

This becomes the content blueprint for error handling.
