---
name: content-guidelines
description: Define voz, tono, y principios de contenido de Orion. Terminología, lenguaje inclusivo, capitalización, puntuación, estándares de escritura. Auto-triggers con "voz de orion", "tone of voice", "content guidelines", "guía de contenido", "terminología".
allowed-tools: ["Read", "AskUserQuestion"]
---

# ✍️ Content — Guidelines

Establish and maintain the voice, tone, and writing standards for Orion Design System. These guidelines ensure consistent, clear, and inclusive communication across all UI copy.

## Orion Content Principles

### 1. Clear
Users understand what we mean on the first reading.
- Use plain language (avoid jargon, explain acronyms)
- Be specific (not generic)
- Use active voice
- Short sentences, one idea per sentence

### 2. Concise
Every word earns its place.
- Delete words that don't add meaning
- No redundancy ("click here to click")
- Brevity without losing clarity
- Scannable (headers, short paragraphs, bullets)

### 3. Actionable
Users know what to do next.
- Strong verbs (Save, Delete, Download, not Process, Manage)
- Tell users what happens ("Your file is saving..." not "Processing")
- Clear next steps
- Second-person when possible ("You don't have access" not "Access denied")

### 4. Inclusive
We write for everyone.
- Gender-neutral language (they/them, not he/she)
- Accessible language (avoid idioms, cultural references)
- No assumptions (age, ability, location, culture)
- Respectful tone (never blame the user)

### 5. Consistent
Same concepts use same words across Orion.
- Terminology standardized (use one word per concept)
- Capitalization rules followed
- Punctuation consistent
- Tone matches brand voice

---

## Orion Voice & Tone

### Voice (Permanent Personality)

**How Orion sounds, always:**

- **Direct**: We don't waste time. Get to the point.
- **Helpful**: We want users to succeed. We guide, not judge.
- **Clear**: No jargon, no mystery. Users understand without effort.
- **Professional**: Credible, trustworthy, knowledgeable.
- **Approachable**: Friendly, human, not corporate-speak.

**Examples:**
```
✅ "Your document is saved"       (direct, clear, helpful)
✅ "Email must include @"         (specific, not blaming)
✅ "We're saving your changes"    (we're in this together)

❌ "Document has been persisted"     (jargon, unclear)
❌ "Invalid input detected"          (blaming, technical)
❌ "This operation cannot proceed"   (formal, unhelpful)
```

### Tone (Adaptive Mood)

**How we adjust voice based on context:**

| Scenario | Tone | Example |
|----------|------|---------|
| Normal interaction | Neutral, helpful | "Save your document" |
| Error/failure | Empathetic, helpful, not blaming | "Email must include @—try again" |
| Success | Affirming, celebratory | "Document saved ✓" |
| Warning | Respectful, clear | "This will permanently delete the account" |
| Empty state | Empowering, inviting | "No documents yet. Create one to start." |

**Tone is NOT:**
- ❌ Condescending ("Oops, you messed up!")
- ❌ Overly casual ("Yo, save that doc!")
- ❌ Overly formal ("The document deletion process has commenced")

---

## Terminology Standards

### Core Verbs (Prioritized)

| Concept | Approved | Avoid | Why |
|---------|----------|-------|-----|
| Save work | **Save** | Submit, Persist, Update, Store | Strong, clear, second-person |
| Undo | **Undo** | Revert, Rollback | User-facing vs technical |
| Delete (permanent) | **Delete** | Remove, Destroy, Discard | Permanent + dangerous |
| Remove (non-permanent) | **Remove** | Delete, Unlink | Less aggressive than delete |
| Sign in | **Sign in** | Login, Authenticate, Log in | Inclusive, clear |
| Sign up | **Sign up** | Register, Enroll, Create account | User-friendly |
| Confirm | **Confirm** | Verify, Validate, Accept | Clear action |
| Cancel | **Cancel** | Discard, Abandon, Go back | Consistent with Save |
| Close | **Close** | Dismiss, Exit, Quit | Clear and direct |
| Share | **Share** | Distribute, Disseminate | User-facing, positive |
| Download | **Download** | Export, Get, Fetch | Users understand "download" |
| Upload | **Upload** | Import, Add, Submit | Users understand "upload" |
| Create | **Create** | Generate, Instantiate, Make | Clear and inviting |
| Edit | **Edit** | Modify, Update, Change | Direct and simple |
| View | **View** | Open, Look at, Read | For links and buttons |

