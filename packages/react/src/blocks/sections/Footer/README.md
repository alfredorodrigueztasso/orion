# Footer (Section)

A comprehensive footer section with brand information, link groups, social media links, and copyright. Use at the bottom of every page.

## When to Use

| Scenario                     | Use Footer                             |
| ---------------------------- | -------------------------------------- |
| Main page footer             | ✅ Yes - full-featured default variant |
| Minimal footer               | ✅ Yes - use minimal variant           |
| Marketing site footer        | ✅ Yes - includes social links         |
| Blog or documentation footer | ✅ Yes - centered variant available    |
| No footer needed             | ❌ No - don't use component            |

## Props Reference

| Prop        | Type                                 | Default   | Description                        |
| ----------- | ------------------------------------ | --------- | ---------------------------------- |
| brand       | FooterBrand                          | —         | Brand info and logo (required)     |
| linkGroups  | FooterLinkGroup[]                    | —         | Groups of footer links (optional)  |
| socialLinks | FooterSocialLink[]                   | —         | Social media links (optional)      |
| variant     | "default" \| "minimal" \| "centered" | "default" | Visual variant                     |
| copyright   | string                               | —         | Copyright text override (optional) |
| className   | string                               | —         | Additional CSS class               |

### FooterBrand

| Prop        | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| name        | string    | Company/brand name                 |
| description | string    | Short brand description (optional) |
| logo        | ReactNode | Logo element (optional)            |

### FooterLinkGroup

| Prop  | Type         | Description         |
| ----- | ------------ | ------------------- |
| title | string       | Group heading       |
| links | FooterLink[] | Links in this group |

### FooterLink

| Prop  | Type   | Description |
| ----- | ------ | ----------- |
| label | string | Link text   |
| href  | string | Link URL    |

### FooterSocialLink

| Prop  | Type      | Description        |
| ----- | --------- | ------------------ |
| label | string    | Accessible label   |
| href  | string    | Social profile URL |
| icon  | ReactNode | Icon element       |

## Examples

### Complete Footer

```tsx
import { Footer } from "@orion-ds/react";
import { Github, Twitter, Linkedin } from "lucide-react";

<Footer
  brand={{ name: "Acme", description: "Building the future" }}
  linkGroups={[
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ]}
  socialLinks={[
    { label: "GitHub", href: "https://github.com", icon: <Github size={20} /> },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: <Twitter size={20} />,
    },
  ]}
/>;
```

### Minimal Footer

```tsx
<Footer
  variant="minimal"
  brand={{ name: "Acme Inc" }}
  copyright="© 2024 Acme Inc. All rights reserved."
/>
```

## Accessibility

- Brand and link text provide semantic structure
- Links are keyboard navigable
- Social icons have aria-labels
- Footer is marked as `<footer>` semantically

## Token Usage

- `--surface-sunken` — Footer background
- `--text-primary` — Link text
- `--text-secondary` — Brand description
- `--border-subtle` — Dividers between sections
- `--spacing-8` — Link group spacing
- `--spacing-16` — Section padding
