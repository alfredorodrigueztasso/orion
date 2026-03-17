# Banner Section

> Promotional banner for announcements, sales, or important messages.

## Quick Start

```tsx
import { Banner } from "@orion/react";

<Banner
  title="Summer Sale"
  description="Up to 50% off on selected items"
  ctaLabel="Shop Now"
  ctaHref="/sale"
  variant="gradient"
/>;
```

---

## Features

- **4 Visual Variants** — Default, Gradient, Image, Split
- **Dismissible** — Optional close button
- **Dual CTAs** — Primary and secondary actions
- **Background Images** — Custom imagery support
- **Split Layout** — Side-by-side content and image
- **Full Width Option** — Edge-to-edge display
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface BannerProps {
  // Content
  eyebrow?: ReactNode; // Badge/label above title
  title: ReactNode; // REQUIRED - Banner title
  description?: ReactNode; // Banner description

  // Actions
  ctaLabel?: string; // Primary CTA label
  ctaHref?: string; // Primary CTA href
  secondaryCtaLabel?: string; // Secondary CTA label
  secondaryCtaHref?: string; // Secondary CTA href

  // Visual
  variant?: "default" | "gradient" | "image" | "split"; // default: 'default'
  backgroundImage?: string; // Background image URL
  sideImage?: string; // Side image (split variant)
  imagePosition?: "left" | "right"; // Image position - default: 'right'
  backgroundColor?: string; // Custom background color
  gradient?: string; // Custom gradient

  // Behavior
  dismissible?: boolean; // Show close button - default: false
  onDismiss?: () => void; // Dismiss callback

  // Layout
  fullWidth?: boolean; // No max-width - default: false
  compact?: boolean; // Compact spacing - default: false
  centered?: boolean; // Center content - default: true
}
```

---

## Visual Variants

### `variant="default"` (Default)

Solid background banner.

```tsx
<Banner
  variant="default"
  title="New Feature Available"
  description="Check out our latest update"
  ctaLabel="Learn More"
  ctaHref="/features"
/>
```

### `variant="gradient"`

Gradient background using brand colors.

```tsx
<Banner
  variant="gradient"
  title="Limited Time Offer"
  description="Get 30% off your first order"
  ctaLabel="Claim Offer"
  ctaHref="/promo"
/>
```

### `variant="image"`

Full background image.

```tsx
<Banner
  variant="image"
  backgroundImage="/banners/sale-bg.jpg"
  title="Summer Collection"
  description="New arrivals now available"
  ctaLabel="Shop Now"
  ctaHref="/summer"
/>
```

### `variant="split"`

Content and image side by side.

```tsx
<Banner
  variant="split"
  sideImage="/banners/product-shot.jpg"
  imagePosition="right"
  title="Introducing Pro Plan"
  description="More features, better performance"
  ctaLabel="Upgrade Now"
  ctaHref="/upgrade"
/>
```

---

## Dismissible Banners

Allow users to close the banner.

```tsx
function DismissibleBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Banner
      title="We use cookies"
      description="This site uses cookies to improve your experience."
      ctaLabel="Accept"
      ctaHref="#"
      secondaryCtaLabel="Learn More"
      secondaryCtaHref="/privacy"
      dismissible
      onDismiss={() => setVisible(false)}
    />
  );
}
```

---

## Dual CTAs

Primary and secondary call-to-action buttons.

```tsx
<Banner
  variant="gradient"
  title="Ready to get started?"
  description="Join thousands of satisfied customers."
  ctaLabel="Sign Up Free"
  ctaHref="/signup"
  secondaryCtaLabel="Watch Demo"
  secondaryCtaHref="/demo"
/>
```

---

## Image Position

For split variant, control image placement.

```tsx
// Image on right (default)
<Banner
  variant="split"
  sideImage="/image.jpg"
  imagePosition="right"
  title="Right-aligned image"
/>

// Image on left
<Banner
  variant="split"
  sideImage="/image.jpg"
  imagePosition="left"
  title="Left-aligned image"
/>
```

---

## Complete Examples

### Sale Banner

```tsx
import { Banner, Badge } from "@orion/react";

<Banner
  variant="gradient"
  eyebrow={<Badge variant="warning">Flash Sale</Badge>}
  title="50% Off Everything"
  description="Today only! Use code FLASH50 at checkout."
  ctaLabel="Shop Sale"
  ctaHref="/sale"
  secondaryCtaLabel="See Terms"
  secondaryCtaHref="/terms"
