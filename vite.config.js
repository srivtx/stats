// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative base for GitHub Pages and static hosting
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 2500
  },
  server: {
    port: 3000,
    open: false
  }
});
