import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Use VITE_BASE_URL to control the base path in production.
    // For GitHub Pages set it to "/your-repo-name/".
    base: env.VITE_BASE_URL || '/',
  };
});
