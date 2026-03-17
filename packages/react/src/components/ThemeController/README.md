# ThemeController

UI component for switching themes and brands. Used for testing, documentation, or user preferences.

## Props

| Prop                | Type                     | Default | Description            |
| ------------------- | ------------------------ | ------- | ---------------------- |
| `showBrandSelector` | `boolean`                | `true`  | Show brand dropdown    |
| `showThemeToggle`   | `boolean`                | `true`  | Show light/dark toggle |
| `showSummary`       | `boolean`                | `true`  | Show current settings  |
| `compact`           | `boolean`                | `false` | Horizontal layout      |
| `className`         | `string`                 | -       | Additional CSS class   |
| `style`             | `CSSProperties`          | -       | Inline styles          |
| `onThemeChange`     | `(theme: Theme) => void` | -       | Theme change callback  |
| `onBrandChange`     | `(brand: Brand) => void` | -       | Brand change callback  |

## Usage

### Basic

```tsx
import { ThemeController } from "@orion/react";

<ThemeController />;
```

### Theme Toggle Only

```tsx
<ThemeController showBrandSelector={false} showSummary={false} />
```

### Brand Selector Only

```tsx
<ThemeController showThemeToggle={false} showSummary={false} />
```

### Compact Mode

```tsx
<ThemeController compact />
```

### With Callbacks

```tsx
<ThemeController
  onThemeChange={(theme) => {
    console.log("Theme changed to:", theme);
    analytics.track("theme_changed", { theme });
  }}
  onBrandChange={(brand) => {
    console.log("Brand changed to:", brand);
    analytics.track("brand_changed", { brand });
  }}
/>
```

### In Settings Page

```tsx
function SettingsPage() {
  return (
    <div className="settings">
      <h2>Appearance</h2>
      <ThemeController />
    </div>
  );
}
```

### Floating Controller (Development)

```tsx
function DevTools() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <ThemeController compact />
    </div>
  );
}
```

### In Storybook/Docs

```tsx
// Used in documentation to let users preview components in different themes
function ComponentPreview({ children }) {
  return (
    <div>
      <ThemeController compact />
      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  );
}
```

## Available Options

### Themes

- `light` - Light mode
- `dark` - Dark mode

### Brands

- `orion` - Default (blue accent)
- `red` - Red accent with pill buttons
- `deepblue` - Deep blue accent
- `orange` - Orange accent with pill buttons

## Internal Usage

ThemeController uses `useThemeContext()` internally:

```tsx
import { useThemeContext } from "@orion/react";

function CustomThemeUI() {
  const { theme, brand, setTheme, setBrand } = useThemeContext();

  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="orion">Orion</option>
        <option value="red">Red</option>
        <option value="deepblue">Deep Blue</option>
        <option value="orange">Orange</option>
      </select>
    </div>
  );
}
```

## Note

This component requires `ThemeProvider` to be present in the component tree:

```tsx
import { ThemeProvider, ThemeController } from "@orion/react";

function App() {
  return (
    <ThemeProvider>
      <ThemeController />
      <YourApp />
    </ThemeProvider>
  );
}
```

## Tokens Used

- `--surface-base` - Background
- `--border-subtle` - Border
- `--text-primary` - Label text
- `--text-secondary` - Summary text
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius
