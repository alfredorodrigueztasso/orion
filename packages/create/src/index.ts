#!/usr/bin/env node
/**
 * @orion-ds/create — CLI to scaffold a new Orion project
 *
 * Usage:
 *   npx @orion-ds/create my-app
 *   npx @orion-ds/create my-app --brand=orion --mode=product --theme=dark
 *
 * Flags:
 *   --brand    Brand preset (orion | unitec | laureate | uvm)      [default: orion]
 *   --mode     UI mode (display | product | app)                    [default: product]
 *   --theme    Default theme (light | dark)                         [default: light]
 *   --ts       Use TypeScript (default)
 *   --help     Show help
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";

// ============================================================================
// CLI argument parsing (zero dependencies)
// ============================================================================

interface Options {
  projectName: string;
  brand: string;
  mode: string;
  theme: string;
}

function parseArgs(): Options | null {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    console.log(`
  @orion-ds/create — Scaffold a new Orion Design System project

  Usage:
    npx @orion-ds/create <project-name> [options]

  Options:
    --brand=<brand>   Brand preset: orion, unitec, laureate, uvm  [default: orion]
    --mode=<mode>     UI mode: display, product, app              [default: product]
    --theme=<theme>   Default theme: light, dark                  [default: light]
    --help            Show this help message

  Examples:
    npx @orion-ds/create my-app
    npx @orion-ds/create dashboard --brand=orion --mode=product --theme=dark
    npx @orion-ds/create landing-page --mode=display
`);
    return null;
  }

  const projectName = args.find((a) => !a.startsWith("--")) || "my-orion-app";
  const getFlag = (name: string, def: string): string => {
    const flag = args.find((a) => a.startsWith(`--${name}=`));
    return flag ? flag.split("=")[1]! : def;
  };

  return {
    projectName,
    brand: getFlag("brand", "orion"),
    mode: getFlag("mode", "product"),
    theme: getFlag("theme", "light"),
  };
}

// ============================================================================
// Template files
// ============================================================================

function generatePackageJson(name: string): string {
  return JSON.stringify(
    {
      name,
      private: true,
      version: "0.1.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        preview: "vite preview",
      },
      dependencies: {
        "@orion-ds/react": "^4.6.2",
        "lucide-react": "^0.400.0",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        "@vitejs/plugin-react": "^4.0.0",
        typescript: "^5.6.0",
        vite: "^6.0.0",
      },
    },
    null,
    2,
  );
}

function generateViteConfig(): string {
  return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;
}

function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: "force",
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,
      },
      include: ["src"],
    },
    null,
    2,
  );
}

function generateIndexHtml(name: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function generateMain(opts: Options): string {
  return `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@orion-ds/react'
import '@orion-ds/react/styles.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="${opts.theme}" defaultBrand="${opts.brand}">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
`;
}

function generateApp(opts: Options): string {
  if (opts.mode === "display") {
    return generateDisplayApp();
  } else if (opts.mode === "app") {
    return generateMobileApp();
  }
  return generateProductApp();
}

function generateProductApp(): string {
  return `import { Card, Button, Field, Badge, useThemeContext } from '@orion-ds/react'
import { BarChart3, Users, TrendingUp, Settings, Sun, Moon } from 'lucide-react'

export function App() {
  const { theme, setTheme } = useThemeContext()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--text-title-lg)' }}>
          Dashboard
        </h1>
        <Button
          variant="ghost"
          iconOnly
          icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <Users size={18} />
              <span style={{ color: 'var(--text-secondary)' }}>Users</span>
            </div>
            <div style={{ fontSize: 'var(--text-title-lg)', fontWeight: 700 }}>2,847</div>
            <Badge variant="success" size="sm">+12.5%</Badge>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <TrendingUp size={18} />
              <span style={{ color: 'var(--text-secondary)' }}>Revenue</span>
            </div>
            <div style={{ fontSize: 'var(--text-title-lg)', fontWeight: 700 }}>$48.2K</div>
            <Badge variant="success" size="sm">+8.1%</Badge>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
              <BarChart3 size={18} />
              <span style={{ color: 'var(--text-secondary)' }}>Conversions</span>
            </div>
            <div style={{ fontSize: 'var(--text-title-lg)', fontWeight: 700 }}>3.2%</div>
            <Badge variant="warning" size="sm">-0.4%</Badge>
          </Card.Body>
        </Card>
      </div>

      <Card>
        <Card.Header>Quick Actions</Card.Header>
        <Card.Body>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Button variant="primary" icon={<Users size={20} />}>Add User</Button>
            <Button variant="secondary" icon={<BarChart3 size={20} />}>View Reports</Button>
            <Button variant="ghost" icon={<Settings size={20} />}>Settings</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
`;
}

function generateDisplayApp(): string {
  return `import { Button, useThemeContext } from '@orion-ds/react'
import { ArrowRight, Sun, Moon } from 'lucide-react'

export function App() {
  const { theme, setTheme } = useThemeContext()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-8)', textAlign: 'center' }}>
      <Button
        variant="ghost"
        iconOnly
        icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme"
        style={{ position: 'absolute', top: 'var(--spacing-4)', right: 'var(--spacing-4)' }}
      />

      <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: 'var(--spacing-4)', maxWidth: '700px' }}>
        Build beautiful interfaces with Orion
      </h1>

      <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: 'var(--spacing-8)' }}>
        An AI-first design system that eliminates visual drift through token governance.
      </p>

      <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
        <Button variant="primary" size="lg" iconRight={<ArrowRight size={20} />}>
          Get Started
        </Button>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  )
}
`;
}

function generateMobileApp(): string {
  return `import { Card, Button, Field, useThemeContext } from '@orion-ds/react'
import { Search, Home, User, Settings, Sun, Moon } from 'lucide-react'

export function App() {
  const { theme, setTheme } = useThemeContext()

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App Header */}
      <div style={{ padding: 'var(--spacing-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--text-title-md)' }}>
          My App
        </h1>
        <Button
          variant="ghost"
          iconOnly
          icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Field
          leftIcon={<Search size={18} />}
          placeholder="Search..."
          aria-label="Search"
        />

        <Card interactive>
          <Card.Body>
            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Welcome back!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Start building your app with Orion components.</p>
          </Card.Body>
        </Card>

        <Button variant="primary" fullWidth>Get Started</Button>
      </div>

      {/* Bottom Nav */}
      <div style={{ padding: 'var(--spacing-3)', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-subtle)' }}>
        <Button variant="ghost" iconOnly icon={<Home size={22} />} aria-label="Home" />
        <Button variant="ghost" iconOnly icon={<Search size={22} />} aria-label="Search" />
        <Button variant="ghost" iconOnly icon={<User size={22} />} aria-label="Profile" />
        <Button variant="ghost" iconOnly icon={<Settings size={22} />} aria-label="Settings" />
      </div>
    </div>
  )
}
`;
}

function generateViteEnv(): string {
  return `/// <reference types="vite/client" />
