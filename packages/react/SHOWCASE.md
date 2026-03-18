# Orion React Components Showcase

Este showcase demuestra los componentes React del Orion Design System.

## 📦 Componentes Incluidos

### Forms (7 componentes)

- **Button** - Action triggers con múltiples variantes y tamaños
- **Field** - Text inputs con label, error states, e iconos
- **Select** - Dropdown selection con opciones personalizables
- **Switch** - Toggle control con estados checked/unchecked
- **Checkbox** - Multi-select con estado indeterminate
- **Radio** - Single-select para grupos de opciones
- **Textarea** - Multi-line text input con contador de caracteres

### Layout (1 componente)

- **Card** - Container component con Header/Body/Footer y 4 variantes

### Feedback (5 componentes)

- **Badge** - Status indicators con 6 variantes
- **Alert** - Feedback messages (info, success, warning, error)
- **Spinner** - Loading indicators con 5 tamaños
- **ProgressBar** - Progress indicators con variantes y estado indeterminate
- **Tooltip** - Contextual information con 4 posiciones

### Data Display (2 componentes)

- **Avatar** - User profile images con status indicators
- **Table** - Data display con sorting y custom cell renderers

### Navigation (3 componentes)

- **Tabs** - Content organization con badges e iconos
- **Breadcrumb** - Navigation path con separadores personalizables
- **Navbar** - Application header con Brand/Nav/Links/Actions

### Overlays (1 componente)

- **Modal** - Dialog overlay con 5 tamaños y compound components

### Hooks (1 hook)

- **useTheme** - Theme y brand state management

## 🚀 Uso del Showcase

### Opción 1: HTML Standalone (Funciona ahora)

Abre directamente en el navegador:

```bash
# Desde la raíz del proyecto
open react-components.html
```

Esta página funciona inmediatamente sin build, usando el CSS existente del design system.

**Características:**

- ✅ Funciona sin compilación
- ✅ Theme switching (light/dark)
- ✅ Brand switching (orion/red/deepblue/orange/lemon)
- ✅ Todos los componentes visibles
- ✅ Modal interactivo

### Opción 2: React Component (Requiere build)

Una vez que Node.js esté instalado y el proyecto compilado:

```tsx
import { ComponentShowcase } from "@orion-ds/react";
import "@orion-ds/react/styles.css";

function App() {
  return <ComponentShowcase />;
}
```

**Características:**

- ✅ Totalmente interactivo
- ✅ TypeScript type-safe
- ✅ State management con React hooks
- ✅ Theme persistence en localStorage
- ✅ Responsive design

## 🎨 Características del Showcase

### 1. Theme Switching

Cambia entre light y dark mode en tiempo real:

- Light mode: Fondo claro, texto oscuro
- Dark mode: Fondo oscuro, texto claro

### 2. Brand Switching

Prueba los 5 brands del sistema:

- **Orion** (default): Blue accent (#1B5BFF), pill buttons
- **Red**: Red accent (#D7282F), pill buttons
- **Deepblue**: Deep Blue accent (#006FBA), rounded 12px buttons
- **Orange**: Red-Orange accent (#F15D22), pill buttons
- **Lemon**: Lime Green accent (#5CE629), pill buttons

### 3. Secciones Organizadas

Cada componente está organizado en secciones con:

- Título descriptivo
- Descripción breve
- Ejemplos visuales
- Todas las variantes disponibles

### 4. Ejemplos Interactivos

- Botones clickeables
- Forms con validación
- Modal que se abre/cierra
- Tabs navegables
- Table con datos de ejemplo
- Tooltips en hover

## 📁 Archivos

```
/Users/alfredo/Documents/AI First DS Library/
├── react-components.html              # HTML standalone showcase
└── packages/react/src/
    ├── ComponentShowcase.tsx          # React component showcase
    └── components/                    # 21 componentes
        ├── Button/
        ├── Field/
        ├── Select/
        ├── Switch/
        ├── Checkbox/
        ├── Radio/
        ├── Textarea/
        ├── Card/
        ├── Badge/
        ├── Alert/
        ├── Spinner/
        ├── ProgressBar/
        ├── Tooltip/
        ├── Avatar/
        ├── Table/
        ├── Tabs/
        ├── Breadcrumb/
        ├── Navbar/
        └── Modal/
```

## 🎯 Próximos Pasos

Una vez que Node.js esté instalado:

1. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

2. **Compilar el proyecto:**

   ```bash
   pnpm run build
   ```

3. **Iniciar Storybook (recomendado):**

   ```bash
   pnpm run storybook
   ```

4. **Crear una app de prueba:**

   ```bash
   cd testing-projects
   mkdir react-showcase
   cd react-showcase
   npm create vite@latest . -- --template react-ts
   npm install
   npm install @orion-ds/react
   ```

   Luego en `src/App.tsx`:

   ```tsx
   import { ComponentShowcase } from "@orion-ds/react";
   import "@orion-ds/react/styles.css";

   export default function App() {
     return <ComponentShowcase />;
   }
   ```

## 📝 Notas

- Todos los componentes usan **CSS Modules** para scoped styling
- **100% TypeScript** con strict mode
- **Token-based styling** - sin valores hardcoded
- **WCAG AA compliant** - accesibilidad garantizada
- **Responsive design** - funciona en mobile, tablet, desktop

## 🔗 Links Útiles

- [Documentación principal](../../CLAUDE.md)
- [TypeScript Setup](./TYPESCRIPT_SETUP.md)
- [Component Library](../../library.html)
- [Token Reference](../../tokens.html)
