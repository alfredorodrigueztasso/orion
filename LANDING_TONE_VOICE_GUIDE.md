# Orion Landing Page — Tone & Voice Style Guide

**For**: Frontend Dev (QA reference while implementing copy)
**Date**: March 21, 2026
**Purpose**: Ensure consistency across all copy rewrites

---

## Core Voice Principles

### 1. User-Action Focused (NOT Feature-Focused)

❌ **WRONG** (What the product is)
```
"Orion is an AI-native design system with MCP server integration, token governance, and agentic patterns."
```

✅ **RIGHT** (What the user does)
```
"Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in."
```

**Test**: Does the sentence start with "Your...", "You...", "Install...", "Discover...", "Ship..."?
If it starts with "Orion is...", "This system...", "The library...", rewrite it.

### 2. Collegial, Not Corporate

❌ **WRONG** (Corporate jargon)
```
"Comprehensive component ecosystem leveraging semantic token architecture for consistent design execution."
```

✅ **RIGHT** (Collegial, direct)
```
"72 components. Full TypeScript. Accessibility built in. Deploy with confidence."
```

**Test**: Would you say this sentence to a developer friend? If not, simplify it.

### 3. Specific, Not Vague

❌ **WRONG** (Vague)
```
"AI-powered agentic capabilities for intelligent component discovery."
```

✅ **RIGHT** (Specific)
```
"9 tools. Claude Code. Cursor. Cline. Your AI agent discovers, searches, and installs components."
```

**Test**: Can a developer screenshot this and know exactly what to do? If not, add numbers and names.

### 4. Short Sentences, Maximum 2 Per Thought

❌ **WRONG** (Long sentences)
```
"With our comprehensive library of production-ready React components that feature full TypeScript support and built-in accessibility, developers can rapidly iterate and ship with confidence knowing that every component has been rigorously tested and optimized for both light and dark themes."
```

✅ **RIGHT** (Short, scannable)
```
"Production-ready React components. Full TypeScript. Accessibility built in. Deploy with confidence."
```

**Test**: Can someone understand the sentence in < 10 seconds? If not, break it into shorter sentences.

---

## Banned Words (Orion Microcopy Rules)

