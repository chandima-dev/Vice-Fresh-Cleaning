import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      // Workaround: cast the whole terserOptions object to 'any'
      ...( {
        compress: { drop_console: true, drop_debugger: true },
        format: { comments: false },
      } as any ),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
  define: {
    'process.env': {},
  },
});