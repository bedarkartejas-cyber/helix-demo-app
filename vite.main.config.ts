import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
    rollupOptions: {
      // This tells Vite NOT to bundle the sqlite binary
      external: ['sql.js'],
    },
    
  },
});