**NEVER use these words** (they're corporate buzzwords Orion rejects):

| ❌ Word | ✅ Alternative | Context |
|---------|---------|---------|
| Platform | Product, System, Library | "The Orion platform" → "Orion design system" |
| Solution | Tool, System | "A solution for UI consistency" → "Token-governed components" |
| Powerful | (omit) | "Powerful component library" → "72 components. Production-ready." |
| Revolutionary | (omit) | "Revolutionary approach to design" → "Token-governed architecture" |
| Ecosystem | Library, Collection | "Our ecosystem of components" → "72 components + 41 sections" |
| Leverage | Use, Enable | "Leverage our tokens" → "Use semantic tokens" |
| Comprehensive | List specifics | "Comprehensive component set" → "72 components, 41 sections, 10 templates" |
| Agentic patterns | AI components, MCP tools | (be specific about which tools) |
| Capabilities | (omit or be specific) | "AI capabilities" → "9 MCP tools: discover, search, install" |
| Paradigm | (omit) | "A new paradigm" → "Token-governed architecture" |
| Cutting-edge | (omit) | "Cutting-edge design system" → "Token-governed design system" |
| Best-in-class | (omit) | "Best-in-class components" → "Production-ready React components" |

---

## MCP Server Messaging (The New North Star)

Whenever mentioning MCP Server, follow this pattern:

### Pattern A: Feature Introduction
```
🔌 MCP Server
9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project.
```

**Anatomy**:
- Icon: 🔌 (plug, representing integration)
- Title: "MCP Server" (specific, not "AI-native" or "agentic")
- Numbers: "9 tools" (specific, quantified)
- Names: "Claude Code. Cursor. Cline." (specific agents, not "AI agents" alone)
- Actions: "discovers, searches, installs" (user actions, in present tense)

### Pattern B: Benefit Callout
```
Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in. No API config needed.
```

**Anatomy**:
- Subject: "Your AI agent"
- Agents: Named specifically (Claude Code, not "AI")
- Actions: Verb-heavy (discovers, installs, integrates)
- Quantity: "9 tools"
- Benefit: "No API config needed" (differentiator vs. competitors)

### Pattern C: Installation
```
npx @orion-ds/mcp init
```

**Anatomy**:
- Command-line (technical audience understands this)
- Package name (@orion-ds/mcp, consistent with other packages)
- Action word (init, start, setup, not "configure" or "enable")

### Pattern D: Data Point
```
9 MCP Tools
AI agent integrations
```

**Anatomy**:
- Number first (9)
- What it is (MCP Tools)
- One-line description (AI agent integrations)

---

## Price/Scarcity Messaging

### Founding Member Tier

**Never say**:
- ❌ "Pro tier"
- ❌ "Limited availability"
- ❌ "Early bird offer"
- ❌ "Exclusive access"

**Always say**:
- ✅ "Founding Member" (specific tier name)
- ✅ "200 spots total" (exact number)
- ✅ "Price locks in forever. Then $49/mo." (what happens after)
- ✅ "200 spots · X remaining" (dynamic scarcity)

**Example messaging**:
```
✅ "200 spots total. Price locks in forever. Then $49/mo."
❌ "Limited time offer at exclusive founding member pricing"
```

**Why**: Specific numbers and concrete statements build trust. Vague language sounds like hype.

---

## Tone Spectrum (Use This to Calibrate)

| Context | Tone | Example |
|---------|------|---------|
| **Hero** (first impression) | Confident, forward-looking | "The design system your AI agent already knows." |
| **Features** (education) | Clear, benefit-focused | "Production-ready React components. Deploy with confidence." |
| **Pricing** (decision) | Specific, transparent | "200 spots total. Price locks in forever." |
| **Stats** (social proof) | Achievement-focused | "Shipping at scale, from day one." |
| **CTA** (action) | Direct, imperative | "Get Started Free" (not "Begin Your Journey") |
| **Footer** (legal) | Formal, accurate | "MIT Licensed" (not "Totally free forever") |

**Range**: Confident → Clear → Specific → Direct

**Never**: Hype → Vague → Corporate → Cute

---

## Writing Checklist (Use Before Submitting Copy)

For EACH block of copy, check:

### Content
- [ ] Starts with action verb or "Your..." (user-focused)
- [ ] Contains specific numbers (72, 41, 10, 9, 200 — no "many", "lots", "plenty")
- [ ] Mentions agent names when relevant (Claude Code, Cursor, Cline — not "AI agents")
- [ ] No banned words (platform, solution, powerful, revolutionary, etc.)
- [ ] Shorter than original (removes jargon, tightens language)

### Tone
- [ ] Reads like talking to a dev friend (no corporate jargon)
- [ ] Emphasizes what the USER DOES, not what PRODUCT IS
- [ ] Sentences are short (max 2-3 per concept)
- [ ] Uses present tense (discovers, installs, builds — not "will enable you to")

### Grammar
- [ ] Uses periods, not em-dashes (cleaner scans)
- [ ] Capitalization is consistent (Orion, MCP Server, Claude Code)
- [ ] Punctuation is minimal (no extra commas, dashes)
- [ ] Links work (URLs verified)

### Structure
- [ ] MCP Server mentioned where relevant (Hero, Install, Features, Stats, etc.)
- [ ] Consistent capitalization (Claude Code, not claude code)
- [ ] Consistent phrasing ("AI agent", not "AI-powered" or "agentic")
- [ ] Free tier emphasizes "free forever" + "no credit card"
- [ ] Founding Member emphasizes "price lock" + "spots"

---

## Examples: Before & After

### Example 1: Hero Description

**BEFORE**:
```
Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift.
```

**Analysis**:
- ❌ Focuses on what system IS ("Token-governed"), not what user DOES
- ❌ Uses jargon ("UI hallucination", "visual drift") without context
- ❌ Doesn't mention MCP Server

**AFTER**:
```
Your AI agent (Claude Code, Cursor, Cline) discovers, installs, and integrates Orion components directly. 9 tools built in. No API config needed.
```

**Why it's better**:
- ✅ Starts with "Your AI agent" (user-focused)
- ✅ Names specific agents (Claude Code, Cursor, Cline)
- ✅ Lists user actions (discovers, installs, integrates)
- ✅ Quantifies benefit (9 tools)
- ✅ Explains advantage ("No API config needed")

---

### Example 2: Feature Description

**BEFORE**:
```
MCP server, CLI installer, HTTP registry API, and validation tools purpose-built for AI-assisted development.
```

**Analysis**:
- ❌ Lists what the system HAS (server, CLI, API, tools)
- ❌ Vague phrase: "purpose-built for AI-assisted development"
- ❌ Doesn't say what user DOES with these tools
- ❌ Long sentence, hard to scan

**AFTER**:
```
9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project.
```

**Why it's better**:
- ✅ Starts with number (9 tools — concrete)
- ✅ Names agents (Claude Code, Cursor, Cline)
- ✅ Describes user actions (discovers, searches, installs)
- ✅ Three short sentences, easy to scan
- ✅ Benefit is obvious (components install automatically)

---

### Example 3: Pricing Tier

**BEFORE**:
```
First 200 users. Price locks forever.
```

**Analysis**:
- ❌ "First 200 users" sounds like FIFO (first come, first served) — doesn't feel exclusive
- ❌ "Price locks forever" is unclear — locks at what price?

**AFTER**:
```
200 spots total. Price locks in forever. Then $49/mo.
```

**Why it's better**:
- ✅ "200 spots total" sounds deliberate, not FIFO
- ✅ "Price locks in forever" is clearer (price stays $29/mo)
- ✅ "Then $49/mo" shows what happens after spots fill
- ✅ Creates urgency without hype

---

### Example 4: Feature Title

**BEFORE**:
```
AI-Native
```

**Analysis**:
- ❌ Vague (what does "AI-native" mean to a new visitor?)
- ❌ Doesn't say what the feature IS

**AFTER**:
```
MCP Server
```

**Why it's better**:
- ✅ Concrete (MCP Server is a specific tool)
- ✅ New visitors can Google it
- ✅ Makes it clear this is the differentiator
- ✅ Shorter (one word vs. two)

---

## Capitalization Standards

Use this as the source of truth for proper nouns:

| Term | Correct | Notes |
|------|---------|-------|
| MCP Server | MCP Server | Capital M, P, S |
| Claude Code | Claude Code | Both capitalized |
| Cursor | Cursor | Capital C |
| Cline | Cline | Capital C |
| Orion | Orion | Always capitalized |
| Chain of Truth | Chain of Truth | Only in formal context; often just "token-governed" |
| @orion-ds/react | @orion-ds/react | Package name, lowercase |
| @orion-ds/mcp | @orion-ds/mcp | Package name, lowercase |
| MIT License | MIT License | Standard terminology |
| TypeScript | TypeScript | Standard terminology |
| React | React | Standard terminology |

---

## Common Patterns (Copy-Paste Templates)

### Pattern: Feature Introduction
```
[Icon] [Title]
[One-sentence benefit]. [Specific detail]. [Action or outcome].
```

**Example**:
```
🔌 MCP Server
9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project.
```

### Pattern: Quantity + Benefit
```
[Number] [What]. [How it helps].
```

**Example**:
```
72 components. Full TypeScript. Accessibility built in. Deploy with confidence.
```

### Pattern: Price + Scarcity
```
[Price]. [Condition]. [What happens next].
```

**Example**:
```
$29/mo. 200 spots total. Price locks in forever. Then $49/mo.
```

### Pattern: Action Sequence
```
[Your actor]. [Action 1]. [Action 2]. [Action 3]. [Outcome].
```

**Example**:
```
Your AI agent discovers components. Searches patterns. Installs directly. Zero friction.
```

---

## Red Flags (Things to Fix If You See Them)

| 🚩 Red Flag | ✅ How to Fix | Example |
|----------|-------------|---------|
| "Powerful" appears anywhere | Remove it; list specific capabilities instead | "Powerful components" → "72 components. Full TypeScript." |
| Starts with "The" (The system, The library, The platform) | Rewrite to start with action verb or "Your" | "The Orion design system features..." → "Ship with Orion components that..." |
| Em-dashes in feature descriptions | Replace with periods | "Token-governed architecture — eliminating..." → "Token-governed architecture. No hardcoded values." |
| Longer than 2 sentences per feature | Break into shorter sentences | Break long sentence into 3 short ones |
| Mentions "AI-native" but not agents | Add agent names | "AI-native components" → "9 tools: Claude Code, Cursor, Cline" |
| Uses "agentic patterns" | Replace with specific tool names | "Agentic patterns like AgentThinking..." → "AgentThinking, StreamText, ToolCall" |
| Numbers are vague (many, lots, numerous) | Use exact numbers | "Many components" → "72 components" |
| Doesn't mention MCP in Features section | Add to Feature 1 | Reorder features, put MCP first |
| Free tier doesn't mention "no credit card" | Add it to description | "Get building. No credit card. Everything free." |
| Founding Member doesn't mention "200 spots" | Add scarcity signal | "200 spots total. Price locks in forever." |
| CTA says "Get Started" without "Free" | Add "Free" | "Get Started" → "Get Started Free" |
| Links don't work (GitHub, Pricing, Privacy) | Verify and test | See URL verification guide in LANDING_COPY_QUICK_REFERENCE.md |

---

## Voice Consistency Across Sections

**Hero** (most important section — sets tone for whole page):
- Confident, forward-looking
- Emphasizes MCP Server as differentiator
- User-action focus (what you DO with agents)

**Features** (education):
- Clear, benefit-focused
- Specific numbers and names
- Explains HOW and WHY

**Pricing** (conversion):
- Specific, transparent
- Scarcity for Founding Member
- Clear value prop for each tier

**Stats** (social proof):
- Achievement-focused
- Numbers tell the story
- "Shipping at scale" angle

**CTA** (final action):
- Direct, imperative
- No fluff
- "Free to start" + "Open source forever"

**Voice should be consistent**: User-focused, collegial, specific, direct.
**No section should sound**: Corporate, vague, feature-focused, or cute.

---

## Final QA Before Launch

Print this checklist and mark off items as you review:

- [ ] **Hero badge**: 🔌 MCP Server (not ✨ Chain of Truth)
- [ ] **Hero title**: "already knows" in highlight (not "AI-first")
- [ ] **Hero description**: Mentions Claude Code, Cursor, Cline (specific agents, not "AI")
- [ ] **Install section**: New "Claude Code" tab with MCP setup
- [ ] **Features**: MCP Server is Feature 1 (reordered, not Feature 6)
- [ ] **Features**: Descriptions are 1-2 sentences each (no jargon)
- [ ] **Pricing Free**: Mentions "MCP Server (9 tools)" in features
- [ ] **Pricing Founding**: Badge shows "200 spots · X remaining" (scarcity signal)
- [ ] **Pricing Founding**: Description says "Price locks in forever. Then $49/mo."
- [ ] **Pricing Team**: CTA says "Get in Touch" (not "Contact Us")
- [ ] **Stats**: Title is "Shipping at scale, from day one" (achievement-focused)
- [ ] **Social Proof**: Focuses on "Used by builders" + "Trusted by developers"
- [ ] **CTA**: Title is "Ship AI-first products faster" (action-focused)
- [ ] **CTA**: Description mentions "Claude Code, Cursor, Cline" (specific agents)
- [ ] **Footer**: Has "Pricing" and "Privacy" links
- [ ] **Navbar**: Has "Pricing" link (after Templates)
- [ ] **Component Showcase**: Has new "AI Agents" tab (9 total tabs)
- [ ] **No banned words**: platform, solution, powerful, revolutionary, ecosystem, leverage (all removed)
- [ ] **No vague phrases**: "agentic patterns", "AI-powered", "capabilities" (replaced with specifics)
- [ ] **Light/dark mode**: All text contrast ≥ 4.5:1 (WCAG AA)
- [ ] **Mobile**: Copy fits at 375px width (test on phone)
- [ ] **Links**: All verify (GitHub, Pricing, Privacy, MCP docs)

---

**Status**: Ready for Frontend Dev to use during implementation
**Use alongside**: `LANDING_COPY_QUICK_REFERENCE.md` (for exact text to copy-paste)

