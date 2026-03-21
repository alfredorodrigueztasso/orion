# Landing Page Visual Issues Report
**Date**: March 21, 2026
**Page**: localhost:3002 (Orion Design System Landing)
**Reviewer**: Product Team
**Status**: In Progress 🔄

---

## ISSUE #1: Navbar Links Alignment
**Status**: 🟡 HIGH PRIORITY
**Component**: Navbar (DocsNavbar.tsx)
**Affected Section**: Global Navbar
**Devices**: Desktop (2249px shown in screenshot)

### Problem Description
The navbar links (Docs | Components | Sections | Templates | Pricing) are **not centered horizontally** on the page. They appear offset to the right because the left side (Logo) and right side (Buttons) have **unequal widths**, creating asymmetry.

**Expected vs Actual**:
- ✅ Expected: Links centered, OR links left-aligned (consistent layout)
- ❌ Actual: Links appear floating/offset due to uneven left/right sidebar widths

### Visual Impact
- Creates visual imbalance with the Hero section below, which IS centered
- Navbar looks misaligned compared to rest of page content
- The "Founding Member" button on right takes up more space than logo on left

### Root Cause (Technical)
**File**: `docs-site/components/DocsNavbar.tsx`

The navbar structure likely uses a 3-part layout:
```
[Logo (left)]  [Links (center)]  [Actions (right)]
```

If `Logo` width ≠ `Actions` width, the center section shifts.

**Current structure** (approximately):
- Left: Logo (~150px)
- Center: Links (flexible)
- Right: Button + Theme toggle (~250px) ← Wider than left

### Recommendation

**Option A (RECOMMENDED)**: Use flexbox with `justify-content: center` for links
```tsx
<nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Navbar.Brand>Logo</Navbar.Brand>
  <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 'var(--spacing-6)' }}>
    {/* Links here - truly centered */}
  </nav>
  <Navbar.Actions>Buttons</Navbar.Actions>
</nav>
```

**Option B**: Align links to the left (like GitHub, Linear)
```tsx
<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
    <Navbar.Brand>Logo</Navbar.Brand>
    {/* Links here - left-aligned with logo */}
  </div>
  <Navbar.Actions>Buttons</Navbar.Actions>
</nav>
```

### Impact Assessment
- **Severity**: 🟡 HIGH (visible on every page)
- **User Experience**: Creates visual confusion, looks unfinished
- **Conversion**: May reduce trust (asymmetry suggests poor quality)
- **Devices Affected**: Desktop, Tablet (possibly Mobile too)

### Screenshots
- Screenshot 1: Full page with navbar (2249px width)
- Screenshot 2: Navbar details with DevTools measuring

---

---

## ISSUE #2: Hero Badge Prop Not Rendering
**Status**: 🔴 CRITICAL (Orion Component Bug)
**Component**: Hero (block) from `@orion-ds/react/blocks`
**Affected Section**: HERO (HomepageHero.tsx)
**Devices**: Desktop, all devices

### Problem Description
The Badge is **passed to the Hero component via the `badge` prop**, but the **Hero component is NOT rendering it visually**.

**Code Verification**:
```tsx
// ✅ Badge IS correctly included in code (HomepageHero.tsx, lines 23-26)
<Hero
  badge={
    <Badge variant="secondary" size="sm">
      ✦ MCP Server included — Claude Code ready
    </Badge>
  }
  // ... rest of props
/>

// ❌ But NOT visible when rendered in browser
```

**Expected vs Actual**:
- ✅ Expected: Badge visible above hero title
- ❌ Actual: Badge prop is ignored/not rendered by Hero component

### Root Cause (Orion Component Bug)
The **Hero block component from @orion-ds/react/blocks** is **not rendering the `badge` prop**.

**Possible causes**:
1. Hero component doesn't support `badge` prop (API missing)
2. Hero template doesn't include badge slot
3. Badge is rendered but hidden by CSS (display:none)
4. Prop name is different in Orion (e.g., `eyebrow` instead of `badge`)
5. Badge rendering logic has bug

