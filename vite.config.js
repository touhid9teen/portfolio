import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repoBase = "/portfolio/";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this repo under /portfolio/ in production builds.
  base: mode === "production" ? repoBase : "/",
  plugins: [react(), tailwindcss()],
}));
