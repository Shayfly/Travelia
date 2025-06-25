import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// base configuration:
// For GitHub Pages, set VITE_BASE_URL in `.env` to your repo name,
// e.g. `/Travelia/`. For Vercel or any root domain deployment,
// leave it unset so the base defaults to `/`.

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Use VITE_BASE_URL from the environment or fall back to root ("/")
    base: env.VITE_BASE_URL || '/',
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
});