### Impact Assessment
- **Severity**: 🔴 CRITICAL (key differentiator is invisible)
- **User Experience**: MCP Server message missing from first impression
- **Conversion**: Reduces impact of primary value prop
- **Pages Affected**: Homepage (/), potentially other pages using Hero block
- **Estimated User Impact**: 100% of desktop/mobile visitors

### Recommendation for Orion Team

**Action Required**:
1. Check if `Hero` component from `@orion-ds/react/blocks` accepts `badge` prop
2. Verify the badge rendering logic in Hero component template
3. If prop not supported, add it and document API
4. If prop exists, debug why badge is not rendering
5. Test: Pass a Badge component to Hero.badge prop and verify it renders

**Fix Location**:
- Package: `@orion-ds/react`
- Component: `Hero` (in blocks)
- File: Likely `packages/react/src/blocks/Hero/Hero.tsx` or similar

**Code Example for Test**:
```tsx
import { Hero, Badge } from '@orion-ds/react/blocks';

<Hero
  badge={<Badge>Test Badge</Badge>}
  title="Test Title"
/>
// Expected: Badge appears above title
```

### Screenshots
- Screenshot: Hero section with Badge prop passed but NOT visible (title "The design system your AI agent already knows" shows without badge above it)

---

## Summary Stats
| Metric | Value |
|--------|-------|
| Issues Reported | 2 |
| Critical Priority | 1 (Hero Badge - Orion bug) |
| High Priority | 1 (Navbar alignment - Landing bug) |
| Components Affected | 2 (Hero block, Navbar) |
| Pages Impacted | All (Hero), All (Navbar) |
| Estimated Fix Time | 20-30 min (Navbar) + 30-60 min (Orion Hero debug) = 50-90 min |

---

## ISSUE #3: Features Section Title Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: Features (HomepageFeaturesSection.tsx)
**Affected Section**: FEATURES (sección 5️⃣ - "Built for the AI era")
**Devices**: Desktop, likely all devices

### Problem Description
The section title **"Built for the AI era"** is **too small** and doesn't command visual hierarchy. It gets lost against the feature cards below it.

**Expected vs Actual**:
- ✅ Expected: Title is prominent, clearly distinguishes section from others
- ❌ Actual: Title is undersized, lacks visual impact

### Visual Impact
- Poor visual hierarchy (title smaller than card content)
- Reduces clarity of section purpose
- User may not understand this is a new section

### Root Cause (Design/Component)
**File**: `docs-site/components/HomepageFeaturesSection.tsx`

Likely using too small font-size token or hardcoded value:
```tsx
<h2 style={{ fontSize: 'var(--font-size-xl)' }}>  // ❌ Too small
  Built for the AI era
</h2>

// Should be:
<h2 style={{ fontSize: 'var(--font-size-2xl)' }}>  // ✅ Proper hierarchy
  Built for the AI era
</h2>
```

### Recommendation
**Change font size of Features section title from smaller to larger token**:
- Current: Likely `var(--font-size-xl)` or `var(--font-size-lg)`
- Change to: `var(--font-size-2xl)` or `var(--font-size-3xl)`

Or if hardcoded:
- Current: `fontSize: '18px'` or similar
- Change to: `fontSize: 'var(--font-size-2xl)'` (24px)

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces UX clarity, not critical)
- **User Experience**: Confusing visual hierarchy
- **Conversion**: Minor impact
- **Devices Affected**: All

### Screenshots
- Screenshot: Features section with undersized title "Built for the AI era"

---

## ISSUE #4: Feature Card Icons Inconsistent Border Radius
**Status**: 🟡 MEDIUM PRIORITY
**Component**: Features Card Icon containers (HomepageFeaturesSection.tsx)
**Affected Section**: FEATURES (sección 5️⃣ - "Built for the AI era")
**Devices**: Desktop, likely all devices

