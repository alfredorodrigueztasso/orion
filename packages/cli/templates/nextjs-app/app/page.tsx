"use client";

import { useState, useEffect } from "react";
import { Button, Card, Stack, Badge } from "@orion-ds/react";
import { Zap, Package, Palette, Moon, Sun } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [brand, setBrand] = useState<"orion" | "red" | "deepblue" | "orange">(
    "orion"
  );
  const [mounted, setMounted] = useState(false);

  // Initialize theme/brand from localStorage and document
  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem("orion-theme") as "light" | "dark" | null;
    const savedBrand = localStorage.getItem("orion-brand") as
      | "orion"
      | "red"
      | "deepblue"
      | "orange"
      | null;

    const initialTheme = savedTheme || "light";
    const initialBrand = savedBrand || "orion";

    setTheme(initialTheme);
    setBrand(initialBrand);

    // Apply to document
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.setAttribute("data-brand", initialBrand);
  }, []);

  // Persist and apply theme changes
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("orion-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Persist and apply brand changes
  const handleBrandChange = (newBrand: "orion" | "red" | "deepblue" | "orange") => {
    setBrand(newBrand);
    localStorage.setItem("orion-brand", newBrand);
    document.documentElement.setAttribute("data-brand", newBrand);
  };

  // Don't render interactive content until mounted (hydration safety)
  if (!mounted) {
    return null;
  }

  return (
    <main className={styles.container}>
      <Stack gap={6} align="center" justify="center">
        <div className={styles.header}>
          <h1>Welcome to Orion</h1>
          <p className={styles.subtitle}>
            Built with Next.js 15, TypeScript, and Orion Design System
          </p>
        </div>

        {/* Controls Card */}
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <h2>Customize Theme & Brand</h2>

            {/* Theme Toggle */}
            <div className={styles.controlGroup}>
              <label htmlFor="theme-select">Theme:</label>
              <div className={styles.buttonGroup}>
                <Button
                  variant={theme === "light" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleThemeChange("light")}
                  icon={<Sun size={16} />}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleThemeChange("dark")}
                  icon={<Moon size={16} />}
                >
                  Dark
                </Button>
              </div>
            </div>

            {/* Brand Selector */}
            <div className={styles.controlGroup}>
              <label htmlFor="brand-select">Brand:</label>
              <div className={styles.brandButtons}>
                {(["orion", "red", "deepblue", "orange"] as const).map((b) => (
                  <Button
                    key={b}
                    variant={brand === b ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => handleBrandChange(b)}
                  >
                    {b.charAt(0).toUpperCase() + b.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Features Card */}
        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <h2>Get Started</h2>

            <Stack gap={4}>
              <div className={styles.feature}>
                <Zap size={24} />
                <div>
                  <h3>Fast & Modern</h3>
                  <p>Next.js 15 with App Router and server components</p>
                </div>
              </div>

              <div className={styles.feature}>
                <Package size={24} />
                <div>
                  <h3>Add Components</h3>
                  <p>
                    Run <code>npx @orion-ds/cli add button card field</code>
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <Palette size={24} />
                <div>
                  <h3>Design System</h3>
                  <p>Built-in theme switching and brand support</p>
                </div>
              </div>
            </Stack>
          </div>
        </Card>

        {/* Call-to-Action Buttons */}
        <div className={styles.buttons}>
          <Button variant="primary" size="md">
            Get Started
          </Button>
          <Button variant="secondary" size="md">
            Learn More
          </Button>
        </div>

        {/* Tech Stack Badges */}
        <div className={styles.badges}>
          <Badge variant="success">Next.js 15</Badge>
          <Badge variant="primary">React 19</Badge>
          <Badge variant="info">TypeScript</Badge>
        </div>

        {/* Documentation Links */}
        <div className={styles.links}>
          <a href="https://docs.orion-ds.dev">Documentation</a>
          <span className={styles.separator}>•</span>
          <a href="https://github.com/orion-ds/orion">GitHub</a>
          <span className={styles.separator}>•</span>
          <a href="https://storybook.orion-ds.dev">Storybook</a>
        </div>
      </Stack>
    </main>
  );
}
