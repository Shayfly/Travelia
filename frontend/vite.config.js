import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

codex/generate-production-ready-vite-config-for-react-+-tailwind
// https://vitejs.dev/config/
// "base" defines the root path for all assets. When deploying to GitHub
// Pages, set this to the repository name so paths resolve correctly.
// For example, if your repo is "Travelia" the site is served from
// https://<user>.github.io/Travelia and the base should be '/Travelia/'.
export default defineConfig({
  plugins: [react()],
  base: '/Travelia/',
=======
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Use VITE_BASE_URL to control the base path in production.
    // For GitHub Pages set it to "/your-repo-name/".
    base: env.VITE_BASE_URL || '/',
  };
 main
});