### Problem Description
The icons in the feature cards **don't have consistent border radius**. Some appear more rounded than others, breaking visual consistency.

**Expected vs Actual**:
- ✅ Expected: All feature card icons have same border radius (e.g., `var(--radius-sm)`)
- ❌ Actual: Icons have inconsistent/no border radius styling

### Visual Impact
- Visual inconsistency (some icons look "boxier" than others)
- Breaks design system consistency
- User notices imprecision in design

### Root Cause (Styling)
**File**: `docs-site/components/HomepageFeaturesSection.tsx`

Likely issue:
1. Icons have hardcoded different border-radius values
2. Icons missing border-radius entirely
3. Inconsistent inline styles on icon containers

Example of BAD:
```tsx
// ❌ Inconsistent
<div style={{ borderRadius: '8px' }}>Icon1</div>
<div style={{ borderRadius: '12px' }}>Icon2</div>
<div>Icon3</div>  {/* No radius */}

// ✅ Consistent
<div style={{ borderRadius: 'var(--radius-sm)' }}>Icon1</div>
<div style={{ borderRadius: 'var(--radius-sm)' }}>Icon2</div>
<div style={{ borderRadius: 'var(--radius-sm)' }}>Icon3</div>
```

### Recommendation
**Standardize all feature card icons to use same border-radius token**:

```tsx
const iconContainerStyle = {
  borderRadius: 'var(--radius-sm)',  // or var(--radius-control)
  background: 'var(--interactive-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
};

// Apply to all icon containers
{features.map(feature => (
  <div key={feature.id} style={{ ... }}>
    <div style={iconContainerStyle}>
      {feature.icon}
    </div>
  </div>
))}
```

### Impact Assessment
- **Severity**: 🟡 MEDIUM (breaks consistency, not critical)
- **User Experience**: Notices inconsistency, reduces polish feel
- **Conversion**: Minimal impact
- **Devices Affected**: All

### Screenshots
- Screenshot: Features section showing inconsistent border radius on card icons

---

## Summary Stats
| Metric | Value |
|--------|-------|
| Issues Reported | 4 |
| Critical Priority | 1 (Orion Hero Badge) |
| High Priority | 1 (Navbar alignment) |
| Medium Priority | 2 (Title size, Icon radius) |
| Components Affected | 4 (Hero, Navbar, Features section x2) |
| Pages Impacted | All (Hero/Navbar), Homepage (Features) |
| Estimated Fix Time | 50-90 min (previous) + 10-15 min (title + icons) = 60-105 min |

---

## ISSUE #5: Pricing Section Title Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepagePricing.tsx (or pricing page hero)
**Affected Section**: PRICING (sección 7️⃣ - "Start free. Go Pro when you're ready.")
**Devices**: Desktop, likely all devices

### Problem Description
The section title **"Start free. Go Pro when you're ready."** is **too small** and lacks visual hierarchy. Same issue as #3 (Features title).

**Expected vs Actual**:
- ✅ Expected: Title is prominent, clearly distinguishes pricing section
- ❌ Actual: Title is undersized, gets lost in the page

### Root Cause
Same as Issue #3 — likely using too small font-size token.

### Recommendation
**Change font size to larger token**:
- Current: Likely `var(--font-size-xl)` or hardcoded small value
- Change to: `var(--font-size-2xl)` or `var(--font-size-3xl)`

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces visual hierarchy)
- **Devices Affected**: All

---

## ISSUE #6: Pricing CTA Button Not Functional
**Status**: 🔴 CRITICAL
**Component**: Button (Orion) in Pricing Card
**Affected Section**: PRICING (sección 7️⃣ - Founding Member card)
**Devices**: Desktop (shown in screenshot)

### Problem Description
The **"Become a Founding Member"** button in the Founding Member pricing card **does not work**. Clicking it has no effect.

**Expected vs Actual**:
- ✅ Expected: Button navigates to checkout/signup flow (or `/pricing` page)
- ❌ Actual: Button is clickable but does nothing

