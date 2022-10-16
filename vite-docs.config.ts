import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/turn-to-chart/",
  plugins: [react()],
  build: {
    outDir: "dist-docs",
  },
});
