# FontLoader

Automatically injects Google Fonts into the document head. Ensures brand fonts are available without manual HTML setup.

## Important Note

**Since v1.1.4, ThemeProvider includes FontLoader automatically.**

You don't need to add this component manually unless you've disabled auto font loading.

```tsx
// Fonts load automatically - no FontLoader needed!
<ThemeProvider>
  <App />
</ThemeProvider>
```

## Props

| Prop               | Type                     | Default | Description                              |
| ------------------ | ------------------------ | ------- | ---------------------------------------- |
| `onLoad`           | `() => void`             | -       | Callback when fonts loaded               |
| `onError`          | `(error: Error) => void` | -       | Callback on load failure                 |
| `showLoadingState` | `boolean`                | `false` | Wait for fonts before rendering children |
| `loadingComponent` | `ReactNode`              | -       | Custom loading component                 |
| `children`         | `ReactNode`              | -       | Content to render                        |

## Usage

### Automatic (Recommended)

Fonts load automatically with ThemeProvider:

```tsx
import { ThemeProvider } from "@orion/react";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Disable Auto-Loading

If you manage fonts manually (e.g., via HTML, Next.js font optimization, or a different CDN):

```tsx
<ThemeProvider disableAutoFontLoading>
  <App />
</ThemeProvider>
```

**When to disable:**

- Using Next.js `next/font` for optimization
- Self-hosting fonts for privacy/performance
- Corporate environments blocking Google Fonts
- Using a different font CDN

### Disable Font Warnings

If fonts are loaded elsewhere and you want to suppress console warnings:

```tsx
<ThemeProvider disableFontWarnings>
  <App />
</ThemeProvider>
```

### Standalone with Callbacks

Only needed for custom loading behavior:

```tsx
import { FontLoader } from "@orion/react";

<FontLoader
  onLoad={() => console.log("Fonts ready!")}
  onError={(error) => console.error("Font load failed:", error)}
/>;
```

### With Loading State

Wait for fonts before showing content (prevents FOUT):

```tsx
<FontLoader showLoadingState loadingComponent={<Spinner />}>
  <App />
</FontLoader>
```

### Check Font Status

Track font loading state for conditional rendering:

```tsx
function App() {
  const [fontsReady, setFontsReady] = useState(false);

  return (
    <FontLoader onLoad={() => setFontsReady(true)}>
      {fontsReady ? <HeroSection /> : <HeroSkeleton />}
    </FontLoader>
  );
}
```

## Fonts Loaded

The FontLoader injects the following Google Fonts:

| Font                  | CSS Variable       | Usage     |
| --------------------- | ------------------ | --------- |
| **Libre Baskerville** | `--font-primary`   | Headings  |
| **DM Sans**           | `--font-secondary` | Body text |
| **JetBrains Mono**    | `--font-mono`      | Code      |

### Font Weights

- **Libre Baskerville:** 400 (regular), 700 (bold)
- **DM Sans:** 400 (regular), 500 (medium), 700 (bold)
- **JetBrains Mono:** 400 (regular), 500 (medium), 700 (bold)

## Fallback Fonts

When Google Fonts are unavailable (slow network, blocked, loading), the system uses these fallbacks:

| Variable           | Primary Font      | Fallback Stack                                                    |
| ------------------ | ----------------- | ----------------------------------------------------------------- |
| `--font-primary`   | Libre Baskerville | Georgia, "Times New Roman", serif                                 |
| `--font-secondary` | DM Sans           | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif |
| `--font-mono`      | JetBrains Mono    | "SF Mono", Monaco, Consolas, monospace                            |

**Fallback behavior:**

1. System fonts display immediately (no blank text)
2. Google Fonts load in background
3. Text updates once fonts ready (`font-display: swap`)
4. No layout shift (fallbacks match x-height)

## How It Works

1. Adds preconnect links for faster loading
2. Injects Google Fonts stylesheet
3. Waits for fonts to be ready (using Font Loading API)
4. Calls `onLoad` when complete

```html
<!-- Injected into <head> -->
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
  data-orion-fonts="preconnect"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
  data-orion-fonts="preconnect"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=..."
  data-orion-fonts="stylesheet"
/>
```

## Manual Font Loading

If you prefer to load fonts manually in HTML:

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</head>
```

Then disable auto-loading:

```tsx
<ThemeProvider disableAutoFontLoading>
  <App />
</ThemeProvider>
```

## SSR & Framework Integration

### Next.js (App Router)

For optimal performance with Next.js, use `next/font`:

```tsx
// app/layout.tsx
import { Libre_Baskerville, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@orion/react";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-primary",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-secondary",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider disableAutoFontLoading>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

Load fonts in `_document.tsx`:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Then in `_app.tsx`:

```tsx
// pages/_app.tsx
import { ThemeProvider } from "@orion/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider disableAutoFontLoading>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Remix

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { ThemeProvider } from "@orion/react";

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
    },
  ];
}

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider disableAutoFontLoading>
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Vite (Default)

Vite apps can use the automatic loading (default):

```tsx
// main.tsx
import { ThemeProvider } from "@orion/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

## Self-Hosting Fonts

For privacy or performance, self-host the fonts:

1. Download fonts from [Google Fonts](https://fonts.google.com)
2. Add to your project (e.g., `/public/fonts/`)
3. Create a CSS file:

```css
/* fonts.css */
@font-face {
  font-family: "Libre Baskerville";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/libre-baskerville-400.woff2") format("woff2");
}

@font-face {
  font-family: "Libre Baskerville";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/libre-baskerville-700.woff2") format("woff2");
}

/* ... repeat for DM Sans and JetBrains Mono */
```

4. Import and disable auto-loading:

```tsx
import "./fonts.css";

<ThemeProvider disableAutoFontLoading>
  <App />
</ThemeProvider>;
```

## Troubleshooting

### Fonts Not Loading

1. Check network connectivity
2. Verify Google Fonts isn't blocked (corporate firewalls, ad blockers)
3. Check browser console for errors
4. Try manual loading in HTML
5. Verify `disableAutoFontLoading` isn't accidentally set

### FOUT (Flash of Unstyled Text)

Use `showLoadingState` to prevent content flash:

```tsx
<FontLoader showLoadingState loadingComponent={<PageSkeleton />}>
  <App />
</FontLoader>
```

Or use a CSS approach:

```css
/* Hide text until fonts load */
.fonts-loading body {
  visibility: hidden;
}

.fonts-loaded body {
  visibility: visible;
}
```

### Fonts Load but Look Wrong

1. Ensure CSS variables are used (`var(--font-primary)`, not `font-family: Libre Baskerville`)
2. Check that `theme.css` or `@orion/react/styles.css` is imported
3. Verify the font weights match (400, 500, 700)

### Google Fonts Blocked

Some environments (China, corporate networks) block Google Fonts. Options:

1. Self-host fonts (see above)
2. Use a mirror CDN
3. Provide fallback experience with system fonts

## Tokens Used

Fonts are applied via CSS variables:

- `--font-primary` - Libre Baskerville (headings)
- `--font-secondary` - DM Sans (body)
- `--font-mono` - JetBrains Mono (code)
