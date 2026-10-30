import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import fs from 'node:fs';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/adarsh_portfolio/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        const indexHtml = path.resolve('docs/index.html');
        const fourOhFour = path.resolve('docs/404.html');
        if (fs.existsSync(indexHtml)) {
          fs.copyFileSync(indexHtml, fourOhFour);
        }
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}));
