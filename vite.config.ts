import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "./", // ✅ Use relative paths for assets to avoid 404 on Render
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger() // Only use componentTagger in dev
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // 🔹 increase warning limit for large bundles
    outDir: "dist",              // ✅ Ensure build output is in dist
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor code into separate chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}));
