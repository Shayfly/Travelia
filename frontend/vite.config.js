import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Use a fixed base for GitHub Pages

export default defineConfig(() => {
  return {
    plugins: [react()],
    // GitHub Pages deployment under /Travelia/
    base: '/Travelia/',
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
});
