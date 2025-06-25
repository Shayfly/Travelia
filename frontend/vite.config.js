import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// When deploying to Vercel, the site is served from the domain root so the
// base path should be '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
