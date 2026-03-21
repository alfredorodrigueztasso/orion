import { defineConfig } from "vite";
import path from "path";
import { createViteConfig } from "../../vite.shared.config";

export default defineConfig(
  createViteConfig({
    entry: {
      index: path.resolve(__dirname, "src/index.ts"),
      client: path.resolve(__dirname, "src/client.ts"),
      "tokens/index": path.resolve(__dirname, "src/tokens/index.ts"),
      "blocks/index": path.resolve(__dirname, "src/blocks/index.ts"),
      // Heavy component entry points (optional peer dependencies)
      chart: path.resolve(__dirname, "src/chart.ts"),
      calendar: path.resolve(__dirname, "src/calendar.ts"),
      editor: path.resolve(__dirname, "src/editor.ts"),
      dnd: path.resolve(__dirname, "src/dnd.ts"),
      rich: path.resolve(__dirname, "src/rich.ts"),
    },
    name: "OrionReact",
    resolveAlias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }),
);
