import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/greenlink/',   // 🔴 repo name (must match GitHub repo)

  plugins: [react()],
});
