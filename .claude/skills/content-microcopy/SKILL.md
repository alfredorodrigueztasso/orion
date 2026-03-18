---
name: content-microcopy
description: Escribe microcopy para componentes (buttons, labels, placeholders, tooltips, empty states). Auto-triggers con "escribe microcopy", "labels", "placeholder", "button label", "tooltip", "empty state copy".
allowed-tools: ["Read", "AskUserQuestion"]
---

# ✍️ Content — Microcopy

Write clear, concise, and actionable microcopy for UI elements. Microcopy is the small text that guides users: button labels, form labels, placeholders, tooltips, empty states, and status messages.

## What is Microcopy?

Microcopy is **every word that's NOT body copy**. It includes:

- **Button labels** — Call-to-action text ("Save", "Download", "Delete Account")
- **Form labels** — Field instructions ("Email address", "Full name")
- **Placeholders** — Example text in empty inputs ("you@example.com")
- **Tooltips** — Help text on hover ("Click to reveal password")
- **Status messages** — Feedback during actions ("Saving your changes...", "Upload complete")
- **Empty states** — Message when no data exists ("No documents yet. Create one to get started.")
- **Confirmations** — Destructive action warnings ("Are you sure? This cannot be undone.")
- **Help text** — Additional context below form fields ("Password must be 8+ characters")

## Microcopy Principles

### 1. Use Strong Verbs (Action-Oriented)

```
❌ Process → ✅ Save, Delete, Download, Send, Share
❌ Submit → ✅ Save, Create, Update, Post
❌ Manage → ✅ Edit, Organize, Customize
❌ OK → ✅ Confirm, Got it, Continue
```

**Why**: Verbs are clear and tell users exactly what will happen.

### 2. Use Second-Person (You/Your)

```
❌ "Document saved" → ✅ "Your document is saved"
❌ "Changes are being processed" → ✅ "We're saving your changes"
❌ "Permission denied" → ✅ "You don't have permission to edit this"
```

**Why**: Second-person is personal and empowering—users feel directly addressed.

### 3. Be Specific (Not Generic)

```
❌ "Error" → ✅ "Email must include @ and domain name"
❌ "Invalid input" → ✅ "Phone number must have 10 digits"
❌ "Click here" → ✅ "View your profile"
```

**Why**: Specific copy helps users understand what went wrong and how to fix it.

### 4. Keep It Short (Scan-Friendly)

```
❌ "You are about to permanently delete this file from your account"
✅ "Delete file permanently?"

❌ "If you would like to proceed, please confirm your email address"
✅ "Confirm email to continue"
```

**Why**: Short copy is skimmable, faster to read, and easier to translate.

### 5. Show Status (Use Progressive Disclosure)

```
❌ Static: "Save"
✅ Interactive: "Save" → "Saving..." → "Saved ✓"
```

**Why**: Progressive status helps users understand that their action is working.

## Microcopy by Component Type

### Button Labels

**Rule**: Verb + Object (or Verb alone if clear)

```
✅ "Save document"
✅ "Download file"
✅ "Delete account"
✅ "Create new item"
✅ "Send invitation"
✅ "View all" (if object is obvious from context)
```

**Special cases**:
- **Primary CTA**: Action that moves user forward ("Continue", "Create", "Save")
- **Secondary**: Supporting action ("Cancel", "Learn more", "Skip")
- **Destructive**: Red/danger button ("Delete", "Remove", "Close account")
- **Disabled state**: Explain why disabled ("Sign in to save", "No items to download")

### Form Labels & Placeholders

**Label** (required, always visible):
```
✅ "Email address"
✅ "Phone number"
✅ "Full name"
✅ "Payment method"
```

**Placeholder** (optional, disappears on focus):
```
✅ you@example.com
✅ (555) 123-4567
✅ John Doe
✅ Visa, Mastercard, or Amex
```

**Help text** (below field):
```
✅ "We'll send a confirmation code to this email"
✅ "Password must be 8+ characters with 1 uppercase letter"
✅ "Phone number must have 10 digits (US only)"
```

### Tooltips & Help Text

**Tooltip** (on hover, <100 characters):
```
✅ "Click to show password"
✅ "Changes save automatically every minute"
✅ "Requires a paid account"
```

**Longer help text** (below field):
```
✅ "Your recovery code is a backup way to sign in if you lose access to your authenticator app.
   Keep it somewhere safe."
```

### Empty States

**Pattern**: Empathetic message + Call-to-action

```
❌ "No data"

✅ "No documents yet
   Create your first document to get started"

✅ "No search results for 'xyz'
   Try adjusting your search terms or create a new item"
```

**Tone**: Helpful, not accusatory. Guide the user to the next step.

### Status Messages

**Loading** (transient, reassures user):
```
✅ "Uploading your file..." (shows progress)
✅ "Sending your message..."
✅ "Saving your changes..."
```

**Success** (brief confirmation):
```
✅ "Saved ✓"
✅ "File uploaded"
✅ "Changes published"
```

