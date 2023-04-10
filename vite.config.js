import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  build: {
    target: 'es2021',
    rollupOptions: {
      input: {
        // ホスティングは https://localhost:4173/desktop.js
        desktop: 'src/main.ts',
      },
      output: {
        format: 'iife', // 即時関数で囲む
        dir: 'dist', // 「dist」ディレクトリーの下にビルド後のファイルを生成する
        entryFileNames: '[name].js', // 生成物のファイル名は input のキー名とする
        // 今回は「desktop.js」というファイルが生成される
      },
    },
  },
  plugins: [basicSsl()],
}