### Words to Use

```markdown
## Positive/Accessible Alternatives

| Use This | Instead Of | Why |
|----------|-----------|-----|
| Can't | Impossible | More human |
| Please | Kindly | Less formal |
| Help | Assistance | Clearer |
| Use | Utilize | Simpler |
| Show | Display | More human |
| Hide | Conceal | More human |
| Start | Commence | Simpler |
| End | Terminate | Simpler |
| Know | Understand | More accessible |
| Need | Require | More human |
| Want | Desire | More human |
| Learn | Educate yourself | More direct |
| Go | Navigate | More human |
| Get | Obtain | Simpler |
| Give | Provide | Clearer |
| Make | Create | Simpler |
| Try | Attempt | More encouraging |
| Change | Modify | Simpler |
| Stop | Cease | Simpler |
| Find | Locate | Simpler |
| Use | Leverage | Simpler |
```

### Words to Avoid

```markdown
## Jargon to Replace

| Avoid | Use Instead |
|-------|-------------|
| Authenticate | Sign in |
| Credentials | Username and password |
| Instantiate | Create |
| Persist | Save |
| Leverage | Use |
| Utilize | Use |
| Facilitate | Help |
| Commence | Start |
| Terminate | End |
| Deploy | Publish, Release |
| Interface | Use |
| Functionality | Features |
| Optimization | Improvement |
| Configuration | Settings |
| Parameters | Options, Settings |
| Validation error | [Specific problem] |
| Invalid input | [What's wrong, how to fix] |
| Error | [Specific explanation] |
| Server error | [What user should do] |
| Access denied | [Why they can't, what to do] |
```

### Acronyms & Abbreviations

**Rule**: Spell out on first use, then abbreviate. Or avoid in UI copy.

```
❌ "2FA required"
✅ "Two-factor authentication (2FA) required"

❌ "PDF export"
✅ "PDF export" (PDF is universally known)

❌ "RTFM"
✅ "Read the documentation"

❌ "API key"
✅ If in UI, explain: "Developer key (API key)"
```

---

## Grammar & Formatting

### Capitalization

| Element | Rule | Example |
|---------|------|---------|
| Button labels | Title Case | "Save Document", "Cancel", "Delete Account" |
| Form labels | Sentence case (no period) | "Email address", "Full name" |
| Error messages | Sentence case with period | "Email is required." |
| Status messages | Sentence case, no period | "Saving your document" |
| Headings (H1–H3) | Title Case | "Create New Document" |
| Help text | Sentence case, no period | "Password must be 8+ characters" |
| Tooltips | Sentence case, no period | "Click to show password" |
| Menu items | Title Case | "Account Settings", "Export as PDF" |

### Punctuation

| Element | Rule | Example |
|---------|------|---------|
| Button labels | No period | "Save Document" (not "Save Document.") |
| Form labels | No period | "Email address" (not "Email address.") |
| Error messages | Period | "Email is required." |
| Success messages | Period optional | "Saved ✓" or "Document saved." |
| Status updates | No period | "Saving..." |
| Help text | No period (unless multiple sentences) | "Must be 8+ characters" |
| Tooltips | No period | "Click to reveal password" |
| Questions | Question mark | "Delete this file?" |
| List items | Consistent | All periods or none |
| Exclamation marks | Use sparingly | "Warning: This cannot be undone!" |

### Contractions

**Use contractions for warmth and conversational tone:**

```
✅ "You don't have access" (warm, conversational)
✅ "We're saving your changes" (personal, reassuring)
✅ "It's almost ready" (friendly)

❌ "You do not have access" (formal, distant)
❌ "We are saving your changes" (stiff)
❌ "It is almost ready" (robotic)
```

---

## Inclusive Language Guidelines

### Gender Neutrality

```
❌ "He logged in"
❌ "Every user needs his password"
❌ "Fireman", "Chairman"

✅ "They logged in" / "The user logged in"
✅ "Every user needs their password"
✅ "Fire department", "Chair"
```

### Disability & Accessibility

```
❌ "Handicapped access", "Blind users"
❌ "For the deaf", "Crippled by errors"

✅ "Accessible entrance", "Screen reader users"
✅ "D/deaf and hard of hearing", "Blocked by errors"
```