### Visual Confirmation
The button is clearly visible (blue, prominent) but is **not functional**.

### Root Cause (Likely)
**File**: `docs-site/components/HomepagePricing.tsx` (or pricing page)

Possible causes:
1. Button missing `href` prop or `onClick` handler
2. Button is disabled but visually enabled
3. Link wrapped around button is broken (bad href)
4. Button is a custom implementation without navigation logic

Example of BAD:
```tsx
// ❌ No href or onClick
<Button variant="primary">
  Become a Founding Member
</Button>

// ✅ Should be
<Link href="/pricing">
  <Button variant="primary">
    Become a Founding Member
  </Button>
</Link>
```

### Recommendation
**Add navigation to button**:
- Option A: Wrap in `<Link>` pointing to `/pricing` or checkout page
- Option B: Add `onClick` handler to redirect
- Option C: Make button an `<a>` tag with `href`

### Impact Assessment
- **Severity**: 🔴 CRITICAL (breaks conversion funnel)
- **User Experience**: User clicks but nothing happens (friction/confusion)
- **Conversion**: Completely blocks Founding Member signups
- **Devices Affected**: All

---

## ISSUE #7: Pricing Numbers Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepagePricing.tsx / PricingCard
**Affected Section**: PRICING (sección 7️⃣ - Price numbers)
**Devices**: Desktop, likely all devices

### Problem Description
The **price numbers** ($0, $29, $149) in the pricing cards are **too small** and don't command attention. They should be prominent.

**Expected vs Actual**:
- ✅ Expected: Large, bold price numbers (e.g., `var(--font-size-3xl)` or larger)
- ❌ Actual: Price numbers are small, blend into card content

### Visual Impact
- Poor visual hierarchy (prices don't stand out)
- Reduces clarity of pricing offer
- User has to hunt for the price

### Root Cause
**File**: `docs-site/components/HomepagePricing.tsx`

Likely issue:
```tsx
// ❌ Too small
<div style={{ fontSize: 'var(--font-size-xl)' }}>
  $29 / month
</div>

// ✅ Should be larger
<div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>
  $29
</div>
<div style={{ fontSize: 'var(--font-size-sm)' }}>
  / month
</div>
```

### Recommendation
**Increase price number font size and weight**:
- Price number: `var(--font-size-3xl)` + `fontWeight: 700`
- Billing period: `var(--font-size-sm)` or `var(--font-size-base)`

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces clarity of pricing)
- **User Experience**: Harder to scan pricing quickly
- **Conversion**: May reduce perceived value
- **Devices Affected**: All

---

## Summary Stats
| Metric | Value |
|--------|-------|
| Issues Reported | 7 |
| Critical Priority | 2 (Hero Badge, Pricing Button) |
| High Priority | 1 (Navbar alignment) |
| Medium Priority | 4 (Title sizes x2, Icon radius, Price numbers) |
| Components Affected | 7 |
| Pages Impacted | All (Hero/Navbar), Homepage (Features, Pricing) |
| Estimated Fix Time | **60-105 min (previous) + 5-10 min (Pricing title/numbers) + CRITICAL fix for button** |

---

## ISSUE #8: Social Proof Section Title Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepageTestimonials.tsx
**Affected Section**: TESTIMONIALS/SOCIAL PROOF (sección 8️⃣ - "Built with Orion")
**Devices**: Desktop, likely all devices

### Problem Description
The section title **"Built with Orion"** is **too small** and doesn't command visual hierarchy. Consistent with Issues #3 and #5.

**Expected vs Actual**:
- ✅ Expected: Title is prominent, clearly distinguishes section
- ❌ Actual: Title is undersized, lacks visual weight

### Root Cause
Same pattern as Issues #3 and #5 — undersized font-size token.

