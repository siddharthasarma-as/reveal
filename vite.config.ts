import { defineConfig } from 'vite';

export default defineConfig({
  // This site is deployed as a GitHub Pages project site at /reveal/.
  // Using the project base prevents relative assets from escaping /reveal/
  // when the page is opened without a trailing slash.
  base: '/reveal/',
  build: {
    outDir: process.env.APPDEPLOY_VITE_OUT_DIR || 'dist',
    sourcemap:
      process.env.APPDEPLOY_VITE_SOURCEMAP === 'hidden' ? 'hidden' : false,
    rollupOptions: {
      maxParallelFileOps: 128,
    },
  },
});
