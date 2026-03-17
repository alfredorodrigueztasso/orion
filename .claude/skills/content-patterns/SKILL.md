---
name: content-patterns
description: Librería de patrones de microcopy aprobados (buttons, errors, empty states, confirmaciones). Reutilizable por UX Writer. Auto-triggers con "patrones de copy", "content patterns", "copy library", "ejemplos de microcopy".
allowed-tools: ["Read"]
---

# ✍️ Content Patterns Library

You are a **reusable copy pattern library** for the UX Writer. When a UX Writer needs to write copy, they can reference these pre-approved patterns to accelerate their work and maintain consistency.

---

## Button Copy Patterns

### Pattern 1: Single Action
```
[Strong Verb]
Examples: "Save", "Delete", "Create", "Send", "Download"
```

### Pattern 2: Verb + Object
```
[Strong Verb] [Object]
Examples: "Save document", "Delete account", "Create project", "Download file"
```

### Pattern 3: Verb + Preposition + Context
```
[Verb] [Preposition] [Context]
Examples: "Save to cloud", "Download as PDF", "Export for print"
```

| Context | Label | Example |
|---------|-------|---------|
| Save work | Single verb | "Save" |
| Create item | Verb + object | "Create project" |
| Delete (destructive) | Specific + warns | "Delete account" |
| Cancel action | Single verb | "Cancel" |
| Proceed/Continue | "Next", "Continue", "Proceed" | "Continue to payment" |
| Secondary action | "Learn more", "Skip", "View all" | "Learn more" |
| Close dialog | "Close", "Done", "OK" | "Close" |

### Anti-Patterns (❌ NEVER USE)
- ❌ Generic: "OK", "Submit", "Process"
- ❌ Passive: "Being saved", "Will be created"
- ❌ Unclear: "Click here", "Go", "Do it"
- ❌ Jargon: "Instantiate", "Persist", "Authenticate"

---

## Error Message Patterns

### Formula: What + Why + How
```
[What happened]. [Why it happened]. [How to fix]
```

### Examples

| Scenario | Copy |
|----------|------|
| Missing field | "Name is required." |
| Invalid email | "Email must include @ and domain." |
| Password too short | "Password must be at least 8 characters." |
| Email exists | "This email is already registered—sign in instead?" |
| File too large | "File is too large (max 10MB)." |
| Server error | "Something went wrong. Try again or contact support." |
| Network error | "No internet connection. Check your network and try again." |
| Timeout | "Request took too long. Try again." |
| Permission denied | "You don't have permission to access this. Contact your admin." |
| Account locked | "Your account is locked. Check your email for unlock instructions." |

### Formula Examples

**Simple validation:**
```
Email is invalid.
```

**What + Why:**
```
Email is invalid—must include @ and domain.
```

**What + Why + How:**
```
Email is invalid—must include @ and domain. Use format: you@example.com
```

**Empathetic error:**
```
We couldn't save your changes. Try again or contact support if the problem persists.
```

### Anti-Patterns (❌ NEVER USE)
- ❌ Blame user: "You entered wrong email"
- ❌ Passive voice: "Invalid input detected"
- ❌ Jargon: "Validation error"
- ❌ Generic: "Error occurred"
- ❌ Unclear: "Something's wrong"

---

## Empty State Patterns

### Formula: Empathy + Call to Action
```
[Acknowledges empty state] + [Invites action]
```

### Examples

| Scenario | Copy |
|----------|------|
| No results | "No results found. Try different keywords." |
| No items | "No documents yet. Create your first one." |
| No data | "No data to display. Start by adding information." |
| No notifications | "You're all caught up! No new notifications." |
| No history | "No history yet. Your activity will appear here." |
| No favorites | "No favorites saved. Start adding them." |
| No messages | "No messages. Send one to get started." |
| Waiting for data | "Loading your data... this may take a moment." |

### Variations by Tone

**Encouraging:**
```
Ready to get started? Create your first project.
```

**Helpful:**
```
No saved items yet. Add one by clicking the star icon.
```

**Reassuring:**
```
All caught up! Come back later for more.
```

**Directional:**
```
No collaborators yet. Invite people to share this project.
```

### Anti-Patterns (❌ NEVER USE)
- ❌ Discouraging: "Nothing here"
- ❌ Blame: "You haven't created anything"
- ❌ Vague: "No data"
- ❌ Jargon: "No records found"

---

## Confirmation Dialog Patterns

### Destructive Action (Permanent)
```
Title: [Confirm action]?
Description: This will permanently [action description]
Buttons: [Destructive button] / "Cancel"
```

**Examples:**
```
Delete account?

This will permanently delete your account and all data.
You cannot undo this action.

"Delete account" / "Cancel"
```

### Irreversible Action (Data Loss)
```
Title: [Warn about consequence]
Description: [Specific impact] Cannot be undone.
Buttons: "Continue anyway" / "Go back"
```

**Examples:**
```
Unsaved changes will be lost

If you leave now, your changes won't be saved.

"Leave anyway" / "Stay and save"
```

