import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [solid()],
  base: "",
  build: {
    rollupOptions: {
      input: ["./index.html"],
      output: {
        chunkFileNames: `assets/[name].js`,
        entryFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  esbuild: {},
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
