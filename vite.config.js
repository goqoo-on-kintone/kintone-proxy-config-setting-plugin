import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        // ホスティングは https://localhost:4173/[name].js
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