### High-Impact Action (Needs verification)
```
Title: Confirm [action]
Description: [Specific what will happen]
Buttons: "Confirm" / "Cancel"
```

**Examples:**
```
Confirm password change

You'll be signed out of all devices.

"Change password" / "Cancel"
```

### Anti-Patterns (❌ NEVER USE)
- ❌ Unclear: "Are you sure?"
- ❌ Vague consequences: "This will affect your account"
- ❌ Blame: "You're about to delete"
- ❌ Generic buttons: "Yes/No"

---

## Tooltip & Help Text Patterns

### Tooltips: Show Benefit, Not Action
```
[What this does or what you get]
Not: "Click for more info"
```

| Context | Tooltip |
|---------|---------|
| Icon button | "Save your changes" (not "Click to save") |
| Feature | "Allows multiple people to edit at once" |
| Setting toggle | "Enable notifications for updates" |
| Input field | "Password must be 8+ characters, with 1 uppercase" |
| Visual hint | "You have 5 uploads left this month" |

### Help Text: Specific, Short
```
[Requirement or context, max 1-2 sentences]
```

| Field | Help Text |
|-------|-----------|
| Password | "At least 8 characters, including 1 uppercase" |
| Username | "3-20 characters, letters and numbers only" |
| API key | "Found in your account settings" |
| Phone | "We'll only use this for two-factor auth" |

### Anti-Patterns (❌ NEVER USE)
- ❌ Actionable: "Hover to see more"
- ❌ Obvious: "Click here"
- ❌ Vague: "Enter your password"
- ❌ Jargon: "Configure authentication settings"

---

## Loading & Success State Patterns

### Loading Messages (Present Continuous)
```
[Verb]-ing [object]...
```

| Action | Loading Message |
|--------|-----------------|
| Save | "Saving your changes..." |
| Upload | "Uploading file..." |
| Delete | "Deleting..." |
| Create | "Creating project..." |
| Export | "Exporting to PDF..." |
| Download | "Downloading..." |

### Success Messages (Past Tense or Affirmative)
```
[Object] [verb]-ed ✓
or
[Affirmation] [result]
```

| Action | Success Message |
|--------|-----------------|
| Save | "Changes saved ✓" or "Saved" |
| Create | "Project created ✓" |
| Upload | "File uploaded ✓" |
| Delete | "Deleted successfully" |
| Export | "Ready to download" |
| Invite | "Invitation sent ✓" |

### Anti-Patterns (❌ NEVER USE)
- ❌ Passive: "Will be saved", "Is being processed"
- ❌ Vague: "Working...", "Processing..."
- ❌ Unclear result: "Done", "OK"

---

## Form Label Patterns

### Basic Rule: Noun Phrase, No Period
```
[Specific field name]
Examples: "Email address", "Full name", "Project title"
```

| Field | Label | NOT |
|-------|-------|-----|
| Email | "Email address" | "Email", "Your email address" |
| Name | "Full name" | "Name field", "What is your name?" |
| Password | "Password" | "Enter password", "Your password" |
| Phone | "Phone number" | "Phone", "Your phone" |
| Date | "Date of birth" | "When were you born?" |
| Company | "Company name" | "Organization", "Company" |

### Optional Field Indicator
```
[Label] (optional)
Examples: "Phone number (optional)", "Middle name (optional)"
```

### Required Field Indicator
```
[Label] *
Examples: "Email address *", "Password *"
```

### Anti-Patterns (❌ NEVER USE)
- ❌ Questions: "What is your email?"
- ❌ Imperative: "Enter your email"
- ❌ Vague: "Email info"
- ❌ Periods: "Email address." ← No!

---

## Status Badge/Pill Patterns

| Status | Copy | Example |
|--------|------|---------|
| Active | "Active" | User is "Active" |
| Inactive | "Inactive" | User is "Inactive" |
| Pending | "Pending" | Invite is "Pending" |
| Approved | "Approved" | Request is "Approved" |
| Rejected | "Rejected" | Application is "Rejected" |
| In progress | "In progress" | Task is "In progress" |
| Completed | "Completed" | Task is "Completed" |
| Beta | "Beta" | Feature is "Beta" |
| Draft | "Draft" | Document is "Draft" |
| Published | "Published" | Document is "Published" |

### Anti-Patterns (❌ NEVER USE)
- ❌ Descriptive: "Waiting for approval"
- ❌ Verb tense: "Approving", "Being reviewed"
- ❌ Complex: "Under review"

---

## Using These Patterns

1. **Copy needed?** Find the matching pattern above
2. **Follow the formula** — Don't improvise
3. **Check anti-patterns** — Avoid common mistakes
4. **Ask Design Lead** — If you deviate from pattern
5. **Document changes** — If a new pattern emerges

### When to Create New Patterns

If you find yourself writing something not covered here:
1. Write the copy
2. Send to Design Lead for review
3. If approved and reusable, add it to this library

This keeps patterns growing with the system.
