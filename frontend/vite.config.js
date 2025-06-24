import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// הגדרת base: שם הריפו שלך ב-GitHub Pages חייב להופיע כאן.
// לדוג' אם כתובת האתר היא https://shayfly.github.io/Travelia/ 
// ה-base חייב להיות '/Travelia/'

export default defineConfig({
  plugins: [react()],
  base: '/Travelia/',
});