`;
}

// ============================================================================
// Main
// ============================================================================

function main() {
  const opts = parseArgs();
  if (!opts) return;

  const projectDir = path.resolve(process.cwd(), opts.projectName);

  if (fs.existsSync(projectDir)) {
    console.error(
      `\n  Error: Directory "${opts.projectName}" already exists.\n`,
    );
    process.exit(1);
  }

  console.log(`\n  Creating Orion project: ${opts.projectName}`);
  console.log(
    `  Brand: ${opts.brand} | Mode: ${opts.mode} | Theme: ${opts.theme}\n`,
  );

  // Create project structure
  fs.mkdirSync(path.join(projectDir, "src"), { recursive: true });
  fs.mkdirSync(path.join(projectDir, "public"), { recursive: true });

  // Write files
  const files: Record<string, string> = {
    "package.json": generatePackageJson(opts.projectName),
    "vite.config.ts": generateViteConfig(),
    "tsconfig.json": generateTsConfig(),
    "index.html": generateIndexHtml(opts.projectName),
    "src/main.tsx": generateMain(opts),
    "src/App.tsx": generateApp(opts),
    "src/vite-env.d.ts": generateViteEnv(),
  };

  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(projectDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`  Created ${filePath}`);
  }

  // Install dependencies
  console.log("\n  Installing dependencies...\n");
  try {
    execSync("npm install", { cwd: projectDir, stdio: "inherit" });
  } catch {
    console.log(
      "\n  Warning: npm install failed. Run it manually after cd-ing into the project.\n",
    );
  }

  console.log(`
  Done! Your Orion project is ready.

  Next steps:
    cd ${opts.projectName}
    npm run dev

  Available commands:
    npm run dev      — Start development server
    npm run build    — Build for production
    npm run preview  — Preview production build

  Learn more:
    Components: https://orion-ds.dev/library.html
    Tokens:     https://orion-ds.dev/tokens.html
`);
}

main();
