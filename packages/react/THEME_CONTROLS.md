# Theme & Brand Controls

Controles interactivos para cambiar theme (light/dark) y brand (Orion, Red, Deepblue, Orange, Lemon) en tiempo real.

## 🎨 Componente: ThemeController

El `ThemeController` es un componente React completo que proporciona controles visuales para:

- **Theme Toggle**: Cambiar entre light y dark mode
- **Brand Selector**: Seleccionar entre 5 brands diferentes
- **Settings Summary**: Mostrar configuración actual

### Uso Básico

```tsx
import { ThemeController } from "@orion/react";
import "@orion/core/theme.css";

function App() {
  return (
    <div>
      <ThemeController showBrandSelector showThemeToggle showSummary />
      {/* Tu contenido aquí */}
    </div>
  );
}
```

### Modo Compacto

Para una barra de herramientas o navbar:

```tsx
<ThemeController
  compact
  showBrandSelector
  showThemeToggle
  showSummary={false}
/>
```

### Con Callbacks

```tsx
<ThemeController
  onThemeChange={(theme) => {
    console.log("Theme changed to:", theme);
    // Guardar en analytics, localStorage, etc.
  }}
  onBrandChange={(brand) => {
    console.log("Brand changed to:", brand);
    // Enviar evento a analytics
  }}
/>
```

## 📋 Props

| Prop                | Type                     | Default | Description                             |
| ------------------- | ------------------------ | ------- | --------------------------------------- |
| `showBrandSelector` | `boolean`                | `true`  | Mostrar selector de brand               |
| `showThemeToggle`   | `boolean`                | `true`  | Mostrar toggle de theme                 |
| `showSummary`       | `boolean`                | `true`  | Mostrar resumen de configuración actual |
| `compact`           | `boolean`                | `false` | Modo compacto (horizontal layout)       |
| `className`         | `string`                 | -       | Clase CSS adicional                     |
| `onThemeChange`     | `(theme: Theme) => void` | -       | Callback cuando cambia el theme         |
| `onBrandChange`     | `(brand: Brand) => void` | -       | Callback cuando cambia el brand         |

## 🎯 Características

### 1. Theme Toggle

**Controles disponibles:**

- **Switch grande**: Toggle visual con iconos ☀️/🌙
- **Botones Light/Dark**: Botones discretos para selección directa
- **Badge de estado**: Muestra theme actual con color distintivo

**Comportamiento:**

- Cambia `data-theme` en `<html>`
- Persiste en localStorage automáticamente (vía useTheme hook)
- Transiciones suaves entre themes
- Iconos animados

### 2. Brand Selector

**5 Brands disponibles:**

| Brand        | Accent Color           | Button Radius             | Container Radius         | Description                              |
| ------------ | ---------------------- | ------------------------- | ------------------------ | ---------------------------------------- |
| **Orion**    | `#1B5BFF` (Blue)       | `var(--radius-full)` pill | `var(--radius-3xl)` 36px | Brand por defecto, moderno y profesional |
| **Red**      | `#D7282F` (Red)        | `var(--radius-full)` pill | `var(--radius-3xl)` 36px | Poppins typography, pill buttons         |
| **Deepblue** | `#006FBA` (Deep Blue)  | `var(--radius-md)` 12px   | `var(--radius-xl)` 24px  | Work Sans typography, rounded buttons    |
| **Orange**   | `#F15D22` (Red-Orange) | `var(--radius-full)` pill | `var(--radius-3xl)` 36px | DM Sans typography, pill buttons         |
| **Lemon**    | `#5CE629` (Lime Green) | `var(--radius-full)` pill | `var(--radius-3xl)` 36px | Anton display font, pill buttons         |

> **Nota:** Container radius se deriva automaticamente del button radius via `radiusScale` en `primary.json`. No se configura manualmente.

**Interacción:**

- **Cards clickeables**: Cada brand es una tarjeta completa clickeable
- **Radio buttons**: Integrados en cada card
- **Badge "Active"**: Muestra qué brand está activo
- **Hover effects**: Animación sutil al pasar el mouse
- **Highlight visual**: Card seleccionado usa `--interactive-primary`

### 3. Settings Summary

Alert informativo que muestra:

- Theme actual (light/dark)
- Brand actual
- Color accent del brand
- Border radius del brand

Útil para debugging y confirmación visual.

## 🎨 Ejemplo Visual (Modo Normal)

