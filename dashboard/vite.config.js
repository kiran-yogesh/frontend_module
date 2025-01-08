import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
  },
  resolve: {
    alias: {
      'react-router-dom': require.resolve('react-router-dom'),
    },
  },
});