/>;
```

### Product Launch Banner

```tsx
<Banner
  variant="split"
  sideImage="/products/new-device.png"
  imagePosition="right"
  eyebrow="Just Released"
  title="Meet the All-New Pro"
  description="Faster, lighter, and more powerful than ever. Pre-order now and get free shipping."
  ctaLabel="Pre-Order Now"
  ctaHref="/pre-order"
/>
```

### Cookie Consent Banner

```tsx
function CookieBanner() {
  const [accepted, setAccepted] = useState(false);

  if (accepted) return null;

  return (
    <Banner
      compact
      title="Cookie Notice"
      description="We use cookies to enhance your browsing experience and analyze site traffic."
      ctaLabel="Accept All"
      ctaHref="#"
      secondaryCtaLabel="Customize"
      secondaryCtaHref="/cookie-settings"
      dismissible
      onDismiss={() => setAccepted(true)}
    />
  );
}
```

### Event Announcement

```tsx
<Banner
  variant="image"
  backgroundImage="/events/conference-bg.jpg"
  eyebrow="Save the Date"
  title="Annual Conference 2024"
  description="Join industry leaders for 3 days of insights and networking. September 15-17, San Francisco."
  ctaLabel="Register Now"
  ctaHref="/conference"
  secondaryCtaLabel="View Schedule"
  secondaryCtaHref="/schedule"
/>
```

### App Download Banner

```tsx
<Banner
  variant="split"
  sideImage="/app/phone-mockup.png"
  title="Get the Mobile App"
  description="Download our app for the best experience on the go."
  ctaLabel="App Store"
  ctaHref="https://apps.apple.com/..."
  secondaryCtaLabel="Google Play"
  secondaryCtaHref="https://play.google.com/..."
/>
```

### Full Width Announcement

```tsx
<Banner
  fullWidth
  variant="gradient"
  title="Site Maintenance"
  description="We'll be performing scheduled maintenance on Saturday, 2am-4am UTC."
  dismissible
  onDismiss={() => localStorage.setItem("maintenanceDismissed", "true")}
/>
```

---

## Accessibility

- Banner uses proper heading hierarchy
- Dismiss button has accessible label
- CTAs are keyboard accessible
- Background images have appropriate contrast overlay
- `aria-live` for dismissible announcements

```tsx
// Good: Clear, actionable CTA
ctaLabel = "Start Free Trial";

// Avoid: Vague CTA
ctaLabel = "Click Here";
```

---

## Anti-Patterns

### Missing CTA

```tsx
// WRONG - Banner with no action
<Banner
  title="Big News!"
  description="Something exciting is happening"
/>

// CORRECT - Include a clear action
<Banner
  title="Big News!"
  description="Something exciting is happening"
  ctaLabel="Learn More"
  ctaHref="/news"
/>
```

### Too Much Text

```tsx
// WRONG - Wall of text
<Banner
  title="Announcement"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat..."
/>

// CORRECT - Concise messaging
<Banner
  title="Spring Sale is Here"
  description="Up to 40% off select items through April 30."
  ctaLabel="Shop Now"
  ctaHref="/sale"
/>
```

### No Background Contrast (Image Variant)

```tsx
// WRONG - Text unreadable on light image
<Banner
  variant="image"
  backgroundImage="/bright-photo.jpg"
  title="Hard to read text"
/>

// CORRECT - Ensure contrast with overlay
<Banner
  variant="image"
  backgroundImage="/bright-photo.jpg"
  title="Readable text"
  // Component should auto-apply overlay, or use darker image
/>
```

### Non-dismissible Persistent Banner

```tsx
// WRONG - Can't be dismissed, blocks content
<Banner
  title="Accept our terms"
  description="You must agree to continue"
  // No way to dismiss
/>

// CORRECT - Allow dismissal or provide action
<Banner
  title="Accept our terms"
  ctaLabel="I Agree"
  ctaHref="#accept"
  dismissible
  onDismiss={() => handleDecline()}
/>
```

---

## When to Use Banner

| Scenario           | Recommendation            |
| ------------------ | ------------------------- |
| Sale/promotion     | Gradient or image variant |
| Product launch     | Split variant             |
| Cookie consent     | Compact, dismissible      |
| Maintenance notice | Default, dismissible      |
| Event announcement | Image variant             |

## When NOT to Use Banner

| Scenario            | Use Instead      |
| ------------------- | ---------------- |
| Navigation header   | Navbar component |
| Alert/error message | Alert component  |
| Hero content        | Hero section     |
| Sticky notification | Toast component  |

---

## Related Components

- **[Hero](../Hero/README.md)** — Full hero sections
- **[CTA](../CTA/README.md)** — Call-to-action blocks
- **[Alert](../../components/Alert/README.md)** — System alerts
- **[Navbar](../../components/Navbar/README.md)** — Navigation header
