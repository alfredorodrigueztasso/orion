import type { Preview } from "@storybook/react";
import React from "react";
import "../assets/theme.css";
import "@orion-ds/react/styles.css";
// Fonts are loaded via preview-head.html for iframe support
// CSS modules are imported directly with each component

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "var(--surface-base)",
        },
        {
          name: "dark",
          value: "var(--surface-base)",
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (iPhone 12)",
          styles: {
            width: "390px",
            height: "844px",
          },
          type: "mobile",
        },
        tablet: {
          name: "Tablet (iPad)",
          styles: {
            width: "768px",
            height: "1024px",
          },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1440px)",
          styles: {
            width: "1440px",
            height: "900px",
          },
          type: "desktop",
        },
        ultrawide: {
          name: "Ultrawide (2560px)",
          styles: {
            width: "2560px",
            height: "1440px",
          },
          type: "desktop",
        },
      },
    },
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Icons",
          "Components",
          "Sections",
          "Templates",
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Brand theme",
      defaultValue: "orion",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "orion", title: "Orion" },
          { value: "deepblue", title: "Deepblue" },
          { value: "red", title: "Red" },
          { value: "orange", title: "Orange" },
          { value: "ember", title: "Ember" },
          { value: "lemon", title: "Lemon" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Visual mode (display, product, app)",
      defaultValue: "display",
      toolbar: {
        title: "Mode",
        icon: "browser",
        items: [
          { value: "display", title: "Display (Marketing)" },
          { value: "product", title: "Product (SaaS)" },
          { value: "app", title: "App (Mobile)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, brand, mode } = context.globals;

      // Update theme, brand, and mode on document
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-brand", brand);
        document.documentElement.setAttribute("data-mode", mode);
        // Set body background to surface-subtle so cards (surface-base) stand out
        document.body.style.backgroundColor = "var(--surface-subtle)";
      }

      return React.createElement(Story);
    },
  ],
};

export default preview;
