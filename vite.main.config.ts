import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      // Add 'sql.js' back here to fix the crash
      external: ['sqlite3', 'sql.js'], 
    },
  },
  resolve: {
    alias: {
      'sql.js': 'sql.js',
    },
  },
});