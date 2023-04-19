import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        // devでのホスティングは https://localhost:5173/src/loaders/[name].js
        // previewでのホスティングは https://localhost:4173/[name].js
        config: 'src/config/index.ts',
        app: 'src/app/index.ts',
      },
      output: {
        dir: 'plugin/js',
        entryFileNames: '[name].js',
        inlineDynamicImports: false,
      },
    },
  },
  plugins: [basicSsl()],
}