### Recommendation
**Change font size to larger token**:
- Current: Likely `var(--font-size-xl)` or smaller
- Change to: `var(--font-size-2xl)` or `var(--font-size-3xl)`

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces section clarity)
- **Devices Affected**: All

---

## ISSUE #9: Social Proof Metric Numbers Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepageTestimonials.tsx / Card components
**Affected Section**: TESTIMONIALS/SOCIAL PROOF (sección 8️⃣ - Metric cards)
**Devices**: Desktop, likely all devices

### Problem Description
The **metric numbers** (2.5K+, 50K+, 90+) in the social proof cards are **too small** and don't stand out. They should be prominent and eye-catching.

**Expected vs Actual**:
- ✅ Expected: Large, bold numbers that grab attention
- ❌ Actual: Numbers are small, don't command visual hierarchy

### Visual Impact
- Poor visual hierarchy (metrics blend into text)
- Reduces impact of social proof
- Numbers should be the first thing you see

### Root Cause
**File**: `docs-site/components/HomepageTestimonials.tsx`

Likely issue:
```tsx
// ❌ Too small
<div style={{ fontSize: 'var(--font-size-xl)' }}>
  2.5K+
</div>

// ✅ Should be much larger
<div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>
  2.5K+
</div>
```

### Recommendation
**Increase metric number font size and weight**:
- Number: `var(--font-size-3xl)` + `fontWeight: 700`
- Label: `var(--font-size-sm)` or `var(--font-size-base)`

Similar fix to Issue #7 (Pricing numbers).

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces social proof impact)
- **User Experience**: Metrics feel less impressive
- **Conversion**: May reduce trust perception
- **Devices Affected**: All

---

## Summary Stats
| Metric | Value |
|--------|-------|
| Issues Reported | 9 |
| Critical Priority | 2 (Hero Badge, Pricing Button) |
| High Priority | 1 (Navbar alignment) |
| Medium Priority | 6 (Titles x3, Icon radius, Numbers x2) |
| Components Affected | 9 |
| Pages Impacted | All (Hero/Navbar), Homepage (Features, Pricing, Social Proof) |
| Estimated Fix Time | **90-130 min (previous) + 5-10 min (Social proof title/numbers) = 95-140 min** |

---

## ISSUE #10: CTA Section Missing Margins (Card Layout)
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepageCTA.tsx
**Affected Section**: CTA + FOOTER (sección 9️⃣ - "Start building with Orion today")
**Devices**: Desktop, likely all devices

### Problem Description
The CTA section is **styled like a large card with border radius**, but **has NO margin around it**, so it appears **glued to the edges** of the container. This breaks visual breathing room.

**Expected vs Actual**:
- ✅ Expected: Card has margin from edges (e.g., `var(--spacing-6)` or `var(--spacing-8)`)
- ❌ Actual: Card stretches edge-to-edge with no breathing room

### Visual Impact
- Looks cramped and poorly designed
- Reduces visual hierarchy
- Makes card feel "too big" and overwhelming
- Inconsistent with rest of page spacing

### Root Cause
**File**: `docs-site/components/HomepageCTA.tsx`

The CTA card/section likely has:
```tsx
// ❌ No margin
<section style={{ background: 'var(--interactive-primary)', borderRadius: 'var(--radius-lg)' }}>
  Content
</section>

// ✅ Should have margin
<section style={{
  background: 'var(--interactive-primary)',
  borderRadius: 'var(--radius-lg)',
  margin: 'var(--spacing-6) var(--spacing-4)',  // or larger
  padding: 'var(--spacing-8)',
}}>
  Content
</section>
```

### Recommendation
**Add horizontal and vertical margins to CTA section**:
- Margin: `var(--spacing-6)` or `var(--spacing-8)` (horizontal and vertical)
- Padding: `var(--spacing-8)` (already likely correct)

### Impact Assessment
- **Severity**: 🟡 MEDIUM (breaks visual breathing room)
- **User Experience**: Section feels cramped
- **Devices Affected**: Desktop primary, likely all

---

