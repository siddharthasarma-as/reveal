import { defineConfig } from 'vite';

export default defineConfig({
  // This site is served from the custom domain nesfic.assamstartup.org.
  // Root-relative assets are required for the custom-domain deployment.
  // when the page is opened without a trailing slash.
  base: '/',
  build: {
    outDir: process.env.APPDEPLOY_VITE_OUT_DIR || 'dist',
    sourcemap:
      process.env.APPDEPLOY_VITE_SOURCEMAP === 'hidden' ? 'hidden' : false,
    rollupOptions: {
      maxParallelFileOps: 128,
    },
  },
});