### Age & Cultural Assumptions

```
❌ "Guys" (assumes gender), "Young professionals"
❌ "Obvious", "Common sense", "Everyone knows"
❌ Cultural idioms: "Ballpark figure", "Indian giver"

✅ "Team", "People", "Professionals"
✅ "As you might know", "May be unfamiliar"
✅ "Approximate number"
```

### Avoiding Ableist Language

```
❌ "Lame", "Stupid", "Dumb" (as in "dumb question")
❌ "Crazy", "Insane", "Mad" (as intensifiers)
❌ "Blind spot", "Deaf to feedback"

✅ "Ineffective", "Not optimal"
✅ "Surprising", "Unexpected"
✅ "Overlooked", "Ignored"
```

---

## Component-Specific Patterns

### Buttons

**Pattern**: Verb + Object (if needed)

```
✅ "Save"
✅ "Save document"
✅ "Create new"
✅ "Download file"
✅ "Delete account"
✅ "View all"
✅ "Sign in"
```

**Primary vs Secondary:**
- Primary (main action): "Create", "Save", "Send"
- Secondary (supporting): "Cancel", "Learn more", "Skip"
- Destructive (danger): "Delete", "Remove", "Close account"

### Form Labels

**Keep it short, specific, no periods:**

```
✅ "Email address"
✅ "Phone number"
✅ "Full name"
✅ "Company name"
✅ "Project title"
```

**Not:**
```
❌ "Please enter your email address"
❌ "What is your email?"
```

### Error Messages

**Pattern**: What + Why + How

```
✅ "Email is invalid—must include @ and domain"
✅ "Password too short—at least 8 characters"
✅ "This email already exists—sign in instead?"
```

### Empty States

**Pattern**: Empathy + Action

```
✅ "No documents yet
   Create your first one or import from another service"

✅ "No search results
   Try different keywords"

✅ "No notifications
   You're all caught up!"
```

### Tooltips & Help Text

**Keep it brief, show benefit not action:**

```
✅ "Allows collaborators to edit" (benefit)
✅ "Learn more about password requirements" (benefit)
✅ "You have 5 uploads left this month" (context)

❌ "Click here for more info" (action, not benefit)
❌ "Hover to see more" (action, not benefit)
```

---

## Content Guidelines Output

A Complete Content Guidelines Specification including:

1. **Voice & Tone Definition**
   - Orion voice (permanent personality)
   - Tone variations (by scenario)
   - Examples of good/bad copy

2. **Terminology Standards**
   - Core verbs (approved/avoid)
   - Words to use (plain language)
   - Words to avoid (jargon)
   - Acronym standards

3. **Capitalization Rules**
   - By element type (buttons, labels, messages)
   - Examples for each

4. **Punctuation Standards**
   - When to use periods, commas, question marks
   - Button labels vs form labels vs messages

5. **Inclusive Language**
   - Gender neutrality
   - Disability & accessibility
   - Age & cultural assumptions
   - Ableist language to avoid

6. **Component Patterns**
   - Button copy formula
   - Form label standards
   - Error message pattern
   - Empty state pattern
   - Tooltip guidelines

7. **Decision Tree**
   - When to use second-person
   - When to use contractions
   - When to add periods
   - When to explain acronyms

8. **Quick Reference**
   - Approved terminology list
   - Avoided terms list
   - Phrase library (reusable patterns)

---

## Using These Guidelines

**When writing copy:**

1. Check this guide for approved terminology (use "Save", not "Submit")
2. Apply voice & tone for the context (empathetic for errors)
3. Follow capitalization rules (Title Case for buttons)
4. Use inclusive language (they/them, not he/she)
5. Follow component patterns (button = Verb + Object)

**When reviewing copy:**

1. Is it using approved terminology? (Check word list)
2. Does it match Orion voice? (Direct, helpful, clear)
3. Is it accessible? (Plain language, no jargon)
4. Is it consistent? (Same terms used same way)
5. Is it inclusive? (Gender-neutral, respectful, unbiased)

**When proposing new standards:**

Bring to Design Lead or UX Writer for governance and addition to this guide.

This ensures Orion maintains consistent, clear, and inclusive voice across all products.
