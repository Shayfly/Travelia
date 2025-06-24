import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// "base" defines the root path for all assets. When deploying to GitHub
// Pages, set this to the repository name so paths resolve correctly.
// For example, if your repo is "Travelia" the site is served from
// https://<user>.github.io/Travelia and the base should be '/Travelia/'.
export default defineConfig({
  plugins: [react()],
  base: '/Travelia/',
});
