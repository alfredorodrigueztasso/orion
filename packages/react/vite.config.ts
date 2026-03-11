import { defineConfig } from "vite";
import path from "path";
import { createViteConfig } from "../../vite.shared.config";

export default defineConfig(
  createViteConfig({
    entry: path.resolve(__dirname, "src/index.ts"),
    name: "OrionReact",
    resolveAlias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }),
);
