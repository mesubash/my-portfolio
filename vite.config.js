import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/my-portfolio/' to '/' for custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});