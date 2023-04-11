import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        // devでのホスティングは https://localhost:5173/src/loaders/[name].js
        // previewでのホスティングは https://localhost:4173/[name].js
        address: 'src/apps/address/index.ts',
        customer: 'src/apps/customer/index.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        inlineDynamicImports: false,
      },
    },
  },
  plugins: [basicSsl()],
}
