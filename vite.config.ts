
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Figma asset aliases
      'figma:asset/b44ff0945f7608181e4f96e0c81a89f6020d396d.png': path.resolve(__dirname, './src/assets/b44ff0945f7608181e4f96e0c81a89f6020d396d.png'),
      'figma:asset/86c5576817c3134e84e9e3e13ae008ce43b91a20.png': path.resolve(__dirname, './src/assets/86c5576817c3134e84e9e3e13ae008ce43b91a20.png'),
      'figma:asset/5edc8fadec1916876aec99a22e7aac197605adf0.png': path.resolve(__dirname, './src/assets/5edc8fadec1916876aec99a22e7aac197605adf0.png'),
      'figma:asset/5ed2fc73bc0cf8e7b0b23d5d0170638790da4e14.png': path.resolve(__dirname, './src/assets/5ed2fc73bc0cf8e7b0b23d5d0170638790da4e14.png'),
      'figma:asset/5c85f7a8e3cf8d3d6770343f0e610cccc1b8b458.png': path.resolve(__dirname, './src/assets/5c85f7a8e3cf8d3d6770343f0e610cccc1b8b458.png'),
      'figma:asset/597207a3c0bedf30ac0559a6a1d6c22122c6447a.png': path.resolve(__dirname, './src/assets/597207a3c0bedf30ac0559a6a1d6c22122c6447a.png'),
      'figma:asset/550026c56c20afe915106556cce015f40612d293.png': path.resolve(__dirname, './src/assets/550026c56c20afe915106556cce015f40612d293.png'),
      'figma:asset/13b3b36ddef5f54e8880780c6a716c62a10e21d6.png': path.resolve(__dirname, './src/assets/13b3b36ddef5f54e8880780c6a716c62a10e21d6.png'),
      // Path shorthand
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});