## ISSUE #11: CTA Section Title Too Small
**Status**: 🟡 MEDIUM PRIORITY
**Component**: HomepageCTA.tsx
**Affected Section**: CTA (sección 9️⃣ - "Start building with Orion today")
**Devices**: Desktop, likely all devices

### Problem Description
The CTA section title **"Start building with Orion today"** is **too small** for such a prominent section. Same pattern as other title issues.

**Expected vs Actual**:
- ✅ Expected: Large, bold title (e.g., `var(--font-size-3xl)`)
- ❌ Actual: Title is undersized for the emphasis level

### Root Cause
Same as previous title issues — undersized font-size token.

### Recommendation
**Change font size to larger token**:
- Current: Likely `var(--font-size-xl)` or `var(--font-size-2xl)`
- Change to: `var(--font-size-3xl)` or `var(--font-size-4xl)`

### Impact Assessment
- **Severity**: 🟡 MEDIUM (reduces section prominence)
- **Devices Affected**: All

---

## ISSUE #12: CTA Button (GitHub) Using Low-Contrast Ghost Variant
**Status**: 🟡 MEDIUM PRIORITY
**Component**: Button (Orion) - Ghost variant
**Affected Section**: CTA (sección 9️⃣ - "View on GitHub" button)
**Devices**: Desktop (visible in screenshot)

### Problem Description
The **"View on GitHub"** button uses the **`variant="ghost"`** styling, which has **low contrast on the blue CTA background**. The button is hard to read/see.

**Expected vs Actual**:
- ✅ Expected: High-contrast button variant (e.g., `variant="secondary"` or custom white)
- ❌ Actual: Ghost button with low contrast against blue background

### Visual Confirmation
The button text is barely visible against the blue CTA background.

### Root Cause
**File**: `docs-site/components/HomepageCTA.tsx`

The button likely uses:
```tsx
// ❌ Low contrast on blue background
<Button variant="ghost">
  View on GitHub
</Button>

// ✅ Should use high-contrast variant
<Button variant="secondary">  // or a white/light variant
  View on GitHub
</Button>
```

The **ghost variant is transparent/outlined**, which has low contrast on colored backgrounds. Should use a filled variant with good contrast.

### Recommendation
**Change button variant to higher contrast**:
- Option A: Change to `variant="secondary"` (filled, light color)
- Option B: Use a custom white/light variant with text icon
- Option C: Check if Orion has an `inverse` or `light` variant for colored backgrounds

### Impact Assessment
- **Severity**: 🟡 MEDIUM (accessibility + UX issue)
- **Accessibility**: Low contrast ratio (may fail WCAG AA)
- **User Experience**: Button is hard to find/read
- **Conversion**: May reduce CTR on secondary action
- **Devices Affected**: All

---

## FINAL SUMMARY

| Metric | Value |
|--------|-------|
| **Total Issues Reported** | **12** |
| 🔴 Critical | 2 |
| 🟡 High | 1 |
| 🟡 Medium | 9 |
| **Total Fix Time Estimate** | **120-160 minutes** |

### Issue Breakdown by Category

**Orion Component Bugs (2)**:
- Hero Badge Not Rendering (CRITICAL)
- Pricing Button Not Functional (CRITICAL)

**Landing Page Layout/Spacing (3)**:
- Navbar Links Alignment (HIGH)
- CTA Section Missing Margins (MEDIUM)
- Feature Icons Inconsistent Radius (MEDIUM)

**Typography/Font Size (5)**:
- Features Title Too Small (MEDIUM)
- Pricing Title Too Small (MEDIUM)
- Social Proof Title Too Small (MEDIUM)
- Pricing Numbers Too Small (MEDIUM)
- Social Proof Numbers Too Small (MEDIUM)
- CTA Section Title Too Small (MEDIUM)

**Button/Component Variants (1)**:
- CTA Button Low Contrast (MEDIUM)

---

**REPORT COMPLETE** ✅