```
┌─────────────────────────────────────────────────────────────┐
│ 🎨 Theme & Brand Settings                                   │
│    Customize the appearance in real-time                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Color Mode                                   [☀️ Light]     │
│ Switch between light and dark themes                        │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │  ☀️  [====●] 🌙        [Light] [Dark]               │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ Brand Identity                                               │
│ Select a brand to see different accent colors               │
│                                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │ ◉ Orion  │ │ ○ Red    │ │ ○ Deep.. │ │ ○ Orange │ │ ○ Lemon  ││
│ │ [Active] │ │          │ │          │ │          │ │          ││
│ │ Blue •   │ │ Red •    │ │ Blue •   │ │ Orange • │ │ Green •  ││
│ │ Pills    │ │ Pills    │ │ 12px     │ │ Pills    │ │ Pills    ││
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                                                                   │
│ ℹ️ Current Settings                                               │
│ [Theme: light] [Brand: orion] [Accent: #1B5BFF]                 │
│ [Radius: pill]                                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Ejemplo Visual (Modo Compacto)

```
☀️ [===●] 🌙  [Orion] [Red] [Deepblue] [Orange] [Lemon]
```

## 🔧 Integración con useTheme Hook

El ThemeController usa internamente el hook `useTheme`:

```tsx
const { theme, brand, setTheme, setBrand, toggleTheme, isDark } = useTheme();
```

**Características del hook:**

- ✅ **Persistence**: Guarda en localStorage
- ✅ **System preference**: Detecta `prefers-color-scheme`
- ✅ **SSR safe**: No rompe en server-side rendering
- ✅ **Type-safe**: TypeScript strict mode

## 📱 Responsive Design

**Desktop:**

- Cards de brand en grid 5-columnas
- Controles amplios y espaciados
- Todos los elementos visibles

**Tablet (768px):**

- Cards de brand en grid 2-columnas
- Mantiene legibilidad

**Mobile (<768px):**

- Cards de brand en single column
- Controles apilados verticalmente
- Touch-friendly (44px minimum tap targets)

## 🎭 Casos de Uso

### 1. Demo/Showcase Pages

```tsx
<ComponentShowcase />
```

Muestra todos los componentes con ThemeController integrado.

### 2. Settings Page

```tsx
<Card>
  <Card.Header>Appearance Settings</Card.Header>
  <Card.Body>
    <ThemeController />
  </Card.Body>
</Card>
```

### 3. Navbar Integration

```tsx
<Navbar>
  <Navbar.Brand>Logo</Navbar.Brand>
  <Navbar.Nav>...</Navbar.Nav>
  <Navbar.Actions>
    <ThemeController compact showSummary={false} />
  </Navbar.Actions>
</Navbar>
```

### 4. Quick Settings Dropdown

```tsx
<Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
  <Modal.Header>Quick Settings</Modal.Header>
  <Modal.Body>
    <ThemeController showSummary={false} />
  </Modal.Body>
</Modal>
```

## 🚀 Página HTML Standalone

También incluye `react-components.html` que funciona sin compilación:

```bash
open react-components.html
```

**Características de la página HTML:**

- ✅ Funciona sin Node.js
- ✅ Theme switching funcional
- ✅ Brand switching funcional
- ✅ Todos los 21 componentes visibles
- ✅ State management en vanilla JS
- ✅ Animaciones y transiciones
- ✅ Completamente interactivo

## 📦 Componentes Usados Internamente

El ThemeController usa estos componentes del design system:

- **Card**: Container principal
- **Switch**: Toggle light/dark
- **Radio**: Selector de brand
- **Button**: Botones Light/Dark
- **Badge**: Indicadores de estado
- **Alert**: Resumen de configuración

Todos estos componentes respetan el theme y brand actual.

## 🎨 Personalización

### Estilos Custom

```tsx
<ThemeController
  style={{
    marginBottom: "var(--spacing-6)",
    borderRadius: "var(--radius-container)",
  }}
  className="my-custom-theme-controller"
/>
```

### Ocultar Secciones

```tsx
// Solo theme toggle
<ThemeController
  showBrandSelector={false}
  showSummary={false}
/>

// Solo brand selector
<ThemeController
  showThemeToggle={false}
  showSummary={false}
/>
```

## 🔗 Referencias

- [useTheme Hook Documentation](./hooks/README.md)
- [Theme System Overview](../../CLAUDE.md#theme-switching)
- [Brand Configuration](../../tokens/brands.json)
- [ComponentShowcase.tsx](./src/ComponentShowcase.tsx)

## ✨ Próximas Mejoras

Potenciales mejoras futuras:

- [ ] Keyboard shortcuts (Ctrl+Shift+T para toggle theme)
- [ ] Animated transitions entre brands
- [ ] Color picker para custom accent colors
- [ ] Export/Import theme settings
- [ ] Theme presets (High Contrast, Colorblind-friendly)
- [ ] Integration con OS theme (macOS Dynamic Desktop)
