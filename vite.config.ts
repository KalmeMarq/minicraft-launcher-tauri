import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import { join } from 'path';

export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@frontend': join(__dirname, 'src'),
    },
  },
});
