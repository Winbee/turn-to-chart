import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/library/main.ts"),
      name: "TurnToChart",
      // the proper extensions will be added
      fileName: "turn-to-chart",
    },
  },
});
