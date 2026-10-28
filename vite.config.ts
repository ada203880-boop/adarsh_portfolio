import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import fs from 'node:fs';

export default defineConfig({
  base: '/adarsh_portfolio/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'sync-dist-to-docs',
      closeBundle() {
        try {
          if (fs.existsSync('dist')) {
            fs.cpSync('dist', 'docs', { recursive: true });
            if (fs.existsSync('docs/index.html')) {
              fs.copyFileSync('docs/index.html', 'docs/404.html');
            }
          }
        } catch {
          // ignore copy errors
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
