import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
    },
  },
});
