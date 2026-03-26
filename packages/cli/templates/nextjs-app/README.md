# {{projectName}}

A modern **Next.js 15** application with **TypeScript**, **App Router**, and the **Orion Design System**.

## What's Included

- ✅ **Next.js 15** with App Router and Server Components
- ✅ **TypeScript** for type-safe development
- ✅ **Orion Design System** with pre-built components
- ✅ **Theme Switching** (light/dark mode)
- ✅ **Brand Support** (Orion, Red, Deep Blue, Orange)
- ✅ **Lucide Icons** (5000+ icons included)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will reload as you make changes.

### 3. Try Interacting

On the homepage, you'll find:

- **Theme Toggle**: Switch between light and dark modes
- **Brand Selector**: Try different brand colors (Orion, Red, Deep Blue, Orange)
- **Component Examples**: See Button, Card, and Badge components in action

## Adding Components

The Orion CLI lets you add pre-built components to your project:

```bash
# Add a single component
npx @orion-ds/cli add button

# Add multiple components
npx @orion-ds/cli add button card field modal

# List all available components
npx @orion-ds/cli list
```

Components are added to your `src/components/orion/` directory and ready to use immediately.

### Example: Using a Component

```tsx
import { Button, Card } from "@orion-ds/react";

export default function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Theme & Brand

The app uses **ThemeProvider** to manage theme and brand globally. All components automatically adapt:

```tsx
// Light/Dark theme is handled by data-theme attribute
// Brand switching updates data-brand attribute
// Both persist in localStorage

// In your app (already set up in layout.tsx):
<ThemeProvider>
  <YourApp />
</ThemeProvider>
```

To access theme/brand in your components:

```tsx
import { useThemeContext } from "@orion-ds/react";

function MyComponent() {
  const { theme, brand } = useThemeContext();
  return <div>Current brand: {brand}</div>;
}
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Build & Deploy
npm run build        # Build for production
npm run start        # Run production server

# Quality Assurance
npm run lint         # Run ESLint
npm run test         # Run tests with Jest
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```
app/
├── layout.tsx           # Root layout with ThemeProvider
├── page.tsx             # Home page with examples & controls
├── page.module.css      # Page styles using CSS tokens
├── globals.css          # Global styles
└── favicon.ico

package.json            # Dependencies and scripts
tsconfig.json           # TypeScript configuration
next.config.js          # Next.js configuration
README.md               # This file
```

## Learning Resources

### Documentation

- **[Orion Docs](https://docs.orion-ds.dev)** - Complete documentation and guides
- **[Component Library](https://docs.orion-ds.dev/components)** - Component browser with examples
- **[Storybook](https://storybook.orion-ds.dev)** - Interactive component stories

### Design Tokens

Orion uses a token-based system for consistency:

```css
/* Colors */
background: var(--surface-base);
color: var(--text-primary);

/* Spacing (base unit: 4px) */
padding: var(--spacing-4); /* 16px */
margin: var(--spacing-6); /* 24px */

/* Typography */
font-family: var(--font-secondary);
font-size: var(--font-size-base);

/* Radius */
border-radius: var(--radius-control);
```

See [https://docs.orion-ds.dev/tokens](https://docs.orion-ds.dev/tokens) for all available tokens.

## Styling Your App

Use CSS Modules and Orion tokens:

```css
/* Button.module.css */
.button {
  padding: var(--spacing-4);
  border-radius: var(--radius-control);
  background: var(--interactive-primary);
  color: var(--interactive-primary-text);
}
```

**Never hardcode colors or dimensions.** Use tokens for consistency across themes and brands.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository to [Vercel](https://vercel.com)
3. Deploy with one click!

```bash
# Or deploy from CLI
npm install -g vercel
vercel
```

### Other Platforms

This is a standard Next.js app—deploy to any platform that supports Node.js:

- **Netlify**: `netlify deploy`
- **AWS Amplify**: `amplify publish`
- **Docker**: Build with `npm run build && npm start`

## Troubleshooting

### Components look unstyled

Make sure `@orion-ds/react/styles.css` is imported in `layout.tsx`. Without it, components won't have styling.

### Theme doesn't persist

The theme persists via `localStorage`. Check browser DevTools → Application → Local Storage → `orion-theme` and `orion-brand`.

### Port 3000 is in use

Start on a different port:

```bash
npm run dev -- -p 3001
```

## Contributing

Found a bug or want to suggest a feature? Open an issue on the [Orion GitHub](https://github.com/orion-ds/orion).

## License

This template is MIT licensed. See the Orion Design System license for more details.

---

**Questions?** Check the [Orion Discord](https://discord.gg/orion) or open an issue on GitHub.
