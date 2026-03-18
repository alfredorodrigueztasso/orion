# {{projectName}}

A modern React application built with **Vite**, **TypeScript**, and the **Orion Design System**.

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, pnpm, yarn, or bun

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

### Development & Building

- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Testing

- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Open interactive test UI
- `npm run test:coverage` - Generate coverage report
- `npm run e2e` - Run E2E tests with Playwright
- `npm run e2e:headed` - Run E2E tests with browser visible
- `npm run e2e:debug` - Debug E2E tests

### Storybook

- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build:storybook` - Build static Storybook

## Adding Components

Use the Orion CLI to add pre-built components to your project:

```bash
# Add individual components
npx @orion-ds/cli add button card modal

# Add with dependencies resolved automatically
npx @orion-ds/cli add theme-controller --yes

# View all available components
npx @orion-ds/cli list
```

Components will be copied to `src/components/orion/` and can be imported and customized freely.

## Configuration

### Orion CLI Config

See `orion.json` for configuration:

```json
{
  "componentDir": "src/components/orion",
  "sectionDir": "src/sections/orion",
  "templateDir": "src/templates/orion",
  "typescript": true,
  "brand": "orion",
  "mode": "product"
}
```

Edit `brand` to switch between: `orion`, `red`, `deepblue`, `orange`

Edit `mode` to switch between: `display`, `product`, `app`

### Vite Config

See `vite.config.ts` for customization:

- Change dev server port (currently 5173)
- Configure build options
- Add plugins as needed

## Project Structure

```
src/
├── App.tsx           # Main app component
├── App.module.css    # App styles
├── App.test.tsx      # Unit tests
├── main.tsx          # Entry point (renders App in ThemeProvider)
├── components/
│   └── orion/        # Orion components (added via CLI)
├── sections/
│   └── orion/        # Orion sections (added via CLI)
└── templates/
    └── orion/        # Orion templates (added via CLI)

e2e/
└── app.spec.ts       # Playwright E2E tests

public/
└── vite.svg          # Vite logo

.storybook/
├── main.ts           # Storybook config
└── preview.tsx       # Storybook preview settings

tsconfig.json         # TypeScript config
vite.config.ts        # Vite config
vitest.config.ts      # Vitest config
playwright.config.ts  # Playwright config
orion.json            # Orion CLI config
```

## Customization

### Brand & Theme

The entire design system (colors, spacing, typography) is controlled by CSS variables from Orion. Change the brand and theme globally:

**In React:**
```tsx
import { useThemeContext } from '@orion-ds/react';

function ThemeSwitcher() {
  const { brand, theme, setBrand, setTheme } = useThemeContext();
  return (
    <button onClick={() => setBrand('red')}>
      Switch to Red Brand
    </button>
  );
}
```

**In HTML:**
```html
<html data-brand="red" data-theme="dark">
  <!-- All Orion components automatically adapt -->
</html>
```

### Styling Components

Use semantic CSS variables instead of hardcoding colors:

```css
.button {
  background: var(--interactive-primary);
  color: var(--interactive-primary-text);
  padding: var(--spacing-4);
  border-radius: var(--radius-control);
}
```

See `src/App.module.css` for more examples.

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` directory ready for deployment.

### Deployment Targets

The built app can be deployed to:
- **Vercel** - `npm run build` → auto-deploy
- **Netlify** - Connect your repo → auto-deploy
- **AWS S3 + CloudFront** - `npm run build` → sync to S3
- **Docker** - Add Dockerfile, build and run image
- **Traditional hosting** - Upload `dist/` via SFTP

### Environment Variables

Create `.env` files for environment-specific variables:

```bash
# .env (used by all environments)
VITE_APP_TITLE=My App

# .env.local (local development, not committed)
VITE_API_URL=http://localhost:3000

# .env.production (production build)
VITE_API_URL=https://api.example.com
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance

### Bundle Analysis

```bash
npm run build
# Check dist/ size
ls -lah dist/
```

### Code Splitting

Vite automatically splits code for:
- `main.js` - App code
- `vendor.js` - React, Orion, Lucide
- Dynamic imports (lazy-loaded routes)

### Optimization Tips

1. Lazy load heavy components:
   ```tsx
   const HeavyChart = lazy(() => import('./HeavyChart'));
   ```

2. Use CSS Modules to avoid global style pollution

3. Remove unused dependencies from `package.json`

4. Monitor bundle size with `npm run build`

## Troubleshooting

### `npm install` fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Dev server won't start

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.ts
npm run dev
```

### TypeScript errors

```bash
# Regenerate types
npm run build
npx tsc --noEmit
```

### Tests fail

```bash
# Run with debug output
npm run test:ui

# Check for missing @testing-library/react
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

## Resources

- **Vite Documentation** - https://vitejs.dev
- **React Documentation** - https://react.dev
- **Orion Design System** - https://orion-ds.dev
- **Lucide Icons** - https://lucide.dev
- **Playwright Testing** - https://playwright.dev
- **Vitest** - https://vitest.dev

## License

MIT