**Error** (actionable, respectful):
```
❌ "Error" or "Failed"

✅ "Upload failed—file is too large (max 10MB)"
✅ "Connection lost. Try again?"
✅ "Email already in use. Sign in instead?"
```

### Confirmations (Destructive Actions)

**Pattern**: Consequence + Confirmation button

```
❌ "Are you sure?"

✅ "Delete account?
   This will permanently remove your account and all your data.
   [Cancel] [Delete account]"

✅ "Remove user?
   They will no longer have access to shared documents.
   [Cancel] [Remove]"
```

## Microcopy Output Template

When proposing microcopy, provide:

```markdown
## Component: [Name] → [Element]

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| Button label | "Process" | "Save changes" | Specific verb, second-person implied |
| Placeholder | "Enter email" | "you@example.com" | Concrete example, shorter |
| Tooltip | "Click icon for help" | "Get help with this field" | Shows benefit, not action |
| Empty state | "No items" | "No items yet. Create one to start." | Empathetic, actionable |
| Help text | "Password requirements" | "Minimum 8 characters, 1 uppercase, 1 number" | Specific, scannable |

### Context
- Component: Alert / Button
- Scenario: User is deleting an item
- Space constraints: 50 characters max

### ARIA Labels (if applicable)
- Button aria-label: "Delete this item permanently"
- Tooltip aria-label: "Information: explains password requirements"

### Variations by State
- Default: "Save"
- Saving: "Saving..."
- Success: "Saved ✓"
- Error: "Save failed—try again?"
- Disabled: "Sign in to save"
```

## Consistency Checklist

Before finalizing microcopy:

- [ ] **Verb consistency**: Same action uses same verb across system (Save, not Persist)
- [ ] **Tone consistency**: Matches Orion voice (direct, clear, helpful)
- [ ] **Length consistency**: Similar elements have similar length (2–5 words for buttons)
- [ ] **Capitalization consistency**: Title Case for buttons, Sentence case for messages
- [ ] **Terminology consistency**: Check `/content-guidelines` for approved terms
- [ ] **ARIA labels**: Every interactive element has accessible text
- [ ] **Punctuation**: Consistent use of periods, question marks, exclamation marks
- [ ] **Second-person**: Copy uses "you/your" where possible
- [ ] **Action-oriented**: Verbs are strong and specific
- [ ] **Inclusive language**: No gender-specific, ableist, or assumptive language

## Common Mistakes to Avoid

### 1. Generic Verbs
```
❌ "Click here", "Submit", "OK", "Process"
✅ Use specific, action-oriented verbs that describe what happens
```

### 2. Passive Voice
```
❌ "Your document will be saved"
✅ "Saving your document"
```

### 3. Jargon
```
❌ "Authenticate your credentials", "Instantiate a session"
✅ "Sign in", "Log in"
```

### 4. Blame Language
```
❌ "Invalid input", "You entered the wrong value"
✅ "Email must include @ and domain (like you@example.com)"
```

### 5. Missing Context
```
❌ "Continue" (continue to where?)
✅ "Continue to payment", "Continue to review"
```

### 6. Abbreviations Without Explanation
```
❌ "2FA required"
✅ "Two-factor authentication required"
```

### 7. Inconsistent Terminology
```
❌ "Save" on one button, "Persist" on another
✅ Use "Save" consistently
```

## Output Deliverable

A Microcopy Specification including:
1. **Component inventory**: All UI elements requiring copy
2. **Proposed copy**: For each element (button, label, placeholder, etc.)
3. **Rationale table**: Why each choice (verb strength, clarity, consistency)
4. **ARIA labels**: Accessible text for screen readers
5. **State variations**: Copy for different states (default, loading, error, success)
6. **Consistency notes**: How copy aligns with existing terminology
7. **Character limits**: If space-constrained UI
8. **Before/after examples**: Show improvement from current copy

Example output:

```markdown
# Microcopy: Button Component

## Primary Button

| Scenario | Copy | Rationale |
|----------|------|-----------|
| Default state | "Save changes" | Strong verb (Save), object clear (changes) |
| Loading state | "Saving..." | Progressive status, shows action in progress |
| Success state | "Saved ✓" | Confirms action completed |
| Disabled state | "Sign in to save" | Explains why disabled, suggests next step |
| Error state | "Save failed—try again?" | Explains problem, offers action |

**ARIA Label**: aria-label="Save your changes"

## Secondary Button

| Scenario | Copy | Rationale |
|----------|------|-----------|
| Default | "Cancel" | Clear rejection, matches "Save" weight |

**ARIA Label**: aria-label="Discard changes and return to previous page"

## Consistency Notes
- Uses "Save" (not "Submit", "Persist", "Update")
- Second-person implied ("your changes")
- Action-oriented verbs only
- Progressive status (Default → Saving → Saved)
```

This becomes the content blueprint for implementation.
