import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      includePublic: true,
      logStats: true,
      png: { quality: 85 },
      jpeg: { quality: 82 },
      jpg: { quality: 82 },
      webp: { lossless: false, quality: 82 },
      exclude: /\.(mp4|webm|mov)$/i,
    }),
    mode === "production" && visualizer({ filename: "dist/stats.html", open: false, gzipSize: true }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-router": ["react-router-dom"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-accordion",
            "@radix-ui/react-switch",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
