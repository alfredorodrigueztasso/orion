# AppDownload (Section)

A section promoting app downloads with store badges, screenshots, features, QR codes, and ratings. Ideal for app landing pages and mobile app promotion.

## When to Use

| Scenario                 | Use AppDownload                                       |
| ------------------------ | ----------------------------------------------------- |
| Promoting a mobile app   | ✅ Yes - shows app preview with download links        |
| App landing page         | ✅ Yes - complete promotion with features and ratings |
| Desktop app distribution | ✅ Yes - configure with app stores                    |
| Simple download link     | ❌ No - use Button component instead                  |
| Product comparison       | ❌ No - use Comparison section instead                |

## Props Reference

| Prop        | Type                                        | Default    | Description                       |
| ----------- | ------------------------------------------- | ---------- | --------------------------------- |
| title       | string                                      | —          | Section heading                   |
| description | string                                      | —          | Section description               |
| badges      | AppStoreBadge[]                             | —          | Store badges (Apple, Google Play) |
| appImage    | string                                      | —          | App screenshot/preview image URL  |
| features    | AppFeature[]                                | —          | Feature bullets                   |
| layout      | "centered" \| "split-left" \| "split-right" | "centered" | Layout variant                    |
| showQrCode  | boolean                                     | —          | Show QR code for download         |
| qrCode      | string                                      | —          | QR code image URL                 |
| rating      | AppRating                                   | —          | App rating display                |
| compact     | boolean                                     | —          | Compact display mode              |
| className   | string                                      | —          | Additional CSS class              |

### AppStoreBadge

| Prop  | Type                | Description       |
| ----- | ------------------- | ----------------- |
| store | "apple" \| "google" | Store type        |
| href  | string              | Download link URL |

### AppFeature

| Prop        | Type   | Description         |
| ----------- | ------ | ------------------- |
| title       | string | Feature title       |
| description | string | Feature description |

### AppRating

| Prop  | Type   | Description        |
| ----- | ------ | ------------------ |
| value | number | Rating value (0-5) |
| count | string | Number of reviews  |

## Examples

### Basic App Download

```tsx
import { AppDownload } from "@orion-ds/react";

<AppDownload
  title="Download Our App"
  description="Available on iOS and Android"
  badges={[
    { store: "apple", href: "https://apps.apple.com/..." },
    { store: "google", href: "https://play.google.com/..." },
  ]}
  appImage="/app-screenshot.png"
/>;
```

### With Features and Rating

```tsx
<AppDownload
  title="Download Our App"
  description="Get the best experience on mobile"
  badges={[
    { store: "apple", href: "https://apps.apple.com/..." },
    { store: "google", href: "https://play.google.com/..." },
  ]}
  appImage="/app-screenshot.png"
  features={[
    { title: "Fast", description: "Lightning quick performance" },
    { title: "Secure", description: "Bank-level encryption" },
    { title: "Offline", description: "Works without internet" },
  ]}
  rating={{ value: 4.8, count: "2.5K" }}
  layout="split-left"
/>
```

## Accessibility

- Store badges have proper link semantics
- Rating information is announced clearly
- QR code has descriptive alt text
- Features list is keyboard navigable

## Token Usage

- `--surface-base` — Section background
- `--text-primary` — Heading and feature titles
- `--text-secondary` — Description text
- `--interactive-primary` — Download button background
- `--border-subtle` — Rating border
- `--spacing-6` — Section padding
